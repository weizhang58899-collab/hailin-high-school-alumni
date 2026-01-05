import React from 'react'
import { Link } from 'react-router-dom'
import { School, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <School className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">海林市高级中学校友会</h2>
                <p className="text-gray-300">连接校友情谊，传承母校精神</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              海林市高级中学校友会致力于为校友们提供一个交流、合作、发展的平台，
              促进校友之间的情谊，传承母校的优良传统。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">微信</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.306 0 9.15c0 2.082 1.147 3.95 2.93 5.213-.15.45-.472 1.603-.537 1.829-.104.36-.034.498.28.498.415 0 1.113-.244 1.84-.535 1.103-.438 1.996-.925 3.037-1.528.96.26 1.976.4 3.04.4 4.8 0 8.691-3.118 8.691-6.962 0-3.844-3.891-6.962-8.691-6.962zM6.898 7.965c-.72 0-1.303-.583-1.303-1.303s.583-1.303 1.303-1.303 1.303.583 1.303 1.303-.583 1.303-1.303 1.303zm4.204 0c-.72 0-1.303-.583-1.303-1.303s.583-1.303 1.303-1.303 1.303.583 1.303 1.303-.583 1.303-1.303 1.303z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">关于我们</Link></li>
              <li><Link to="/alumni" className="text-gray-400 hover:text-white transition-colors">校友名录</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">活动通知</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">新闻动态</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">海林市解放路123号</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">0453-1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">alumni@hailinhs.edu.cn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 海林市高级中学校友会. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer