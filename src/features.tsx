import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Heart, MessageCircle, Send, Upload, CalendarPlus, UsersRound, UserRound } from 'lucide-react'
import { Art } from './ui'
import { addCreatorComment, createCreatorPost, createEvent, createWantedRequest, saveProfile, sendChatMessage, startWantedConversation, toggleCreatorPostLike, useConversations, useCreatorPosts, useEvents, useProfile, useWantedRequests, type CreatorPost, type ProfileSettings, type WantedRequest } from './store'

function CreatorPostCard({ post }: { post: CreatorPost }) {
    const [comment, setComment] = useState('')
    const liked = post.likes.includes('You')
    const submitComment = (event: React.FormEvent) => {
        event.preventDefault()
        const text = comment.trim()
        if (!text) return
        addCreatorComment(post.id, 'You', text)
        setComment('')
    }
    return <article className="overflow-hidden rounded-xl border border-line bg-card">
        <Art hue={post.hue} className="h-36" />
        <div className="p-4">
            <p className="text-xs text-muted">{post.author} · {new Date(post.createdAt).toLocaleDateString()}</p>
            <h2 className="mt-1 text-lg font-bold">{post.title}</h2>
            <p className="mt-1 whitespace-pre-wrap text-sm text-muted">{post.caption}</p>
            <p className="mt-2 truncate text-xs text-muted">Attached: {post.fileName}</p>
            <div className="mt-3 flex items-center gap-4">
                <button type="button" onClick={() => toggleCreatorPostLike(post.id)} aria-pressed={liked} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-highlight"><Heart size={16} fill={liked ? 'currentColor' : 'none'} />{post.likes.length} likes</button>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted"><MessageCircle size={16} />{post.comments.length} comments</span>
            </div>
            {post.comments.length > 0 && <ul className="mt-3 space-y-2 border-t border-line pt-3">{post.comments.map(item => <li key={item.id} className="text-sm"><span className="font-semibold">{item.author}</span><span className="ml-2 text-muted">{item.text}</span></li>)}</ul>}
            <form onSubmit={submitComment} className="mt-3 flex gap-2 border-t border-line pt-3">
                <label className="sr-only" htmlFor={`comment-${post.id}`}>Write a comment</label>
                <input id={`comment-${post.id}`} value={comment} onChange={event => setComment(event.target.value)} placeholder="Write a comment" className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm" />
                <button type="submit" aria-label="Send comment" disabled={!comment.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-gradient text-accent-fg disabled:bg-disabled disabled:text-muted"><Send size={16} /></button>
            </form>
        </div>
    </article>
}

export function CreatorSpace() {
    const posts = useCreatorPosts()
    const profile = useProfile()
    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [fileName, setFileName] = useState('')
    const submitPost = (event: React.FormEvent) => {
        event.preventDefault()
        if (!title.trim() || !caption.trim() || !fileName) return
        createCreatorPost({ title: title.trim(), caption: caption.trim(), fileName, author: profile.displayName })
        setTitle('')
        setCaption('')
        setFileName('')
    }
    return <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold">Creator Space</h1>
        <p className="mt-1 text-muted">Share a performance with the JamVerse community.</p>
        <form onSubmit={submitPost} className="mt-6 grid gap-4 rounded-xl border border-line bg-card p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div><label htmlFor="performance-title" className="mb-1 block text-sm font-semibold">Title</label><input id="performance-title" required maxLength={80} value={title} onChange={event => setTitle(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
                <div><span className="mb-1 block text-sm font-semibold">Performance file</span><label htmlFor="performance-file" className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-sm text-muted hover:border-accent"><Upload size={16} aria-hidden="true" />{fileName || 'Choose an audio or video file'}<input id="performance-file" type="file" accept="audio/*,video/*" required className="sr-only" onChange={event => setFileName(event.target.files?.[0]?.name || '')} /></label>{fileName && <p className="mt-1 text-sm text-highlight" role="status">✓ attached</p>}</div>
            </div>
            <div><label htmlFor="performance-caption" className="mb-1 block text-sm font-semibold">Caption</label><textarea id="performance-caption" required maxLength={500} rows={3} value={caption} onChange={event => setCaption(event.target.value)} className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div><button type="submit" disabled={!title.trim() || !caption.trim() || !fileName} className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 font-bold text-accent-fg disabled:cursor-not-allowed disabled:bg-disabled disabled:text-muted"><Upload size={16} />Share performance</button><p className="mt-2 text-xs text-muted">Demo only. The selected file is not uploaded.</p></div>
        </form>
        <section className="mt-8" aria-labelledby="creator-posts-heading"><h2 id="creator-posts-heading" className="mb-4 text-xl font-bold">Your performances</h2>{posts.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{posts.map(post => <CreatorPostCard key={post.id} post={post} />)}</div> : <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">Your shared performances will appear here.</p>}</section>
    </main>
}

export function CreatorFeedPosts() {
    const posts = useCreatorPosts()
    if (!posts.length) return null
    return <section className="mb-4 space-y-4" aria-label="Creator performances">{posts.map(post => <CreatorPostCard key={post.id} post={post} />)}</section>
}

export function HostJam() {
    const profile = useProfile()
    const [title, setTitle] = useState('')
    const [type, setType] = useState('Acoustic Jam')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [venue, setVenue] = useState('')
    const [area, setArea] = useState('')
    const [about, setAbout] = useState('')
    const submitEvent = (event: React.FormEvent) => {
        event.preventDefault()
        if (!title.trim() || !date || !time || !venue.trim() || !area.trim()) return
        const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
        const created = createEvent({ title: title.trim(), type, by: profile.displayName, date: formattedDate, time, venue: venue.trim(), area: area.trim(), about: about.trim() || 'A new JamVerse-hosted event.' })
        window.location.assign(`/events/${created.id}`)
    }
    return <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold">Host a Jam</h1>
        <p className="mt-1 text-muted">Create a local event for musicians and listeners.</p>
        <form onSubmit={submitEvent} className="mt-6 grid gap-4 rounded-xl border border-line bg-card p-4 sm:grid-cols-2 sm:p-6">
            <div className="sm:col-span-2"><label htmlFor="jam-title" className="mb-1 block text-sm font-semibold">Event name</label><input id="jam-title" required maxLength={100} value={title} onChange={event => setTitle(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div><label htmlFor="jam-type" className="mb-1 block text-sm font-semibold">Jam type</label><select id="jam-type" value={type} onChange={event => setType(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2">{['Acoustic Jam', 'Open Mic', 'Band Night', 'Songwriting Circle', 'Other'].map(item => <option key={item}>{item}</option>)}</select></div>
            <div><label htmlFor="jam-date" className="mb-1 block text-sm font-semibold">Date</label><input id="jam-date" type="date" required value={date} onChange={event => setDate(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div><label htmlFor="jam-time" className="mb-1 block text-sm font-semibold">Start time</label><input id="jam-time" type="time" required value={time} onChange={event => setTime(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div><label htmlFor="jam-venue" className="mb-1 block text-sm font-semibold">Venue</label><input id="jam-venue" required maxLength={120} value={venue} onChange={event => setVenue(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div><label htmlFor="jam-area" className="mb-1 block text-sm font-semibold">City / area</label><input id="jam-area" required maxLength={80} value={area} onChange={event => setArea(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div className="sm:col-span-2"><label htmlFor="jam-about" className="mb-1 block text-sm font-semibold">Description</label><textarea id="jam-about" maxLength={500} rows={4} value={about} onChange={event => setAbout(event.target.value)} className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div className="sm:col-span-2"><button type="submit" disabled={!title.trim() || !date || !time || !venue.trim() || !area.trim()} className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 font-bold text-accent-fg disabled:cursor-not-allowed disabled:bg-disabled disabled:text-muted"><CalendarPlus size={17} />Create event</button></div>
        </form>
    </main>
}

export function HostedEventsDashboard() {
    const hostedEvents = useEvents().filter(event => event.id.startsWith('created-'))
    if (!hostedEvents.length) return null
    return <section className="mx-auto mt-2 max-w-6xl px-4 pb-8" aria-labelledby="hosted-events-heading"><h2 id="hosted-events-heading" className="border-b border-line pb-3 text-lg font-bold">Events you host</h2><ul className="divide-y divide-line">{hostedEvents.map(event => <li key={event.id} className="py-3"><Link to={`/events/${event.id}`} className="flex flex-wrap justify-between gap-2 hover:text-highlight"><span>{event.title}</span><span className="text-sm text-muted">{event.date} · {event.time} · {event.area}</span></Link></li>)}</ul></section>
}

const instruments = ['Vocalist', 'Guitarist', 'Bassist', 'Drummer', 'Keyboardist', 'Producer', 'Other']
export function Communities() {
    const requests = useWantedRequests()
    const profile = useProfile()
    const navigate = useNavigate()
    const [instrumentFilter, setInstrumentFilter] = useState('All instruments')
    const [cityFilter, setCityFilter] = useState('All cities')
    const [showForm, setShowForm] = useState(false)
    const [instrument, setInstrument] = useState(instruments[0])
    const [city, setCity] = useState('')
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const cities = [...new Set(requests.map(request => request.city))].sort()
    const visibleRequests = requests.filter(request => (instrumentFilter === 'All instruments' || request.instrument === instrumentFilter) && (cityFilter === 'All cities' || request.city === cityFilter))
    const submitRequest = (event: React.FormEvent) => {
        event.preventDefault()
        if (!city.trim() || !title.trim() || !details.trim()) return
        createWantedRequest({ instrument, city: city.trim(), title: title.trim(), details: details.trim(), author: profile.displayName })
        setTitle('')
        setDetails('')
        setCity('')
        setShowForm(false)
    }
    const respond = (request: WantedRequest) => navigate(`/community-chat/${startWantedConversation(request)}`)
    return <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="flex items-center gap-2 text-3xl font-bold"><UsersRound className="text-accent" aria-hidden="true" />Musician Wanted</h1><p className="mt-1 text-muted">Find collaborators for your next jam.</p></div><button type="button" onClick={() => setShowForm(open => !open)} aria-expanded={showForm} className="rounded-lg bg-brand-gradient px-4 py-2 font-bold text-accent-fg">{showForm ? 'Close form' : 'Post a request'}</button></div>
        {showForm && <form onSubmit={submitRequest} className="mt-5 grid gap-4 rounded-xl border border-line bg-card p-4 sm:grid-cols-2 sm:p-6">
            <div><label htmlFor="wanted-instrument" className="mb-1 block text-sm font-semibold">Musician needed</label><select id="wanted-instrument" value={instrument} onChange={event => setInstrument(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2">{instruments.map(item => <option key={item}>{item}</option>)}</select></div>
            <div><label htmlFor="wanted-city" className="mb-1 block text-sm font-semibold">City</label><input id="wanted-city" required maxLength={80} value={city} onChange={event => setCity(event.target.value)} placeholder="e.g. Pune" className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div className="sm:col-span-2"><label htmlFor="wanted-title" className="mb-1 block text-sm font-semibold">Project or jam</label><input id="wanted-title" required maxLength={100} value={title} onChange={event => setTitle(event.target.value)} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div className="sm:col-span-2"><label htmlFor="wanted-details" className="mb-1 block text-sm font-semibold">Details</label><textarea id="wanted-details" required maxLength={500} rows={3} value={details} onChange={event => setDetails(event.target.value)} className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div className="sm:col-span-2"><button type="submit" disabled={!city.trim() || !title.trim() || !details.trim()} className="rounded-lg bg-brand-gradient px-4 py-2 font-bold text-accent-fg disabled:bg-disabled disabled:text-muted">Publish request</button></div>
        </form>}
        <div className="mt-6 flex flex-wrap gap-3"><label className="text-sm text-muted">Instrument <select value={instrumentFilter} onChange={event => setInstrumentFilter(event.target.value)} className="ml-2 rounded-lg border border-line bg-card px-3 py-2"><option>All instruments</option>{instruments.map(item => <option key={item}>{item}</option>)}</select></label><label className="text-sm text-muted">City <select value={cityFilter} onChange={event => setCityFilter(event.target.value)} className="ml-2 rounded-lg border border-line bg-card px-3 py-2"><option>All cities</option>{cities.map(item => <option key={item}>{item}</option>)}</select></label></div>
        <section className="mt-5 grid gap-3 md:grid-cols-2" aria-label="Musician requests">{visibleRequests.length ? visibleRequests.map(request => <article key={request.id} className="rounded-xl border border-line bg-card p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase text-highlight">{request.instrument} · {request.city}</p><h2 className="mt-1 text-lg font-bold">{request.title}</h2></div><span className="text-xs text-muted">{request.author}</span></div><p className="mt-2 whitespace-pre-wrap text-sm text-muted">{request.details}</p><button type="button" onClick={() => respond(request)} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold hover:border-accent"><MessageCircle size={16} />Respond</button></article>) : <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted md:col-span-2">No requests match these filters yet.</p>}</section>
    </main>
}

export function CommunityChat() {
    const { conversationId } = useParams()
    const conversations = useConversations()
    const conversation = conversations.find(item => item.id === conversationId)
    const [draft, setDraft] = useState('')
    const submitMessage = (event: React.FormEvent) => {
        event.preventDefault()
        const text = draft.trim()
        if (!conversation || !text) return
        sendChatMessage(conversation.id, text)
        setDraft('')
    }
    if (!conversation) return <main className="mx-auto max-w-3xl px-4 py-8"><p>Conversation not found.</p><Link className="mt-3 inline-block text-highlight" to="/communities">Back to musicians</Link></main>
    return <main className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col px-4 py-6"><Link to="/communities" className="mb-4 text-sm text-muted hover:text-fg">← Musician requests</Link><section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-card"><header className="border-b border-line p-4"><h1 className="text-xl font-bold">{conversation.title}</h1><p className="text-sm text-muted">{conversation.subtitle}</p></header><ol className="flex-1 space-y-3 overflow-y-auto p-4">{conversation.messages.map(message => <li key={message.id} className={'max-w-[85%] rounded-xl px-3 py-2 text-sm ' + (message.author === 'me' ? 'ml-auto bg-accent text-accent-fg' : 'bg-bg text-fg')}><p>{message.text}</p><time className="mt-1 block text-right text-[11px] opacity-70">{message.time}</time></li>)}</ol><form onSubmit={submitMessage} className="flex gap-2 border-t border-line p-3"><label className="sr-only" htmlFor="community-message">Message</label><input id="community-message" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Write a message" className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2" /><button type="submit" aria-label="Send message" disabled={!draft.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-fg disabled:opacity-40"><Send size={17} /></button></form></section></main>
}

const avatarOptions = ['🎤', '🎸', '🥁', '🎹', '🎧', '🎺']
export function ProfilePage() {
    const profile = useProfile()
    const [form, setForm] = useState<ProfileSettings>(profile)
    const [saved, setSaved] = useState(false)
    const submitProfile = (event: React.FormEvent) => {
        event.preventDefault()
        saveProfile({ ...form, displayName: form.displayName.trim(), city: form.city.trim(), bio: form.bio.trim() })
        setSaved(true)
    }
    return <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold"><UserRound className="text-accent" aria-hidden="true" />Profile & settings</h1>
        <p className="mt-1 text-muted">Your JamVerse identity.</p>
        <form onSubmit={submitProfile} className="mt-6 grid gap-5 rounded-xl border border-line bg-card p-4 sm:p-6">
            <div className="flex items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-full border border-line bg-bg text-3xl" aria-hidden="true">{form.avatar}</span><fieldset><legend className="mb-2 text-sm font-semibold">Avatar</legend><div className="flex flex-wrap gap-2">{avatarOptions.map(avatar => <button key={avatar} type="button" onClick={() => { setForm(current => ({ ...current, avatar })); setSaved(false) }} aria-label={`Choose ${avatar} avatar`} aria-pressed={form.avatar === avatar} className={'grid h-10 w-10 place-items-center rounded-lg border text-xl ' + (form.avatar === avatar ? 'border-accent bg-bg' : 'border-line hover:border-line')}>{avatar}</button>)}</div></fieldset></div>
            <div><label htmlFor="profile-name" className="mb-1 block text-sm font-semibold">Display name</label><input id="profile-name" required maxLength={60} value={form.displayName} onChange={event => { setForm(current => ({ ...current, displayName: event.target.value })); setSaved(false) }} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div><label htmlFor="profile-city" className="mb-1 block text-sm font-semibold">City</label><input id="profile-city" maxLength={80} value={form.city} onChange={event => { setForm(current => ({ ...current, city: event.target.value })); setSaved(false) }} className="w-full rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div><label htmlFor="profile-bio" className="mb-1 block text-sm font-semibold">Bio</label><textarea id="profile-bio" maxLength={300} rows={4} value={form.bio} onChange={event => { setForm(current => ({ ...current, bio: event.target.value })); setSaved(false) }} className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2" /></div>
            <div className="flex items-center gap-3"><button type="submit" disabled={!form.displayName.trim()} className="rounded-lg bg-brand-gradient px-4 py-2 font-bold text-accent-fg disabled:bg-disabled disabled:text-muted">Save profile</button>{saved && <p role="status" className="text-sm text-highlight">Profile saved.</p>}</div>
        </form>
    </main>
}
