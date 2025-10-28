import { defineConfig } from 'drizzle-kit'
import { env } from '@/env'

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL não está definido no arquivo de ambiente.')
}

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL // Agora garantido como string
  },
  out: './src/db/migrations',
  schema: './src/db/schema/index.ts',
  casing: 'snake_case'
})
