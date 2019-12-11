import axios from 'axios'

export function service(options: object): any {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:3000',
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
