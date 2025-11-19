import { useState, useEffect } from 'react'
import '@/styles/home.scss'
import Highlight1 from '@/assets/images/high-1.png'
import Highlight2 from '@/assets/images/high-2.png'
import Highlight3 from '@/assets/images/high-3.png'
import Highlight4 from '@/assets/images/high-4.png'
import Highlight5 from '@/assets/images/high-5.png'
import Highlight6 from '@/assets/images/high-6.png'
import UpTopImage from '@/assets/images/up-top.png'

const Home = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
    const [isShowUpTopImage, setIsShowUpTopImage] = useState(false)

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index)
    }
    const handleUpTopImage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            if(scrollPosition > 200){
                setIsShowUpTopImage(true)
            }else{
                setIsShowUpTopImage(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    const faqs = [
        {
            question: 'What is Milo?',
            answer: 'Visonix is an AI-powered image generator that transforms text descriptions into high-quality visuals, making it easy for anyone to create stunning images.'
        },
        {
            question: 'How to download Milo on my phone?',
            answer: 'You can download Milo from the App Store or Google Play Store. Simply search for "Milo" and click the download button.'
        },
        {
            question: 'Do l need to login?',
            answer: 'Yes, you need to create an account to use Milo. Registration is quick and easy, and you can start chatting immediately after signing up.'
        },
        {
            question: 'lf we don\'t speak the same language,how can I chat with people from other countries?',
            answer: 'Milo has built-in translation features that help you communicate with people from different countries, even if you don\'t speak the same language.'
        },
        {
            question: 'What are Diamonds?',
            answer: 'Diamonds are virtual currency in Milo that you can use to unlock premium features, send gifts, and enhance your chatting experience.'
        }
    ]
    const highlightList = [
        {
            title: 'Real person video chat',
            description: 'Are you looking for a place where you can speak your mind without hiding anything? Then come to Milo! Here, you‘ ll find various ways to interact and chat however you like.',
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
                            <h1 className="hero-title">
                                A global{' '}
                                <span className="hero-title-accent">Online Video</span>
                                {' '}<br />platform for content creation,<br />discovery & communication
                            </h1>
                            <p className="hero-description">
                                Milo is a social software that aims to provide users with a perfect experience，more than 30,00000 users communicate on Milo
                            </p>
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
                                <img
                                    src="/images/phone-screen.png"
                                    alt="Phone Screen"
                                    className="phone-screen"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <section className="stats-section">
                    <div className='section-container'>
                        <div className='stats-content'>
                            <div className="stats-subtitle">
                                Join Milo Today
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
            <section className='random-video-container'>
                <video
                    src="https://videocdn.pollo.ai/effects/video_480p/cmfawivok0qgnyuupvnp8rhyb.mp4"
                    playsInline
                    autoPlay
                    muted
                    loop
                    className='video-player'
                ></video>
                <div className='video-section'>
                    <div className='video-title-1'>
                        Random video chat ,1-<br /> on-1 pribate interaction,<br /> real video socializing
                    </div>
                    <div className='video-description-1'>
                        Milo is a social software that aims to provide users with a<br /> perfect experience，more than 30,00000 users<br /> communicate on Milo
                    </div>
                </div>
            </section>
            <section className='common-section'>
                <div className='common-section-content'>
                    <div className='common-section-title'>
                        The highlights of Moli
                    </div>
                    <div className='common-section-highlight-list'>
                        {highlightList.map((highlight, index) => (
                            <div className='common-section-highlight-item' key={index}>
                                <div className="common-section-highlight-item-header">
                                    <img src={highlight.image} alt={highlight.title} className='common-section-highlight-item-header-image' />
                                    <span>{'0' + index}</span>
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
                <div className='common-section-content'>
                    <div className='common-section-title'>
                        Frequently Asked Questions
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="faq-button"
                                >
                                    <h3 className="faq-question">
                                        {faq.question}
                                    </h3>
                                    <span className="faq-toggle">
                                        {openFaqIndex === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaqIndex === index && (
                                    <div className="faq-answer">
                                        <p className="faq-answer-text">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {
                isShowUpTopImage && (
                    <img src={UpTopImage} alt="" className='up-top-image' onClick={() =>handleUpTopImage()} />
                )
            }
        </div>
    )
}

export default Home
