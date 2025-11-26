import '@/styles/deleteAccount.scss'
import '@/styles/footer.scss'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// 自定义下拉选择组件
interface CustomSelectProps {
    value: string
    options: { value: string; label: string }[]
    onChange: (value: string) => void
    className?: string
}

const CustomSelect = ({ value, options, onChange, className = '' }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const selectedOption = options.find(opt => opt.value === value) || options[0]

    return (
        <div className={`custom-select ${className}`} ref={selectRef}>
            <div 
                className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="custom-select-value">{selectedOption.label}</span>
                <img 
                    src="/images/arrow-down.png" 
                    alt="" 
                    className={`custom-select-arrow ${isOpen ? 'rotated' : ''}`}
                />
            </div>
            {isOpen && (
                <div className="custom-select-dropdown">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`custom-select-option ${value === option.value ? 'selected' : ''}`}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const DeleteAccount = () => {
    const [deleteAccountContent, setDeleteAccountContent] = useState<string>('')
    const [formData, setFormData] = useState({
        country: 'Angola',
        name: '',
        mobileNumber: '',
        email: '',
        accountType: 'Molo ID',
        accountId: '',
        rightExercising: 'Erasure',
        reasoning: Array(4).fill(false)
    })

    const getConfig = async () => {
        const res = await fetch('http://192.168.103.50:18082/official/site/cfg')
        const data = await res.json() as any
        console.log(data)
        setDeleteAccountContent(data.data.deleteAccount.content)
    }
    const navigate = useNavigate()
    useEffect(() => {
        getConfig()
    }, [])

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleReasoningChange = (index: number) => {
        setFormData(prev => ({
            ...prev,
            reasoning: prev.reasoning.map((item, i) => i === index ? !item : item)
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // 这里可以添加提交逻辑
    }
    return (
        <div className="delete-account-container">
            <header>
                <div className='delete-account-left'>
                    <img src="/images/logo.png" alt="" />
                    <span className='delete-account-left-title'>Molo</span>
                </div>
                <div className='delete-account-right' onClick={() => {
                    navigate(-1)
                }}>
                    <img src="/images/go-back.png" alt="" />
                </div>
            </header>
            <div className='delete-account-content'>
                <div className='delete-account-content-top'>
                    <div className='delete-account-content-top-title'>
                        Molo Data Subject Rights Request Form
                    </div> 
                    <div className='delete-account-content-top-description'>
                        For an overview of data subject rights available to you please refer to the <span className='delete-account-content-top-description-span' onClick={() => {
                            navigate('/privacy')
                        }}>Molo Privacy Policy</span>. If you feel that one of the rights applies to you and you wish to exercise it please complete the form and submit it to us together with the verification documentation set out at Part 3 below.
                        Please ensure that you have provided all of the information requested below in a legible format, and add as much detail as possible as we will not respond to incomplete requests. If you have any questions about this form, please do not hesitate to contact us at info@Molo.com.
                        Molo when used in this form refers to your data controlling entity referred to in the Molo Privacy Policy.
                    </div>
                </div>
                <form className='delete-account-content-form' onSubmit={handleSubmit}>
                    <div className='delete-account-content-form-title'>
                        Enter your contact information
                    </div>
                    <div className='delete-account-content-form-description'>
                        Please carefully enter your data. We will not be able to service your request unless the data is entered correctly.
                    </div>

                    {/* Contact Information Section */}
                    <div className='form-section'>
                        <div className='form-field'>
                            <label className='form-label'>Country/Region</label>
                            <CustomSelect
                                value={formData.country}
                                options={[
                                    { value: 'Angola', label: 'Angola' },
                                    { value: 'United States', label: 'United States' },
                                    { value: 'United Kingdom', label: 'United Kingdom' },
                                    { value: 'China', label: 'China' },
                                    { value: 'Other', label: 'Other' }
                                ]}
                                onChange={(value) => handleInputChange('country', value)}
                            />
                        </div>

                        <div className='form-field'>
                            <label className='form-label'>Name</label>
                            <input
                                type="text"
                                className='form-input'
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className='form-field'>
                            <label className='form-label'>Mobile number you are currently using</label>
                            <input
                                type="tel"
                                className='form-input'
                                value={formData.mobileNumber}
                                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                placeholder="Enter your mobile number"
                            />
                        </div>

                        <div className='form-field'>
                            <label className='form-label'>Email to correspond with you</label>
                            <input
                                type="email"
                                className='form-input'
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* Tigo Account Identification Section */}
                    <div className='form-section'>
                        <div className='form-field'>
                            <label className='form-label'>Select one of the following for identifying your Tigo account.</label>
                            <CustomSelect
                                value={formData.accountType}
                                options={[
                                    { value: 'Molo ID', label: 'Molo ID' },
                                    { value: 'Phone Number', label: 'Phone Number' },
                                    { value: 'Email', label: 'Email' }
                                ]}
                                onChange={(value) => handleInputChange('accountType', value)}
                               
                            />
                        </div>

                        <div className='form-field'>
                            <input
                                type="text"
                                className='form-input'
                                value={formData.accountId}
                                onChange={(e) => handleInputChange('accountId', e.target.value)}
                                placeholder={`Enter your ${formData.accountType}`}
                            />
                        </div>
                    </div>

                    {/* Right Exercising Section */}
                    <div className='form-section'>
                        <div className='form-field'>
                            <label className='form-label form-label-checkbox'>Please choose which right you are exercising</label>
                            <div className='checkbox-group'>
                                <label className='checkbox-label'>
                                    <input
                                        type="checkbox"
                                        checked={formData.rightExercising === 'Erasure'}
                                        onChange={() => handleInputChange('rightExercising', 'Erasure')}
                                        className='checkbox-input'
                                    />
                                    <span className='checkbox-custom'></span>
                                    <span className='checkbox-text'>Erasure</span>
                                </label>
                                <div className='label-checkbox-description'>
                                Please carefully enter your data. We will not be able to service your request unless the data is entered correctly.
                                Enter your contact information
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reasoning Section */}
                    <div className='form-section form-section-reasoning'>
                        <div className='form-field'>
                            <div className='checkbox-group'>
                                {formData.reasoning.map((checked, index) => (
                                    <label key={index} className='checkbox-label'>
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => handleReasoningChange(index)}
                                            className='checkbox-input'
                                        />
                                        <span className='checkbox-custom'></span>
                                        <span className='checkbox-group-text'>
                                            I believe that it is no longer necessary for Tigo to hold the personal data it holds about me. (Please provide us with details as to your reasoning below.)
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='form-submit-section'>
                        <button type="submit" className='form-submit-button'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* 页脚 */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Logo and Description */}
                        <div className="footer-logo-section">
                            <div className="footer-logo-wrapper">
                                <div className="footer-logo-icon">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="footer-logo-svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
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
        </div>
    )
}

export default DeleteAccount