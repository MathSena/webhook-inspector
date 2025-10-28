import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const listWebhooks: FastifyPluginAsyncZod = async app => {
  app.get(
    '/api/webhooks',
    {
      schema: {
        summary: 'List all captured webhooks',
        tags: ['Webhooks'],
        querystring: z.object({
          limit: z.coerce.number().min(1).max(100).default(20)
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              method: z.string()
            })
          )
        }
      }
    },
    async (request, reply) => {
      const { limit } = request.query

      // TODO: Fetch webhooks from database or in-memory store
      const webhooks = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          method: 'POST'
        }
      ]

      return webhooks.slice(0, limit) // Limit the response based on the query parameter
    }
  )
}
