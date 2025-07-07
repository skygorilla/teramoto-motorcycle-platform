import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default function DeleteData({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Zahtjev za brisanje podataka</h1>
      <p>Za brisanje vaših podataka povezanih s TERAMOTO aplikacijom, pošaljite zahtjev na:</p>
      <p><strong>info.teramoto@gmail.com</strong></p>
      <p>Uključite email adresu povezanu s vašim Facebook računom.</p>
    </div>
  );
}