// app/matches/[id]/ClientMatchDetails.js

'use client';

import { useRouter } from 'next/navigation';

export default function ClientMatchDetails({ match, session }) {
  const router = useRouter();

  const isPlayer =
    session && match.players.some((player) => player.email === session.user.email);
  const canJoin = session && !isPlayer && match.players.length < match.maxPlayers;

  const joinMatch = async () => {
    const response = await fetch(`/api/matches/${match.id}/join`, {
      method: 'POST',
    });

    if (response.ok) {
      router.refresh();
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Error al unirse al partido.');
    }
  };

  return (
    <div>
      <p>Tipo: {match.type}</p>
      <p>Día: {match.day}</p>
      <p>Hora: {match.time}</p>
      <p>Categoría: {match.category}</p>
      <p>
        Jugadores: {match.players.length} / {match.maxPlayers}
      </p>
      <p>Creador: {match.creator.name}</p>

      {/* Lista de jugadores */}
      <h2 className="text-xl font-semibold mt-4">Jugadores:</h2>
      <ul>
        {match.players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>

      {/* Botón para unirse al partido */}
      {canJoin && (
        <button
          onClick={joinMatch}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Unirse al Partido
        </button>
      )}
    </div>
  );
}
