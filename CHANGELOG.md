# Changelog - Mejoras Visuales Hallie XV

## Archivos Modificados

### 1. `src/components/EnvelopeScreen.jsx` — Reescribito completo

**Fondo:**
- Gradiente de azul marino profundo + azul rey (NO negro)
- Capa de caustics sutiles con `background-position` animado
- Reflejos radiales acuáticos en las esquinas

**Perla Luminosa Central (nuevo componente `LuminousPearl`):**
- Esfera de 300px (200px móvil) con gradiente radial: blanco → azul eléctrico → azul rey
- 3 capas de brillo especular (highlights)
- 12 rayos de luz que emergen radialmente con `rayPulse` animation
- Sombra de brillo inferior (under-glow)
- Animación flotante `float 7s` + pulso de brillo `glowPulse 4s`
- Reemplaza la bola disco de la referencia

**Estrellas (nuevo componente `EnvelopeStar`):**
- 45 estrellas (25 en móvil) con posición aleatoria
- Cada 4ta estrella es "grande" con glow azul (`box-shadow` + gradiente radial)
- Animación `twinkle` con duración/delay aleatorio

**Sobre (Acabado tipo cristal premium):**
- Gradiente royal blue → navy con `backdrop-filter: blur(8px)`
- Borde con `rgba(0,212,255,0.15)`
- Múltiples sombras: exterior (glow azul) + interior
- Solapa superior (40% altura) con gradiente propio y glow inferior
- Sello circular en la solapa con pulso bioluminiscente
- Texto "Para ti" en la solapa
- Cuerpo del sobre con "Hallie Aes - Mis XV Años" en tipografía elegante
- Texto "Special Celebration" con sparkles
- Borde decorativo exterior en desktop

**Carta interior:**
- Fondo blanco con degradado azul muy sutil
- Shadow premium
- Ícono sparkle con glow
- "¡Bienvenidos!" + mensaje + divider + nombre
- Aparece con glow azul al abrirse

**Botón "Abrir Invitación":**
- Glass morphism con gradiente azul
- Hover: intensifica glow + brillo + background
- Shimmer con `translateX` en hover

**Secuencia de apertura (GSAP ~3.5s):**
1. Glow overlay se ilumina (0.3s)
2. Sparkle burst aparece/desaparece (0.6s)
3. Solapa se abre con `rotateX(-180)` (1s)
4. Cuerpo frontal se desvanece (0.5s)
5. Carta emerge desde abajo (0.8s)
6. Contenido de carta aparece con glow (0.4s)
7. Glow overlay se desvanece (0.5s)
8. Carta se desvanece + sube (0.6s)
9. Contenedor completo hace fade + scale (0.7s)
10. Delay 700ms → `onOpen()`

**Optimización móvil:**
- `isMobile` detecta `window.innerWidth < 768`
- Perla: 200px, Estrellas: 25, Partículas canvas: 20, Sparkles: 8
- Sobres: 290×380px, tipografía responsive
- Borde exterior decorativo solo en desktop

---

### 2. `src/components/ParticlesBackground.jsx` — Mejorado

**Nuevas features:**
- Rayos de luz marina (solo desktop): 3 rayos que oscilan y rotan suavemente
- Partículas grandes con halo bioluminiscente (cada 4ta)
- Sparkle dots blancos pulsantes independientes

**Optimización rendimiento:**
- Detecta `navigator.hardwareConcurrency` para reducir partículas en CPUs ≤4 cores
- Móvil: máximo 15 partículas
- Slow device: máximo 20 partículas
- `will-change: transform` en canvas

---

### 3. `src/app/globals.css` — Animaciones refinadas

**Cambios:**
- `@keyframes caustic`: ahora solo anima `background-position` (eliminado translate/scale)
- Duración aumentada a 18s-20s para sutileza
- Opacidades reducidas (0.04 → 0.03)
- `background-size` reducido a 150%
- Nuevos keyframes: `glowPulse`, `rayPulse`
- Nueva utility: `gpu-accelerated` con `translateZ(0)` + `will-change`
- Eliminado `@keyframes float` (lo genera Tailwind)

---

### 4. `src/app/layout.js` — Meta tags móviles

- `viewport` export con `maximumScale: 1`, `userScalable: false`
- `themeColor: '#0d1b2a'` para la barra de navegación del navegador

---

### 5. `src/app/page.js` — Transición suave

- Fade-in del contenido principal con `opacity` + `transition: 0.8s`
- Clase `marine-caustics` mantenida (solo background-position)

---

### 6. `tailwind.config.js` — Nuevas animaciones

- `glowPulse` keyframe (antes era inline en CSS)
- `rayPulse` keyframe
- `marine-drift` → `marineFloat` (consistente con CSS)
- Animaciones referenciadas correctamente

---

## NO implemented (intencional)

- ❌ Zoom In / Zoom Out de página
- ❌ Escalados continuos
- ❌ Movimiento de toda la interfaz
- ❌ Peces caricaturescos
- ❌ Elementos infantiles
- ❌ Decoración de fiesta infantil
- ❌ Sobres de color negro

## Stack técnico

- Next.js 14 (static export → Netlify)
- Tailwind CSS 3
- Framer Motion 11
- GSAP 3 (animación apertura)
- requestAnimationFrame (partículas canvas)
- GPU Acceleration (will-change, translateZ)
