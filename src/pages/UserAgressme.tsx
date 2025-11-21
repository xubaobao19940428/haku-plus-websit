import '@/styles/privacy.scss'
import { useState, useEffect } from 'react'
import request from '@/api/request'
const UserAgressme = () => {
    const [userAgressmeContent, setUserAgressmeContent] = useState<string>('')
    const getConfig = async () => {
        const data = await request('/MoloSiteCfg.json', 'GET') as { userAgreement: { content: string } }
        console.log(data)
        setUserAgressmeContent(data.userAgreement.content)
    }
    useEffect(() => {
        getConfig()
    }, [])
    return (
        <div className="privacy-policy-container">
            <div className="privacy-policy-header">
                <div className="privacy-policy-header-content">
                    User Agreement: Your Guide to Using Milo Responsibly
                </div>
                <div className="privacy-policy-header-description bind-account-description">
                    By using Milo, you agree to comply with our terms and conditions. This agreement outlines the rules, responsibilities, and rights for both users and Milo to ensure a safe, fair, and enjoyable experience. Please read it carefully before accessing or using our services.
                </div>
            </div>
            <div
                className='privacy-policy-content'
                dangerouslySetInnerHTML={{ __html: userAgressmeContent }}
            />
        </div>
    )
}

export default UserAgressme