// app/register/page.js

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
      // Envía datos al endpoint de registro
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registro exitoso, redirigir al inicio de sesión
        router.push('/login');
      } else {
        // Manejar errores
        const errorData = await response.json();
        alert(errorData.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border rounded bg-white text-black"
            value={formData.password}
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
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
