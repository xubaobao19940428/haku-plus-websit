import '@/styles/privacy.scss'
import { useState, useEffect } from 'react'
import request from '@/api/request'
interface BannedUser {
    id: string
    nickname: string
    reason: string
    bannedTime: string
}

const BindAccount = () => {
    const [bindAccountContent, setBindAccountContent] = useState<BannedUser[]>([])
    const [lastUpdateDate, setLastUpdateDate] = useState<string>('')
    const getBanList = async () => {
        const data = await request('/MoloBanList.json', 'GET') as { records: BannedUser[]; lastUpdate: string }
        console.log(data)
        setBindAccountContent(data.records)
        setLastUpdateDate(data.lastUpdate)
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
                    Molo APP is unwavering in its commitment to strictly combat and eliminate content that violates rules, particularly actions that can harm or infringe upon the rights and privacy of minors. We strive to create a healthy and safe social environment for our users. We fully understand the enormous challenges and substantial responsibilities this goal entails. We invite everyone to work alongside Molo in building a more harmonious and beautiful online community.
                </div>
            </div>
            <div
                className='bind-account-content'

            >
                <div className='bind-account-title'>
                    Banned Account Notice
                </div>
                <div className='bind-account-description'>
                    <div className='bind-account-description-left'>
                        Last updated date: {lastUpdateDate}
                    </div>
                    <div className='bind-account-description-right'>
                        Contact us: info@Molo.chat
                    </div>
                </div>
                <div className='bind-account-content-desc'>
                    Below is a list of some of the banned user accounts：
                </div>
                {bindAccountContent && bindAccountContent.length > 0 && (
                    <div className='banned-accounts-table-wrapper'>
                        <table className='banned-accounts-table'>
                            <thead>
                                <tr>
                                    <th>UserID</th>
                                    <th>Nicname</th>
                                    <th>Banned Reson</th>
                                    <th>Banned Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bindAccountContent.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.nickname.substring(1,0)+'*****'+user.nickname.substring(user.nickname.length-1,user.nickname.length)}</td>
                                        <td>{user.reason}</td>
                                        <td>{user.bannedTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BindAccount