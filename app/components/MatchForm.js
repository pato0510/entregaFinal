// app/components/MatchForm.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MatchForm() {
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    type: '',
    category: 1,
    maxPlayers: 4,
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía datos al endpoint de creación de partidos
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Partido creado exitosamente, redirigir a la lista de partidos
        router.push('/matches');
      } else {
        // Manejar errores
        const errorData = await response.json();
        alert(errorData.message || 'Error al crear partido');
      }
    } catch (error) {
      console.error('Error al crear partido:', error);
      alert('Error al crear partido');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Crear Partido</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="day" className="block font-medium">
            Día:
          </label>
          <input
            type="date"
            name="day"
            id="day"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.day}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block font-medium">
            Hora:
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block font-medium">
            Tipo:
          </label>
          <input
            type="text"
            name="type"
            id="type"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">
            Categoría:
          </label>
          <input
            type="number"
            name="category"
            id="category"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.category}
            onChange={handleChange}
            required
            min="1"
            max="5"
          />
        </div>
        <div>
          <label htmlFor="maxPlayers" className="block font-medium">
            Máximo de Jugadores:
          </label>
          <input
            type="number"
            name="maxPlayers"
            id="maxPlayers"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.maxPlayers}
            onChange={handleChange}
            required
            min="2"
            max="4"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Crear Partido
        </button>
      </form>
    </div>
  );
}
