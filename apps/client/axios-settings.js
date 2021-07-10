import axios from 'axios'

const timeout = process.env.NODE_ENV !== 'production' ? 600000 : 86400000
const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: timeout,
  withCredentials: true
})

export default instance
