export default function OceanBackground() {
  const bubbles = Array.from({ length: 120 })
  const particles = Array.from({ length: 80 })

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((_, i) => (
        <div
          key={`p-${i}`}
          className="particle"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 10}s`,
          }}
        />
      ))}

      {bubbles.map((_, i) => (
        <div
          key={`b-${i}`}
          className="bubble"
          style={{
            width: `${20 + Math.random() * 70}px`,
            height: `${20 + Math.random() * 70}px`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}
