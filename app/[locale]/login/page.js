// app/[locale]/login/page.js

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

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
      router.push(`/${locale}`);
    } else {
      // Manejar errores
      alert(t('invalidCredentials'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{t('login')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos del formulario con traducciones */}
      </form>
    </div>
  );
}
