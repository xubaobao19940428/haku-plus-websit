import '@/styles/privacy.scss'
import { useState, useEffect } from 'react'

const BindAccount = () => {
    const [bindAccountContent, setBindAccountContent] = useState<string>('')
    const getBanList = async () => {
        const res = await fetch('http://192.168.103.50:18082/official/site/banList')
        const data = await res.json() as any
        console.log(data)
        setBindAccountContent(data.data.bindAccount.content)
    }
    useEffect(() => {
        getBanList()
    }, [])
    return (
        <div className="privacy-policy-container">
            <div className="privacy-policy-header">
                <div className="privacy-policy-header-content">
                    Banned Account
                </div>
                <div className="privacy-policy-header-description bind-account-description">
                    Milo APP is unwavering in its commitment to strictly combat and eliminate content that violates rules, particularly actions that can harm or infringe upon the rights and privacy of minors. We strive to create a healthy and safe social environment for our users. We fully understand the enormous challenges and substantial responsibilities this goal entails. We invite everyone to work alongside Milo in building a more harmonious and beautiful online community.
                </div>
            </div>
            <div
                className='bind-account-content'

            >
                <div className='bind-account-title'>
                    Milo Privacy Policy
                </div>
                <div className='bind-account-description'>
                    <div className='bind-account-description-left'>
                        Last updated date: 2024-01-11
                    </div>
                    <div className='bind-account-description-right'>
                        Contact us: info@Milo.chat
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BindAccount