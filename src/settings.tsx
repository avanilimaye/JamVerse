import { useState } from 'react'
import { AudioLines, BookOpen, Check, Eye, LogOut, Mic, Minus, Palette, Plus, Settings as SettingsIcon, Type, UserRound, Volume2 } from 'lucide-react'
import { selectTheme, useTheme, type ThemeId } from './store'

type ReadingFont = 'Default' | 'Atkinson Hyperlegible' | 'Lexend'

const themes: { id: ThemeId; name: string; description: string; colors: string[]; recommended?: boolean }[] = [
    { id: 'neon', name: 'Dark Neon', description: 'The classic JamVerse night palette.', colors: ['#0f0e0d', '#1a1816', '#ff6b3d', '#ffc857'] },
    { id: 'cb', name: 'Colour-blind Safe', description: 'Blue-based colour with high contrast.', colors: ['#F8FAFC', '#FFFFFF', '#0072B2', '#0072B2'], recommended: true },
    { id: 'insta', name: 'White', description: 'Bright white with a vivid photo-inspired gradient.', colors: ['#FFFFFF', '#FAFAFA', '#DD2A7B', '#8134AF'] },
]
const contrastLegend = [
    ['Background', '#F8FAFC'], ['Card', '#FFFFFF'], ['Text', '#172033'], ['Secondary text', '#475569'],
    ['Primary', '#0072B2'], ['Success', '#009E73'], ['Warning', '#E69F00'], ['Error', '#D55E00'],
    ['Info', '#56B4E9'], ['Border', '#94A3B8'], ['Disabled', '#CBD5E1'],
]
const fontStacks: Record<ReadingFont, string> = {
    Default: '"Space Grotesk", system-ui, sans-serif',
    'Atkinson Hyperlegible': '"Atkinson Hyperlegible", sans-serif',
    Lexend: '"Lexend", sans-serif',
}
const fontDescriptions: Record<ReadingFont, string> = {
    Default: 'Space Grotesk keeps the familiar JamVerse look.',
    'Atkinson Hyperlegible': 'Distinct letterforms make similar characters easier to tell apart.',
    Lexend: 'A smooth, open shape keeps longer reading comfortable.',
}

function SectionCard({ icon: Icon, title, helper, children, className = '' }: { icon: typeof Type; title: string; helper: string; children: React.ReactNode; className?: string }) {
    return <section className={'min-w-0 rounded-xl border border-line bg-card p-4 sm:p-5 ' + className}>
        <div className="mb-4 flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-bg text-accent"><Icon size={20} aria-hidden="true" /></span>
            <div className="min-w-0"><h2 className="text-[1.15em] font-bold leading-tight">{title}</h2><p className="mt-1 text-[0.84em] leading-snug text-muted">{helper}</p></div>
        </div>
        {children}
    </section>
}

function SettingSwitch({ id, label, description, checked, onChange }: { id: string; label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
    return <div className="flex items-center justify-between gap-4">
        <div className="min-w-0"><p id={`${id}-label`} className="text-[0.96em] font-semibold">{label}</p><p id={`${id}-description`} className="mt-1 text-[0.82em] leading-snug text-muted">{description}</p></div>
        <button type="button" role="switch" aria-labelledby={`${id}-label`} aria-describedby={`${id}-description`} aria-checked={checked} onClick={() => onChange(!checked)} className={'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-card ' + (checked ? 'border-accent bg-accent' : 'border-line bg-bg')}>
            <span className={'h-5 w-5 rounded-full bg-card shadow transition-transform ' + (checked ? 'translate-x-[1.35rem]' : 'translate-x-0.5')} />
        </button>
    </div>
}

export function SettingsPage() {
    const [textScale, setTextScale] = useState(1)
    const theme = useTheme()
    const [screenReader, setScreenReader] = useState(false)
    const [readingFont, setReadingFont] = useState<ReadingFont>('Default')
    const [soundCues, setSoundCues] = useState(true)
    const [reduceMotion, setReduceMotion] = useState(false)
    const [soundPreview, setSoundPreview] = useState(false)
    const [speakContent, setSpeakContent] = useState(false)
    const [voicePreview, setVoicePreview] = useState(false)
    const [speechSpeed, setSpeechSpeed] = useState(1)
    const fonts = Object.keys(fontStacks) as ReadingFont[]

    return <main className="settings-page mx-auto max-w-7xl px-4 py-7 sm:py-9" style={{ fontSize: `${textScale}em`, fontFamily: fontStacks[readingFont] }}>
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
            <div><p className="mb-2 flex items-center gap-2 text-[0.76em] font-bold uppercase tracking-[0.16em] text-highlight"><SettingsIcon size={15} aria-hidden="true" />Personal preferences</p><h1 className="text-[2em] font-bold leading-none">Settings</h1><p className="mt-3 max-w-2xl text-[0.96em] text-muted">Set how JamVerse looks and feels.</p></div>
            <span className="rounded-full border border-line px-3 py-1.5 text-[0.78em] text-muted">Local preview</span>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SectionCard icon={Type} title="Text Size" helper="Adjust the reading scale for this page.">
                <div className="flex items-center gap-3">
                    <Minus size={15} aria-hidden="true" className="shrink-0 text-muted" />
                    <label className="sr-only" htmlFor="settings-text-size">Text size</label>
                    <input id="settings-text-size" type="range" min="0.85" max="1.25" step="0.05" value={textScale} onChange={event => setTextScale(Number(event.target.value))} className="h-2 min-w-0 flex-1 cursor-pointer [accent-color:var(--accent)]" />
                    <Plus size={15} aria-hidden="true" className="shrink-0 text-muted" />
                    <output htmlFor="settings-text-size" className="w-12 text-right text-[0.8em] tabular-nums text-muted">{Math.round(textScale * 100)}%</output>
                </div>
                <p className="mt-4 rounded-lg border border-line bg-bg p-3 text-[1em] leading-relaxed text-fg">Music brings us together. Find your people, then find your sound.</p>
            </SectionCard>

            <SectionCard icon={Palette} title="Theme" helper="Choose a colour direction for your preview.">
                <div role="radiogroup" aria-label="Theme" className="grid grid-cols-2 gap-2">
                    {themes.map(option => <div key={option.id} className="min-w-0">
                        <input className="peer sr-only" type="radio" name="settings-theme" id={`theme-${option.id}`} checked={theme === option.id} onChange={() => selectTheme(option.id)} />
                        <label htmlFor={`theme-${option.id}`} className={'relative flex h-full min-h-[5.2rem] cursor-pointer flex-col justify-between rounded-lg border p-2.5 transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-highlight ' + (theme === option.id ? 'border-accent bg-bg' : 'border-line hover:border-line')}>
                            <span className="flex items-start justify-between gap-1"><span className="text-[0.82em] font-semibold leading-tight">{option.name}</span>{theme === option.id && <Check size={15} className="shrink-0 text-accent" aria-label="Selected" />}</span>
                            <span className="mt-3 flex gap-1" aria-hidden="true">{option.colors.map((color, index) => <span key={`${color}-${index}`} className="h-3.5 min-w-0 flex-1 rounded-sm border border-line" style={{ backgroundColor: color }} />)}</span>
                            {option.recommended && <span className="mt-1.5 w-fit rounded-full border border-line bg-card px-2 py-0.5 text-[0.65em] font-bold text-fg">Recommended</span>}
                        </label>
                    </div>)}
                </div>
                <div className="mt-3 rounded-lg border border-line bg-bg p-2.5">
                    <p className="mb-2 text-[0.72em] font-semibold text-muted">Colour-blind Safe palette</p>
                    <div className="flex flex-wrap gap-x-2.5 gap-y-1.5">{contrastLegend.map(([label, color]) => <span key={label} title={`${label}: ${color}`} className="inline-flex items-center gap-1 text-[0.65em] text-muted"><span className="h-2.5 w-2.5 rounded-sm border border-line/60" style={{ backgroundColor: color }} />{label}</span>)}</div>
                </div>
            </SectionCard>

            <SectionCard icon={Eye} title="Screen Reader" helper="A visual preference preview only.">
                <SettingSwitch id="screen-reader" label="Screen reader mode" description="Show the selected state for this setting only." checked={screenReader} onChange={setScreenReader} />
            </SectionCard>

            <SectionCard icon={BookOpen} title="Reading Font" helper="Preview a typeface for this page only.">
                <div role="radiogroup" aria-label="Reading font" className="grid gap-2">
                    {fonts.map(option => <div key={option}>
                        <input className="peer sr-only" type="radio" name="settings-font" id={`font-${option}`} checked={readingFont === option} onChange={() => setReadingFont(option)} />
                        <label htmlFor={`font-${option}`} className={'flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-highlight ' + (readingFont === option ? 'border-accent bg-bg' : 'border-line hover:border-line')} style={{ fontFamily: fontStacks[option] }}>
                            <span className="min-w-0"><span className="block text-[0.92em] font-semibold">{option}</span><span className="mt-0.5 block text-[0.78em] text-muted">Jam Verse 012 · Aa 123</span></span>{readingFont === option && <Check size={16} className="shrink-0 text-accent" aria-label="Selected" />}
                        </label>
                    </div>)}
                </div>
                <p className="mt-3 min-h-[2.5em] text-[0.8em] leading-snug text-muted">{fontDescriptions[readingFont]}</p>
            </SectionCard>

            <SectionCard icon={Volume2} title="Sound and Motion" helper="Preview sound and movement preferences.">
                <div className="space-y-4"><SettingSwitch id="sound-cues" label="Sound cues for actions" description="A small cue for button interactions." checked={soundCues} onChange={setSoundCues} /><SettingSwitch id="reduce-motion" label="Reduce motion" description="Keep transitions calm and subtle." checked={reduceMotion} onChange={setReduceMotion} /></div>
                <button type="button" onClick={() => setSoundPreview(true)} className={'mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[0.84em] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight ' + (soundPreview ? 'border-accent bg-accent/10 text-highlight' : 'border-line text-fg hover:border-accent hover:text-fg active:scale-[0.98]')}><Volume2 size={16} aria-hidden="true" />{soundPreview ? 'Preview selected' : 'Test sound'}</button>
            </SectionCard>

            <SectionCard icon={Mic} title="Voice" helper="Visual controls only. No speech is played.">
                <SettingSwitch id="speak-content" label="Speak page content" description="Preview the spoken-content preference." checked={speakContent} onChange={setSpeakContent} />
                <button type="button" onClick={() => setVoicePreview(true)} className={'mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[0.84em] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight ' + (voicePreview ? 'border-accent bg-accent/10 text-highlight' : 'border-line text-fg hover:border-accent hover:text-fg active:scale-[0.98]')}><AudioLines size={16} aria-hidden="true" />{voicePreview ? 'Voice preview selected' : 'Test voice'}</button>
                <div className="mt-4"><div className="mb-2 flex items-center justify-between gap-2"><label htmlFor="speech-speed" className="text-[0.84em] font-semibold">Speech speed</label><output htmlFor="speech-speed" className="text-[0.78em] tabular-nums text-muted">{speechSpeed.toFixed(1)}×</output></div><input id="speech-speed" type="range" min="0.5" max="2" step="0.1" value={speechSpeed} onChange={event => setSpeechSpeed(Number(event.target.value))} className="h-2 w-full cursor-pointer [accent-color:var(--accent)]" /></div>
            </SectionCard>

            <SectionCard icon={UserRound} title="Account" helper="Demo account details for this preview." className="xl:col-span-1">
                <div className="flex items-center gap-3 rounded-lg border border-line bg-bg p-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-fg"><UserRound size={21} aria-hidden="true" /></span><div className="min-w-0"><p className="truncate text-[0.96em] font-bold">Demo Listener</p><p className="truncate text-[0.78em] text-muted">demo.listener@jamverse.app</p></div></div>
                <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[0.84em] font-semibold text-muted transition hover:border-error hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight"><LogOut size={16} aria-hidden="true" />Log out</button>
            </SectionCard>
        </div>
    </main>
}