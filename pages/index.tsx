import React, { useState } from 'react'
import Head from 'next/head'
import { supabase, RSVP } from '@/lib/supabase'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        throw new Error('Supabase not configured. Check environment variables.')
      }
      
      const { error: insertError, data } = await supabase
        .from('meetup_rsvps')
        .insert([
          {
            name: formData.name,
            email: formData.email,
          },
        ])
        .select()

      if (insertError) {
        console.error('Supabase insert error:', insertError)
        throw new Error(insertError.message || 'Failed to insert RSVP')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '' })
    } catch (err: any) {
      const errorMsg = err?.message || 'Error submitting RSVP. Please try again.'
      setError(errorMsg)
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>DC OpenClaw Meetup - Workhorse Collective</title>
        <meta name="description" content="OpenClaw Demo & Networking at Workhorse Collective" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-arcade-dark text-arcade-yellow scanlines">
        {/* Arcade Header */}
        <header className="border-b-8 border-arcade-yellow py-8 bg-black">
          <div className="container mx-auto px-4">
            <h1 className="arcade-title text-4xl md:text-6xl mb-2">DC OPENCLAW MEETUP</h1>
            <p className="arcade-title text-xl">DEMO & NETWORKING</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* Hero Background Images Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Studio Sign Image */}
              <div 
                className="hero-bg halftone rounded-lg border-4 border-arcade-yellow"
                style={{
                  backgroundImage: "url('/studio-sign.jpg')",
                  height: '300px'
                }}
              />

              {/* Studio Interior Image */}
              <div 
                className="hero-bg halftone rounded-lg border-4 border-arcade-yellow"
                style={{
                  backgroundImage: "url('/studio-interior.jpg')",
                  height: '300px'
                }}
              />
            </div>
          </section>

          {/* Event Info Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Event Info Card */}
              <div className="arcade-card">
                <div className="mb-6">
                  <h2 className="text-2xl font-arcade mb-4 border-b-4 border-arcade-yellow pb-2 uppercase">
                    EVENT DETAILS
                  </h2>
                  <div className="space-y-4 font-mono uppercase">
                    <div>
                      <p className="text-sm opacity-80">DATE</p>
                      <p className="text-xl font-bold">THU MAR 12, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">TIME</p>
                      <p className="text-xl font-bold">5:30 PM - 7:30 PM</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 uppercase">LOCATION</p>
                      <a 
                        href="https://www.google.com/maps/search/320+3rd+St+NE,+Washington+DC" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-arcade-yellow hover:underline"
                      >
                        WORKHORSE COLLECTIVE<br />
                        320 3rd ST NE (REAR)<br />
                        WASHINGTON, DC
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect Card */}
              <div className="arcade-card">
                <div>
                  <h2 className="text-2xl font-arcade mb-4 border-b-4 border-arcade-yellow pb-2 uppercase">
                    THE VIBE
                  </h2>
                  <ul className="space-y-3 font-mono text-sm uppercase">
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>OPEN-ENDED GATHERING. NO FORMAL PRESENTATION.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>SHOW OFF WHAT YOU'VE BUILT WITH OPENCLAW</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>TALK WITH PEOPLE EXPERIMENTING WITH AGENTS & AI</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>HAPPY HOUR. GOOD PEOPLE. GOOD TECH TALK.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3">▶</span>
                      <span>FIRST ONE. FIGURING IT OUT TOGETHER.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* RSVP Section */}
          <section className="max-w-2xl mx-auto mb-16">
            <div className="arcade-card">
              <h2 className="text-3xl font-arcade mb-8 border-b-4 border-arcade-yellow pb-4 text-center uppercase">
                RSVP
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-2xl font-bold mb-4">✓ CONFIRMED!</p>
                  <p className="font-mono text-lg mb-4 uppercase">
                    THANKS FOR RSVPING. SEE YOU THURSDAY!
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
                    <label className="block text-sm font-bold mb-2 uppercase">NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ENTER YOUR NAME"
                      required
                      className="arcade-input uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="YOUR@EMAIL.COM"
                      required
                      className="arcade-input"
                    />
                  </div>

                  {error && <p className="text-red-400 font-bold uppercase">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`arcade-button w-full text-lg font-bold uppercase ${
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
              className="text-sm opacity-60 hover:opacity-100 transition-opacity uppercase"
            >
              [ADMIN]
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t-8 border-arcade-yellow mt-16 py-8 bg-black text-center font-mono text-sm uppercase">
          <p>
            HOSTED BY{' '}
            <a 
              href="https://www.google.com/maps/search/320+3rd+St+NE,+Washington+DC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-arcade-yellow hover:underline"
            >
              WORKHORSE COLLECTIVE
            </a>
          </p>
          <p className="opacity-60">OPENCLAW DEMO • MARCH 12, 2026</p>
        </footer>
      </div>
    </>
  )
}
