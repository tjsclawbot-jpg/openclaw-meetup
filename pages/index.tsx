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
        <meta name="description" content="Join us for an open-ended happy hour gathering. Show off what you've built with OpenClaw and talk with people experimenting with AI and Agentic coding." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Meta Tags for Social Media Preview */}
        <meta property="og:title" content="DC OpenClaw Meetup" />
        <meta property="og:description" content="Join us for the first of an open-ended happy hour gathering with no formal presentation. Thursday, March 12, 6-8 PM at Workhorse Collective, Washington DC." />
        <meta property="og:image" content="https://openclaw-meetup.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://openclaw-meetup.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DC OpenClaw Meetup" />
        <meta name="twitter:description" content="Join us Thursday, March 12, 6-8 PM at Workhorse Collective" />
        <meta name="twitter:image" content="https://openclaw-meetup.vercel.app/og-image.jpg" />
      </Head>

      <div 
        className="min-h-screen bg-arcade-dark text-arcade-yellow scanlines"
        style={{
          backgroundImage: "url('/pattern-isometric.jpg')",
          backgroundSize: '750px 750px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Arcade Header with Pattern Background */}
        <header 
          className="relative overflow-hidden py-32"
          style={{
            backgroundImage: "url('/pattern-isometric.jpg')",
            backgroundSize: '600px 600px',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 
              className="font-arcade text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-arcade-yellow"
              style={{
                textShadow: 'none', 
                wordSpacing: '9999px',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                padding: '0.3em 0.25em',
                lineHeight: '1.2',
                display: 'inline',
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone'
              }}
            >DC OPENCLAW MEETUP</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
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
                      <p className="text-xl font-bold">6:00 PM - 8:00 PM</p>
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
                  <p className="font-mono text-base uppercase leading-relaxed mb-4">
                    Join us for the first of an open-ended happy hour gathering with no formal presentation. We invite you to show off what you've built with OpenClaw and talk with people experimenting with AI and Agentic coding.
                  </p>
                  <p className="font-mono text-base uppercase leading-relaxed">
                    Workhorse Collective is a space for experimentation, collaboration, and pushing what's possible with Frontier Agentic models. This is where builders, designers, and thinkers come together and talk shop.
                  </p>
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


        </main>

        {/* Footer */}
        <footer className="mt-16 py-8 bg-black text-center font-mono text-sm uppercase">
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
          <p className="opacity-60 mb-6">OPENCLAW DEMO • MARCH 12, 2026</p>

          {/* Tech Stack */}
          <div className="border-t border-arcade-yellow pt-4 mt-6">
            <p className="text-xs opacity-60 mb-3">BUILT WITH</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs opacity-75">
              <div>
                <p className="font-bold text-arcade-yellow">FRONTEND</p>
                <p>Next.js + React</p>
                <p>TypeScript</p>
                <p>Tailwind CSS</p>
              </div>
              <div>
                <p className="font-bold text-arcade-yellow">BACKEND</p>
                <p>Supabase</p>
                <p>PostgreSQL</p>
              </div>
              <div>
                <p className="font-bold text-arcade-yellow">HOSTING</p>
                <p>Vercel</p>
              </div>
              <div>
                <p className="font-bold text-arcade-yellow">DESIGN</p>
                <p>Press Start 2P</p>
                <p>Arcade Theme</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
