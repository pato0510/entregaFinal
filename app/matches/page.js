import ClientMatchList from './ClientMatchList';

export default function MatchesPage() {
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center text-primary" style={{ backgroundImage: "url('/padel-court.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-secondary1 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Partidos Disponibles</h1>
        <ClientMatchList />
      </div>
    </div>
  );
}
