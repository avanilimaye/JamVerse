import { useSyncExternalStore } from 'react'
import { events as seededEvents, type Ev } from './data'
const K = 'jamverse'
let s: Record<string, boolean> = JSON.parse(localStorage.getItem(K) || '{}')
let msg = ''
const subs = new Set<() => void>()
const emit = () => subs.forEach(f => f())
const sub = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }
export const flip = (k: string, on: string, off = '') => { s = { ...s, [k]: !s[k] }; localStorage.setItem(K, JSON.stringify(s)); say(s[k] ? on : off || on) }
export const say = (m: string) => { msg = m; emit(); setTimeout(() => { if (msg === m) { msg = ''; emit() } }, 2200) }
export const useFlags = () => useSyncExternalStore(sub, () => s)
export const useToast = () => useSyncExternalStore(sub, () => msg)
export type ThemeId = 'neon' | 'cb' | 'insta'
const themeKey = 'jamverse-theme'
const themeIds: ThemeId[] = ['neon', 'cb', 'insta']
const themeNames: Record<ThemeId, string> = { neon: 'Dark Neon', cb: 'Colour-blind Safe', insta: 'White' }
const savedTheme = localStorage.getItem(themeKey)
let activeTheme: ThemeId = themeIds.includes(savedTheme as ThemeId) ? savedTheme as ThemeId : 'neon'
document.documentElement.dataset.theme = activeTheme
export const useTheme = () => useSyncExternalStore(sub, () => activeTheme)
export const selectTheme = (nextTheme: ThemeId) => {
    if (activeTheme === nextTheme) return
    activeTheme = nextTheme
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem(themeKey, nextTheme)
    emit()
    say(`Theme changed to ${themeNames[nextTheme]}`)
}
export type ChatMessage = { id: string; author: 'me' | 'them'; text: string; time: string }
export type Conversation = { id: string; title: string; kind: 'artist' | 'event'; subtitle: string; avatar: number; messages: ChatMessage[] }
const chatKey = 'jamverse-chat'
const initialChats: Conversation[] = [
    { id: 'aarav', title: 'Aarav Joshi', kind: 'artist', subtitle: 'Guitarist · Pune', avatar: 200, messages: [{ id: 'a1', author: 'them', text: 'Hey! Are you coming to the acoustic jam tonight?', time: '4:12 PM' }, { id: 'a2', author: 'me', text: 'Wouldn’t miss it. I’ll bring my guitar.', time: '4:16 PM' }] },
    { id: 'meera', title: 'Meera Kulkarni', kind: 'artist', subtitle: 'Vocalist · Pune', avatar: 20, messages: [{ id: 'm1', author: 'them', text: 'Loved your set at the open mic!', time: 'Yesterday' }] },
    { id: 'event', title: 'Acoustic Sunset Jam', kind: 'event', subtitle: 'Event group · 8 members', avatar: 42, messages: [{ id: 'e1', author: 'them', text: 'Welcome to the jam group! Set starts at 6:30.', time: 'Yesterday' }, { id: 'e2', author: 'them', text: 'I’ll save a spot near the stage for anyone bringing an instrument.', time: 'Yesterday' }] },
]
let conversations: Conversation[] = JSON.parse(localStorage.getItem(chatKey) || 'null') || initialChats
export const useConversations = () => useSyncExternalStore(sub, () => conversations)
export const sendChatMessage = (conversationId: string, text: string) => {
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    conversations = conversations.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, { id: `${Date.now()}`, author: 'me', text, time }] } : c)
    localStorage.setItem(chatKey, JSON.stringify(conversations)); emit()
}
export type NotificationItem = { id: string; type: 'follower' | 'reminder' | 'accepted' | 'community'; title: string; detail: string; time: string; read: boolean }
const notificationKey = 'jamverse-notifications'
const initialNotifications: NotificationItem[] = [
    { id: 'n1', type: 'follower', title: 'New follower', detail: 'Meera Kulkarni started following you.', time: '12 minutes ago', read: false },
    { id: 'n2', type: 'reminder', title: 'Event reminder', detail: 'Acoustic Sunset Jam starts today at 6:30 PM.', time: '1 hour ago', read: false },
    { id: 'n3', type: 'accepted', title: 'Request accepted', detail: 'Your request to join Pune Open Mic Community was accepted.', time: 'Yesterday', read: true },
    { id: 'n4', type: 'community', title: 'New community post', detail: 'Aarav Joshi posted in Pune Acoustic Circle.', time: 'Yesterday', read: true },
]
let notifications: NotificationItem[] = JSON.parse(localStorage.getItem(notificationKey) || 'null') || initialNotifications
export const useNotifications = () => useSyncExternalStore(sub, () => notifications)
export const markNotificationRead = (id: string) => {
    notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n)
    localStorage.setItem(notificationKey, JSON.stringify(notifications)); emit()
}
export const markAllNotificationsRead = () => {
    notifications = notifications.map(n => ({ ...n, read: true }))
    localStorage.setItem(notificationKey, JSON.stringify(notifications)); emit()
}
export type CreatorComment = { id: string; author: string; text: string; time: string }
export type CreatorPost = { id: string; title: string; caption: string; fileName: string; author: string; createdAt: string; hue: number; likes: string[]; comments: CreatorComment[] }
const creatorPostKey = 'jamverse-creator-posts'
let creatorPosts: CreatorPost[] = JSON.parse(localStorage.getItem(creatorPostKey) || '[]')
const saveCreatorPosts = () => { localStorage.setItem(creatorPostKey, JSON.stringify(creatorPosts)); emit() }
export const useCreatorPosts = () => useSyncExternalStore(sub, () => creatorPosts)
export const createCreatorPost = (post: Pick<CreatorPost, 'title' | 'caption' | 'fileName' | 'author'>) => {
    creatorPosts = [{ ...post, id: `post-${Date.now()}`, createdAt: new Date().toISOString(), hue: Math.floor(Math.random() * 360), likes: [], comments: [] }, ...creatorPosts]
    saveCreatorPosts()
}
export const toggleCreatorPostLike = (id: string) => {
    creatorPosts = creatorPosts.map(post => post.id === id ? { ...post, likes: post.likes.includes('You') ? post.likes.filter(like => like !== 'You') : [...post.likes, 'You'] } : post)
    saveCreatorPosts()
}
export const addCreatorComment = (id: string, author: string, text: string) => {
    creatorPosts = creatorPosts.map(post => post.id === id ? { ...post, comments: [...post.comments, { id: `comment-${Date.now()}`, author, text, time: new Date().toISOString() }] } : post)
    saveCreatorPosts()
}
export type WantedRequest = { id: string; instrument: string; city: string; title: string; details: string; author: string; createdAt: string }
const wantedRequestKey = 'jamverse-wanted-requests'
let wantedRequests: WantedRequest[] = JSON.parse(localStorage.getItem(wantedRequestKey) || '[]')
export const useWantedRequests = () => useSyncExternalStore(sub, () => wantedRequests)
export const createWantedRequest = (request: Omit<WantedRequest, 'id' | 'createdAt'>) => {
    wantedRequests = [{ ...request, id: `request-${Date.now()}`, createdAt: new Date().toISOString() }, ...wantedRequests]
    localStorage.setItem(wantedRequestKey, JSON.stringify(wantedRequests)); emit()
}
export const startWantedConversation = (request: WantedRequest) => {
    const id = `wanted-${request.id}`
    if (!conversations.some(conversation => conversation.id === id)) {
        conversations = [{ id, title: request.author, kind: 'artist', subtitle: `${request.instrument} · ${request.city}`, avatar: 190, messages: [{ id: `${Date.now()}`, author: 'them', text: `I'm looking for a ${request.instrument} for ${request.title}. ${request.details}`, time: 'Just now' }] }, ...conversations]
        localStorage.setItem(chatKey, JSON.stringify(conversations)); emit()
    }
    return id
}
export type ProfileSettings = { displayName: string; city: string; bio: string; avatar: string }
const profileKey = 'jamverse-profile'
const defaultProfile: ProfileSettings = { displayName: 'Your profile', city: 'Pune', bio: '', avatar: '🎤' }
let profile: ProfileSettings = { ...defaultProfile, ...JSON.parse(localStorage.getItem(profileKey) || 'null') }
export const useProfile = () => useSyncExternalStore(sub, () => profile)
export const saveProfile = (nextProfile: ProfileSettings) => {
    profile = nextProfile
    localStorage.setItem(profileKey, JSON.stringify(profile)); emit()
}
const createdEventsKey = 'jamverse-created-events'
const restoredEvents = JSON.parse(localStorage.getItem(createdEventsKey) || '[]') as Ev[]
seededEvents.push(...restoredEvents)
let allEvents: Ev[] = seededEvents
export const useEvents = () => useSyncExternalStore(sub, () => allEvents)
export const createEvent = (event: Pick<Ev, 'title' | 'type' | 'by' | 'date' | 'time' | 'venue' | 'area' | 'about'>) => {
    const created: Ev = { ...event, id: `created-${Date.now()}`, km: 0, going: 0, hue: Math.floor(Math.random() * 360), x: 18 + Math.floor(Math.random() * 64), y: 18 + Math.floor(Math.random() * 64) }
    seededEvents.push(created)
    allEvents = [...seededEvents]
    localStorage.setItem(createdEventsKey, JSON.stringify(seededEvents.filter(item => item.id.startsWith('created-'))))
    emit()
    return created
}
