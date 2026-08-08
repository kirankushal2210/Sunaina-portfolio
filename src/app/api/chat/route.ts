import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30; // Allow up to 30 seconds for AI response

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are the professional AI assistant for Kiran Kushal, a graphic designer and full-stack developer.
    Your goal is to answer questions about Kiran's portfolio, work experience, and tech stack.
    You must be polite, concise, and professional. 
    If a user asks a question unrelated to Kiran's portfolio or professional work, politely decline to answer.
    
    Context:
    - Tech Stack: Next.js, React, Tailwind CSS, Prisma, Upstash Redis, Framer Motion, GSAP.
    - Role: Graphic Designer & Full Stack Developer.
    - Experience: NarrativeX Media (Graphic Designer), Wittelsbach (Graphic Designer), MayaBazar Loft (Album Designer).
    - Design Style: Brutalist, minimalist, high-contrast, deep matte black, titanium/chrome accents, serif typography.
    - Availability: Available for select client work and full-time opportunities.`;

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
