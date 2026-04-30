import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import type { H3Event } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export type AuthTokenPayload = {
  userId: string
  email: string
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function createAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload
}

export function getAuthUserFromEvent(event: H3Event) {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return null
  }

  try {
    return verifyAuthToken(token)
  } catch {
    return null
  }
}