import { Link, useLocation, Outlet } from 'react-router-dom'
import { useState } from 'react'
import '@/styles/home.scss'
import '@/styles/footer.scss'
import mobileMenu from '@/assets/images/mobile-menu.png'

const Layout = () => {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (path: string) => {
        return location.pathname === path
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
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
                                to="/user-agreement"
                                className={`nav-link ${isActive('/user-agreement') ? 'active' : ''}`}
                            >
                                User Agreeme
                            </Link>
                            <Link
                                to="/child-safety"
                                className={`nav-link ${isActive('/child-safety') ? 'active' : ''}`}
                            >
                                Children Safety
                            </Link>
                            <Link
                                to="/bind-account"
                                className={`nav-link ${isActive('/bind-account') ? 'active' : ''}`}
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
                        <div className='mobile-nav-button' onClick={toggleMobileMenu}>
                            <img src={mobileMenu} alt="Menu" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* 移动端菜单 */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-menu-header">
                            <Link to="/" className="mobile-menu-logo" onClick={closeMobileMenu}>
                                <div className="logo-icon">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="logo-svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <span className="logo-text">Molo</span>
                            </Link>
                            <button className="mobile-menu-close" onClick={closeMobileMenu}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="mobile-menu-links">
                            <Link
                                to="/about"
                                className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                About us
                            </Link>
                            <Link
                                to="/privacy"
                                className={`mobile-nav-link ${isActive('/privacy') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/user-agreement"
                                className={`mobile-nav-link ${isActive('/user-agreement') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                User Agreeme
                            </Link>
                            <Link
                                to="/child-safety"
                                className={`mobile-nav-link ${isActive('/child-safety') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Children Safety
                            </Link>
                            <Link
                                to="/bind-account"
                                className={`mobile-nav-link ${isActive('/bind-account') ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Banned Account
                            </Link>
                        </div>
                        <div className="mobile-menu-button">
                            <button className="mobile-download-button" onClick={closeMobileMenu}>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
