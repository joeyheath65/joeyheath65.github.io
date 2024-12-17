import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you might want to proxy through your backend
});

export async function sendMessage(message: string, assistantId: string): Promise<string> {
  try {
    if (!assistantId) {
      throw new Error('Assistant ID is required but not provided');
    }

    // Create a new thread
    const thread = await openai.beta.threads.create();

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    });

    // Poll for the run completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout

    while (runStatus.status !== "completed" && attempts < maxAttempts) {
      if (runStatus.status === "failed" || runStatus.status === "cancelled") {
        throw new Error(`Run ${runStatus.status}: ${runStatus.last_error?.message || 'Unknown error'}`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error('Request timed out after 30 seconds');
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data
      .filter(message => message.role === "assistant")
      .pop();

    if (!lastMessage?.content[0]) {
      throw new Error("No response from assistant");
    }

    return lastMessage.content[0].type === 'text' 
      ? lastMessage.content[0].text.value 
      : 'Unsupported response type';

  } catch (error) {
    console.error('Error in OpenAI chat:', error);
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }
    return 'An unexpected error occurred';
  }
} 