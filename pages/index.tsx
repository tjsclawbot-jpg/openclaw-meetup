import React, { useState } from 'react'
import Head from 'next/head'
import { supabase, RSVP } from '@/lib/supabase'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    has_guest: false,
    dietary_restrictions: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!supabase) {
        throw new Error('Supabase not configured')
      }
      
      const { error: insertError } = await supabase
        .from('meetup_rsvps')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            has_guest: formData.has_guest,
            dietary_restrictions: formData.dietary_restrictions || null,
          },
        ])

      if (insertError) throw insertError

      setSubmitted(true)
      setFormData({ name: '', email: '', has_guest: false, dietary_restrictions: '' })
    } catch (err) {
      setError('Error submitting RSVP. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>OpenClaw Meetup - Workhorse Collective</title>
        <meta name="description" content="OpenClaw Demo & Networking at Workhorse Collective" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-arcade-dark text-arcade-yellow scanlines">
        {/* Arcade Header */}
        <header className="border-b-8 border-arcade-yellow py-8 bg-black">
          <div className="container mx-auto px-4">
            <h1 className="arcade-title text-4xl md:text-6xl mb-2">OPENCLAW</h1>
            <p className="arcade-title text-xl">DEMO & NETWORKING</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Event Info Card */}
              <div className="arcade-card">
                <div className="mb-6">
                  <h2 className="text-2xl font-arcade mb-4 border-b-4 border-arcade-yellow pb-2">
                    EVENT DETAILS
                  </h2>
                  <div className="space-y-4 font-mono">
                    <div>
                      <p className="text-sm opacity-80">DATE</p>
                      <p className="text-xl font-bold">THU MAR 12, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">TIME</p>
                      <p className="text-xl font-bold">5:30 PM - 7:30 PM</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">LOCATION</p>
                      <p className="text-lg font-bold">
                        Workhorse Collective<br />
                        320 3rd St NE (Rear)<br />
                        Washington, DC
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect Card */}
              <div className="arcade-card">
                <div>
                  <h2 className="text-2xl font-arcade mb-4 border-b-4 border-arcade-yellow pb-2">
                    WHAT'S HAPPENING
                  </h2>
                  <ul className="space-y-3 font-mono text-sm">
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>OpenClaw platform intro & demo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>See agents, automation, AI workflows</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>Network with builders & AI enthusiasts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>Learn from real-world implementations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>Refreshments & good vibes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* RSVP Section */}
          <section className="max-w-2xl mx-auto mb-16">
            <div className="arcade-card">
              <h2 className="text-3xl font-arcade mb-8 border-b-4 border-arcade-yellow pb-4 text-center">
                RSVP
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-2xl font-bold mb-4">✓ CONFIRMED!</p>
                  <p className="font-mono text-lg mb-4">
                    Thanks for RSVPing. See you Thursday!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="arcade-button text-sm"
                  >
                    RSVP ANOTHER GUEST
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="arcade-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="arcade-input"
                    />
                  </div>

                  <div>
                    <label className="flex items-center font-bold mb-4">
                      <input
                        type="checkbox"
                        name="has_guest"
                        checked={formData.has_guest}
                        onChange={handleChange}
                        className="mr-3 w-5 h-5"
                      />
                      <span>Bringing +1 Guest?</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">DIETARY RESTRICTIONS</label>
                    <textarea
                      name="dietary_restrictions"
                      value={formData.dietary_restrictions}
                      onChange={handleChange}
                      placeholder="(Optional) Vegan, gluten-free, etc."
                      className="arcade-input h-20 resize-none"
                    />
                  </div>

                  {error && <p className="text-red-400 font-bold">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`arcade-button w-full text-lg font-bold ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'SUBMITTING...' : 'CONFIRM RSVP'}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Admin Link */}
          <div className="text-center">
            <a
              href="/admin/rsvps"
              className="text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              [admin]
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t-8 border-arcade-yellow mt-16 py-8 bg-black text-center font-mono text-sm">
          <p>Hosted by Workhorse Collective</p>
          <p className="opacity-60">OpenClaw Demo • March 12, 2026</p>
        </footer>
      </div>
    </>
  )
}
