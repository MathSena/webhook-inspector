import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifyCors } from '@fastify/cors'
import { listWebhooks } from './routes/list-webhooks'
import { getWebhook } from './routes/get-webhook'
import { deleteWebhook } from './routes/delete-webhook'
import { captureWebhook } from './routes/capture-webhook'
import { env } from '@/env'
import ScalarApiReference from '@scalar/fastify-api-reference'
// Initialize Fastify with Zod type provider
const app = fastify()

app.setValidatorCompiler(validatorCompiler) // Set Zod validator compiler
app.setSerializerCompiler(serializerCompiler) // Set Zod serializer compiler

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  // credentials: true -> envio automatico de cookies
}) // Enable CORS for all origins

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Webhook Inspector API',
      description: 'API for capturing and inspecting webhooks',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform // Transform schemas for Swagger
})

app.register(ScalarApiReference, {
  routePrefix: '/docs'
}) // Register Scalar API Reference plugin

app.register(listWebhooks)
app.register(getWebhook)
app.register(deleteWebhook)
app.register(captureWebhook)

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => {
    console.log('🔥 Server is Running now on http://localhost:3333')
    console.log('📚 Swagger docs available at http://localhost:3333/docs')
  })
  .catch(err => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
