import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User } from '../types/auth'
import { News, Event } from '../types/content'
import NewsManager from '../components/admin/NewsManager'
import EventManager from '../components/admin/EventManager'

const AdminDashboard: React.FC = () => {
  const { user, logout, approveAlumni, rejectAlumni } = useAuth()
  const [pendingUsers, setPendingUsers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState<'pending' | 'users' | 'content'>('pending')

  useEffect(() => {
    loadPendingUsers()
  }, [])

  const loadPendingUsers = () => {
    const pending = JSON.parse(localStorage.getItem('alumni_pending_users') || '[]')
    setPendingUsers(pending)
  }

  const handleApprove = (userId: string) => {
    approveAlumni(userId)
    loadPendingUsers()
  }

  const handleReject = (userId: string) => {
    rejectAlumni(userId)
    loadPendingUsers()
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">权限不足</h2>
          <p>您需要管理员权限才能访问此页面</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">管理员控制台</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">欢迎，{user.name}</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            待审核校友 ({pendingUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'news'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            新闻管理
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'events'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            活动管理
          </button>
        </nav>
      </div>

      {activeTab === 'pending' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">待审核校友申请</h2>
          {pendingUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">暂无待审核的校友申请</p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      姓名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      邮箱
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      毕业年份
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      申请时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingUsers.map((pendingUser) => (
                    <tr key={pendingUser.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pendingUser.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pendingUser.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pendingUser.graduationYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(pendingUser.createdAt).toLocaleDateString('zh-CN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleApprove(pendingUser.id)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          通过
                        </button>
                        <button
                          onClick={() => handleReject(pendingUser.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          拒绝
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'news' && (
        <NewsManager />
      )}

      {activeTab === 'events' && (
        <EventManager />
      )}
    </div>
  )
}

export default AdminDashboard