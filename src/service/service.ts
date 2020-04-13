import axios from 'axios'

import $store from '@/store/index'

const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'

export function service(options: object): any {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL,
      withCredentials: true
    })
    instance.interceptors.request.use(req => {
      $store.state.loadingShow = true
      return req
    })
    instance.interceptors.response.use(res => {
      $store.state.loadingShow = false
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
