import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.RENDERER_VITE_API_URL ?? 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json'
  }
})
