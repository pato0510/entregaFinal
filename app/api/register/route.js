import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const { name, email, password, category } = await request.json();

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el usuario
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      category: parseInt(category),
    },
  });

  return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}
