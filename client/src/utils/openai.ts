import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you might want to proxy through your backend
});

const SYSTEM_PROMPT = `You are an autonomous task execution AI. Your role is to:
1. Break down user goals into specific, actionable tasks
2. Execute each task thoughtfully
3. Provide clear, concise responses
4. Stay focused on the goal

When breaking down tasks:
- Create 2-5 specific, actionable steps
- Make steps logical and sequential
- Keep steps concise but clear

When executing tasks:
- Provide detailed, helpful responses
- Stay relevant to the task
- Be direct and practical`;

export async function breakdownGoal(goal: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Break down this goal into specific, actionable tasks: ${goal}` }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No response from OpenAI");

    // Parse the response into individual tasks
    const tasks = content
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0);

    return tasks;
  } catch (error) {
    console.error('Error breaking down goal:', error);
    throw new Error('Failed to break down the goal into tasks');
  }
}

export async function executeTask(task: string, goal: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Goal: ${goal}\nTask to execute: ${task}\n\nProvide a detailed response for this specific task.` }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No response from OpenAI");

    return content;
  } catch (error) {
    console.error('Error executing task:', error);
    throw new Error('Failed to execute the task');
  }
} 