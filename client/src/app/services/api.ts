const API_BASE_URL = 'http://localhost:8080/api';

export interface Event {
  id: number;
  name: string;
  club: string;
  date: string;
  description: string;
  regLink: string;
}

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

export async function getEventById(id: number): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return response.json();
}

export async function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
}

export async function deleteEvent(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
}