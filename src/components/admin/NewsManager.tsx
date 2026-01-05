import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { News, ContentFormData } from '../../types/content'

const NewsManager: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentNews, setCurrentNews] = useState<News | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    content: '',
    category: 'general'
  })

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = () => {
    const savedNews = JSON.parse(localStorage.getItem('alumni_news') || '[]')
    setNews(savedNews)
  }

  const saveNews = (updatedNews: News[]) => {
    localStorage.setItem('alumni_news', JSON.stringify(updatedNews))
    setNews(updatedNews)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const now = new Date().toISOString()
    const newNews: News = {
      id: currentNews?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      author: '管理员', // 实际应用中应该从认证信息获取
      publishDate: now,
      category: formData.category,
      imageUrl: formData.imageUrl,
      status: 'published',
      createdAt: currentNews?.createdAt || now,
      updatedAt: now
    }

    let updatedNews: News[]
    if (isEditing && currentNews) {
      updatedNews = news.map(item => item.id === currentNews.id ? newNews : item)
    } else {
      updatedNews = [...news, newNews]
    }

    saveNews(updatedNews)
    resetForm()
  }

  const handleEdit = (newsItem: News) => {
    setCurrentNews(newsItem)
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      category: newsItem.category,
      imageUrl: newsItem.imageUrl
    })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条新闻吗？')) {
      const updatedNews = news.filter(item => item.id !== id)
      saveNews(updatedNews)
    }
  }

  const toggleStatus = (id: string) => {
    const updatedNews = news.map(item => 
      item.id === id ? { ...item, status: item.status === 'published' ? 'draft' : 'published' } : item
    )
    saveNews(updatedNews)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'general'
    })
    setCurrentNews(null)
    setIsEditing(false)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">新闻管理</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>发布新闻</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? '编辑新闻' : '发布新闻'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标题 *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入新闻标题"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类 *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">一般新闻</option>
                <option value="alumni">校友动态</option>
                <option value="school">学校新闻</option>
                <option value="event">活动通知</option>
              </select>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                内容 *
              </label>
              <textarea
                name="content"
                required
                rows={6}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入新闻内容"
              />
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                {isEditing ? '更新' : '发布'}
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
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                发布时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  暂无新闻
                </td>
              </tr>
            ) : (
              news.map((newsItem) => (
                <tr key={newsItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{newsItem.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {newsItem.category === 'general' ? '一般新闻' :
                     newsItem.category === 'alumni' ? '校友动态' :
                     newsItem.category === 'school' ? '学校新闻' : '活动通知'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      newsItem.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {newsItem.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(newsItem.publishDate).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => toggleStatus(newsItem.id)}
                      className="text-gray-600 hover:text-gray-900"
                      title={newsItem.status === 'published' ? '设为草稿' : '发布'}
                    >
                      {newsItem.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(newsItem)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(newsItem.id)}
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

export default NewsManager