// app/matches/create/page.js

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import ClientMatchForm from './ClientMatchForm';

export default async function CreateMatchPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Crear Partido</h1>
      <ClientMatchForm />
    </>
  );
}
