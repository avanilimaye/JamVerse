import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Headphones,
    Mic,
    Guitar,
    GraduationCap,
    Sparkles,
    CalendarDays,
    Coffee,
    ArrowRight,
    Check,
    CheckCircle2,
    ShieldCheck,
    MapPin,
    ArrowLeft,
    Sparkle,
    Music2,
    LogIn,
    UserPlus,
    AlertCircle,
    type LucideIcon
} from 'lucide-react'
import { useAuth, registerUser, loginUser, type UserTypeOption } from './store'

export interface UserTypeDefinition {
    id: UserTypeOption
    title: UserTypeOption
    icon: LucideIcon
    description: string
    avatar: string
    example: string
    badge: string
}

export const USER_TYPE_DEFINITIONS: UserTypeDefinition[] = [
    {
        id: 'Music Enthusiast / Music Lover',
        title: 'Music Enthusiast / Music Lover',
        icon: Headphones,
        description: 'Here to discover local music, attend acoustic jams, and support underground artists.',
        avatar: '🎧',
        example: 'Attends open mics, listens to indie jams',
        badge: 'Listener',
    },
    {
        id: 'Singer / Vocalist',
        title: 'Singer / Vocalist',
        icon: Mic,
        description: 'Lead vocals, backing harmonies, classical singers, and open-mic acoustic performers.',
        avatar: '🎤',
        example: 'Looking for guitarists/bands to jam with',
        badge: 'Performer',
    },
    {
        id: 'Instrumentalist',
        title: 'Instrumentalist',
        icon: Guitar,
        description: 'Guitarists, drummers, bassists, keyboardists, flutists, and percussionists.',
        avatar: '🎸',
        example: 'Looking for jam circles & gigs',
        badge: 'Musician',
    },
    {
        id: 'College Student',
        title: 'College Student',
        icon: GraduationCap,
        description: 'Campus band members, battle of the bands participants, and college music club members.',
        avatar: '🎓',
        example: 'Pune campus jam sessions & band fests',
        badge: 'Student Band',
    },
    {
        id: 'Independent Artist',
        title: 'Independent Artist',
        icon: Sparkles,
        description: 'Original track makers, lyricists, indie composers, and bedroom music producers.',
        avatar: '🎹',
        example: 'Releasing original songs & building an audience',
        badge: 'Creator',
    },
    {
        id: 'Event Organizer',
        title: 'Event Organizer',
        icon: CalendarDays,
        description: 'Hosts and curators of live gigs, open mic nights, acoustic circles, and band battles.',
        avatar: '🎪',
        example: 'Hosting events across Pune & booking artists',
        badge: 'Host',
    },
    {
        id: 'Café / Venue Owner',
        title: 'Café / Venue Owner',
        icon: Coffee,
        description: 'Cafés, rooftop bars, bistros, and performance spaces looking to host live music sessions.',
        avatar: '☕',
        example: 'Looking for artists for weekend acoustic sets',
        badge: 'Venue Stage',
    },
]

/**
 * Visual Hero Panel displaying jamSession.jpg with community metrics & badges
 */
function JamSessionVisualPanel({
    mode,
    selectedType
}: {
    mode: 'register' | 'login'
    selectedType?: UserTypeOption
}) {
    const isRegister = mode === 'register'

    return (
        <aside
            aria-label="JamVerse community highlight"
            className="relative hidden w-full overflow-hidden rounded-3xl border border-line bg-card lg:flex lg:flex-col lg:justify-between shadow-2xl"
        >
            {/* Background image: JamVerse\dist\images\background\jamSession.jpg */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/background/jamSession.jpg"
                    alt="Musicians gathering for a live jam session in Pune"
                    className="h-full w-full object-cover object-center brightness-[0.78] contrast-[1.05] transition-transform duration-700 hover:scale-105"
                    loading="eager"
                    decoding="async"
                />
                {/* Subtle gradient overlays to ensure text contrast across themes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-black/30" />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            </div>

            {/* Top Bar with Badges */}
            <div className="relative z-10 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                        </span>
                        LIVE JAM SCENE · PUNE
                    </span>
                    <span className="rounded-full border border-line bg-bg/80 px-3 py-1 text-xs font-medium text-highlight backdrop-blur-md">
                        {isRegister ? '⚡ 500+ Jams Hosted' : '🎵 Pune Indie Circle'}
                    </span>
                </div>

                <div className="mt-6 max-w-md">
                    <h2 className="text-2xl font-bold leading-tight text-white drop-shadow-md sm:text-3xl">
                        {isRegister
                            ? 'Where Live Music Finds Its People.'
                            : 'Welcome Back to the Jam Circle.'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-200 drop-shadow">
                        {isRegister
                            ? 'Join thousands of singers, guitarists, campus bands, and venue owners jamming together.'
                            : 'Pick up right where you left off. Check upcoming jams, unread messages, and new talent.'}
                    </p>
                </div>
            </div>

            {/* Bottom Section: Highlights & Quote */}
            <div className="relative z-10 space-y-4 p-6 sm:p-8">
                {/* Active Session Card */}
                <div className="rounded-2xl border border-white/15 bg-black/60 p-4 text-white backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs text-highlight">
                        <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                            <Sparkle size={13} /> Active Pune Session
                        </span>
                        <span>Tonight · 6:30 PM</span>
                    </div>
                    <p className="mt-1 text-base font-bold">Acoustic Sunset Jam</p>
                    <p className="text-xs text-gray-300">Café Raag, FC Road · 86 musicians attending</p>
                </div>

                {/* Testimonial / Community Stat */}
                <div className="rounded-2xl border border-line bg-card/85 p-4 backdrop-blur-md">
                    <p className="text-xs italic leading-relaxed text-fg">
                        “JamVerse made finding acoustic partners in Kothrud so natural.
                        We hosted our first open-mic set within a week!”
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-fg">
                                AJ
                            </span>
                            <span className="font-semibold text-fg">Aarav Joshi</span>
                            <span className="text-muted">· Guitarist</span>
                        </div>
                        {selectedType && (
                            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-highlight">
                                Selected: {selectedType.split('/')[0].trim()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl border border-line bg-bg/85 py-2 backdrop-blur-sm">
                        <p className="text-lg font-bold text-highlight">12k+</p>
                        <p className="text-[11px] text-muted">Artists & Fans</p>
                    </div>
                    <div className="rounded-xl border border-line bg-bg/85 py-2 backdrop-blur-sm">
                        <p className="text-lg font-bold text-highlight">500+</p>
                        <p className="text-[11px] text-muted">Sessions</p>
                    </div>
                    <div className="rounded-xl border border-line bg-bg/85 py-2 backdrop-blur-sm">
                        <p className="text-lg font-bold text-highlight">45+</p>
                        <p className="text-[11px] text-muted">Music Cafés</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

/**
 * Register Page Component
 */

/**
 * Dedicated JamVerse Auth Header: Logo + Title + Direct Link between Register & Login
 */
function AuthHeader({ mode }: { mode: 'register' | 'login' }) {
    const isRegister = mode === 'register'

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link
                    to={isRegister ? '/register' : '/login'}
                    className="flex items-center gap-3 transition-opacity hover:opacity-90"
                >
                    <img
                        src="/images/logo/jamverse_logo.png"
                        alt="JamVerse logo"
                        className="h-9 w-9 rounded-xl object-contain shadow-sm ring-1 ring-line"
                    />
                    <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none text-fg">
                            JAMVERSE
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-highlight">
                            Where Music Finds Its People
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-2 sm:gap-3">
                    {isRegister ? (
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline text-xs sm:text-sm text-muted">Already a user?</span>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-1.5 text-xs font-bold text-fg shadow-sm transition hover:border-accent hover:text-accent active:scale-95 sm:text-sm"
                            >
                                <LogIn size={14} aria-hidden="true" />
                                <span>Log In</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline text-xs sm:text-sm text-muted">New to JamVerse?</span>
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-bold text-accent-fg shadow-sm transition hover:brightness-110 active:scale-95 sm:text-sm"
                            >
                                <UserPlus size={14} aria-hidden="true" />
                                <span>Register</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export function RegisterPage() {
    const navigate = useNavigate()
    const auth = useAuth()

    // Form state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [city, setCity] = useState('Pune')

    // REQUIRED FIELD: "Which best describes you?" (user type)
    const [userType, setUserType] = useState<UserTypeOption>('Music Enthusiast / Music Lover')

    // Optional detail based on user type
    const [roleDetail, setRoleDetail] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Password strength calculation
    const getPasswordStrength = () => {
        if (!password) return { score: 0, label: '', color: 'bg-disabled' }
        let score = 0
        if (password.length >= 6) score += 1
        if (password.length >= 8) score += 1
        if (/[A-Z]/.test(password)) score += 1
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1

        if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-error' }
        if (score === 2) return { score: 2, label: 'Fair', color: 'bg-warning' }
        if (score === 3) return { score: 3, label: 'Good', color: 'bg-info' }
        return { score: 4, label: 'Strong', color: 'bg-success' }
    }

    const strength = getPasswordStrength()

    // Pre-fill demo helper to test specific personas quickly
    const applyDemoPersona = (type: UserTypeOption) => {
        setUserType(type)
        if (type === 'Singer / Vocalist') {
            setName('Meera Kulkarni')
            setEmail('meera.vocalist@jamverse.app')
            setRoleDetail('Acoustic, Semi-Classical & Indie Marathi')
        } else if (type === 'Instrumentalist') {
            setName('Aarav Joshi')
            setEmail('aarav.guitar@jamverse.app')
            setRoleDetail('Acoustic Guitar, Rhythm & Cajón')
        } else if (type === 'College Student') {
            setName('Rohan Deshpande')
            setEmail('rohan.student@coep.ac.in')
            setRoleDetail('COEP Music Club · Bassist')
        } else if (type === 'Café / Venue Owner') {
            setName('Vikram Patil')
            setEmail('contact@caferaag.com')
            setRoleDetail('Café Raag, FC Road (Indoor & Outdoor Stage)')
        } else if (type === 'Event Organizer') {
            setName('Pune Open Mic Community')
            setEmail('hosts@puneopenmic.org')
            setRoleDetail('Weekly acoustic open mics & band showcases')
        } else if (type === 'Independent Artist') {
            setName('Static Sutra')
            setEmail('crew@staticsutra.in')
            setRoleDetail('Original Indie Rock & Synth Loops')
        } else {
            setName('Pooja Shah')
            setEmail('pooja.music@example.com')
            setRoleDetail('Indie acoustic explorer')
        }
        setPassword('JamVerse@2026')
        setConfirmPassword('JamVerse@2026')
        setErrorMsg('')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMsg('')

        if (!name.trim()) {
            setErrorMsg('Please enter your full name or stage handle.')
            return
        }

        if (!email.trim() || !email.includes('@')) {
            setErrorMsg('Please enter a valid email address.')
            return
        }

        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters long.')
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match. Please re-enter.')
            return
        }

        if (!agreedToTerms) {
            setErrorMsg('Please agree to the JamVerse community guidelines.')
            return
        }

        setIsSubmitting(true)

        try {
            const roleDetailKey =
                userType === 'Instrumentalist'
                    ? { instrument: roleDetail }
                    : userType === 'Singer / Vocalist'
                    ? { genre: roleDetail }
                    : userType === 'College Student'
                    ? { college: roleDetail }
                    : userType === 'Café / Venue Owner'
                    ? { venueName: roleDetail }
                    : userType === 'Event Organizer'
                    ? { genre: roleDetail }
                    : { genre: roleDetail }

            registerUser({
                name: name.trim(),
                email: email.trim(),
                userType,
                city: city.trim() || 'Pune',
                ...roleDetailKey,
            })

            // Successful registration
            setTimeout(() => {
                navigate('/')
            }, 300)
        } catch (err) {
            setErrorMsg('Something went wrong. Please try again.')
            setIsSubmitting(false)
        }
    }

    const currentDefinition = USER_TYPE_DEFINITIONS.find(d => d.id === userType)

    return (
        <div className="min-h-screen bg-bg text-fg flex flex-col">
            <AuthHeader mode="register" />
            <main className="relative flex-1 overflow-hidden py-6 sm:py-10">
            {/* Subtle background ambient glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{ background: 'var(--hero-glow)' }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                    {/* Form Column */}
                    <div className="lg:col-span-7">
                        <section className="rounded-3xl border border-line bg-card p-6 shadow-xl sm:p-8">
                            <header className="mb-6 border-b border-line pb-6">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-highlight">
                                    <Sparkles size={14} /> Create Your Profile
                                </div>
                                <h1 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                                    Join the JamVerse Community
                                </h1>
                                <p className="mt-2 text-sm text-muted">
                                    Whether you sing, play guitar, attend jams, or run a music café in Pune —
                                    there is a stage here for you.
                                </p>

                                {/* Persona Quick-Fill Chips for Evaluators / Test Users */}
                                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                                    <span className="text-[11px] font-semibold text-muted">Quick test fill:</span>
                                    <button
                                        type="button"
                                        onClick={() => applyDemoPersona('Singer / Vocalist')}
                                        className="rounded-full border border-line bg-bg px-2.5 py-1 text-[11px] font-medium text-fg hover:border-accent"
                                    >
                                        🎤 Singer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyDemoPersona('Instrumentalist')}
                                        className="rounded-full border border-line bg-bg px-2.5 py-1 text-[11px] font-medium text-fg hover:border-accent"
                                    >
                                        🎸 Instrumentalist
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyDemoPersona('College Student')}
                                        className="rounded-full border border-line bg-bg px-2.5 py-1 text-[11px] font-medium text-fg hover:border-accent"
                                    >
                                        🎓 Student
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyDemoPersona('Café / Venue Owner')}
                                        className="rounded-full border border-line bg-bg px-2.5 py-1 text-[11px] font-medium text-fg hover:border-accent"
                                    >
                                        ☕ Venue
                                    </button>
                                </div>
                            </header>

                            {/* Error Alert */}
                            {errorMsg && (
                                <div
                                    role="alert"
                                    className="mb-6 flex items-start gap-2.5 rounded-xl border border-error/50 bg-error/10 p-3.5 text-sm text-error"
                                >
                                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name and Email Row */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="reg-name"
                                            className="block text-sm font-semibold text-fg"
                                        >
                                            Full Name or Stage Name <span className="text-accent">*</span>
                                        </label>
                                        <div className="relative mt-1.5">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                                                <User size={16} />
                                            </span>
                                            <input
                                                id="reg-name"
                                                type="text"
                                                required
                                                maxLength={60}
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="e.g. Aarav Joshi / Baner Strings"
                                                className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-3 text-sm text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="reg-email"
                                            className="block text-sm font-semibold text-fg"
                                        >
                                            Email Address <span className="text-accent">*</span>
                                        </label>
                                        <div className="relative mt-1.5">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                                                <Mail size={16} />
                                            </span>
                                            <input
                                                id="reg-email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="you@jamverse.app"
                                                className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-3 text-sm text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* =========================================================================
                                    SPECIFIC FIELD REQUIRED BY USER:
                                    "Which best describes you?" (user type)
                                   ========================================================================= */}
                                <div className="rounded-2xl border border-line bg-bg/50 p-4 sm:p-5">
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
                                        <label
                                            htmlFor="user-type-selector"
                                            className="block text-sm font-bold text-fg sm:text-base"
                                        >
                                            Which best describes you?{' '}
                                            <span className="text-xs font-semibold uppercase tracking-wider text-highlight">
                                                (user type)
                                            </span>
                                        </label>
                                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent">
                                            Required field
                                        </span>
                                    </div>
                                    <p className="mb-4 text-xs text-muted">
                                        Select your role in the music ecosystem to personalize your jams, feed, and gig opportunities.
                                    </p>

                                    {/* Accessible semantic select dropdown */}
                                    <div className="mb-4">
                                        <select
                                            id="user-type-selector"
                                            aria-label="Which best describes you? (user type)"
                                            value={userType}
                                            onChange={e => setUserType(e.target.value as UserTypeOption)}
                                            className="w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-sm font-semibold text-fg shadow-sm transition focus:border-accent focus:outline-none"
                                        >
                                            {USER_TYPE_DEFINITIONS.map(opt => (
                                                <option key={opt.id} value={opt.id}>
                                                    {opt.avatar} {opt.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Visual Interactive Cards for the 7 options */}
                                    <div
                                        role="radiogroup"
                                        aria-label="Which best describes you? user type options"
                                        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                                    >
                                        {USER_TYPE_DEFINITIONS.map(option => {
                                            const isSelected = userType === option.id
                                            const Icon = option.icon

                                            return (
                                                <div
                                                    key={option.id}
                                                    onClick={() => setUserType(option.id)}
                                                    role="radio"
                                                    aria-checked={isSelected}
                                                    tabIndex={0}
                                                    onKeyDown={e => {
                                                        if (e.key === ' ' || e.key === 'Enter') {
                                                            e.preventDefault()
                                                            setUserType(option.id)
                                                        }
                                                    }}
                                                    className={`group relative flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all ${
                                                        isSelected
                                                            ? 'border-accent bg-card shadow-md ring-1 ring-accent'
                                                            : 'border-line bg-card/60 hover:border-line hover:bg-card'
                                                    }`}
                                                >
                                                    <span
                                                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-lg transition-colors ${
                                                            isSelected
                                                                ? 'border-accent bg-accent text-accent-fg'
                                                                : 'border-line bg-bg text-fg group-hover:border-accent'
                                                        }`}
                                                    >
                                                        <Icon size={17} />
                                                    </span>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center justify-between gap-1">
                                                            <p className="truncate text-xs font-bold leading-tight text-fg sm:text-sm">
                                                                {option.title}
                                                            </p>
                                                            {isSelected && (
                                                                <CheckCircle2
                                                                    size={15}
                                                                    className="shrink-0 text-accent"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </div>
                                                        <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-muted">
                                                            {option.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Role-Specific Detail Field */}
                                    <div className="mt-4 rounded-xl border border-line bg-card p-3.5">
                                        <label
                                            htmlFor="role-detail-input"
                                            className="block text-xs font-bold uppercase tracking-wider text-highlight"
                                        >
                                            {userType === 'Instrumentalist' && 'What instruments do you play?'}
                                            {userType === 'Singer / Vocalist' && 'Vocal Style / Preferred Genres'}
                                            {userType === 'College Student' && 'Your College & Campus Band (if any)'}
                                            {userType === 'Independent Artist' && 'Primary Genre / Original Project Name'}
                                            {userType === 'Event Organizer' && 'Event or Community / Series Name'}
                                            {userType === 'Café / Venue Owner' && 'Venue / Café Name & Location'}
                                            {userType === 'Music Enthusiast / Music Lover' && 'Favorite Genres or Jam Vibes'}
                                        </label>
                                        <input
                                            id="role-detail-input"
                                            type="text"
                                            value={roleDetail}
                                            onChange={e => setRoleDetail(e.target.value)}
                                            placeholder={
                                                userType === 'Instrumentalist'
                                                    ? 'e.g. Acoustic Guitar, Cajón, Flute'
                                                    : userType === 'Singer / Vocalist'
                                                    ? 'e.g. Hindustani Classical, Indie Pop, Rock'
                                                    : userType === 'College Student'
                                                    ? 'e.g. COEP Pune, Fergusson College Band'
                                                    : userType === 'Café / Venue Owner'
                                                    ? 'e.g. Café Raag, FC Road (40 seats)'
                                                    : userType === 'Event Organizer'
                                                    ? 'e.g. Pune Open Mic & Unplugged Nights'
                                                    : userType === 'Independent Artist'
                                                    ? 'e.g. Original Indie Marathi / Hindi Fusion'
                                                    : 'e.g. Acoustic evenings, Sufi, Indie Rock'
                                            }
                                            className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2 text-xs text-fg placeholder:text-muted/60 focus:border-accent focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* City Field */}
                                <div>
                                    <label htmlFor="reg-city" className="block text-sm font-semibold text-fg">
                                        City / Primary Location
                                    </label>
                                    <div className="relative mt-1.5">
                                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                                            <MapPin size={16} />
                                        </span>
                                        <input
                                            id="reg-city"
                                            type="text"
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
                                            placeholder="e.g. Pune, Mumbai, Bangalore"
                                            className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-3 text-sm text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Password and Confirm Password Row */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor="reg-password"
                                                className="block text-sm font-semibold text-fg"
                                            >
                                                Password <span className="text-accent">*</span>
                                            </label>
                                            {password && (
                                                <span className="text-xs font-medium text-muted">
                                                    {strength.label}
                                                </span>
                                            )}
                                        </div>
                                        <div className="relative mt-1.5">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                                                <Lock size={16} />
                                            </span>
                                            <input
                                                id="reg-password"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                minLength={6}
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                placeholder="At least 6 characters"
                                                className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-10 text-sm text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(p => !p)}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-fg"
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>

                                        {/* Password Strength Indicator Bar */}
                                        {password && (
                                            <div className="mt-2 flex gap-1">
                                                {[1, 2, 3, 4].map(level => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded-full transition-all ${
                                                            level <= strength.score ? strength.color : 'bg-line'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="reg-confirm-password"
                                            className="block text-sm font-semibold text-fg"
                                        >
                                            Confirm Password <span className="text-accent">*</span>
                                        </label>
                                        <div className="relative mt-1.5">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                                                <ShieldCheck size={16} />
                                            </span>
                                            <input
                                                id="reg-confirm-password"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                placeholder="Repeat your password"
                                                className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-3 text-sm text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none"
                                            />
                                        </div>
                                        {confirmPassword && password !== confirmPassword && (
                                            <p className="mt-1 text-xs text-error">Passwords do not match</p>
                                        )}
                                        {confirmPassword && password === confirmPassword && (
                                            <p className="mt-1 flex items-center gap-1 text-xs text-success">
                                                <Check size={12} /> Passwords match
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Community Terms Checkbox */}
                                <div className="flex items-start gap-3">
                                    <input
                                        id="terms-check"
                                        type="checkbox"
                                        checked={agreedToTerms}
                                        onChange={e => setAgreedToTerms(e.target.checked)}
                                        className="mt-1 h-4 w-4 rounded border-line text-accent [accent-color:var(--accent)]"
                                    />
                                    <label htmlFor="terms-check" className="text-xs leading-relaxed text-muted">
                                        I agree to the{' '}
                                        <span className="font-semibold text-fg">JamVerse Community Code</span>{' '}
                                        — respecting live jam etiquette, artist copyright, and safe open-mic venues in Pune.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient py-3.5 px-6 font-bold text-accent-fg shadow-lg shadow-accent/20 transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <span>Creating your account...</span>
                                        ) : (
                                            <>
                                                <span>Join JamVerse as {userType.split('/')[0].trim()}</span>
                                                <ArrowRight size={17} />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Social Auth Divider */}
                                <div className="relative my-6 text-center">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-line" />
                                    </div>
                                    <span className="relative bg-card px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                                        Or sign up with
                                    </span>
                                </div>

                                {/* Music & Social Connect Buttons */}
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            applyDemoPersona('Singer / Vocalist')
                                            registerUser({
                                                name: 'Meera (Spotify Artist)',
                                                email: 'meera.spotify@jamverse.app',
                                                userType: 'Singer / Vocalist',
                                                city: 'Pune',
                                                genre: 'Indie & Classical',
                                            })
                                            navigate('/')
                                        }}
                                        className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-bg py-2.5 px-3 text-xs font-semibold text-fg transition hover:border-accent hover:bg-card"
                                        title="Sign up with Spotify"
                                    >
                                        <Music2 size={15} className="text-[#1DB954]" />
                                        <span>Spotify</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            applyDemoPersona('Instrumentalist')
                                            registerUser({
                                                name: 'Aarav (Google)',
                                                email: 'aarav.google@jamverse.app',
                                                userType: 'Instrumentalist',
                                                city: 'Pune',
                                                instrument: 'Acoustic Guitar',
                                            })
                                            navigate('/')
                                        }}
                                        className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-bg py-2.5 px-3 text-xs font-semibold text-fg transition hover:border-accent hover:bg-card"
                                        title="Sign up with Google"
                                    >
                                        <span className="font-bold text-accent">G</span>
                                        <span>Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            applyDemoPersona('Café / Venue Owner')
                                            registerUser({
                                                name: 'Café Raag Host',
                                                email: 'caferaag@jamverse.app',
                                                userType: 'Café / Venue Owner',
                                                city: 'Pune',
                                                venueName: 'Café Raag',
                                            })
                                            navigate('/')
                                        }}
                                        className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-bg py-2.5 px-3 text-xs font-semibold text-fg transition hover:border-accent hover:bg-card"
                                        title="Sign up with Apple"
                                    >
                                        <span className="font-bold"></span>
                                        <span>Apple</span>
                                    </button>
                                </div>
                            </form>

                            {/* Mobile Jam Session Preview Card */}
                            <div className="mt-8 rounded-2xl border border-line bg-bg p-4 lg:hidden">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/images/background/jamSession.jpg"
                                        alt="JamVerse Jam Session"
                                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-highlight">Pune Jam Scene</p>
                                        <p className="text-xs text-fg">Over 500+ local sessions hosted</p>
                                        <p className="text-[11px] text-muted">Connect with bands near FC Road & Baner</p>
                                    </div>
                                </div>
                            </div>

                            <footer className="mt-6 border-t border-line pt-4 text-center text-xs text-muted">
                                By joining JamVerse, you acknowledge our music collaboration terms.
                            </footer>
                        </section>
                    </div>

                    {/* Right Column: Visual Jam Session Hero using jamSession.jpg */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <JamSessionVisualPanel mode="register" selectedType={userType} />
                    </div>
                </div>
            </div>
        </main>
        </div>
    )
}

/**
 * Login Page Component
 */
export function LoginPage() {
    const navigate = useNavigate()
    const auth = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Quick demo login fill
    const fillDemoUser = (name: string, emailStr: string, role: UserTypeOption, avatar: string) => {
        setEmail(emailStr)
        setPassword('JamVerse@2026')
        setErrorMsg('')
        loginUser(emailStr, 'JamVerse@2026')
        setTimeout(() => navigate('/'), 300)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMsg('')

        if (!email.trim() || !email.includes('@')) {
            setErrorMsg('Please enter a valid email address.')
            return
        }

        if (!password) {
            setErrorMsg('Please enter your password.')
            return
        }

        setIsSubmitting(true)
        try {
            loginUser(email, password)
            setTimeout(() => {
                navigate('/')
            }, 300)
        } catch (err) {
            setErrorMsg('Failed to sign in. Please verify your credentials.')
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-bg text-fg flex flex-col">
            <AuthHeader mode="login" />
            <main className="relative flex-1 overflow-hidden py-6 sm:py-12">
            {/* Ambient Background glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{ background: 'var(--hero-glow)' }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                    {/* Visual Panel Side (Left on Login) */}
                    <div className="lg:col-span-5">
                        <JamSessionVisualPanel mode="login" />

                        {/* Mobile visible banner */}
                        <div className="relative overflow-hidden rounded-2xl border border-line lg:hidden">
                            <img
                                src="/images/background/jamSession.jpg"
                                alt="Jam session in Pune"
                                className="h-44 w-full object-cover brightness-75"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--bg)] p-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-highlight">
                                    JamVerse Community
                                </p>
                                <p className="text-lg font-bold text-fg">
                                    Tune back in to Pune's live acoustic circles
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Form Side */}
                    <div className="lg:col-span-7">
                        <section className="rounded-3xl border border-line bg-card p-6 shadow-xl sm:p-10">
                            <header className="mb-6 border-b border-line pb-6">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-highlight">
                                    <LogIn size={15} /> Welcome Back
                                </div>
                                <h1 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                                    Sign In to JamVerse
                                </h1>
                                <p className="mt-2 text-sm text-muted">
                                    Catch up with your jam partners, upcoming gigs, and newly saved music.
                                </p>
                            </header>

                            {/* Error Alert */}
                            {errorMsg && (
                                <div
                                    role="alert"
                                    className="mb-6 flex items-start gap-2.5 rounded-xl border border-error/50 bg-error/10 p-3.5 text-sm text-error"
                                >
                                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            {/* Quick 1-Click Demo Logins for instant evaluation */}
                            <div className="mb-6 rounded-2xl border border-line bg-bg/60 p-4">
                                <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-highlight">
                                    ⚡ 1-Click Demo Logins (Instant Test)
                                </p>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fillDemoUser(
                                                'Meera Kulkarni',
                                                'meera.vocalist@jamverse.app',
                                                'Singer / Vocalist',
                                                '🎤'
                                            )
                                        }
                                        className="flex flex-col items-center rounded-xl border border-line bg-card p-2 text-center transition hover:border-accent hover:bg-bg"
                                    >
                                        <span className="text-xl">🎤</span>
                                        <span className="mt-1 text-xs font-bold text-fg">Meera</span>
                                        <span className="text-[10px] text-muted">Vocalist</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            fillDemoUser(
                                                'Aarav Joshi',
                                                'aarav.guitar@jamverse.app',
                                                'Instrumentalist',
                                                '🎸'
                                            )
                                        }
                                        className="flex flex-col items-center rounded-xl border border-line bg-card p-2 text-center transition hover:border-accent hover:bg-bg"
                                    >
                                        <span className="text-xl">🎸</span>
                                        <span className="mt-1 text-xs font-bold text-fg">Aarav</span>
                                        <span className="text-[10px] text-muted">Guitarist</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            fillDemoUser(
                                                'Café Raag',
                                                'caferaag.pune@jamverse.app',
                                                'Café / Venue Owner',
                                                '☕'
                                            )
                                        }
                                        className="flex flex-col items-center rounded-xl border border-line bg-card p-2 text-center transition hover:border-accent hover:bg-bg"
                                    >
                                        <span className="text-xl">☕</span>
                                        <span className="mt-1 text-xs font-bold text-fg">Café Raag</span>
                                        <span className="text-[10px] text-muted">Venue Host</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            fillDemoUser(
                                                'Music Fan',
                                                'listener@jamverse.app',
                                                'Music Enthusiast / Music Lover',
                                                '🎧'
                                            )
                                        }
                                        className="flex flex-col items-center rounded-xl border border-line bg-card p-2 text-center transition hover:border-accent hover:bg-bg"
                                    >
                                        <span className="text-xl">🎧</span>
                                        <span className="mt-1 text-xs font-bold text-fg">Listener</span>
                                        <span className="text-[10px] text-muted">Enthusiast</span>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="login-email" className="block text-sm font-semibold text-fg">
                                        Email Address
                                    </label>
                                    <div className="relative mt-1.5">
                                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                                            <Mail size={16} />
                                        </span>
                                        <input
                                            id="login-email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="you@jamverse.app"
                                            className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-3 text-sm text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="login-password" className="block text-sm font-semibold text-fg">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => alert('Password reset link sent to demo email.')}
                                            className="text-xs font-medium text-highlight hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative mt-1.5">
                                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                                            <Lock size={16} />
                                        </span>
                                        <input
                                            id="login-password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full rounded-xl border border-line bg-bg py-2.5 pl-10 pr-10 text-sm text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-fg"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={e => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 rounded border-line text-accent [accent-color:var(--accent)]"
                                        />
                                        <label htmlFor="remember-me" className="text-xs font-medium text-muted">
                                            Keep me signed in
                                        </label>
                                    </div>
                                    <span className="text-xs text-muted">Pune local session</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient py-3.5 px-6 font-bold text-accent-fg shadow-lg shadow-accent/20 transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <span>Signing in...</span>
                                    ) : (
                                        <>
                                            <span>Sign In to JamVerse</span>
                                            <ArrowRight size={17} />
                                        </>
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="relative my-6 text-center">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-line" />
                                    </div>
                                    <span className="relative bg-card px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                                        Or sign in with
                                    </span>
                                </div>

                                {/* Social Login Buttons */}
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            loginUser('spotify.artist@jamverse.app')
                                            navigate('/')
                                        }}
                                        className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-bg py-2.5 px-3 text-xs font-semibold text-fg transition hover:border-accent hover:bg-card"
                                    >
                                        <Music2 size={15} className="text-[#1DB954]" />
                                        <span>Spotify</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            loginUser('google.user@jamverse.app')
                                            navigate('/')
                                        }}
                                        className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-bg py-2.5 px-3 text-xs font-semibold text-fg transition hover:border-accent hover:bg-card"
                                    >
                                        <span className="font-bold text-accent">G</span>
                                        <span>Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            loginUser('apple.user@jamverse.app')
                                            navigate('/')
                                        }}
                                        className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-bg py-2.5 px-3 text-xs font-semibold text-fg transition hover:border-accent hover:bg-card"
                                    >
                                        <span className="font-bold"></span>
                                        <span>Apple</span>
                                    </button>
                                </div>
                            </form>

                            <footer className="mt-8 border-t border-line pt-4 text-center text-xs text-muted">
                                New to JamVerse?{' '}
                                <Link to="/register" className="font-bold text-highlight hover:underline">
                                    Create a free account →
                                </Link>
                            </footer>
                        </section>
                    </div>
                </div>
            </div>
        </main>
        </div>
    )
}
