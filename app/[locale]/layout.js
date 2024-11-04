// app/[locale]/layout.js

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import NavigationBar from '../../components/NavigationBar';

export default async function LocaleLayout({ children, params }) {
  const locale = params.locale;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavigationBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}
