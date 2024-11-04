// app/matches/[id]/page.js

import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import ClientMatchDetails from './ClientMatchDetails';

export default async function MatchDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  const matchId = params.id;

  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: { players: true, creator: true },
  });

  if (!match) {
    return <div>Partido no encontrado.</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Detalles del Partido</h1>
      <ClientMatchDetails match={match} session={session} />
    </>
  );
}
