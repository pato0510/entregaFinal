// app/components/MatchList.js

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MatchList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch('/api/matches');
      const data = await response.json();
      setMatches(data);
    };
    fetchMatches();
  }, []);

  return (
    <div className="grid gap-4">
      {matches.map((match) => (
        <div key={match.id} className="p-4 border rounded">
          <h2 className="text-xl font-semibold">Partido: {match.type}</h2>
          <p>Día: {match.day}</p>
          <p>Hora: {match.time}</p>
          <p>Categoría: {match.category}</p>
          <p>
            Jugadores: {match.players.length} / {match.maxPlayers}
          </p>
          <Link href={`/matches/${match.id}`} className="text-blue-500">
            Ver detalles
          </Link>
        </div>
      ))}
    </div>
  );
}
