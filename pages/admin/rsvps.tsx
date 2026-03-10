import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { supabase, RSVP } from '@/lib/supabase'

export default function Admin() {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRsvps()
  }, [])

  const loadRsvps = async () => {
    try {
      if (!supabase) {
        throw new Error('Supabase not configured')
      }
      
      const { data, error } = await supabase
        .from('meetup_rsvps')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setRsvps(data || [])
    } catch (err) {
      console.error('Error loading RSVPs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Has Guest', 'Dietary Restrictions', 'Date'],
      ...rsvps.map(rsvp => [
        rsvp.name,
        rsvp.email,
        rsvp.has_guest ? 'Yes' : 'No',
        rsvp.dietary_restrictions || 'None',
        new Date(rsvp.created_at || '').toLocaleDateString(),
      ]),
    ]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `openclaw-meetup-rsvps-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const handleCopyEmails = () => {
    const emails = rsvps.map(rsvp => rsvp.email).join(', ')
    navigator.clipboard.writeText(emails).then(() => {
      alert(`COPIED ${rsvps.length} EMAILS TO CLIPBOARD`)
    }).catch(() => {
      alert('FAILED TO COPY EMAILS')
    })
  }

  return (
    <>
      <Head>
        <title>RSVP Admin - DC OpenClaw Meetup</title>
      </Head>

      <div className="min-h-screen bg-arcade-dark text-arcade-yellow scanlines font-mono">
        <header className="border-b-8 border-arcade-yellow py-6 bg-black">
          <div className="container mx-auto px-4">
            <h1 className="arcade-title text-4xl mb-2 uppercase">ADMIN PANEL</h1>
            <p className="arcade-title text-lg uppercase">RSVP MANAGEMENT SYSTEM</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
            <div className="arcade-card text-center uppercase">
              <p className="text-sm opacity-80 mb-2">TOTAL RSVPS</p>
              <p className="text-5xl font-bold">{rsvps.length}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8 flex gap-4 flex-wrap">
            <button
              onClick={loadRsvps}
              className="arcade-button uppercase"
            >
              REFRESH
            </button>
            <button
              onClick={handleExport}
              className="arcade-button uppercase"
              disabled={rsvps.length === 0}
            >
              EXPORT CSV
            </button>
            <button
              onClick={handleCopyEmails}
              className="arcade-button uppercase"
              disabled={rsvps.length === 0}
            >
              COPY ALL EMAILS
            </button>
            <a href="/" className="arcade-button uppercase">
              BACK
            </a>
          </div>

          {/* RSVP Table */}
          <div className="arcade-card overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6 border-b-4 border-arcade-yellow pb-2 uppercase">
              RSVP LIST
            </h2>

            {loading ? (
              <p className="text-center py-8 uppercase">LOADING RSVPS...</p>
            ) : rsvps.length === 0 ? (
              <p className="text-center py-8 uppercase">NO RSVPS YET. COME BACK LATER!</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-arcade-yellow uppercase">
                    <th className="text-left py-2 px-2">NAME</th>
                    <th className="text-left py-2 px-2">EMAIL</th>
                    <th className="text-left py-2 px-2">RSVP'D</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp, idx) => (
                    <tr key={idx} className="border-b-2 border-arcade-black hover:bg-black/30 uppercase">
                      <td className="py-3 px-2 font-bold">{rsvp.name}</td>
                      <td className="py-3 px-2 opacity-80">{rsvp.email}</td>
                      <td className="py-3 px-2 opacity-60 text-xs">
                        {new Date(rsvp.created_at || '').toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        <footer className="border-t-8 border-arcade-yellow mt-16 py-6 bg-black text-center text-sm uppercase">
          <p>OPENCLAW MEETUP ADMIN • MARCH 12, 2026</p>
        </footer>
      </div>
    </>
  )
}
