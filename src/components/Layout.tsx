import { Link, useLocation, Outlet } from 'react-router-dom'
import '@/styles/home.scss'
import '@/styles/footer.scss'

const Layout = () => {
    const location = useLocation()

    const isActive = (path: string) => {
        return location.pathname === path
    }

    return (
        <div className="layout-wrapper">
            {/* 导航栏 */}
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-inner">
                        {/* Logo */}
                        <Link to="/" className="logo-link">
                            <div className="logo-icon">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="logo-svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <span className="logo-text">Molo</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="nav-links">
                            <Link
                                to="/about"
                                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                            >
                                About us
                            </Link>
                            <Link
                                to="/privacy"
                                className={`nav-link ${isActive('/privacy') ? 'active' : ''}`}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/gallery"
                                className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
                            >
                                User Agreeme
                            </Link>
                            <Link
                                to="/pricing"
                                className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
                            >
                                Children Safety
                            </Link>
                            <Link
                                to="/blog"
                                className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                            >
                                Banned Account
                            </Link>
                        </div>

                        {/* Download Button */}
                        <div className="nav-button-wrapper">
                            <button className="download-nav-button">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 主要内容 - 使用 Outlet 渲染子路由 */}
            <main className="main-content">
                <Outlet />
            </main>

            {/* 页脚 */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Logo and Description */}
                        <div className="footer-logo-section">
                            <div className="footer-logo-wrapper">
                                <div className="footer-logo-icon">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="footer-logo-svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <span className="footer-logo-text">Molo</span>
                            </div>
                            <h3 className="footer-title">
                                Download Milo for a smooth video chat
                            </h3>
                        </div>

                        {/* Download Buttons */}
                        <div className="footer-buttons">
                            <button className="footer-button">
                                <img src="/images/app-store.png" alt="" className="footer-button-icon" />
                                <span className="footer-button-text">AppStore</span>
                            </button>
                            <button className="footer-button">
                                <img src="/images/google-play.png" alt="" className="footer-button-icon" />
                                <span className="footer-button-text">Google Play</span>
                            </button>
                        </div>
                    </div>

                    {/* Divider and Copyright */}
                    <div className="footer-divider">
                        <div className="footer-copyright">
                            <p>12th Floor,San Toi Building,134-135,Central And Western,Shang Hai</p>
                            <p>Copyright &copy; 2025 Milo Live Co</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout
