// Generated by ts-to-zod
import { z } from 'zod'
import type { Json } from './../types/supabase.d'

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(z.union([jsonSchema, z.undefined()])),
      z.array(jsonSchema),
    ])
    .nullable(),
)

export const demandSiteSchema = z.union([
  z.literal('1062-9'),
  z.literal('1342-5'),
])

export const demandStatusSchema = z.union([
  z.literal('new'),
  z.literal('consulted'),
  z.literal('released'),
  z.literal('issued'),
  z.literal('error'),
])

export const demandTypeSchema = z.union([
  z.literal('1cin'),
  z.literal('2cin'),
  z.literal('1v'),
  z.literal('2v'),
  z.literal('2vt'),
  z.literal('1ve'),
  z.literal('2ve'),
])

export const documentDemandInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  document_number: z.string(),
  id: z.number().optional(),
  name: z.string().optional(),
  note: z.string().optional().nullable(),
  site: demandSiteSchema,
  status: demandStatusSchema.optional(),
  type: demandTypeSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
})

export const documentDemandUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  document_number: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  note: z.string().optional().nullable(),
  site: demandSiteSchema.optional(),
  status: demandStatusSchema.optional(),
  type: demandTypeSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
})

export const documentDemandRelationshipsSchema = z.tuple([])

export const documentStatusHistoryRowSchema = z.object({
  changed_at: z.string(),
  changed_by: z.string().nullable(),
  document_demand_id: z.number(),
  id: z.number(),
  new_status: demandStatusSchema,
  old_status: demandStatusSchema,
})

export const documentStatusHistoryInsertSchema = z.object({
  changed_at: z.string().optional(),
  changed_by: z.string().optional().nullable(),
  document_demand_id: z.number(),
  id: z.number().optional(),
  new_status: demandStatusSchema,
  old_status: demandStatusSchema,
})

export const documentStatusHistoryUpdateSchema = z.object({
  changed_at: z.string().optional(),
  changed_by: z.string().optional().nullable(),
  document_demand_id: z.number().optional(),
  id: z.number().optional(),
  new_status: demandStatusSchema.optional(),
  old_status: demandStatusSchema.optional(),
})

export const documentStatusHistoryRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal(
      'document_status_history_document_demand_id_fkey',
    ),
    columns: z.tuple([z.literal('document_demand_id')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('document_demand'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const profilesRowSchema = z.object({
  id: z.string(),
  updated_at: z.string().nullable(),
  username: z.string().nullable(),
})

export const profilesInsertSchema = z.object({
  id: z.string(),
  updated_at: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
})

export const profilesUpdateSchema = z.object({
  id: z.string().optional(),
  updated_at: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
})

export const profilesRelationshipsSchema = z.tuple([])

export const documentDemandRowSchema = z.object({
  created_at: z.string().nullable(),
  document_number: z.string(),
  id: z.number(),
  name: z.string(),
  note: z.string().nullable(),
  site: demandSiteSchema,
  status: demandStatusSchema,
  type: demandTypeSchema.nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
})
