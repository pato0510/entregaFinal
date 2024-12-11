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
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center text-primary" style={{ backgroundImage: "url('/padel-court.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-secondary1 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Crear Partido</h1>
        <ClientMatchForm />
      </div>
    </div>
  );
}
