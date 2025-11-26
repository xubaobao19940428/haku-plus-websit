import '@/styles/privacy.scss'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import request from '@/api/request'
interface ChildSafetyContent {
    [key: string]: {
        title: string
        content: string
    }
}

const ChildSafety = () => {
    const [childSafetyContent, setChildSafetyContent] = useState<ChildSafetyContent>({})
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [uploadImageResult, setUploadImageResult] = useState<string>('')
    const swiperRef = useRef<SwiperType | null>(null)
    const tabsContainerRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
    /**
     * 上传图片
     * @param e 
     */
    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        console.log(file)
        if (file) {
            const base64 = await fileToBase64(file)
            setUploadImageResult(base64 as string)
        }
    }
    /**
     * 将图片转换为base64
     * @param file 
     * @returns 
     */
    const fileToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })
    }
    /**
     * 关闭图片
     */
    const handleCloseImage = () => {
        setUploadImageResult('')
    }
    /**
     * 获取配置
     */
    const getConfig = async () => {
        const data = await request('/MoloSiteCfg.json', 'GET') as { childrenSafety: ChildSafetyContent }
        console.log(data)
        setChildSafetyContent(data.childrenSafety)
    }

    useEffect(() => {
        getConfig()
    }, [])

    const tabKeys = Object.keys(childSafetyContent)

    const handleTabClick = (index: number) => {
        setActiveTabIndex(index)
        if (swiperRef.current) {
            swiperRef.current.slideTo(index)
        }
        
        // 滚动到被点击的 tab，确保它在可视区域内
        const clickedTab = tabRefs.current[index]
        const tabsContainer = tabsContainerRef.current
        
        if (clickedTab && tabsContainer) {
            const containerRect = tabsContainer.getBoundingClientRect()
            const tabRect = clickedTab.getBoundingClientRect()
            
            // 检查 tab 是否在可视区域内
            const isTabVisible = 
                tabRect.left >= containerRect.left &&
                tabRect.right <= containerRect.right
            
            // 如果不在可视区域内，滚动到该 tab
            if (!isTabVisible) {
                clickedTab.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                })
            }
        }
    }

    return (
        <div className="privacy-policy-container">
            <div className="privacy-policy-header">
                <div className="privacy-policy-header-content">
                    Children Safety
                </div>
                <div className="privacy-policy-header-description">
                    Molo enforces a stringent policy of no tolerance towards any incidents of abuse, exploitation, or sexualization concerning children. Users failing to respect Molo's policies to safeguard minors (individuals below the age of 18) in line with the provisions outlined below may face banned from Molo and potential legal consequences.
                </div>
            </div>
            <div className='child-safety-content'>
                {/* Tab 导航 */}
                <div className='child-safety-tabs' ref={tabsContainerRef}>
                    {tabKeys.map((key, index) => (
                        <button
                            key={key}
                            ref={(el) => (tabRefs.current[index] = el)}
                            className={`child-safety-tab ${activeTabIndex === index ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* Swiper 内容 */}
                <div className='child-safety-swiper-wrapper'>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        autoHeight={true}
                        allowTouchMove={false}
                        watchOverflow={true}

                        onSwiper={(swiper: SwiperType) => {
                            swiperRef.current = swiper
                        }}
                        onSlideChange={(swiper: SwiperType) => setActiveTabIndex(swiper.activeIndex)}
                        initialSlide={activeTabIndex}
                        className="child-safety-swiper"
                    >
                        {tabKeys.map((key) => (
                            key != 'detectService' ? (
                                <SwiperSlide key={key}>
                                    <div className='child-safety-content-item'>
                                        <div className='child-safety-content-item-title'>
                                            {key}
                                        </div>
                                        <div className='child-safety-content-item-content'>
                                            <div dangerouslySetInnerHTML={{ __html: childSafetyContent[key].content }} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ) : (
                                <SwiperSlide key={key}>
                                    <div className='child-safety-content-item'>
                                        <div className='child-safety-content-item-title'>
                                            UGC Detection
                                        </div>
                                        <div className='child-safety-content-item-desc'>
                                            Upload a picture to detect the age and rating(Normal/Sexual/Pornographic).
                                        </div>
                                        <div className='upload-image-container'>

                                            <div className='upload-image-item-title'>
                                                Upload Photo
                                            </div>
                                            {
                                                uploadImageResult && (
                                                    <img src="/images/close-img.png" alt="" className='close-img' onClick={handleCloseImage} />
                                                )
                                            }
                                            {
                                                !uploadImageResult ? (
                                                    <div className='upload-image-item-content'>
                                                        <img src='/images/upload-img.png' alt='upload-image' />
                                                        <span className='upload-image-item-content-title'>Click upload photo</span>
                                                        <span className='upload-image-item-content-desc'>JPG/JPEG/PNG only, max size:5MB</span>
                                                        <input type='file' accept='image/*' className='upload-image-item-content-input' onChange={handleUploadImage} />
                                                    </div>
                                                ) : (
                                                    <div className='upload-image-item-preview'>
                                                        <img src={uploadImageResult} alt="upload-image-result" />
                                                    </div>
                                                )
                                            }
                                            <div className='start-detect-btn'>
                                                <button className='start-detect-btn-btn' disabled={!uploadImageResult}>
                                                    Start Detect
                                                </button>
                                            </div>

                                        </div>
                                        <div className='detect-result-desc'>
                                            Before uploading images, please be aware that your photos will not be stored on our servers but will be uploaded to third-party detection servers.<br />
                                            Clicking "Start detect" indicates your agreement with our <span className='terms-of-servics-link'>Terms of Servics</span> and <span className='privacy-policy-link'>Privacy Policy</span>.
                                        </div>
                                        <div className='upload-image-container'>

                                            <div className='upload-image-item-title'>
                                                Detect Result
                                            </div>
                                            <div className='detect-result-content'>
                                                <div className='detect-result-content-item'>
                                                    <div className='detect-result-content-item-title'>
                                                        Age
                                                    </div>
                                                    <div className='detect-result-content-item-value'>

                                                    </div>
                                                </div>
                                                <div className='detect-result-content-item'>
                                                    <div className='detect-result-content-item-title'>
                                                        Rating <span>(Normal/Sexual/Pornographic)</span>
                                                    </div>
                                                    <div className='detect-result-content-item-value'>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        ))}

                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default ChildSafety