// app/page.js

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Plataforma de Pádel</h1>
      {session ? (
        <p className="mb-4">Bienvenido, {session.user.name}.</p>
      ) : (
        <p className="mb-4">
          Bienvenido. Por favor,{' '}
          <Link href="/login" className="text-blue-500">
            inicia sesión
          </Link>{' '}
          o{' '}
          <Link href="/register" className="text-blue-500">
            regístrate
          </Link>
          .
        </p>
      )}
      <div className="space-y-4">
        <Link
          href="/matches"
          className="block p-4 bg-blue-500 text-white rounded text-center"
        >
          Ver Partidos
        </Link>
        {session && (
          <Link
            href="/matches/create"
            className="block p-4 bg-green-500 text-white rounded text-center"
          >
            Crear un Partido
          </Link>
        )}
      </div>
    </div>
  );
}
