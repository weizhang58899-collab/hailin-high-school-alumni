import React, { useState } from 'react'
import { MapPin, Phone, Mail, Send, Clock, Building } from 'lucide-react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    graduationYear: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 处理表单提交逻辑
    console.log('Form submitted:', formData)
    alert('感谢您的留言！我们会尽快与您联系。')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      graduationYear: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: '办公地址',
      content: '海林市解放路123号海林市高级中学',
      description: '校友会办公室位于学校行政楼3楼'
    },
    {
      icon: Phone,
      title: '联系电话',
      content: '0453-1234567',
      description: '工作日 8:30-17:00'
    },
    {
      icon: Mail,
      title: '电子邮箱',
      content: 'alumni@hailinhs.edu.cn',
      description: '我们会尽快回复您的邮件'
    },
    {
      icon: Clock,
      title: '办公时间',
      content: '周一至周五',
      description: '上午 8:30-12:00，下午 13:30-17:00'
    }
  ]

  const graduationYears = Array.from({length: 50}, (_, i) => 2024 - i)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            如果您有任何问题或建议，欢迎随时与我们联系
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{item.content}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">在线留言</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                      毕业年份
                    </label>
                    <select
                      id="graduationYear"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">请选择毕业年份</option>
                      {graduationYears.map(year => (
                        <option key={year} value={year}>{year}届</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      电子邮箱 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      联系电话
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="请输入您的电话"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    主题 *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入留言主题"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    留言内容 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="请输入您的留言内容"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  发送留言
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <div className="card mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">地理位置</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-12 w-12 text-gray-400" />
                  <span className="ml-2 text-gray-600">地图加载中...</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Building className="h-5 w-5 mr-3" />
                    <span>海林市高级中学</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>海林市解放路123号</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">常见问题</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">如何注册成为校友会会员？</h4>
                    <p className="text-gray-600 text-sm">
                      请访问注册页面，填写个人信息并提交申请，审核通过后即可成为正式会员。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">如何更新个人信息？</h4>
                    <p className="text-gray-600 text-sm">
                      登录校友会账户后，可以在个人中心修改和更新您的信息。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">如何参与校友活动？</h4>
                    <p className="text-gray-600 text-sm">
                      关注活动通知页面，选择感兴趣的活动进行报名即可。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact