const eventConfig = {
  heroName: 'Hallie Aes',
  heroSubtitle: 'Mis XV Años',

  countdownDate: '2026-12-31T20:00:00',

  event: {
    date: 'Sábado, 31 de Diciembre de 2026',
    time: '8:00 PM',
    venue: 'Salón de Eventos Los Jardines',
    address: 'Av. Principal #123, Ciudad',
  },

  dressCode: {
    title: 'Código de Vestimenta',
    description: 'Traje formal / Vestido de gala',
    colors: [
      { name: 'Azul Rey', hex: '#1a237e' },
      { name: 'Azul Marino', hex: '#0d1b2a' },
      { name: 'Azul Eléctrico', hex: '#00d4ff' },
      { name: 'Blanco', hex: '#ffffff' },
      { name: 'Plateado', hex: '#c0c0c0' },
    ],
  },

  specialMessage: {
    title: 'Mensaje Especial',
    content:
      'Hoy cumplo 15 años y quiero celebrarlo rodeada de las personas que más quiero. Cada momento compartido con ustedes ha sido un regalo invaluable. Los invito a ser parte de esta noche mágica llena de alegría, baile y sueños por cumplir. ¡Los espero con todo mi corazón!',
  },

  rsvp: {
    formspreeEndpoint: '',
    phone: '+52 123 456 7890',
  },

  music: {
    songUrl: '',
    songTitle: 'Canción de Fondo',
    artist: 'Artista',
  },
}

export default eventConfig
