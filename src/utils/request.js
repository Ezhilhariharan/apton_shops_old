import axios from 'axios'


const {ASP_API_URL} = process.env

const request = axios.create({
  baseURL: ASP_API_URL || 'https://preprod.aptonshops.com',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

axios.defaults.paramsSerializer = params => {
  let result = ''
  Object.keys(params).forEach(key => {
    result += `${key}=${encodeURIComponent(params[key])}&`
  })
  return result.substring(0, result.length - 1)
}

export default request