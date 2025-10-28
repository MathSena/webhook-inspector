import { integer, timestamp } from 'drizzle-orm/pg-core'
import { pgTable, text, jsonb } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const webhooks = pgTable('webhooks', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  method: text('method').notNull(),
  pathName: text('path_name').notNull(),
  ip: text('ip').notNull(),
  statusCode: integer('status_code').notNull().default(200),
  contentType: text('content_type').notNull().default('application/json'),
  contentLength: integer('content_length').notNull().default(0),
  queryParams: jsonb('query_params').$type<Record<string, string>>().notNull(),
  headers: jsonb('headers').$type<Record<string, string>>().notNull(),
  body: text('body'),
  createdAt: timestamp('created_at').notNull().defaultNow()
})
