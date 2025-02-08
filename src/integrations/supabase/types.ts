export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_transcripts: {
        Row: {
          contact_id: string | null
          created_at: string
          id: string
          transcript_text: string
          updated_at: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          id?: string
          transcript_text: string
          updated_at?: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          id?: string
          transcript_text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_transcripts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "consolidated_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_transcripts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_transcripts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "leads_with_user_status"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          completed_by: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          item_text: string
          stage: Database["public"]["Enums"]["contact_stage"]
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          item_text: string
          stage?: Database["public"]["Enums"]["contact_stage"]
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          completed_by?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          item_text?: string
          stage?: Database["public"]["Enums"]["contact_stage"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_items_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "consolidated_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_items_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_items_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "leads_with_user_status"
            referencedColumns: ["id"]
          },
        ]
      }
      Contact: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          industry: Database["public"]["Enums"]["industry_type"] | null
          message: string | null
          moved_to_pipeline: boolean | null
          name: string | null
          request_status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          industry?: Database["public"]["Enums"]["industry_type"] | null
          message?: string | null
          moved_to_pipeline?: boolean | null
          name?: string | null
          request_status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          industry?: Database["public"]["Enums"]["industry_type"] | null
          message?: string | null
          moved_to_pipeline?: boolean | null
          name?: string | null
          request_status?: string | null
        }
        Relationships: []
      }
      contact_attachments: {
        Row: {
          contact_id: string | null
          content_type: string | null
          created_at: string
          external_url: string | null
          file_path: string
          filename: string
          id: string
          size: number | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          contact_id?: string | null
          content_type?: string | null
          created_at?: string
          external_url?: string | null
          file_path: string
          filename: string
          id?: string
          size?: number | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          contact_id?: string | null
          content_type?: string | null
          created_at?: string
          external_url?: string | null
          file_path?: string
          filename?: string
          id?: string
          size?: number | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_attachments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "consolidated_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_attachments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_attachments_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "leads_with_user_status"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_notes: {
        Row: {
          contact_id: string
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contact_id: string
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contact_id?: string
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_notes_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "consolidated_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_notes_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_notes_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "leads_with_user_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          company: string | null
          company_id: string | null
          created_at: string | null
          email: string
          first_name: string | null
          goal: string | null
          heat_rating: number | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          last_login: string | null
          last_name: string | null
          lead_source: string | null
          linkedin_url: string | null
          notes: string | null
          phone: string | null
          stage: Database["public"]["Enums"]["contact_stage"] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          company_id?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          goal?: string | null
          heat_rating?: number | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_login?: string | null
          last_name?: string | null
          lead_source?: string | null
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          company_id?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          goal?: string | null
          heat_rating?: number | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_login?: string | null
          last_name?: string | null
          lead_source?: string | null
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      dinner_invites: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          name: string
          role: string
          status: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          name: string
          role: string
          status?: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
          status?: string
        }
        Relationships: []
      }
      event_requests: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          event_type: string
          id: number
          industry: Database["public"]["Enums"]["industry_type"] | null
          interests: string | null
          moved_to_pipeline: boolean | null
          name: string | null
          notes_uuid: string | null
          phone_number: string | null
          request_status: string | null
          title: string | null
          uuid_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          event_type: string
          id?: never
          industry?: Database["public"]["Enums"]["industry_type"] | null
          interests?: string | null
          moved_to_pipeline?: boolean | null
          name?: string | null
          notes_uuid?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
          uuid_id?: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          event_type?: string
          id?: never
          industry?: Database["public"]["Enums"]["industry_type"] | null
          interests?: string | null
          moved_to_pipeline?: boolean | null
          name?: string | null
          notes_uuid?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
          uuid_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          expected_close_date: string | null
          expected_value: number | null
          first_name: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          last_contact_date: string | null
          last_name: string | null
          lead_type: Database["public"]["Enums"]["lead_type"] | null
          notes: string | null
          phone: string | null
          source: string | null
          stage: Database["public"]["Enums"]["company_stage"] | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          expected_close_date?: string | null
          expected_value?: number | null
          first_name?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_contact_date?: string | null
          last_name?: string | null
          lead_type?: Database["public"]["Enums"]["lead_type"] | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          stage?: Database["public"]["Enums"]["company_stage"] | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          expected_close_date?: string | null
          expected_value?: number | null
          first_name?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_contact_date?: string | null
          last_name?: string | null
          lead_type?: Database["public"]["Enums"]["lead_type"] | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          stage?: Database["public"]["Enums"]["company_stage"] | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      Request: {
        Row: {
          additional_info: string | null
          company: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          industry: Database["public"]["Enums"]["industry_type"] | null
          last_name: string | null
          linkedin_url: string | null
          moved_to_pipeline: boolean | null
          phone_number: string | null
          referred_by: string | null
          request_status: string | null
          temp_password: string | null
          title: string | null
        }
        Insert: {
          additional_info?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_name?: string | null
          linkedin_url?: string | null
          moved_to_pipeline?: boolean | null
          phone_number?: string | null
          referred_by?: string | null
          request_status?: string | null
          temp_password?: string | null
          title?: string | null
        }
        Update: {
          additional_info?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_name?: string | null
          linkedin_url?: string | null
          moved_to_pipeline?: boolean | null
          phone_number?: string | null
          referred_by?: string | null
          request_status?: string | null
          temp_password?: string | null
          title?: string | null
        }
        Relationships: []
      }
      terms_of_use: {
        Row: {
          content: string
          created_at: string
          id: number
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      consolidated_leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          has_account: boolean | null
          id: string | null
          industry: Database["public"]["Enums"]["industry_type"] | null
          last_name: string | null
          lead_source: string | null
          phone: string | null
          stage: Database["public"]["Enums"]["contact_stage"] | null
          title: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          has_account?: never
          id?: string | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_name?: string | null
          lead_source?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          title?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          has_account?: never
          id?: string | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_name?: string | null
          lead_source?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          title?: string | null
        }
        Relationships: []
      }
      dinner_requests: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: number | null
          industry: Database["public"]["Enums"]["industry_type"] | null
          interests: string | null
          name: string | null
          phone_number: string | null
          request_status: string | null
          title: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: number | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          interests?: string | null
          name?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: number | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          interests?: string | null
          name?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
        }
        Relationships: []
      }
      forum_requests: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: number | null
          industry: Database["public"]["Enums"]["industry_type"] | null
          interests: string | null
          name: string | null
          phone_number: string | null
          request_status: string | null
          title: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: number | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          interests?: string | null
          name?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: number | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          interests?: string | null
          name?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
        }
        Relationships: []
      }
      leads_with_user_status: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          has_account: boolean | null
          id: string | null
          industry: Database["public"]["Enums"]["industry_type"] | null
          last_login: string | null
          last_name: string | null
          lead_source: string | null
          linkedin_url: string | null
          phone: string | null
          stage: Database["public"]["Enums"]["contact_stage"] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          has_account?: never
          id?: string | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_login?: string | null
          last_name?: string | null
          lead_source?: string | null
          linkedin_url?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          has_account?: never
          id?: string | null
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_login?: string | null
          last_name?: string | null
          lead_source?: string | null
          linkedin_url?: string | null
          phone?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      membership_requests: {
        Row: {
          additional_info: string | null
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          linkedin_url: string | null
          phone_number: string | null
          referred_by: string | null
          request_status: string | null
          title: string | null
        }
        Insert: {
          additional_info?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: never
          last_name?: string | null
          linkedin_url?: string | null
          phone_number?: string | null
          referred_by?: string | null
          request_status?: string | null
          title?: string | null
        }
        Update: {
          additional_info?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: never
          last_name?: string | null
          linkedin_url?: string | null
          phone_number?: string | null
          referred_by?: string | null
          request_status?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_user_account: {
        Args: {
          user_email: string
        }
        Returns: boolean
      }
      infer_industries_from_requests: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      company_stage:
        | "mql_lead"
        | "sql_qualification"
        | "sqo_discovery"
        | "evaluation"
        | "closed_won"
        | "closed_lost"
      contact_stage:
        | "mql_lead"
        | "sql_qualification"
        | "sqo_discovery"
        | "evaluation"
        | "closed_won"
        | "closed_lost"
      industry_type:
        | "manufacturing"
        | "technology"
        | "tourism"
        | "healthcare"
        | "energy"
        | "mining"
        | "logistics"
        | "education"
        | "finance"
        | "real_estate"
        | "agriculture"
        | "water"
        | "defense"
        | "sports"
        | "aerospace"
        | "retail"
        | "creative"
        | "biotech"
        | "construction"
        | "ocean"
      lead_type:
        | "founder_executive"
        | "investor_buyer"
        | "advisor_broker"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
