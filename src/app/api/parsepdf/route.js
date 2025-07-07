import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export const runtime = 'nodejs';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    const data = await pdfParse(buffer);
    return NextResponse.json({ text: data.text });
  } catch (e) {
    return NextResponse.json({ error: 'PDF parse error' }, { status: 500 });
  }
} 