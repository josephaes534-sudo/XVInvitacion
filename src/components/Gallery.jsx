'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { IoImagesOutline } from 'react-icons/io5'
import { HiPhoto } from 'react-icons/hi2'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import galleryConfig from '@/config/gallery'

export default function Gallery() {
  const hasImages = galleryConfig.images && galleryConfig.images.length > 0
  const hasGoogleUrl = galleryConfig.googlePhotosUrl && galleryConfig.googlePhotosUrl.length > 0
  const canShow = hasImages || hasGoogleUrl

  return (
    <section id="galeria" className="relative py-24 md:py-32 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-navy-800/30 to-navy-900/0" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IoImagesOutline className="text-electric-500 text-xl" />
            <span className="text-electric-500/80 text-sm tracking-[0.3em] uppercase font-light">
              Galería
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Nuestros Momentos
          </h2>
        </motion.div>

        {canShow ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"
            >
              {galleryConfig.images.map((src, index) => (
                <SwiperSlide key={index} className="!w-[300px] sm:!w-[400px] md:!w-[500px]">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass glow-blue">
                    <img
                      src={src}
                      alt={`Galería ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent pointer-events-none" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-12 md:p-16 text-center max-w-lg mx-auto"
          >
            <HiPhoto className="text-6xl text-electric-500/30 mx-auto mb-6" />
            <h3 className="text-xl font-display font-bold text-white/70 mb-3">
              Galería de Fotos
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Las fotos estarán disponibles pronto.
              <br />
              Configura tu álbum de Google Photos en{' '}
              <code className="text-electric-500/60 text-xs">src/config/gallery.js</code>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
