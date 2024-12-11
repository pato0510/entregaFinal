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
    return (
      <div className="bg-primary min-h-screen flex flex-col justify-center items-center text-secondary1" style={{ backgroundImage: "url('/padel-court.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-secondary1 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-primary">Partido no encontrado</h1>
          <p className="text-primary">No se pudo encontrar el partido solicitado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center text-secondary1" style={{ backgroundImage: "url('/padel-court.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-secondary1 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-primary text-center">Detalles del Partido</h1>
        <ClientMatchDetails match={match} session={session} />
      </div>
    </div>
  );
}
