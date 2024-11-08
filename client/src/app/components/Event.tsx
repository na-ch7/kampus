import Link from 'next/link'

export interface EventProps {
  id: number
  name: string
  club: string
  date: string //check later
  description: string
  regLink: string
}

export default function Event({ id, name, club, description, date, regLink}: EventProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-2">{club}</p>
      <p className="text-gray-700 mb-2">{date}</p>
      <p className="text-gray-600 mb-2 line-clamp-3">{description}</p>
 
      <a
        href={regLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      ></a>
      
      <Link href={`/events/${id}`} className="text-blue-600 hover:text-blue-700">
        View Details
      </Link>
    </div>
  )
}
