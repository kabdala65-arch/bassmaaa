import { useEffect, useRef, useState } from 'react'
import AuroraBackground from './components/AuroraBackground'
import FloatingHearts from './components/FloatingHearts'
import PasswordGate from './components/PasswordGate'
import HeroSection from './components/HeroSection'
import CounterSection from './components/CounterSection'
import MeaningSection from './components/MeaningSection'
import MissingYouSection from './components/MissingYouSection'
import GallerySection from './components/GallerySection'
import LoveCardsSection from './components/LoveCardsSection'
import PromiseSection from './components/PromiseSection'
import VideoMessageSection from './components/VideoMessageSection'
import MessageSection from './components/MessageSection'
import Footer from './components/Footer'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicBlocked, setMusicBlocked] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => {
      setMusicPlaying(true)
      setMusicBlocked(false)
    }
    const onPause = () => setMusicPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  const startMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 1
    audio.play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicBlocked(true))
  }

  const handleUnlock = () => {
    // مهم: تشغيل الأغنية هنا مباشرة داخل ضغطة زر فتح الموقع،
    // لأن المتصفحات الحديثة تمنع autoplay بالصوت بدون تفاعل من المستخدم.
    startMusic()
    setUnlocked(true)
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) startMusic()
    else audio.pause()
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/our-song.mp3"
        preload="auto"
        loop
        aria-hidden="true"
      />

      {!unlocked ? (
        <PasswordGate onUnlock={handleUnlock} />
      ) : (
        <>
          <AuroraBackground />
          <FloatingHearts count={20} />

          <main>
            <HeroSection />
            <CounterSection />
            <MeaningSection />
            <MissingYouSection />
            <GallerySection />
            <LoveCardsSection />
            <PromiseSection />
            <VideoMessageSection />
            <MessageSection />
            <Footer />
          </main>

          <button
            type="button"
            onClick={toggleMusic}
            style={{
              position: 'fixed',
              bottom: '22px',
              left: '22px',
              zIndex: 1000,
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.35)',
              background: 'rgba(85, 25, 85, .82)',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(236,72,153,.45)',
              backdropFilter: 'blur(8px)'
            }}
            aria-label={musicPlaying ? 'إيقاف الأغنية' : 'تشغيل الأغنية'}
            title={musicBlocked ? 'اضغطي لتشغيل الأغنية' : (musicPlaying ? 'إيقاف الأغنية' : 'تشغيل الأغنية')}
          >
            {musicPlaying ? '❚❚' : '▶'}
          </button>
        </>
      )}
    </>
  )
}
