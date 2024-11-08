'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getEventById } from '../../services/api'

interface Event {
  id: number
  name: string
  club: string
  date: string
  description: string
  regLink: string
}

export default function EventDetails() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams();
  const eventId = params.id as unknown as number;

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) {
        setError('Invalid event ID.')
        setLoading(false)
        return
      }

      try {
        const data = await getEventById(eventId)
        setEvent(data)
      } catch (err) {
        setError('Failed to load event details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [eventId])

  if (loading) return <p>Loading event details...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="max-w-md mx-auto p-4">
      {event ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
          <p><strong>Club:</strong> {event.club}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Registration Link:</strong> <a href={event.regLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">{event.regLink}</a></p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Events
          </button>
        </>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  )
}
