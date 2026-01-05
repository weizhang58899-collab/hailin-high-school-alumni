import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react'
import { Event } from '../types/content'

const Events: React.FC = () => {
  const [filterType, setFilterType] = useState('all')
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredEvents(events.filter(event => event.status === 'upcoming' || event.status === 'ongoing'))
    } else {
      setFilteredEvents(events.filter(event => 
        (event.status === 'upcoming' || event.status === 'ongoing') && 
        event.category === filterType
      ))
    }
  }, [events, filterType])

  const loadEvents = () => {
    const savedEvents = JSON.parse(localStorage.getItem('alumni_events') || '[]')
    if (savedEvents.length > 0) {
      setEvents(savedEvents)
    } else {
      // 默认活动数据，当没有管理员创建的活动时显示
      const defaultEvents: Event[] = [
        {
          id: '1',
          title: '2024年度校友大会',
          description: '年度校友大会，总结过去一年工作，规划未来发展，欢迎各位校友参加。',
          date: '2024-12-15',
          time: '14:00 - 17:00',
          location: '海林市高级中学礼堂',
          organizer: '校友会',
          currentAttendees: 0,
          status: 'upcoming',
          registrationRequired: true,
          category: 'meeting',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: '校友篮球友谊赛',
          description: '校友篮球友谊赛，增进校友情谊，重温校园时光。',
          date: '2024-11-20',
          time: '09:00 - 12:00',
          location: '海林市体育馆',
          organizer: '体育部',
          currentAttendees: 0,
          status: 'completed',
          registrationRequired: true,
          category: 'sports',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setEvents(defaultEvents)
    }
  }

  const getEventTypeLabel = (category: string) => {
    const eventTypes = [
      { value: 'meeting', label: '会议聚会' },
      { value: 'sports', label: '体育活动' },
      { value: 'visit', label: '企业参观' },
      { value: 'ceremony', label: '仪式庆典' },
      { value: 'lecture', label: '讲座分享' },
      { value: 'social', label: '社交活动' }
    ]
    return eventTypes.find(t => t.value === category)?.label || category
  }

  const getEventTypeColor = (category: string) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800',
      sports: 'bg-green-100 text-green-800',
      visit: 'bg-purple-100 text-purple-800',
      ceremony: 'bg-yellow-100 text-yellow-800',
      lecture: 'bg-red-100 text-red-800',
      social: 'bg-pink-100 text-pink-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // filteredEvents is already handled by useEffect above

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">活动通知</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            了解最新校友活动，参与精彩聚会，重温校园情谊
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">活动列表</h2>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">即将举行的活动</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="card border-l-4 border-primary-500 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.category)}`}>
                        {getEventTypeLabel(event.category)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                        <Clock className="h-4 w-4 ml-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>参与人数：{event.currentAttendees}人{event.maxAttendees && ` / ${event.maxAttendees}人`}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="flex space-x-3">
                      {event.registrationRequired && (
                        <button className="btn-primary text-sm">立即报名</button>
                      )}
                      <button className="btn-secondary text-sm">查看详情</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">往期活动回顾</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <div key={event.id} className="card hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.category)}`}>
                        {getEventTypeLabel(event.category)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>参与人数：{event.currentAttendees}人{event.maxAttendees && ` / ${event.maxAttendees}人`}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                    
                    <button className="btn-secondary text-sm w-full">查看活动照片</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无相关活动</h3>
              <p className="text-gray-600">请尝试调整筛选条件</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">发起校友活动</h2>
          <p className="text-lg text-primary-100 mb-8">
            如果您有好的活动想法，欢迎联系我们发起新的校友活动，
            让更多校友参与其中，共同创造美好回忆。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              发起活动
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              联系我们
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events