import { getAuthUserFromEvent } from '~~/server/utils/auth'
import prisma from '~~/lib/prisma'

export default defineEventHandler(async (event) => {
  const authUser = getAuthUserFromEvent(event)

  if (!authUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: authUser.userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  return {
    user: user,
  }
})
