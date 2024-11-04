// app/login/page.js

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (res.ok) {
      // Inicio de sesión exitoso, redirigir a la página principal
      router.push('/');
    } else {
      // Manejar errores
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border rounded bg-white text-black"
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
