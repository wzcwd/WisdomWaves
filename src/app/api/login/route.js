import prisma from '@/lib/prisma'
import { compare } from 'bcryptjs';

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // for generate JWT or set session
  return Response.json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } });
} 