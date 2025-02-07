
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
      contacts: {
        Row: {
          id: string
          created_at?: string
          updated_at?: string
          user_id?: string
          stage?: string
          company_id?: string
          lead_type?: string
          industry?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          company?: string
          title?: string
          notes?: string
          status?: string
          source?: string
          source_id?: string
          linkedin_url?: string
          company_domain?: string
          company_description?: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          stage?: string
          company_id?: string
          lead_type?: string
          industry?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          company?: string
          title?: string
          notes?: string
          status?: string
          source?: string
          source_id?: string
          linkedin_url?: string
          company_domain?: string
          company_description?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          stage?: string
          company_id?: string
          lead_type?: string
          industry?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          company?: string
          title?: string
          notes?: string
          status?: string
          source?: string
          source_id?: string
          linkedin_url?: string
          company_domain?: string
          company_description?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      industry_type: 'manufacturing' | 'technology' | 'tourism' | 'healthcare' | 'energy' | 'mining' | 'logistics' | 'education' | 'finance' | 'real_estate' | 'agriculture' | 'water' | 'defense' | 'sports' | 'aerospace' | 'retail' | 'creative' | 'biotech' | 'construction' | 'ocean'
    }
  }
}
