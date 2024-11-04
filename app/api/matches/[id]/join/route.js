// app/api/matches/[id]/join/route.js

import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '../../../../../lib/prisma';

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ message: 'No autorizado' }),
      { status: 401 }
    );
  }

  const matchId = params.id;

  try {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { players: true },
    });

    if (!match) {
      return new Response(
        JSON.stringify({ message: 'Partido no encontrado' }),
        { status: 404 }
      );
    }

    if (match.players.length >= match.maxPlayers) {
      return new Response(
        JSON.stringify({ message: 'El partido ya está lleno' }),
        { status: 400 }
      );
    }

    const isPlayer = match.players.some(
      (player) => player.email === session.user.email
    );

    if (isPlayer) {
      return new Response(
        JSON.stringify({ message: 'Ya estás en este partido' }),
        { status: 400 }
      );
    }

    await prisma.match.update({
      where: { id: matchId },
      data: {
        players: {
          connect: { email: session.user.email },
        },
      },
    });

    return new Response(JSON.stringify({ message: 'Te has unido al partido' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error al unirse al partido:', error);
    return new Response(
      JSON.stringify({ message: 'Error al unirse al partido' }),
      { status: 500 }
    );
  }
}
