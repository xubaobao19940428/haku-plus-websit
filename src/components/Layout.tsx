import { Link, useLocation, Outlet } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback } from 'react'
import '@/styles/home.scss'
import '@/styles/footer.scss'
import mobileMenu from '@/assets/images/mobile-menu.png'
import UpTopImage from '@/assets/images/up-top.png'
import logo from '@/assets/images/logo.png'
const Layout = () => {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isShowUpTopImage, setIsShowUpTopImage] = useState(false)
    const navLinksRef = useRef<HTMLDivElement>(null)
    const underlineRef = useRef<HTMLDivElement>(null)
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

    const isActive = (path: string) => {
        return location.pathname === path
    }
    const handleUpTopImage = () => {
        console.log('🔼 handleUpTopImage called!')
        document.body.scrollTo({ top: 0, behavior: 'smooth' })
        // 也可以尝试使用 scrollIntoView
        // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        // document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // 移动下划线到指定链接位置
    const moveUnderlineToLink = useCallback((linkIndex: number) => {
        if (linkIndex !== -1 && linkRefs.current[linkIndex] && underlineRef.current && navLinksRef.current) {
            const targetLink = linkRefs.current[linkIndex]
            const navLinks = navLinksRef.current
            const underline = underlineRef.current

            const navLinksRect = navLinks.getBoundingClientRect()
            const targetLinkRect = targetLink.getBoundingClientRect()

            const translateX = targetLinkRect.left - navLinksRect.left
            const width = targetLinkRect.width

            underline.style.width = `${width}px`
            underline.style.transform = `translateX(${translateX}px)`
        }
    }, [])

    // 更新下划线位置到当前激活的链接
    const updateUnderline = useCallback(() => {
        const paths = ['/about', '/privacy', '/user-agreement', '/child-safety', '/bind-account']
        const activeIndex = paths.findIndex(path => location.pathname === path)
        moveUnderlineToLink(activeIndex)
    }, [location.pathname, moveUnderlineToLink])

    // 处理链接 hover
    const handleLinkHover = useCallback((linkIndex: number) => {
        moveUnderlineToLink(linkIndex)
    }, [moveUnderlineToLink])

    // 处理链接离开 hover
    const handleLinkLeave = useCallback(() => {
        updateUnderline()
    }, [updateUnderline])

    useEffect(() => {
        updateUnderline()

        // 监听窗口大小改变
        window.addEventListener('resize', updateUnderline)
        return () => {
            window.removeEventListener('resize', updateUnderline)
        }
    }, [updateUnderline])
    useEffect(() => {
        let ticking = false
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // 获取滚动位置，兼容不同浏览器
                    const scrollPosition = window.pageYOffset ||
                        document.documentElement.scrollTop ||
                        document.body.scrollTop ||
                        0
                    
                    // 更新返回顶部按钮显示状态
                    if (scrollPosition > document.documentElement.clientHeight) {
                        setIsShowUpTopImage(true)
                    } else {
                        setIsShowUpTopImage(false)
                    }
                    
                    ticking = false
                })
                ticking = true
            }
        }
        
        // 方式4: 监听 document.body scroll
        document.body.addEventListener('scroll', handleScroll, false)

        // 立即执行一次，检查初始滚动位置
        handleScroll()
        

        return () => {
            console.log('Cleaning up scroll listeners')
            document.body.removeEventListener('scroll', handleScroll, false)
        }
    }, [])
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
                            <img src={logo} alt="Molo" className="logo-icon" />
                            {/* <div className="logo-icon">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="logo-svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div> */}
                            <span className="logo-text">Molo</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="nav-links" ref={navLinksRef}>
                            <Link
                                ref={(el) => (linkRefs.current[0] = el)}
                                to="/about"
                                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                                onMouseEnter={() => handleLinkHover(0)}
                                onMouseLeave={handleLinkLeave}
                            >
                                About us
                            </Link>
                            <Link
                                ref={(el) => (linkRefs.current[1] = el)}
                                to="/privacy"
                                className={`nav-link ${isActive('/privacy') ? 'active' : ''}`}
                                onMouseEnter={() => handleLinkHover(1)}
                                onMouseLeave={handleLinkLeave}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                ref={(el) => (linkRefs.current[2] = el)}
                                to="/user-agreement"
                                className={`nav-link ${isActive('/user-agreement') ? 'active' : ''}`}
                                onMouseEnter={() => handleLinkHover(2)}
                                onMouseLeave={handleLinkLeave}
                            >
                                User Agreeme
                            </Link>
                            <Link
                                ref={(el) => (linkRefs.current[3] = el)}
                                to="/child-safety"
                                className={`nav-link ${isActive('/child-safety') ? 'active' : ''}`}
                                onMouseEnter={() => handleLinkHover(3)}
                                onMouseLeave={handleLinkLeave}
                            >
                                Children Safety
                            </Link>
                            <Link
                                ref={(el) => (linkRefs.current[4] = el)}
                                to="/bind-account"
                                className={`nav-link ${isActive('/bind-account') ? 'active' : ''}`}
                                onMouseEnter={() => handleLinkHover(4)}
                                onMouseLeave={handleLinkLeave}
                            >
                                Banned Account
                            </Link>
                            <div className="nav-underline" ref={underlineRef}></div>
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

                        {/* 移动端菜单 */}
                        {isMobileMenuOpen && (
                            <>
                                <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
                                <div className="mobile-menu">
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
                                </div>
                            </>
                        )}
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
                                {/* <div className="footer-logo-icon"> */}
                                    <img src={logo} alt="Molo" className="footer-logo-icon" />
                                {/* </div> */}
                                <span className="footer-logo-text">Molo</span>
                            </div>
                            <h3 className="footer-title">
                                Download Molo for a smooth video chat
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
                            <p>Copyright &copy; 2025 Molo Live Co</p>
                        </div>
                    </div>
                </div>
            </footer>
            {
                isShowUpTopImage && (
                    <img 
                        src={UpTopImage} 
                        alt="Back to top" 
                        className='up-top-image' 
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleUpTopImage()
                        }}
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                    />
                )
            }
        </div>
    )
}

export default Layout
