// ABOUTME: TypeScript types for Supabase database schema
// ABOUTME: Auto-generated base types - DO NOT import application types here
//
// ⚠️ IMPORTANT: This file should match Supabase-generated types.
// If you need to extend these types with application-specific types,
// do NOT modify this file directly. Instead:
// 1. Keep this file as Json types (matches database JSONB)
// 2. Transform at the data access layer (use-websites.ts)
// 3. Or create a separate database.types.override.ts file
//
// Regenerate with: supabase gen types typescript

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      websites: {
        Row: {
          id: string
          user_id: string
          label: string
          config: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          label: string
          config: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          label?: string
          config?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
