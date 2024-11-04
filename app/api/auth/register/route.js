// app/api/auth/register/route.js

import bcrypt from 'bcrypt';
import prisma from '../../../../lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password, category } = data;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'El usuario ya existe' }),
        { status: 400 }
      );
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        category: parseInt(category),
      },
    });

    return new Response(JSON.stringify({ message: 'Usuario creado' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return new Response(
      JSON.stringify({ message: 'Error al registrar usuario' }),
      { status: 500 }
    );
  }
}
