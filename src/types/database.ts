// =============================================================================
// Hand-rolled Database-Typen, Shape-kompatibel mit `supabase gen types --linked`.
// Sobald das Supabase-Cloud-Projekt steht und `pnpm gen:types` lief, wird diese
// Datei automatisch ueberschrieben.
// =============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          slug: string;
          status: "draft" | "published" | "archived";
          published_at: string | null;
          cover_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          status?: "draft" | "published" | "archived";
          published_at?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          status?: "draft" | "published" | "archived";
          published_at?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      post_translations: {
        Row: {
          post_id: string;
          locale: "de" | "en";
          title: string;
          excerpt: string | null;
          body_md: string;
        };
        Insert: {
          post_id: string;
          locale: "de" | "en";
          title: string;
          excerpt?: string | null;
          body_md: string;
        };
        Update: {
          post_id?: string;
          locale?: "de" | "en";
          title?: string;
          excerpt?: string | null;
          body_md?: string;
        };
      };
      events: {
        Row: {
          id: string;
          slug: string;
          starts_at: string;
          ends_at: string | null;
          location: string | null;
          registration_url: string | null;
          status: "upcoming" | "past" | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          starts_at: string;
          ends_at?: string | null;
          location?: string | null;
          registration_url?: string | null;
          status?: "upcoming" | "past" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          starts_at?: string;
          ends_at?: string | null;
          location?: string | null;
          registration_url?: string | null;
          status?: "upcoming" | "past" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
      };
      event_translations: {
        Row: {
          event_id: string;
          locale: "de" | "en";
          title: string;
          description_md: string | null;
        };
        Insert: {
          event_id: string;
          locale: "de" | "en";
          title: string;
          description_md?: string | null;
        };
        Update: {
          event_id?: string;
          locale?: "de" | "en";
          title?: string;
          description_md?: string | null;
        };
      };
      faqs: {
        Row: {
          id: string;
          position: number;
          category: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          position?: number;
          category?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          position?: number;
          category?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      faq_translations: {
        Row: {
          faq_id: string;
          locale: "de" | "en";
          question: string;
          answer_md: string;
        };
        Insert: {
          faq_id: string;
          locale: "de" | "en";
          question: string;
          answer_md: string;
        };
        Update: {
          faq_id?: string;
          locale?: "de" | "en";
          question?: string;
          answer_md?: string;
        };
      };
      partners: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          website_url: string | null;
          lat: number | null;
          lng: number | null;
          status: "partner" | "pilot" | "interested";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          website_url?: string | null;
          lat?: number | null;
          lng?: number | null;
          status?: "partner" | "pilot" | "interested";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          website_url?: string | null;
          lat?: number | null;
          lng?: number | null;
          status?: "partner" | "pilot" | "interested";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Enums: {
      locale: "de" | "en";
    };
  };
};
