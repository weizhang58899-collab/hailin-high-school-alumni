import React, { useState } from 'react'
import { Search, Filter, Users, MapPin, Calendar, Building } from 'lucide-react'

const Alumni: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const alumniData = [
    {
      id: 1,
      name: '张三',
      graduationYear: 2010,
      profession: '软件工程师',
      company: '腾讯科技',
      location: '深圳',
      avatar: '/avatar1.jpg'
    },
    {
      id: 2,
      name: '李四',
      graduationYear: 2008,
      profession: '医生',
      company: '海林市人民医院',
      location: '海林',
      avatar: '/avatar2.jpg'
    },
    {
      id: 3,
      name: '王五',
      graduationYear: 2015,
      profession: '教师',
      company: '海林市高级中学',
      location: '海林',
      avatar: '/avatar3.jpg'
    },
    {
      id: 4,
      name: '赵六',
      graduationYear: 2012,
      profession: '建筑师',
      company: '北京建筑设计院',
      location: '北京',
      avatar: '/avatar4.jpg'
    },
    {
      id: 5,
      name: '钱七',
      graduationYear: 2005,
      profession: '企业家',
      company: '创新科技有限公司',
      location: '上海',
      avatar: '/avatar5.jpg'
    },
    {
      id: 6,
      name: '孙八',
      graduationYear: 2018,
      profession: '研究生',
      company: '清华大学',
      location: '北京',
      avatar: '/avatar6.jpg'
    }
  ]

  const graduationYears = Array.from(new Set(alumniData.map(alumni => alumni.graduationYear))).sort((a, b) => b - a)
  const locations = Array.from(new Set(alumniData.map(alumni => alumni.location))).sort()

  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = !selectedYear || alumni.graduationYear === parseInt(selectedYear)
    const matchesLocation = !selectedLocation || alumni.location === selectedLocation
    
    return matchesSearch && matchesYear && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">校友名录</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            寻找同窗好友，了解校友近况，建立联系网络
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="搜索校友姓名、职业或公司..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">所有届别</option>
                    {graduationYears.map(year => (
                      <option key={year} value={year}>{year}届</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">所有地区</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              找到 <span className="font-semibold text-primary-600">{filteredAlumni.length}</span> 位校友
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Filter className="h-4 w-4" />
              <span>筛选条件</span>
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <div key={alumni.id} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{alumni.name}</h3>
                    <p className="text-gray-600">{alumni.graduationYear}届毕业生</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    <span>{alumni.profession} · {alumni.company}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{alumni.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full btn-secondary text-sm">
                    联系校友
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAlumni.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的校友</h3>
              <p className="text-gray-600">请尝试调整搜索条件或筛选条件</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">成为注册校友</h2>
          <p className="text-lg text-primary-100 mb-8">
            注册成为校友会会员，完善您的个人信息，
            让更多校友能够找到您，建立联系网络。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              立即注册
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              了解更多
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Alumni