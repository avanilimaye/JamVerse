import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { Art } from './ui'

// Cover photos live in public/images/{vibes,jams}/<slug>.jpg
const vibes = ['sakal-ujaadli', 'chai-chords', 'uth-jaa', 'lakshya', 'abhang-evenings', 'shyam-dhun', 'sunday-slow', 'rooftop-radio', 'dhol-tonight', 'peth-beats', 'redline', 'thunder-lane']
const jams = ['acoustic-sunset-jam', 'marathi-music-jam', 'devotional-evening', 'open-mic-wednesdays', 'indie-night', 'college-jam-battle-of-bands']

const covers: Record<string, string> = {}
vibes.forEach(s => { covers[s] = `/images/vibes/${s}.jpg` })
jams.forEach(s => { covers[s] = `/images/jams/${s}.jpg` })

// "Chai & Chords" -> "chai-chords"
const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/** Shows the photo for a song/jam title; falls back to the generated Art if there is no photo or it fails to load. */
export function Cover({ title, hue, className = '' }: { title: string; hue: number; className?: string }) {
  const [failed, setFailed] = useState(false)
  const src = covers[slug(title)]
  if (!src || failed) return <Art hue={hue} className={className} />
  // alt is empty on purpose: the title is already written next to the image
  return <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className={'block object-cover ' + className} />
}

/** Full-bleed vertical video for a Jam Feed reel. Plays muted when mostly on screen (unless the user prefers reduced motion), with real buttons for play/pause and sound. */
export function ReelVideo({ src, label, sound = true }: { src: string; label: string; sound?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = ref.current
    if (!v || typeof IntersectionObserver === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduce) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.6 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) v.play().catch(() => {}); else v.pause() }
  const btn = 'grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80'

  return <>
    <video ref={ref} src={src} muted={muted} loop playsInline preload="metadata" aria-label={label}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className="absolute inset-0 h-full w-full object-cover" />
    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">AI-generated</span>
    <div className="absolute right-3 top-3 flex gap-2">
      <button type="button" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'} className={btn}>{playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}</button>
      {sound && <button type="button" onClick={() => setMuted(m => !m)} aria-label={muted ? 'Turn sound on' : 'Mute video'} className={btn}>{muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}</button>}
    </div>
  </>
}
