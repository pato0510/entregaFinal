import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-padel-court bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-center items-center text-secondary1">
      <div className="bg-secondary1 bg-opacity-90 p-6 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-primary">Plataforma de Pádel</h1>
        {session ? (
          <p className="mb-4 text-lg text-primary">
            Bienvenido, <span className="font-semibold">{session.user.name}</span>.
          </p>
        ) : (
          <p className="mb-4 text-lg text-primary">
            Bienvenido. Por favor,{' '}
            <Link href="/login" className="text-secondary3 underline">
              inicia sesión
            </Link>{' '}
            o{' '}
            <Link href="/register" className="text-secondary3 underline">
              regístrate
            </Link>
            .
          </p>
        )}
        <div className="space-y-4">
          <Link
            href="/matches"
            className="block px-6 py-3 bg-secondary2 text-primary rounded-lg text-lg shadow hover:bg-secondary3 transition"
          >
            Ver Partidos
          </Link>
          {session && (
            <Link
              href="/matches/create"
              className="block px-6 py-3 bg-secondary3 text-secondary1 rounded-lg text-lg shadow hover:bg-secondary2 transition"
            >
              Crear un Partido
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
