import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      // Get all teams
      return await prisma.team.findMany({
        include: {
          owner: true,
          members: {
            include: {
              user: true
            }
          }
        }
      })

    case 'POST':
      // Create a new team
      const body = await readBody(event)
      return await prisma.team.create({
        data: {
          name: body.name,
          description: body.description,
          ownerId: body.ownerId, // This should come from authenticated user
          avatar: body.avatar
        },
        include: {
          owner: true,
          members: true
        }
      })

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
  }
}) 