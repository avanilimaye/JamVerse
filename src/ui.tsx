import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Bookmark, Music2, Search, Play, Check, MessageCircle, Bell, CalendarDays, TrendingUp, UsersRound, LayoutDashboard, Clapperboard, Settings as SettingsIcon, Plus, MoreHorizontal, type LucideIcon } from 'lucide-react'
import { flip, useFlags, useToast, useNotifications, useProfile } from './store'
export const Art = ({ hue, className = '' }: { hue: number; className?: string }) => <div aria-hidden className={'relative overflow-hidden ' + className} style={{ background: `linear-gradient(135deg,hsl(${hue} 80% 55%),hsl(${(hue + 50) % 360} 70% 22%))` }}><svg viewBox="0 0 60 20" className="absolute bottom-2 left-2 h-5 opacity-40">{[...Array(14)].map((_, i) => <rect key={i} x={i * 4.3} y={10 - ((i * 7) % 9)} width="2" height={2 + ((i * 7) % 9) * 2} fill="#fff" />)}</svg></div>
export function Flag({ k, on, off, msg, icon }: { k: string; on: string; off: string; msg: string; icon?: 'heart' | 'save' | 'event' | 'reminder' }) {
    const f = useFlags()[k]; const I = icon === 'heart' ? Heart : icon === 'save' ? Bookmark : icon === 'event' ? CalendarDays : icon === 'reminder' ? Bell : Check
    return <button onClick={() => flip(k, msg)} aria-pressed={!!f} className={'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ' + (f ? 'border-accent bg-accent text-accent-fg' : 'border-line hover:border-accent')}><I size={14} fill={f && icon ? 'currentColor' : 'none'} />{f ? on : off}</button>
}
export const Toast = () => { const m = useToast(); return m ? <div role="status" className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-highlight px-5 py-2 text-sm font-medium text-accent-fg shadow-xl md:bottom-8">{m}</div> : null }
type NavItem = [string, string, LucideIcon]
// Main bar: the places people use most. Everything else lives under "More" so the bar never needs a scrollbar.
const primary: NavItem[] = [['/', 'Home', Music2], ['/discover', 'Discover', Search], ['/jam-feed', 'Jam Feed', Play], ['/events', 'Jams', CalendarDays], ['/creator-space', 'Creator', Clapperboard]]
const more: NavItem[] = [['/host-jam', 'Host', Plus], ['/leaderboard', 'Performers', TrendingUp], ['/communities', 'Musicians', UsersRound], ['/saved', 'Saved', Bookmark], ['/dashboard', 'Dashboard', LayoutDashboard]]
// On desktop Settings is the gear at the top right; on phones the gear is hidden, so it sits in the More menu.
const settingsItem: NavItem = ['/settings', 'Settings', SettingsIcon]

function MoreMenu({ variant, items }: { variant: 'desktop' | 'mobile'; items: NavItem[] }) {
    const [open, setOpen] = useState(false); const wrap = useRef<HTMLDivElement>(null); const btn = useRef<HTMLButtonElement>(null); const id = useId(); const { pathname } = useLocation()
    const active = items.some(([to]) => pathname === to || pathname.startsWith(to + '/'))
    useEffect(() => { setOpen(false) }, [pathname])
    useEffect(() => {
        if (!open) return
        const onDown = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false) }
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
        document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onKey)
        return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
    }, [open])
    const desktop = variant === 'desktop'
    return <div ref={wrap} className="relative" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false) }}>
        <button ref={btn} type="button" aria-expanded={open} aria-controls={open ? id : undefined} title="More" onClick={() => setOpen(o => !o)}
            className={(desktop ? 'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ' : 'flex w-full flex-col items-center gap-0.5 rounded-lg px-1 py-1 text-[11px] ') + (active ? 'nav-link-active text-fg' : 'text-muted hover:text-fg')}>
            <MoreHorizontal size={desktop ? 15 : 17} aria-hidden="true" /><span className={desktop ? 'sr-only lg:not-sr-only' : ''}>More</span></button>
        {open && <ul id={id} className={'absolute top-full z-50 mt-2 w-52 rounded-xl border border-line bg-card p-1 shadow-xl ' + (desktop ? 'left-0' : 'right-0')}>{items.map(([to, l, Icon]) => <li key={to}><NavLink to={to} className={({ isActive }) => 'flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-bg hover:text-fg ' + (isActive ? 'bg-bg font-semibold text-fg' : 'text-muted')}><Icon size={15} aria-hidden="true" />{l}</NavLink></li>)}</ul>}
    </div>
}
export const Navbar = () => {
    const unread = useNotifications().filter(n => !n.read).length; const profile = useProfile(); return <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur"><nav aria-label="Main" className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4 lg:gap-5">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight"><img src="/images/logo/jamverse_logo.png" alt="JamVerse logo" className="h-8 w-8 rounded-lg object-contain shadow-sm" />JAMVERSE</Link>
        <div className="hidden min-w-0 flex-1 items-center gap-1 md:flex">{primary.map(([to, l, Icon]) => <NavLink key={to} to={to} end={to === '/'} title={l} className={({ isActive }) => 'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ' + (isActive ? 'nav-link-active text-fg' : 'text-muted hover:text-fg')}><Icon size={15} aria-hidden="true" /><span className="sr-only lg:not-sr-only">{l}</span></NavLink>)}<MoreMenu variant="desktop" items={more} /></div>
        <Link to="/search" aria-label="Search" title="Search" className="ml-auto text-muted hover:text-fg"><Search size={20} /></Link>
        <Link to="/chat" aria-label="Messages" title="Messages" className="text-muted hover:text-fg"><MessageCircle size={20} /></Link>
        <Link to="/notifications" aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'} title="Notifications" className="relative text-muted hover:text-fg"><Bell size={20} />{unread > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-fg">{unread > 9 ? '9+' : unread}</span>}</Link>
        <Link to="/profile" aria-label="Profile" title="Profile" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-card text-lg hover:border-accent">{profile.avatar}</Link>
        <NavLink to="/settings" aria-label="Settings" title="Settings" className={({ isActive }) => 'hidden shrink-0 md:block ' + (isActive ? 'text-highlight' : 'text-muted hover:text-fg')}><SettingsIcon size={20} aria-hidden="true" /></NavLink>
        <Link to="/signup" className="whitespace-nowrap rounded-full bg-brand-gradient px-2 py-1.5 text-xs font-bold text-accent-fg hover:brightness-110 sm:px-4 sm:text-sm">Join Jamverse</Link></nav>
        <div className="grid grid-cols-6 gap-1 border-t border-line px-2 py-1 md:hidden">{primary.map(([to, l, Icon]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'flex flex-col items-center gap-0.5 rounded-lg px-1 py-1 text-[11px] ' + (isActive ? 'nav-link-active text-fg' : 'text-muted')}><Icon size={17} aria-hidden="true" />{l}</NavLink>)}<MoreMenu variant="mobile" items={[...more, settingsItem]} /></div></header>
}
export const PlayBtn = ({ id }: { id: string }) => { const f = useFlags()['play' + id]; return <button aria-label="Play" onClick={() => flip('play' + id, 'Now playing', 'Paused')} className={'grid h-9 w-9 place-items-center rounded-full ' + (f ? 'bg-highlight text-accent-fg' : 'bg-accent text-accent-fg')}><Play size={16} fill="currentColor" /></button> }
