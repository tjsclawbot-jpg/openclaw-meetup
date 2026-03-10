import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase not configured' })
    }

    const { name, email, has_guest, dietary_restrictions } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    const { error } = await supabase
      .from('meetup_rsvps')
      .insert([
        {
          name,
          email,
          has_guest: has_guest || false,
          dietary_restrictions: dietary_restrictions || null,
        },
      ])

    if (error) throw error

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to submit RSVP' })
  }
}
