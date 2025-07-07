import { NextResponse } from 'next/server';

export async function POST(req) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key.' }, { status: 400 });
  }
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid messages.' }, { status: 400 });
  }

  // build the prompt for thesis proofreading use case
  const systemPrompt = {
    role: 'system',
    content: `
You are a professional thesis proofreader. When the user sends you a paragraph or multiple paragraphs of academic writing, perform the following:
1. Correct grammar, punctuation, and awkward expressions.
2. Improve clarity, conciseness, and formal academic tone.
3. Return your response as a JSON object like this:
{
  "summary": "Brief description of the main issues fixed",
  "corrected": "The improved version of the text",
  "highlights": ["Incorrect tense in sentence 2", "Improved word choice in sentence 4"]
}

Do not explain your changes unless asked. Only return the JSON object.
`
  };

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const data = await openaiRes.json();
  let summary = '', content = '';
  try {
    const json = JSON.parse(data.choices[0].message.content);
    summary = json.summary;
    content = json.content;
  } catch {
    // fallback: all as content
    content = data.choices[0].message.content;
    summary = content.slice(0, 60) + (content.length > 60 ? '...' : '');
  }

  return NextResponse.json({ summary, content });
} 