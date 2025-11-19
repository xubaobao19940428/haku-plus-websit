import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 可以在这里添加 token 等认证信息
        // const token = localStorage.getItem('token')
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error) => {
        // 统一错误处理
        if (error.response) {
            // 服务器返回了错误状态码
            switch (error.response.status) {
                case 401:
                    // 未授权，可以跳转到登录页
                    console.error('未授权，请重新登录')
                    break
                case 403:
                    console.error('拒绝访问')
                    break
                case 404:
                    console.error('请求的资源不存在')
                    break
                case 500:
                    console.error('服务器错误')
                    break
                default:
                    console.error('请求失败:', error.response.data)
            }
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error('网络错误，请检查网络连接')
        } else {
            // 其他错误
            console.error('请求配置错误:', error.message)
        }
        return Promise.reject(error)
    }
)

// 导出常用的请求方法
export const request = {
    get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return api.get<T>(url, config)
    },
    post: <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return api.post<T>(url, data, config)
    },
    put: <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return api.put<T>(url, data, config)
    },
    delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return api.delete<T>(url, config)
    },
    patch: <T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
        return api.patch<T>(url, data, config)
    },
}

export { api }
export default api

