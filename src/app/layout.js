import './globals.css'

export const metadata = {
  title: 'XVhallie — Experiencia Oceánica',
  description: 'Una experiencia digital premium de lujo junto al mar. Beach Club & Luxury Experience.',
  openGraph: {
    title: 'XVhallie — Experiencia Oceánica',
    description: 'Una experiencia digital premium de lujo junto al mar.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#060e1a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
