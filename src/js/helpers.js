import { TIMEOUT_SECONDS } from './config.js'

const timeout = (s) => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(`Request took too long! Timeout after ${s} second`)), s * 1000))
  };

export const getJSON = async (url) => {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)])
        const data = await res.json()
    
        if (!res.ok) throw new Error(`${data.message} ${res.status}`)
        return data
    } catch (err) {
        throw err
    }
}
