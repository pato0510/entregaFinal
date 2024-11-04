// app/api/matches/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '../../../lib/prisma';

export async function GET(request) {
  try {
    const matches = await prisma.match.findMany({
      include: {
        players: true,
      },
    });

    return new Response(JSON.stringify(matches), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener partidos:', error);
    return new Response(
      JSON.stringify({ message: 'Error al obtener partidos' }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ message: 'No autorizado' }),
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    const { day, time, type, category, maxPlayers } = data;

    const match = await prisma.match.create({
      data: {
        day,
        time,
        type,
        category: parseInt(category),
        maxPlayers: parseInt(maxPlayers),
        creator: {
          connect: { email: session.user.email },
        },
        players: {
          connect: { email: session.user.email },
        },
      },
    });

    return new Response(JSON.stringify(match), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al crear partido:', error);
    return new Response(
      JSON.stringify({ message: 'Error al crear partido' }),
      { status: 500 }
    );
  }
}