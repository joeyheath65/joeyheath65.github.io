# AI Agent Hub

A modern web application that provides access to multiple AI assistants powered by OpenAI and Google's Gemini. Built with Next.js, Supabase, and TailwindCSS.

![AI Agent Hub](https://your-screenshot-url-here.png)

## Features

- 🤖 Multiple AI Assistants
  - General Assistant
  - Code Expert
  - Administrative Assistant
  - Research Analyst
  - Creative Director
  - Business Strategist
  - Gemini Pro Integration

- 🔒 Authentication
  - Secure login with Supabase
  - Social authentication (Google, GitHub)
  - Protected routes for premium features

- 💻 Technical Features
  - Built with Next.js 14 and TypeScript
  - Real-time chat interface
  - Responsive design with TailwindCSS
  - GitHub Pages deployment

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenAI API key
- Google AI (Gemini) API key
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joeyheath65/joeyheath65.github.io.git
   cd joeyheath65.github.io
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   ```

3. Create a `.env.local` file in the client directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_GOOGLE_AI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_OPENAI_ASSISTANT_ID_GENERAL=your_general_assistant_id
   NEXT_PUBLIC_OPENAI_ASSISTANT_ID_CODING=your_coding_assistant_id
   # ... add other assistant IDs
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch. To deploy manually:

```bash
npm run build
npm run deploy
```

## Project Structure

```
/client
├── /src
│   ├── /app             # Next.js app directory
│   ├── /components      # React components
│   ├── /utils          # Utility functions
│   └── /config         # Configuration files
├── /public             # Static assets
└── next.config.js      # Next.js configuration
```

## Authentication Setup

1. Create a Supabase project
2. Configure OAuth providers (Google, GitHub)
3. Add callback URLs:
   - Development: `http://localhost:3001/auth/callback`
   - Production: `https://joeyheath65.github.io/auth/callback`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for their powerful GPT models and Assistants API
- Google for the Gemini AI model
- Supabase for authentication and backend services
- Vercel for Next.js
- TailwindCSS for styling

## Contact

Joey Heath - [GitHub](https://github.com/joeyheath65) 