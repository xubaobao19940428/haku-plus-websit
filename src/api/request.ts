const baseURL = 'https://s3.us-east-005.backblazeb2.com/molo-asset/mlo/website'

const request = async (url: string, method: string = 'GET', data?: Record<string, unknown>) => {
    return new Promise<unknown>((resolve, reject) => {
        const config: RequestInit = {
            method,
        }

        // 判断是否是直接请求 JSON 文件（以 .json 结尾或者是完整 URL）
        const isJsonFile = url.endsWith('.json') || url.startsWith('http://') || url.startsWith('https://')
        
        // 如果不是 JSON 文件请求，添加 JSON headers
        if (!isJsonFile) {
            config.headers = {
                'Content-Type': 'application/json',
            }
        }

        // GET 和 HEAD 请求不能有 body，需要将参数添加到 URL
        if (method === 'GET' || method === 'HEAD') {
            if (data) {
                const params = new URLSearchParams()
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        params.append(key, String(value))
                    }
                })
                const queryString = params.toString()
                if (queryString) {
                    url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`
                }
            }
        } else {
            // POST, PUT, PATCH 等请求可以添加 body
            if (data) {
                config.body = JSON.stringify(data)
            }
        }

        // 构建完整的请求 URL
        // 如果是完整 URL 或 JSON 文件，直接使用；否则拼接 baseURL
        const requestUrl = (isJsonFile && (url.startsWith('http://') || url.startsWith('https://'))) 
            ? url 
            : (baseURL ? `${baseURL}${url}` : url)

        fetch(requestUrl, config)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                return res.json()
            })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export default request