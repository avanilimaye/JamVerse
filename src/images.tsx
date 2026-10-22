import { useState } from 'react'
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
