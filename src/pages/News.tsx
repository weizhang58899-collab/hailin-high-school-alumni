import React, { useState, useEffect } from 'react'
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react'
import { News as NewsType } from '../types/content'

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsType[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    loadNews()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(newsItems.filter(item => item.status === 'published'))
    } else {
      setFilteredNews(newsItems.filter(item => 
        item.status === 'published' && item.category === selectedCategory
      ))
    }
  }, [newsItems, selectedCategory])

  const loadNews = () => {
    const savedNews = JSON.parse(localStorage.getItem('alumni_news') || '[]')
    setNewsItems(savedNews)
  }

  const categories = [
    { value: 'all', label: '全部新闻' },
    { value: 'general', label: '一般新闻' },
    { value: 'alumni', label: '校友动态' },
    { value: 'school', label: '学校新闻' },
    { value: 'event', label: '活动通知' }
  ]

  const getCategoryLabel = (category: string) => {
    const found = categories.find(c => c.value === category)
    return found ? found.label : category
  }

  // 如果没有管理员发布的新闻，显示默认内容
  const defaultNews: NewsType[] = [
    {
      id: '1',
      title: '2024年度校友大会圆满举行',
      content: '来自全国各地的200余名校友齐聚母校，共同庆祝海林市高级中学建校66周年。大会回顾了过去一年的工作成果，并制定了新一年的发展计划。',
      author: '校友会秘书处',
      publishDate: '2024-12-15',
      category: 'alumni',
      status: 'published',
      createdAt: '2024-12-15',
      updatedAt: '2024-12-15'
    },
    {
      id: '2',
      title: '校友捐赠图书馆改造项目启动',
      content: '由85届校友发起，筹集资金200万元用于图书馆现代化改造。项目将全面提升图书馆的硬件设施和数字化水平。',
      author: '发展委员会',
      publishDate: '2024-11-20',
      category: 'event',
      status: 'published',
      createdAt: '2024-11-20',
      updatedAt: '2024-11-20'
    }
  ]

  const displayNews = filteredNews.length > 0 ? filteredNews : defaultNews

  const featuredNews = newsItems.filter(item => item.featured)
  const regularNews = newsItems.filter(item => !item.featured)

  const dynamicCategories = Array.from(new Set(newsItems.map(item => item.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">新闻动态</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            关注母校发展，了解校友成就，掌握最新动态
          </p>
        </div>
      </div>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">重点新闻</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((news) => (
                <div key={news.id} className="card hover:shadow-lg transition-shadow duration-300 group">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Newspaper className="h-12 w-12 text-gray-400" />
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                      {news.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {news.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {news.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    {news.author}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                  
                  <button className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    阅读全文
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">最新动态</h2>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium">
              全部
            </button>
            {categories.map((category) => (
              <button key={category} className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((news) => (
              <div key={news.id} className="card hover:shadow-lg transition-shadow duration-300 group">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    {news.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {news.date}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {news.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <User className="h-4 w-4 mr-1" />
                  {news.author}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{news.excerpt}</p>
                
                <button className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
                  阅读全文
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="btn-secondary">
              加载更多新闻
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">订阅新闻简报</h2>
          <p className="text-lg text-primary-100 mb-8">
            定期接收校友会最新动态和活动通知，不错过任何重要信息
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="请输入您的邮箱地址"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-r-lg transition-colors duration-200">
                订阅
              </button>
            </div>
            <p className="text-sm text-primary-200 mt-2">
              我们承诺不会泄露您的邮箱信息
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default News