import './globals.css'

export const metadata = {
  title: 'Hallie\'s Pool Party — XV Años',
  description: 'Invitación digital para la Pool Party de Hallie. Acompáñanos a celebrar sus 15 años.',
  openGraph: {
    title: 'Hallie\'s Pool Party — XV Años',
    description: 'Invitación digital para la Pool Party de Hallie.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a1628',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
