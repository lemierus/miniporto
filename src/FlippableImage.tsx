import { useState } from 'react'
import { motion } from 'framer-motion'

export function FlippableImage({ images, title }: { images: string[]; title: string }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Jika cuma ada 1 gambar, tampilkan gambar biasa
  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <img src={images[0]} alt={title} className="max-h-96 w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="relative cursor-pointer [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative h-64 w-full rounded-2xl border border-white/10 bg-white/5 sm:h-80 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Sisi Depan (Gambar 1) */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl [backface-visibility:hidden]">
          <img src={images[0]} alt={`${title} - Front`} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
            Klik untuk putar 🔄 (1/2)
          </span>
        </div>

        {/* Sisi Belakang (Gambar 2) */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img src={images[1]} alt={`${title} - Back`} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
            Klik untuk putar 🔄 (2/2)
          </span>
        </div>
      </motion.div>
    </div>
  )
}