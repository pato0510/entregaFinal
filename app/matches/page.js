// app/matches/page.js

import ClientMatchList from './ClientMatchList';

export default function MatchesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Partidos Disponibles</h1>
      <ClientMatchList />
    </>
  );
}
