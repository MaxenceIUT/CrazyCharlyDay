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
      commande: {
        Row: {
          idCM: number
          idUser: string | null
          termine: boolean
        }
        Insert: {
          idCM?: number
          idUser?: string | null
          termine?: boolean
        }
        Update: {
          idCM?: number
          idUser?: string | null
          termine?: boolean
        }
      }
      panier: {
        Row: {
          id_commande: number
          id_produit: number
          quantite: number | null
        }
        Insert: {
          id_commande?: number
          id_produit: number
          quantite?: number | null
        }
        Update: {
          id_commande?: number
          id_produit?: number
          quantite?: number | null
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
      profile: {
        Row: {
          admin: boolean
          id: string
          nom: string | null
          prenom: string | null
          telephone: string | null
        }
        Insert: {
          admin?: boolean
          id: string
          nom?: string | null
          prenom?: string | null
          telephone?: string | null
        }
        Update: {
          admin?: boolean
          id?: string
          nom?: string | null
          prenom?: string | null
          telephone?: string | null
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
