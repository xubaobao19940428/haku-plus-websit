import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import UserAgressme from './pages/UserAgressme'
import BindAccount from './pages/BindAccount'
import DeleteAccount from './pages/DeleteAccount'
import ChildSafety from './pages/ChildSafety'
function App() {
    return (
        <Router>
            <Routes>
                {/* 需要 Layout 的路由 */}
                <Route element={<Layout />}>
                    <Route index element={<Navigate to="/about" replace />} />
                    <Route path="/about" element={<Home />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/user-agreement" element={<UserAgressme />} />
                    <Route path="/bind-account" element={<BindAccount />} />
                    <Route path="/child-safety" element={<ChildSafety />} />
                </Route>

                {/* 不需要 Layout 的路由 */}
                <Route path="/deleteAccount" element={<DeleteAccount />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App

