import { inovarApiResponse } from '../types/inovarApiResponse'

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    const jsonPayload = decodeURIComponent(
      Buffer
        .from(base64, 'base64')
        .toString()
        .split('')
        .map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload) as inovarApiResponse.loginFU
  } catch (e) {
    return null
  }
}

export default parseJwt
