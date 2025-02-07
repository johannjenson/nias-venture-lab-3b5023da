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
      checklist_items: {
        Row: {
          completed: boolean | null
          contact_id: string | null
          created_at: string | null
          id: string
          item_text: string
          stage: Database["public"]["Enums"]["contact_stage"]
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          item_text: string
          stage?: Database["public"]["Enums"]["contact_stage"]
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          item_text?: string
          stage?: Database["public"]["Enums"]["contact_stage"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      Contact: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          notes: string | null
          phone: string | null
          source: string | null
          source_id: string | null
          stage: Database["public"]["Enums"]["contact_stage"] | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          source_id?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          source_id?: string | null
          stage?: Database["public"]["Enums"]["contact_stage"] | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      DinnerRequest: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: number
          interests: string | null
          phone_number: string | null
          request_status: string | null
          title: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: never
          interests?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: never
          interests?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
        }
        Relationships: []
      }
      EventRequest: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: number
          interests: string | null
          phone_number: string | null
          request_status: string | null
          title: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          interests?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          interests?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
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
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
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
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          linkedin_url?: string | null
          phone_number?: string | null
          referred_by?: string | null
          request_status?: string | null
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
      dinner_requests: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string | null
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
          id?: never
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
          id?: never
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
          id: string | null
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
          id?: never
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
          id?: never
          interests?: string | null
          name?: string | null
          phone_number?: string | null
          request_status?: string | null
          title?: string | null
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
      [_ in never]: never
    }
    Enums: {
      contact_stage:
        | "mql_lead"
        | "sql_qualification"
        | "sqo_discovery"
        | "evaluation"
        | "closed_won"
        | "closed_lost"
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
