import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import UserAgressme from './pages/UserAgressme'
import BindAccount from './pages/BindAccount'
function App() {
    return (
        <Router>
            <Routes>
                {/* 需要 Layout 的路由 */}
                <Route element={<Layout />}>
                    <Route index element={<Navigate to="/about" replace />} />
                    <Route path="/about" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/user-agreement" element={<UserAgressme />} />
                    <Route path="/bind-account" element={<BindAccount />} />
                </Route>

                {/* 不需要 Layout 的路由 */}
                <Route path="/login" element={<Login />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App

