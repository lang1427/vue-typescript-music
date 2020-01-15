import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

export function service(options: object): any {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL,
      withCredentials: true,
      timeout: 10000
    })
    instance.interceptors.response.use(res => {
      return res.data
    })

    instance(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
