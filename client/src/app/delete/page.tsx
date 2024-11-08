'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllEvents, deleteEvent } from '../services/api'

interface Event {
  id: number
  name: string
  club: string
  date: string
}

export default function DeleteEvent() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getAllEvents()
        setEvents(data)
      } catch (err) {
        setError('Failed to load events. Please try again.')
      }
    }
    loadEvents()
  }, [])

  const handleDelete = async (eventId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?')
    if (!confirmDelete) return

    setLoading(true)
    setError(null)
    try {
      await deleteEvent(eventId)
      alert('Event deleted successfully!')
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))
      router.push('/') // Redirect if needed, or remove if staying on the page
    } catch (err) {
      setError('Failed to delete event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delete Event</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <p>Loading events...</p>}

      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md mx-auto">
              <div className="mb-4">
                <p className="text-xl font-semibold">{event.name}</p>
                <p>Club: {event.club}</p>
                <p>Date: {event.date}</p>
              </div>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  )
}
