import './globals.css'
import eventConfig from '../config/event'

export const metadata = {
  title: `Hallie's ${eventConfig.themeName} — XV Años`,
  description: `Invitación digital premium para el ${eventConfig.themeName} de Hallie. Acompáñanos a celebrar sus 15 años.`,
  openGraph: {
    title: `Hallie's ${eventConfig.themeName} — XV Años`,
    description: `Invitación digital premium para el ${eventConfig.themeName} de Hallie.`,
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#07213f',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
