import '@/styles/privacy.scss'
import { useState,useEffect } from 'react'
import request from '@/api/request'
const PrivacyPolicy = () => {
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState<string>('')
    const getConfig = async () => {
        const data = await request('/MoloSiteCfg.json', 'GET') as { privacy: { content: string } }
        console.log(data)
        setPrivacyPolicyContent(data.privacy.content)
    }
    useEffect(() => {
        getConfig()
    }, [])
    return (
        <div className="privacy-policy-container">
            <div className="privacy-policy-header">
                <div className="privacy-policy-header-content">
                    Your Privacy Matters: Understanding How We Protect Your Data
                </div>
                <div className="privacy-policy-header-description">
                    We prioritize your privacy and security. This policy outlines how we collect, use, and safeguard your personal information, ensuring a trusted and secure experience on our platform. Your data is in safe hands with us.
                </div>
            </div>
            <div 
                className='privacy-policy-content'
                dangerouslySetInnerHTML={{ __html: privacyPolicyContent }}
            />
        </div>
    )
}

export default PrivacyPolicy