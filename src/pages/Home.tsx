import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/styles/home.scss'
import Highlight1 from '@/assets/images/high-1.png'
import Highlight2 from '@/assets/images/high-2.png'
import Highlight3 from '@/assets/images/high-3.png'
import Highlight4 from '@/assets/images/high-4.png'
import Highlight5 from '@/assets/images/high-5.png'
import Highlight6 from '@/assets/images/high-6.png'
import request from '@/api/request'
// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
    // const [isShowUpTopImage, setIsShowUpTopImage] = useState(false)
    const [rightTopVideoUrl, setRightTopVideoUrl] = useState<string>('')
    const [middleVideoUrl, setMiddleVideoUrl] = useState<string>('')
    const [leftTopText, setLeftTopText] = useState<string>('')
    const [middleVideoNote, setMiddleVideoNote] = useState<string>('')
    const [bottomQuestions, setBottomQuestions] = useState<any[]>([])
    // 用于动画的 refs
    const statsSectionRef = useRef<HTMLElement>(null)
    const videoSectionRef = useRef<HTMLElement>(null)
    const videoContentRef = useRef<HTMLDivElement>(null)
    const highlightListRef = useRef<HTMLDivElement>(null)
    const highlightItemsRef = useRef<(HTMLDivElement | null)[]>([])
    const faqSectionRef = useRef<HTMLDivElement>(null)
    const faqItemsRef = useRef<(HTMLDivElement | null)[]>([])
    const animationsInitialized = useRef(false)

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }
    const getConfig = async () => {
        const data = await request('/MoloSiteCfg.json', 'GET') as { aboutUs: { rightTopVideo: string, middleVideo: string, bottomQuestions: any[],[key:string]:any } }
        setRightTopVideoUrl(data.aboutUs.rightTopVideo)
        setMiddleVideoUrl(data.aboutUs.middleVideo)
        setLeftTopText(data.aboutUs.leftTopText)
        setMiddleVideoNote(data.aboutUs.middleVideoNote)
        setBottomQuestions(data.aboutUs.bottomQuestions)
    }
    // GSAP 滚动动画
    useEffect(() => {
        // 检查 sessionStorage，如果动画已经执行过，直接返回
        const hasAnimated = sessionStorage.getItem('home-animations-executed')
        if (hasAnimated || animationsInitialized.current) {
            // 即使动画已执行，仍然需要获取配置
            getConfig()
            return
        }

        getConfig()
        
        // Stats Section 动画
        if (statsSectionRef.current) {
            gsap.fromTo(statsSectionRef.current, 
                {
                    opacity: 0,
                    y: '2.778vw'
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsSectionRef.current,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }

        // Video Section 动画
        if (videoSectionRef.current) {
            gsap.fromTo(videoSectionRef.current,
                {
                    opacity: 0,
                    y: '2.778vw'
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: videoSectionRef.current,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }

        // Video Content 从右侧滑入
        if (videoContentRef.current) {
            gsap.fromTo(videoContentRef.current,
                {
                    opacity: 0,
                    x: '2.778vw'
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: videoSectionRef.current,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }

        // Highlight Items 依次动画
        highlightItemsRef.current.forEach((item, index) => {
            if (item) {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: '1.389vw',
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            end: 'top 60%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                )
            }
        })

        // FAQ Section 动画
        if (faqSectionRef.current) {
            gsap.fromTo(faqSectionRef.current,
                {
                    opacity: 0,
                    y: '2.778vw'
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: faqSectionRef.current,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }

        // FAQ Items 依次动画
        faqItemsRef.current.forEach((item, index) => {
            if (item) {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: '0.694vw'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: index * 0.05,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%',
                            end: 'top 70%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                )
            }
        })

        // 返回顶部按钮动画（通过状态控制）
        // 这个动画会在 isShowUpTopImage 状态改变时触发

        // 标记动画已初始化（本地和 sessionStorage）
        animationsInitialized.current = true
        sessionStorage.setItem('home-animations-executed', 'true')

        return () => {
            // 清理时重置标记，但保留 ScrollTrigger（因为 toggleActions 设置为 reverse）
            // 只在组件卸载时清理所有 ScrollTrigger
            // 注意：不清理 sessionStorage，让动画在整个会话中只执行一次
        }
    }, [])
    const faqs = [
        {
            question: 'What is Molo?',
            answer: 'Visonix is an AI-powered image generator that transforms text descriptions into high-quality visuals, making it easy for anyone to create stunning images.'
        },
        {
            question: 'How to download Molo on my phone?',
            answer: 'You can download Molo from the App Store or Google Play Store. Simply search for "Molo" and click the download button.'
        },
        {
            question: 'Do l need to login?',
            answer: 'Yes, you need to create an account to use Molo. Registration is quick and easy, and you can start chatting immediately after signing up.'
        },
        {
            question: 'lf we don\'t speak the same language,how can I chat with people from other countries?',
            answer: 'Molo has built-in translation features that help you communicate with people from different countries, even if you don\'t speak the same language.'
        },
        {
            question: 'What are Diamonds?',
            answer: 'Diamonds are virtual currency in Molo that you can use to unlock premium features, send gifts, and enhance your chatting experience.'
        }
    ]
    const highlightList = [
        {
            title: 'Real person video chat',
            description: 'Are you looking for a place where you can speak your mind without hiding anything? Then come to Molo! Here, you‘ ll find various ways to interact and chat however you like.',
            image: Highlight1
        },
        {
            title: 'Free calls to meet people',
            description: `When you log in to the website, you'll receive free calling props and diamonds, allowing you to meet interesting souls from around the world.`,
            image: Highlight2
        },
        {
            title: 'Global Connectivity',
            description: `Connect with users worldwide for efficient 1-on-1 communication.Make friends with people from all over the world`,
            image: Highlight3
        },
        {
            title: 'Smart Matching',
            description: `Precise pairing based on interests and preferences for better interactions.`,
            image: Highlight4
        },
        {
            title: 'Privacy Protection',
            description: `End-to-end encryption ensures your conversations are secure and private.`,
            image: Highlight5
        },
        {
            title: 'High-Quality Calls',
            description: `Smooth and clear video and audio for seamless conversations.`,
            image: Highlight6
        }
    ]
    return (
        <div className="home-wrapper">
            {/* Hero Section */}
            <section className="main-container">
                {/* Background with gradient ellipses */}
                <div className="hero-bg-wrapper">
                    <div className="hero-gradient-ellipse right"></div>
                    <div className="hero-gradient-ellipse left"></div>
                </div>
                {/* Content */}
                <div className="hero-content">
                    <div className="hero-inner">
                        {/* Left Content */}
                        <div className="hero-left">
                        <div dangerouslySetInnerHTML={{ __html: leftTopText }}></div>
                            {/* <h1 className="hero-title">
                                A global{' '}
                                <span className="hero-title-accent">Online Video</span>
                                {' '}<br />platform for content creation,<br />discovery & communication
                            </h1>
                            <p className="hero-description">
                                Molo is a social software that aims to provide users with a perfect experience，more than 30,00000 users communicate on Molo
                            </p> */}
                            <div className="hero-buttons">
                                <button className="download-button">
                                    <img src="/images/app-store.png" alt="" className="download-button-icon" />
                                    <span>AppStore</span>
                                </button>
                                <button className="download-button">
                                    <img src="/images/google-play.png" alt="" className="download-button-icon" />
                                    <span>Google Play</span>
                                </button>
                            </div>
                        </div>

                        {/* Right - Phone Image */}
                        <div className="phone-container">
                            {/* Phone Frame */}
                            <img
                                src="/images/phone-frame.png"
                                alt="Phone"
                                className="phone-frame"
                            />
                            {/* Phone Screen - positioned inside the frame */}
                            <div className="phone-screen-wrapper">
                                {/* <img
                                    src="/images/phone-screen.png"
                                    alt="Phone Screen"
                                    className="phone-screen"
                                /> */}
                                <video src={rightTopVideoUrl} autoPlay muted loop className='phone-screen'></video>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="stats-section" ref={statsSectionRef}>
                    <div className='section-container'>
                        <div className='stats-content'>
                            <div className="stats-subtitle">
                                Join Molo Today
                            </div>
                            <div className="stats-title">
                                Advantage of<br />
                                Platform
                            </div>
                        </div>
                        <div className="stats-grid">
                            <div className="stats-item">
                                <div className="stats-number">
                                    200+
                                </div>
                                <div className="stats-text">
                                    Our users come from all<br /> over the world.
                                </div>
                            </div>
                            <div className="stats-item">
                                <div className="stats-number">
                                    3000K+
                                </div>
                                <div className="stats-text">
                                    Registered users
                                </div>
                            </div>
                            <div className="stats-item">
                                <div className="stats-number">
                                    10k+
                                </div>
                                <div className="stats-text">
                                    Daily Online users
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            {/* Random video */}
            <section className='random-video-container' ref={videoSectionRef}>
                <video
                    src={middleVideoUrl}
                    playsInline
                    autoPlay
                    muted
                    loop
                    className='video-player'
                ></video>
                <div className='video-section' ref={videoContentRef} dangerouslySetInnerHTML={{ __html: middleVideoNote }}>
                    {/* <div className='video-title-1'>
                        Random video chat ,1-on-1 pribate interaction,<br /> real video socializing
                    </div>
                    <div className='video-description-1'>
                        Molo is a social software that aims to provide users with a perfect experience，more than 30,00000 users communicate on Molo
                    </div> */}
                </div>
            </section>
            <section className='common-section'>
                <div className='common-section-content'>
                    <div className='common-section-title'>
                        The highlights of Molo
                    </div>
                    <div className='common-section-highlight-list' ref={highlightListRef}>
                        {highlightList.map((highlight, index) => (
                            <div 
                                className='common-section-highlight-item' 
                                key={index}
                                ref={el => highlightItemsRef.current[index] = el}
                            >
                                
                                <div className="common-section-highlight-item-header">
                                    <img src={highlight.image} alt={highlight.title} className='common-section-highlight-item-header-image' />
                                    <span>{'0' + (index+1)}</span>
                                </div>
                                <div className="common-section-highlight-item-content">
                                    <div className="common-section-highlight-item-content-title">
                                        {highlight.title}
                                    </div>
                                    <div className="common-section-highlight-item-content-description">
                                        {highlight.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 下面是faq的一些东西 */}
                <div className='common-section-content' ref={faqSectionRef}>
                    <div className='common-section-title'>
                        Frequently Asked Questions
                    </div>
                    <div className="faq-list">
                        {bottomQuestions.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item"
                                ref={el => faqItemsRef.current[index] = el}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="faq-button"
                                >
                                    <h3 className="faq-question" >
                                        <div dangerouslySetInnerHTML={{ __html: faq.content }}></div>
                                    </h3>
                                    <span className="faq-toggle">
                                        {openFaqIndex === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaqIndex === index && (
                                    <div className="faq-answer">
                                        <p className="faq-answer-text">
                                            <div dangerouslySetInnerHTML={{ __html: faq.note }}></div>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* {
                isShowUpTopImage && (
                    <img src={UpTopImage} alt="" className='up-top-image' onClick={() =>handleUpTopImage()} />
                )
            } */}
        </div>
    )
}

export default Home
