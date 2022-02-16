import { inovarApiResponse } from '../types/inovarApiResponse'

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    const jsonPayload = Buffer
      .from(base64, 'base64')
      .toString()

    return JSON.parse(jsonPayload) as inovarApiResponse.loginFU
  } catch (e) {
    console.warn(e)
    return null
  }
}

export default parseJwt
