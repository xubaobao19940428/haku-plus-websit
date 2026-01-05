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

    const [topNavs, setTopNavs] = useState<any[]>([])
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
        const data = await request('/MoloSiteCfg.json', 'GET') as { aboutUs: { rightTopVideo: string, middleVideo: string, bottomQuestions: any[], [key: string]: any } }
        setRightTopVideoUrl(data.aboutUs.rightTopVideo)
        setMiddleVideoUrl(data.aboutUs.middleVideo)
        setLeftTopText(data.aboutUs.leftTopText)
        setMiddleVideoNote(data.aboutUs.middleVideoNote)
        setBottomQuestions(data.aboutUs.bottomQuestions)
        setTopNavs(data.aboutUs.topNavs)
    }
    const handleDownAndorid = () => {
        window.open('https://play.google.com/store/apps/details?id=com.kikapika.molo', '_blank')
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
                                <img src="/images/google-play.webp" alt="" className="download-button" onClick={handleDownAndorid}/>
                                <svg xmlns="http://www.w3.org/2000/svg" className='download-button' width="136" height="40" fill="none"><path fill="#21232F" d="M9.094 39.998c-.348 0-.687-.004-1.032-.011a15.76 15.76 0 0 1-2.132-.17 7.144 7.144 0 0 1-1.89-.574 6.174 6.174 0 0 1-1.595-1.063 5.642 5.642 0 0 1-1.784-3.193 11.926 11.926 0 0 1-.19-1.96c-.007-.221-.016-.956-.016-.956V7.915s.01-.723.016-.935c.009-.656.072-1.31.19-1.958a5.674 5.674 0 0 1 1.778-3.2 6.357 6.357 0 0 1 1.6-1.069A7.075 7.075 0 0 1 5.925.184a15.637 15.637 0 0 1 2.14-.171L9.095 0h117.259l1.042.013a15.4 15.4 0 0 1 2.121.17 7.213 7.213 0 0 1 1.906.573c1.184.56 2.148 1.444 2.756 2.53a5.67 5.67 0 0 1 .61 1.725c.119.652.185 1.312.199 1.973.003.297.003.615.003.931.009.392.009.766.009 1.142v21.885c0 .38 0 .75-.009 1.124 0 .34 0 .652-.004.972-.014.65-.079 1.298-.195 1.939a5.666 5.666 0 0 1-.617 1.746 5.768 5.768 0 0 1-1.158 1.449 6.205 6.205 0 0 1-1.597 1.07 7.12 7.12 0 0 1-1.903.574c-.706.106-1.419.163-2.133.17-.334.008-.684.012-1.024.012l-1.237.002-116.029-.002Z"></path><path fill="#fff" d="M30.28 20.313a5.198 5.198 0 0 1 .67-2.487 5.16 5.16 0 0 1 1.78-1.854 5.275 5.275 0 0 0-1.81-1.622 5.241 5.241 0 0 0-2.34-.635c-1.745-.184-3.437 1.051-4.327 1.051-.907 0-2.276-1.032-3.751-1.002a5.502 5.502 0 0 0-2.699.81 5.544 5.544 0 0 0-1.951 2.043c-2.01 3.501-.511 8.647 1.415 11.477.963 1.386 2.09 2.934 3.563 2.88 1.442-.06 1.98-.925 3.721-.925 1.725 0 2.23.924 3.733.89 1.548-.026 2.523-1.393 3.452-2.792a11.49 11.49 0 0 0 1.579-3.233 4.978 4.978 0 0 1-2.206-1.841 5.022 5.022 0 0 1-.829-2.76ZM27.44 11.854a5.115 5.115 0 0 0 1.159-3.65 5.144 5.144 0 0 0-3.335 1.735 4.856 4.856 0 0 0-1.189 3.515 4.24 4.24 0 0 0 3.365-1.6ZM48.507 27.465h-4.92l-1.182 3.51H40.32l4.66-12.986h2.166l4.66 12.986h-2.12l-1.18-3.51Zm-4.41-1.62h3.9l-1.923-5.696h-.054l-1.924 5.697ZM61.874 26.241c0 2.943-1.566 4.833-3.928 4.833a3.176 3.176 0 0 1-1.718-.4 3.2 3.2 0 0 1-1.244-1.257h-.044v4.69h-1.932v-12.6h1.87v1.575h.035c.303-.526.741-.959 1.269-1.253a3.324 3.324 0 0 1 1.728-.42c2.389 0 3.964 1.899 3.964 4.832Zm-1.986 0c0-1.916-.985-3.176-2.487-3.176-1.477 0-2.47 1.286-2.47 3.176 0 1.908.993 3.186 2.47 3.186 1.502 0 2.487-1.251 2.487-3.186ZM72.233 26.241c0 2.943-1.566 4.833-3.928 4.833a3.176 3.176 0 0 1-1.718-.4 3.2 3.2 0 0 1-1.244-1.257H65.3v4.69h-1.932v-12.6h1.87v1.575h.035c.303-.526.741-.959 1.269-1.253a3.324 3.324 0 0 1 1.728-.42c2.39 0 3.964 1.899 3.964 4.832Zm-1.986 0c0-1.916-.985-3.176-2.487-3.176-1.477 0-2.47 1.286-2.47 3.176 0 1.908.993 3.186 2.47 3.186 1.502 0 2.487-1.251 2.487-3.186ZM79.08 27.357c.143 1.287 1.386 2.133 3.086 2.133 1.628 0 2.8-.846 2.8-2.007 0-1.008-.707-1.611-2.38-2.025l-1.673-.405c-2.37-.576-3.47-1.691-3.47-3.5 0-2.241 1.94-3.78 4.697-3.78 2.727 0 4.597 1.539 4.66 3.78h-1.95c-.117-1.297-1.182-2.079-2.738-2.079s-2.621.791-2.621 1.943c0 .918.68 1.459 2.344 1.872l1.422.351c2.649.63 3.75 1.7 3.75 3.6 0 2.43-1.924 3.951-4.984 3.951-2.863 0-4.796-1.486-4.921-3.834h1.978ZM91.176 19.267v2.24h1.79v1.54h-1.79v5.219c0 .81.358 1.188 1.145 1.188.213-.003.425-.018.636-.045v1.53a5.277 5.277 0 0 1-1.073.09c-1.906 0-2.65-.72-2.65-2.556v-5.427h-1.368v-1.539h1.369v-2.24h1.941ZM94.003 26.241c0-2.978 1.744-4.85 4.463-4.85 2.729 0 4.465 1.872 4.465 4.85 0 2.988-1.726 4.851-4.465 4.851-2.737 0-4.463-1.863-4.463-4.85Zm6.96 0c0-2.043-.931-3.249-2.496-3.249-1.566 0-2.496 1.215-2.496 3.25 0 2.051.93 3.248 2.495 3.248 1.566 0 2.497-1.197 2.497-3.248ZM104.524 21.508h1.843v1.61h.045a2.252 2.252 0 0 1 2.264-1.71c.222 0 .444.024.662.073v1.818a2.692 2.692 0 0 0-.869-.118 1.937 1.937 0 0 0-1.504.623 1.954 1.954 0 0 0-.509 1.555v5.616h-1.932v-9.468ZM118.245 28.194c-.26 1.719-1.924 2.898-4.053 2.898-2.738 0-4.437-1.845-4.437-4.806 0-2.97 1.708-4.895 4.356-4.895 2.604 0 4.242 1.8 4.242 4.67v.666h-6.648v.117a2.483 2.483 0 0 0 .664 1.916 2.457 2.457 0 0 0 1.868.766c.456.043.915-.064 1.306-.304.392-.24.696-.6.868-1.028h1.834Zm-6.531-2.826h4.706a2.292 2.292 0 0 0-.633-1.708 2.25 2.25 0 0 0-1.676-.695 2.377 2.377 0 0 0-2.216 1.481 2.41 2.41 0 0 0-.181.922ZM43.854 8.215a2.73 2.73 0 0 1 2.189.855 2.764 2.764 0 0 1 .73 2.245c0 1.994-1.071 3.14-2.92 3.14h-2.24v-6.24h2.24Zm-1.277 5.357h1.17a1.94 1.94 0 0 0 1.553-.632 1.965 1.965 0 0 0 .492-1.612 1.978 1.978 0 0 0-.5-1.6 1.956 1.956 0 0 0-1.546-.631h-1.17v4.475ZM47.86 12.098a2.241 2.241 0 0 1 .567-1.713 2.22 2.22 0 0 1 1.641-.73 2.206 2.206 0 0 1 1.641.73 2.235 2.235 0 0 1 .566 1.713 2.243 2.243 0 0 1-.564 1.715 2.22 2.22 0 0 1-1.643.732 2.207 2.207 0 0 1-1.643-.732 2.235 2.235 0 0 1-.565-1.715Zm3.465 0c0-1.02-.456-1.618-1.256-1.618-.803 0-1.254.597-1.254 1.618 0 1.029.452 1.621 1.255 1.621.8 0 1.255-.596 1.255-1.621ZM58.145 14.454h-.958l-.968-3.468h-.073l-.963 3.468h-.95l-1.29-4.708h.937l.839 3.593h.069l.962-3.593h.886l.963 3.593h.073l.835-3.593h.923l-1.285 4.708ZM60.516 9.745h.889v.748h.069a1.407 1.407 0 0 1 1.397-.838 1.514 1.514 0 0 1 1.229.483 1.534 1.534 0 0 1 .391 1.268v3.048h-.924V11.64c0-.756-.327-1.133-1.01-1.133a1.069 1.069 0 0 0-1.067.735c-.05.147-.067.304-.05.459v2.754h-.924V9.745ZM65.963 7.907h.924v6.547h-.924V7.907ZM68.172 12.098a2.243 2.243 0 0 1 .566-1.713 2.22 2.22 0 0 1 1.641-.73 2.207 2.207 0 0 1 1.642.73 2.233 2.233 0 0 1 .566 1.713 2.241 2.241 0 0 1-.565 1.715 2.219 2.219 0 0 1-1.643.732 2.207 2.207 0 0 1-1.642-.732 2.234 2.234 0 0 1-.565-1.715Zm3.465 0c0-1.02-.456-1.618-1.256-1.618-.803 0-1.255.597-1.255 1.618 0 1.029.452 1.62 1.255 1.62.8 0 1.256-.595 1.256-1.62ZM73.56 13.123c0-.848.627-1.336 1.74-1.406l1.269-.074v-.406c0-.497-.327-.778-.959-.778-.515 0-.873.19-.975.523h-.895c.095-.808.851-1.327 1.913-1.327 1.173 0 1.835.588 1.835 1.582v3.217H76.6v-.661h-.073a1.578 1.578 0 0 1-1.406.739 1.406 1.406 0 0 1-1.091-.356 1.422 1.422 0 0 1-.47-1.053Zm3.009-.403v-.393l-1.144.073c-.644.044-.936.264-.936.68 0 .423.365.67.867.67a1.097 1.097 0 0 0 1.096-.603c.067-.133.107-.278.117-.427ZM78.703 12.098c0-1.488.76-2.43 1.943-2.43a1.536 1.536 0 0 1 1.436.826h.069V7.907h.924v6.547h-.886v-.744h-.073a1.63 1.63 0 0 1-1.47.822c-1.19 0-1.943-.943-1.943-2.434Zm.955 0c0 .999.468 1.6 1.25 1.6.779 0 1.26-.61 1.26-1.596 0-.981-.486-1.6-1.26-1.6-.777 0-1.25.605-1.25 1.596ZM86.896 12.098a2.245 2.245 0 0 1 .567-1.713 2.219 2.219 0 0 1 1.64-.73 2.207 2.207 0 0 1 1.642.73 2.236 2.236 0 0 1 .566 1.713 2.244 2.244 0 0 1-.565 1.715 2.219 2.219 0 0 1-1.642.732 2.208 2.208 0 0 1-1.643-.732 2.233 2.233 0 0 1-.565-1.715Zm3.465 0c0-1.02-.456-1.618-1.256-1.618-.803 0-1.255.597-1.255 1.618 0 1.029.452 1.621 1.255 1.621.8 0 1.256-.596 1.256-1.621ZM92.552 9.745h.889v.748h.069a1.407 1.407 0 0 1 1.397-.838 1.514 1.514 0 0 1 1.228.483 1.534 1.534 0 0 1 .392 1.268v3.048h-.924V11.64c0-.756-.327-1.133-1.01-1.133a1.069 1.069 0 0 0-1.068.735c-.049.147-.066.304-.05.459v2.754h-.923V9.745ZM101.747 8.573v1.194h1.015v.783h-1.015v2.421c0 .493.202.71.662.71.118-.001.236-.008.353-.022v.774c-.166.03-.334.046-.503.047-1.027 0-1.436-.363-1.436-1.271v-2.66h-.744v-.782h.744V8.573h.924ZM104.024 7.907h.915v2.595h.073a1.446 1.446 0 0 1 1.428-.843 1.533 1.533 0 0 1 1.216.496 1.55 1.55 0 0 1 .396 1.26v3.04h-.925v-2.812c0-.752-.348-1.133-1.001-1.133a1.088 1.088 0 0 0-1.118.723 1.11 1.11 0 0 0-.061.471v2.75h-.923V7.907ZM113.439 13.183c-.126.43-.398.802-.769 1.052a1.893 1.893 0 0 1-1.26.31 2.115 2.115 0 0 1-1.64-.712 2.153 2.153 0 0 1-.45-.801 2.155 2.155 0 0 1-.072-.917 2.184 2.184 0 0 1 .521-1.726 2.151 2.151 0 0 1 1.637-.735c1.303 0 2.088.896 2.088 2.374v.325h-3.305v.052a1.246 1.246 0 0 0 .745 1.248c.158.068.329.103.502.1a1.118 1.118 0 0 0 1.113-.57h.89Zm-3.25-1.518h2.364a1.136 1.136 0 0 0-1.152-1.22 1.189 1.189 0 0 0-.862.353 1.201 1.201 0 0 0-.35.867Z"></path></svg>


                                {/* <button className="download-button">
                                    <img src="/images/app-store.png" alt="" className="download-button-icon" />
                                    <span>AppStore</span>
                                </button>
                                <button className="download-button">
                                    <img src="/images/google-play.png" alt="" className="download-button-icon" />
                                    <span>Google Play</span>
                                </button> */}
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
                                <video src={rightTopVideoUrl} autoPlay muted loop className='phone-screen' webkit-playsinline
                                    x5-playsinline
                                    playsInline></video>
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
                            {topNavs.map((topNav, index) => (
                                <div className="stats-item" key={index}>
                                    <div className="stats-number" dangerouslySetInnerHTML={{ __html: topNav.note }}></div>
                                    <div className="stats-text" dangerouslySetInnerHTML={{ __html: topNav.content }}></div>
                                </div>
                            ))}
                            {/* // <div className="stats-item">
                            //     <div className="stats-number">
                            //         200+
                            //     </div>
                            //     <div className="stats-text">
                            //         Our users come from all<br /> over the world.
                            //     </div>
                            // </div>
                            // <div className="stats-item">
                            //     <div className="stats-number">
                            //         3000K+
                            //     </div>
                            //     <div className="stats-text">
                            //         Registered users
                            //     </div>
                            // </div>
                            // <div className="stats-item">
                            //     <div className="stats-number">
                            //         10k+
                            //     </div>
                            //     <div className="stats-text">
                            //         Daily Online users
                            //     </div>
                            // </div> */}
                        </div>
                    </div>
                </section>
            </section>

            {/* Random video */}
            <section className='random-video-container' ref={videoSectionRef}>
                <video
                    src={middleVideoUrl}
                    webkit-playsinline
                    x5-playsinline
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
                                    <span>{'0' + (index + 1)}</span>
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
                                        <span dangerouslySetInnerHTML={{ __html: faq.content }}></span>
                                    </h3>
                                    <span className="faq-toggle">
                                        {openFaqIndex === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaqIndex === index && (
                                    <div className="faq-answer">
                                        <div className="faq-answer-text" dangerouslySetInnerHTML={{ __html: faq.note }}></div>
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
