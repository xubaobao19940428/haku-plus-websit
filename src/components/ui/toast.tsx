import { useEffect, useState } from 'react'
import './toast.scss'

interface ToastProps {
    message: string
    show: boolean
    onClose: () => void
    duration?: number
}

export const Toast = ({ message, show, onClose, duration = 3000 }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (show) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
                setTimeout(() => {
                    onClose()
                }, 300) // 等待动画完成
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [show, duration, onClose])

    if (!show && !isVisible) return null

    return (
        <div className={`toast ${isVisible ? 'toast-show' : 'toast-hide'}`}>
            <div className="toast-content">
                <span className="toast-message">{message}</span>
            </div>
        </div>
    )
}


