import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-openclaw-key',
}

const EXPECTED_SECRET = Deno.env.get('OPENCLAW_BRIDGE_SECRET') ?? 'openclaw-bridge-secret'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const incomingKey = req.headers.get('x-openclaw-key')
  if (incomingKey !== EXPECTED_SECRET) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()

    if (body.type === 'message') {
      // Upsert conversation
      const { data: existingConv } = await supabase
        .from('openclaw_conversations')
        .select('id')
        .eq('channel', body.channel)
        .eq('contact_identifier', body.contact_identifier)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      let conversationId: string

      if (existingConv) {
        conversationId = existingConv.id
        await supabase
          .from('openclaw_conversations')
          .update({
            last_message_at: new Date().toISOString(),
            status: 'active',
            ...(body.contact_name && { contact_name: body.contact_name }),
            ...(body.agent_name && { current_agent: body.agent_name }),
            updated_at: new Date().toISOString(),
          })
          .eq('id', conversationId)
      } else {
        const { data: newConv, error } = await supabase
          .from('openclaw_conversations')
          .insert({
            channel: body.channel,
            contact_identifier: body.contact_identifier,
            contact_name: body.contact_name ?? null,
            current_agent: body.agent_name ?? null,
            status: 'active',
            last_message_at: new Date().toISOString(),
            metadata: body.metadata ?? null,
          })
          .select('id')
          .single()
        if (error) throw error
        conversationId = newConv.id
      }

      await supabase.from('openclaw_messages').insert({
        conversation_id: conversationId,
        content: body.content ?? null,
        direction: body.direction,
        content_type: body.content_type ?? 'text',
        media_url: body.media_url ?? null,
        processed_by_agent: body.agent_name ?? null,
        metadata: body.metadata ?? null,
      })

      return new Response(JSON.stringify({ ok: true, conversation_id: conversationId }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (body.type === 'lead') {
      const { data, error } = await supabase
        .from('openclaw_leads')
        .insert({
          name: body.name ?? null,
          email: body.email ?? null,
          phone: body.phone ?? null,
          company: body.company ?? null,
          source_channel: body.source_channel ?? null,
          notes: body.notes ?? null,
          status: body.status ?? 'new',
          metadata: body.metadata ?? null,
        })
        .select('id')
        .single()

      if (error) throw error
      return new Response(JSON.stringify({ ok: true, lead_id: data.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (body.type === 'image') {
      const { data, error } = await supabase
        .from('openclaw_images')
        .insert({
          title: body.title,
          prompt: body.prompt,
          status: body.status ?? 'completed',
          media_url: body.media_url ?? null,
          thumbnail_url: body.thumbnail_url ?? null,
          metadata: body.metadata ?? null,
        })
        .select('id')
        .single()

      if (error) throw error
      return new Response(JSON.stringify({ ok: true, image_id: data.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: false, error: 'Unknown type' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('[OPENCLAW-BRIDGE]', err)
    return new Response(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
