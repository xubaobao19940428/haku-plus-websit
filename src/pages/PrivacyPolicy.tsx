import '@/styles/privacy.scss'
import { useState,useEffect } from 'react'

const PrivacyPolicy = () => {
    const [privacyPolicyContent, setPrivacyPolicyContent] = useState<string>('')
    const getConfig = async () => {
        const res = await fetch('http://192.168.103.50:18082/official/site/cfg')
        const data = await res.json() as any
        console.log(data)
        setPrivacyPolicyContent(data.data.privacy.content)
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