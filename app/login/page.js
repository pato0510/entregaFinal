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
      router.push('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center text-secondary1" style={{ backgroundImage: "url('/padel-court.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-secondary1 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-primary">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border rounded bg-secondary1 text-primary"
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-secondary2 text-primary font-bold rounded hover:bg-secondary3 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
