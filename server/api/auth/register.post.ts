import { createAuthToken, hashPassword } from '~~/server/utils/auth'
import prisma from '~~/lib/prisma'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string
    name: string
    password: string
  }>(event)

  //TODO: отправлять ошибку валидации, если данные не прошли валидацию
  const data = registerSchema.parse(body)

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (user) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User already exists',
    })
  }

  const passwordHash = await hashPassword(data.password)
  
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  })

  const token = createAuthToken({
    userId: newUser.id,
    email: newUser.email,
  })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return {
    user: newUser,
  }
})
