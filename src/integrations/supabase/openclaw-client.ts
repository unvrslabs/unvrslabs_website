import { createClient } from '@supabase/supabase-js'

// Separate Supabase project for OpenClaw data (vchphqgboulxhuphjkbd)
export const openclawSupabase = createClient(
  'https://vchphqgboulxhuphjkbd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjaHBocWdib3VseGh1cGhqa2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NzA1ODksImV4cCI6MjA4NDE0NjU4OX0.EJYrFycxMcR6EN3G4synGCcISh1m5PowoVPNDY_bIFo'
)

export const OPENCLAW_BRIDGE_URL = 'https://vchphqgboulxhuphjkbd.supabase.co/functions/v1/openclaw-bridge'
export const OPENCLAW_BRIDGE_SECRET = 'openclaw-bridge-secret'
