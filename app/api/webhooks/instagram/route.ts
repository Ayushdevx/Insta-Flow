import { NextResponse } from 'next/server';
import { InstagramClient } from '@/lib/instagram';
import { GeminiAI } from '@/lib/gemini';

const instagramClient = new InstagramClient(process.env.INSTAGRAM_ACCESS_TOKEN!);
const geminiAI = new GeminiAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const payload = await req.json();

  // Handle Instagram webhook events
  if (payload.object === 'instagram' && payload.entry) {
    for (const entry of payload.entry) {
      if (entry.changes) {
        for (const change of entry.changes) {
          if (change.field === 'comments') {
            // Process new comment
            const comment = change.value;
            await processComment(comment);
          }
        }
      }
    }
  }

  return NextResponse.json({ status: 'ok' });
}

async function processComment(comment: any) {
  try {
    // Generate AI response
    const aiResponse = await geminiAI.generateResponse(
      `Generate a friendly response to this Instagram comment: "${comment.text}"`
    );

    // Send automated response
    await instagramClient.sendDirectMessage(comment.from.id, aiResponse);
  } catch (error) {
    console.error('Error processing comment:', error);
  }
}