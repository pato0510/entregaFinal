'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 1,
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center text-secondary1" style={{ backgroundImage: "url('/padel-court.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-secondary1 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Registro de Usuario</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-primary">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border rounded bg-secondary1 text-primary"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-primary">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border rounded bg-secondary1 text-primary"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-primary">
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-2 border rounded bg-secondary1 text-primary"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium text-primary">
              Categoría:
            </label>
            <input
              type="number"
              name="category"
              id="category"
              className="w-full p-2 border rounded bg-secondary1 text-primary"
              value={formData.category}
              onChange={handleChange}
              required
              min="1"
              max="5"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-secondary2 text-primary font-bold rounded hover:bg-secondary3 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
