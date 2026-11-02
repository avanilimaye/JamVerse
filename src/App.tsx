import { Route, Routes, Navigate } from 'react-router-dom'
import { Navbar, Toast } from './ui'
import { Chat, Dashboard, Discover, EventDetail, Events, Home, JamFeed, Leaderboard, Notifications, Saved, Soon } from './pages'
import { CommunityChat, Communities, CreatorSpace, HostedEventsDashboard, HostJam, ProfilePage } from './features'
import { SettingsPage } from './settings'
import { RegisterPage, LoginPage } from './auth'
import { useAuth } from './store'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const auth = useAuth()
    if (!auth?.isLoggedIn) {
        return <Navigate to="/register" replace />
    }
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default function App() {
    const auth = useAuth()
    const isLoggedIn = !!auth?.isLoggedIn

    return (
        <>
            <Routes>
                {/* When visiting website for first time or not logged in, show Register Page (no navbar) */}
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <>
                                <Navbar />
                                <Home />
                            </>
                        ) : (
                            <Navigate to="/register" replace />
                        )
                    }
                />

                {/* Public Auth Routes: navbar is hidden */}
                <Route
                    path="/register"
                    element={isLoggedIn ? <Navigate to="/" replace /> : <RegisterPage />}
                />
                <Route
                    path="/signup"
                    element={isLoggedIn ? <Navigate to="/" replace /> : <RegisterPage />}
                />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
                />
                <Route
                    path="/signin"
                    element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
                />

                {/* Protected Routes: Only accessible when logged in, with system Navbar */}
                <Route path="/discover" element={<ProtectedLayout><Discover /></ProtectedLayout>} />
                <Route path="/jam-feed" element={<ProtectedLayout><JamFeed /></ProtectedLayout>} />
                <Route path="/creator-space" element={<ProtectedLayout><CreatorSpace /></ProtectedLayout>} />
                <Route path="/host-jam" element={<ProtectedLayout><HostJam /></ProtectedLayout>} />
                <Route path="/events" element={<ProtectedLayout><Events /></ProtectedLayout>} />
                <Route path="/events/:id" element={<ProtectedLayout><EventDetail /></ProtectedLayout>} />
                <Route path="/leaderboard" element={<ProtectedLayout><Leaderboard /></ProtectedLayout>} />
                <Route path="/saved" element={<ProtectedLayout><Saved /></ProtectedLayout>} />
                <Route path="/chat" element={<ProtectedLayout><Chat /></ProtectedLayout>} />
                <Route path="/community-chat/:conversationId" element={<ProtectedLayout><CommunityChat /></ProtectedLayout>} />
                <Route path="/communities" element={<ProtectedLayout><Communities /></ProtectedLayout>} />
                <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
                <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />
                <Route path="/notifications" element={<ProtectedLayout><Notifications /></ProtectedLayout>} />
                <Route path="/dashboard" element={<ProtectedLayout><Dashboard /><HostedEventsDashboard /></ProtectedLayout>} />

                {/* Catch-all */}
                <Route
                    path="*"
                    element={
                        isLoggedIn ? (
                            <>
                                <Navbar />
                                <Soon />
                            </>
                        ) : (
                            <Navigate to="/register" replace />
                        )
                    }
                />
            </Routes>
            <Toast />
        </>
    )
}
