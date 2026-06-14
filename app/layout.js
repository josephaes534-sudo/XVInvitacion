import './globals.css'

export const metadata = {
  title: "Hallie's Pool Party — XV Años",
  description: 'Invitación digital premium para la Pool Party de Hallie. Acompáñanos a celebrar sus 15 años.',
  openGraph: {
    title: "Hallie's Pool Party — XV Años",
    description: 'Invitación digital premium para la Pool Party de Hallie.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#16383B',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
