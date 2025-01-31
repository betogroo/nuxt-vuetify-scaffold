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
      classes: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      document_demand: {
        Row: {
          created_at: string | null
          document_number: string
          id: number
          name: string
          note: string | null
          site: Database["public"]["Enums"]["demand_site"]
          status: Database["public"]["Enums"]["demand_status"]
          type: Database["public"]["Enums"]["demand_type"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_number: string
          id?: number
          name?: string
          note?: string | null
          site: Database["public"]["Enums"]["demand_site"]
          status?: Database["public"]["Enums"]["demand_status"]
          type?: Database["public"]["Enums"]["demand_type"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_number?: string
          id?: number
          name?: string
          note?: string | null
          site?: Database["public"]["Enums"]["demand_site"]
          status?: Database["public"]["Enums"]["demand_status"]
          type?: Database["public"]["Enums"]["demand_type"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      document_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          document_demand_id: number
          id: number
          new_status: Database["public"]["Enums"]["demand_status"]
          old_status: Database["public"]["Enums"]["demand_status"]
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          document_demand_id: number
          id?: number
          new_status: Database["public"]["Enums"]["demand_status"]
          old_status: Database["public"]["Enums"]["demand_status"]
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          document_demand_id?: number
          id?: number
          new_status?: Database["public"]["Enums"]["demand_status"]
          old_status?: Database["public"]["Enums"]["demand_status"]
        }
        Relationships: [
          {
            foreignKeyName: "document_status_history_document_demand_id_fkey"
            columns: ["document_demand_id"]
            isOneToOne: false
            referencedRelation: "document_demand"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_category: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      packaging_unit: {
        Row: {
          created_at: string
          id: number
          name: string
          name_bec: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          name_bec: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          name_bec?: string
        }
        Relationships: []
      }
      product_classes: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      product_unit: {
        Row: {
          created_at: string
          id: string
          product_id: string
          unit_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          unit_id: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_unit_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_unit_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "packaging_unit"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          bec_number: number
          cat_mat: number
          created_at: string
          expense_category_id: number
          id: string
          name: string
          pdm_number: number | null
          product_class_id: number
        }
        Insert: {
          bec_number: number
          cat_mat: number
          created_at?: string
          expense_category_id: number
          id?: string
          name: string
          pdm_number?: number | null
          product_class_id: number
        }
        Update: {
          bec_number?: number
          cat_mat?: number
          created_at?: string
          expense_category_id?: number
          id?: string
          name?: string
          pdm_number?: number | null
          product_class_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_expense_category_id_fkey"
            columns: ["expense_category_id"]
            isOneToOne: false
            referencedRelation: "expense_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_product_class_id_fkey"
            columns: ["product_class_id"]
            isOneToOne: false
            referencedRelation: "product_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_types: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      purchasing_demand_products: {
        Row: {
          created_at: string
          id: string
          item_number: number | null
          price: number | null
          products_id: string
          purchasing_demand_id: number | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          item_number?: number | null
          price?: number | null
          products_id: string
          purchasing_demand_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          item_number?: number | null
          price?: number | null
          products_id?: string
          purchasing_demand_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchasing_demand_products_products_id_fkey"
            columns: ["products_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchasing_demand_products_purchasing_demand_id_fkey"
            columns: ["purchasing_demand_id"]
            isOneToOne: false
            referencedRelation: "purchasing_demands"
            referencedColumns: ["id"]
          },
        ]
      }
      purchasing_demands: {
        Row: {
          contracting_agent_id: string
          created_at: string
          created_by: string | null
          description: string
          id: number
          ptres_number: Database["public"]["Enums"]["ptres_number"]
        }
        Insert: {
          contracting_agent_id: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: number
          ptres_number: Database["public"]["Enums"]["ptres_number"]
        }
        Update: {
          contracting_agent_id?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: number
          ptres_number?: Database["public"]["Enums"]["ptres_number"]
        }
        Relationships: [
          {
            foreignKeyName: "purchasing_demands_contracting_agent_id_fkey"
            columns: ["contracting_agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          class_id: string | null
          created_at: string
          day: number | null
          end_time: string | null
          id: string
          start_time: string
          subject_id: string | null
          teacher_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          day?: number | null
          end_time?: string | null
          id?: string
          start_time: string
          subject_id?: string | null
          teacher_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string
          day?: number | null
          end_time?: string | null
          id?: string
          start_time?: string
          subject_id?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedules_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      support_team: {
        Row: {
          process_id: number
          profile_id: string
        }
        Insert: {
          process_id: number
          profile_id: string
        }
        Update: {
          process_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suport_team_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "purchasing_demands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suport_team_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_availability: {
        Row: {
          created_at: string
          day_of_week: number
          id: string
          is_available: boolean
          teacher_id: string
          time_slot_id: number
        }
        Insert: {
          created_at?: string
          day_of_week: number
          id?: string
          is_available?: boolean
          teacher_id: string
          time_slot_id: number
        }
        Update: {
          created_at?: string
          day_of_week?: number
          id?: string
          is_available?: boolean
          teacher_id?: string
          time_slot_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teacher_availability_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_availability_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string
          end_time: string
          id: number
          is_break: boolean
          name: string
          start_time: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: number
          is_break?: boolean
          name: string
          start_time: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: number
          is_break?: boolean
          name?: string
          start_time?: string
        }
        Relationships: []
      }
      trigger_logs: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_products_demand: {
        Args: {
          purchasing_demand_id: number
        }
        Returns: {
          id: string
          created_at: string
          name: string
          product_class: number
          cat_mat: number
          bec_number: number
          quantity: number
          price: number
          total_price: number
          item_number: number
        }[]
      }
      fetch_purchasing_demands: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          created_at: string
          ptres_number: Database["public"]["Enums"]["ptres_number"]
          description: string
          contracting_agent_id: string
          contracting_agent_name: string
          support_team: Json
        }[]
      }
      get_available_support_team: {
        Args: {
          process_id: number
        }
        Returns: {
          id: string
          name: string
        }[]
      }
      get_designed_support_team: {
        Args: {
          process_id: number
        }
        Returns: {
          id: string
          username: string
          name: string
          updated_at: string
        }[]
      }
      get_purchasing_demand: {
        Args: {
          demand_id: number
        }
        Returns: {
          id: number
          created_at: string
          ptres_number: Database["public"]["Enums"]["ptres_number"]
          description: string
          contracting_agent_id: string
          contracting_agent_name: string
          support_team: Json
        }[]
      }
    }
    Enums: {
      demand_site: "1062-9" | "1342-5"
      demand_status: "new" | "consulted" | "released" | "issued" | "error"
      demand_type: "1cin" | "2cin" | "1v" | "2v" | "2t" | "1ve" | "2ve"
      ptres_number: "180205" | "180211"
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
