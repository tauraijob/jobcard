import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const method = getMethod(event)

  switch (method) {
    case 'GET':
      return await prisma.team.findUnique({
        where: { id },
        include: {
          owner: true,
          members: {
            include: {
              user: true
            }
          },
          boards: true
        }
      })

    case 'PUT':
      const body = await readBody(event)
      return await prisma.team.update({
        where: { id },
        data: {
          name: body.name,
          description: body.description,
          avatar: body.avatar
        }
      })

    case 'DELETE':
      return await prisma.team.delete({
        where: { id }
      })

    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
  }
}) 