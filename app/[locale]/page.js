// app/[locale]/page.js

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

export default function HomePage({ params }) {
  const { data: session } = useSession();
  const t = useTranslations();

  const locale = params.locale;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('platform')}</h1>
      {session ? (
        <p className="mb-4">{t('welcomeUser', { name: session.user.name })}</p>
      ) : (
        <p className="mb-4">
          {t('welcome')}. {t('please')},{' '}
          <Link href={`/${locale}/login`} className="text-blue-500">
            {t('login')}
          </Link>{' '}
          {t('or')}{' '}
          <Link href={`/${locale}/register`} className="text-blue-500">
            {t('register')}
          </Link>
          .
        </p>
      )}
      <div className="space-y-4">
        <Link
          href={`/${locale}/matches`}
          className="block p-4 bg-blue-500 text-white rounded text-center"
        >
          {t('viewMatches')}
        </Link>
        {session && (
          <Link
            href={`/${locale}/matches/create`}
            className="block p-4 bg-green-500 text-white rounded text-center"
          >
            {t('createMatch')}
          </Link>
        )}
      </div>
    </div>
  );
}
