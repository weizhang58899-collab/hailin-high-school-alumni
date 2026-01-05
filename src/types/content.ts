export interface News {
  id: string
  title: string
  content: string
  author: string
  publishDate: string
  category: string
  imageUrl?: string
  status: 'published' | 'draft'
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  imageUrl?: string
  maxAttendees?: number
  currentAttendees: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  registrationRequired: boolean
  createdAt: string
  updatedAt: string
}

export interface ContentFormData {
  title: string
  content: string
  category: string
  imageUrl?: string
}

export interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  imageUrl?: string
  maxAttendees?: number
  registrationRequired: boolean
}