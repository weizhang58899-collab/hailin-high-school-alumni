import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react'
import { Event, EventFormData } from '../../types/content'

const EventManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    registrationRequired: false,
    maxAttendees: undefined
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    const savedEvents = JSON.parse(localStorage.getItem('alumni_events') || '[]')
    setEvents(savedEvents)
  }

  const saveEvents = (updatedEvents: Event[]) => {
    localStorage.setItem('alumni_events', JSON.stringify(updatedEvents))
    setEvents(updatedEvents)
  }

  const getEventStatus = (eventDate: string): 'upcoming' | 'ongoing' | 'completed' => {
    const now = new Date()
    const eventDateTime = new Date(eventDate)
    
    if (eventDateTime < now) return 'completed'
    if (eventDateTime.toDateString() === now.toDateString()) return 'ongoing'
    return 'upcoming'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const now = new Date().toISOString()
    const eventDateTime = new Date(`${formData.date}T${formData.time}`)
    const status = getEventStatus(eventDateTime.toISOString())
    
    const newEvent: Event = {
      id: currentEvent?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      organizer: formData.organizer,
      imageUrl: formData.imageUrl,
      maxAttendees: formData.maxAttendees,
      currentAttendees: currentEvent?.currentAttendees || 0,
      status,
      registrationRequired: formData.registrationRequired,
      createdAt: currentEvent?.createdAt || now,
      updatedAt: now
    }

    let updatedEvents: Event[]
    if (isEditing && currentEvent) {
      updatedEvents = events.map(item => item.id === currentEvent.id ? newEvent : item)
    } else {
      updatedEvents = [...events, newEvent]
    }

    saveEvents(updatedEvents)
    resetForm()
  }

  const handleEdit = (event: Event) => {
    setCurrentEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      organizer: event.organizer,
      imageUrl: event.imageUrl,
      registrationRequired: event.registrationRequired,
      maxAttendees: event.maxAttendees
    })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个活动吗？')) {
      const updatedEvents = events.filter(item => item.id !== id)
      saveEvents(updatedEvents)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      registrationRequired: false,
      maxAttendees: undefined
    })
    setCurrentEvent(null)
    setIsEditing(false)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return '即将开始'
      case 'ongoing': return '进行中'
      case 'completed': return '已结束'
      case 'cancelled': return '已取消'
      default: return status
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">活动管理</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>创建活动</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? '编辑活动' : '创建活动'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                活动标题 *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入活动标题"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  日期 *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  时间 *
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                地点 *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入活动地点"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                组织者 *
              </label>
              <input
                type="text"
                name="organizer"
                required
                value={formData.organizer}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入组织者名称"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                活动描述 *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入活动描述"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片链接
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="registrationRequired"
                  checked={formData.registrationRequired}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  需要报名
                </label>
              </div>
              
              {formData.registrationRequired && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    最大参与人数
                  </label>
                  <input
                    type="number"
                    name="maxAttendees"
                    min="1"
                    value={formData.maxAttendees || ''}
                    onChange={handleChange}
                    className="ml-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-24"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                {isEditing ? '更新' : '创建'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                活动标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时间地点
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                参与情况
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  暂无活动
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">{event.organizer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(`${event.date}T${event.time}`).toLocaleString('zh-CN')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.registrationRequired ? (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.currentAttendees}/{event.maxAttendees || '∞'}
                      </div>
                    ) : (
                      '自由参与'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventManager