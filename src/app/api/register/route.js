import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs';

export async function POST(request) {
  const { email, password, name } = await request.json();

  // check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return Response.json({ error: 'User already exists' }, { status: 400 });
  }

  // password encryption
  const hashedPassword = await hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return Response.json({ message: 'User registered', user: { id: user.id, email: user.email, name: user.name } });
} 