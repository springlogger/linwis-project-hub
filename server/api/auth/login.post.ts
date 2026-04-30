import { createAuthToken, verifyPassword } from '~~/server/utils/auth'
import prisma from '~~/lib/prisma'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string
    password: string
  }>(event)

  const data = loginSchema.parse(body)

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  const isPasswordValid = await verifyPassword(data.password, user.passwordHash)

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  const token = createAuthToken({
    userId: user.id,
    email: user.email,
  })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return {
    user: user,
  }
})
