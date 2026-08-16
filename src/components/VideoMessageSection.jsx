import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { registerMedia, notifyPlaying, notifyStopped } from '../utils/mediaCoordinator'
import './VideoMessageSection.css'

// لإضافة فيديو:
// حطي ملف الفيديو (mp4) في مجلد public/video وسميه our-video.mp4
// مفيش أي تعديل تاني مطلوب — الموقع هيعرضه تلقائي.
// وبمجرد ما الفيديو يتشغل، صوت الموسيقى وأي صوت تاني في الصفحة
// هيوقف تلقائي عشان صوت الفيديو يبقى واضح لوحده.

export default function VideoMessageSection() {
  const [videoAvailable, setVideoAvailable] = useState(true)
  const videoRef = useRef(null)

  const videoSrc = '/video/our-video.mp4'

  useEffect(() => {
    const unregister = registerMedia('video', {
      pause: () => videoRef.current?.pause(),
    })
    return unregister
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay = () => notifyPlaying('video')
    const onPause = () => notifyStopped('video')
    const onError = () => setVideoAvailable(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onPause)
    video.addEventListener('error', onError)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onPause)
      video.removeEventListener('error', onError)
    }
  }, [])

  return (
    <section className="video-section" id="video">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">رسالة فيديو</span>
        <h2 className="section-title">شوفيني بقلبي أقولهالك</h2>
        <p className="section-subtitle">حبيت تشوفي وشي وأنا بقولك كل ده ♥</p>
      </motion.div>

      <motion.div
        className="video-card"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
      >
        {videoAvailable ? (
          <video
            ref={videoRef}
            className="video-player"
            src={videoSrc}
            controls
            playsInline
            preload="metadata"
            onError={() => setVideoAvailable(false)}
          />
        ) : (
          <div className="video-placeholder">
            <span className="video-placeholder-icon">▶</span>
            <p>لسه معملتش أبلود للفيديو — حطيه في public/video باسم our-video.mp4</p>
          </div>
        )}
      </motion.div>
    </section>
  )
}
