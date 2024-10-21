'use client'

import { useState, useEffect } from 'react'
import Event from './components/Event'
import { getAllEvents, Event as EventType } from './services/api'

export default function Home() {
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const fetchedEvents = await getAllEvents()
        setEvents(fetchedEvents)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch events. Please try again later.')
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (loading) return <div className="text-center text-2xl">Loading...</div>
  if (error) return <div className="text-center text-2xl text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <Event key={event.id} {...event} />
        ))}
      </div>
    </div>
  )
}
