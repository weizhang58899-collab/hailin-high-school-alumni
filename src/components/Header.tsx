import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, School, User, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  const navigation = [
    { name: '首页', href: '/' },
    { name: '关于我们', href: '/about' },
    { name: '校友名录', href: '/alumni' },
    { name: '活动通知', href: '/events' },
    { name: '新闻动态', href: '/news' },
    { name: '联系我们', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">海林市高级中学</h1>
              <p className="text-sm text-gray-600">校友会</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Login/User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>管理后台</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'alumni' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.role === 'admin' ? '管理员' : user.role === 'alumni' ? '校友' : '待审核'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  退出
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary text-sm"
              >
                校友登录
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        管理后台
                      </Link>
                    )}
                    <div className="px-3 py-2 text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{user.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'alumni' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.role === 'admin' ? '管理员' : user.role === 'alumni' ? '校友' : '待审核'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700"
                    >
                      退出登录
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    校友登录
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header