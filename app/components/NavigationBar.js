// app/components/NavigationBar.js

'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function NavigationBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
      <div>
        <Link href="/" className="text-xl font-bold">
          Plataforma de Pádel
        </Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link href="/matches">Partidos</Link>
        {session ? (
          <>
            <Link href="/matches/create">Crear Partido</Link>
            <button onClick={() => signOut()} className="ml-4">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Iniciar Sesión</Link>
            <Link href="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
