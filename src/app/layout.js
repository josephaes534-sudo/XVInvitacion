import './globals.css'

export const metadata = {
  title: 'Hallie Aes - Mis XV Años',
  description:
    'Invitación digital para los XV años de Hallie Aes. Acompáñanos a celebrar esta noche mágica.',
  openGraph: {
    title: 'Hallie Aes - Mis XV Años',
    description:
      'Invitación digital para los XV años de Hallie Aes. Acompáñanos a celebrar esta noche mágica.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
