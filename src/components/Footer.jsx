export default function Footer() {
  return (
    <footer className="relative py-14 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <div className="font-display text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent mb-3">
          XVhallie
        </div>
        <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/20 mb-6 font-light">
          Beach Club &bull; Luxury Experience
        </p>
        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent mx-auto mb-5" />
        <p className="text-[10px] text-white/10 tracking-[0.05em]">
          &copy; 2026 XVhallie. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
