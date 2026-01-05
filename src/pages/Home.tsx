import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Calendar, Newspaper, School, ArrowRight, Award, HeartHandshake } from 'lucide-react'

const Home: React.FC = () => {
  const stats = [
    { label: '注册校友', value: '5000+', icon: Users },
    { label: '年度活动', value: '50+', icon: Calendar },
    { label: '新闻动态', value: '200+', icon: Newspaper },
    { label: '建校年份', value: '1958', icon: School },
  ]

  const features = [
    {
      title: '校友名录',
      description: '查看历届校友信息，寻找同窗好友',
      icon: Users,
      link: '/alumni'
    },
    {
      title: '活动通知',
      description: '了解最新校友活动，参与精彩聚会',
      icon: Calendar,
      link: '/events'
    },
    {
      title: '新闻动态',
      description: '关注母校发展，了解校友成就',
      icon: Newspaper,
      link: '/news'
    },
    {
      title: '校友捐赠',
      description: '支持母校建设，助力教育发展',
      icon: HeartHandshake,
      link: '/about'
    }
  ]

  const recentNews = [
    {
      title: '2024年度校友大会圆满举行',
      date: '2024-12-15',
      excerpt: '来自全国各地的200余名校友齐聚母校，共同庆祝海林市高级中学建校66周年。'
    },
    {
      title: '校友捐赠图书馆改造项目启动',
      date: '2024-11-20',
      excerpt: '由85届校友发起，筹集资金200万元用于图书馆现代化改造。'
    },
    {
      title: '优秀校友访谈系列上线',
      date: '2024-10-08',
      excerpt: '邀请各行业杰出校友分享成功经验，激励在校学子。'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              海林市高级中学
              <span className="block text-2xl md:text-3xl font-normal mt-2">校友会官方网站</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              连接校友情谊，传承母校精神，共筑美好未来
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn-primary text-lg px-8 py-3">
                校友登录
              </Link>
              <Link to="/about" className="bg-white text-primary-600 hover:bg-gray-100 font-medium text-lg px-8 py-3 rounded-lg transition-colors duration-200">
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">校友会服务平台</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              为校友们提供全方位服务，促进交流合作，共同发展
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="card hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-primary-600 font-medium">
                  查看详情
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">最新动态</h2>
            <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              查看全部
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((news, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {news.date}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{news.title}</h3>
                <p className="text-gray-600">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">加入校友会大家庭</h2>
          <p className="text-lg text-primary-100 mb-8">
            无论您是哪一届的校友，这里都是您永远的家。注册登录，与老同学重聚，
            参与校友活动，为母校发展贡献力量。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              立即注册
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-3 rounded-lg transition-colors duration-200">
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home