export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categorie: {
        Row: {
          id: number
          nom: string
        }
        Insert: {
          id?: number
          nom: string
        }
        Update: {
          id?: number
          nom?: string
        }
      }
      produit: {
        Row: {
          categorie: number
          description: string
          detail: string
          distance: number
          id: number
          latitude: number
          lieu: string
          longitude: number
          nom: string
          poids: number
          prix: number
        }
        Insert: {
          categorie: number
          description: string
          detail: string
          distance: number
          id: number
          latitude: number
          lieu: string
          longitude: number
          nom: string
          poids: number
          prix: number
        }
        Update: {
          categorie?: number
          description?: string
          detail?: string
          distance?: number
          id?: number
          latitude?: number
          lieu?: string
          longitude?: number
          nom?: string
          poids?: number
          prix?: number
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
