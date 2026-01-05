import React from 'react'
import { Users, Target, HeartHandshake, History } from 'lucide-react'

const About: React.FC = () => {
  const missionItems = [
    {
      icon: Users,
      title: '连接校友',
      description: '建立校友联络网络，促进校友之间的交流与合作'
    },
    {
      icon: Target,
      title: '服务母校',
      description: '支持母校建设发展，为在校师生提供帮助和支持'
    },
    {
      icon: HeartHandshake,
      title: '传承精神',
      description: '弘扬母校优良传统，传承海林高中的精神文化'
    },
    {
      icon: History,
      title: '记录历史',
      description: '收集整理校友资料，记录母校发展历程'
    }
  ]

  const timeline = [
    {
      year: '1958',
      event: '海林市高级中学建校',
      description: '学校正式成立，开始培养优秀人才'
    },
    {
      year: '1985',
      event: '第一届校友会成立',
      description: '校友会正式成立，开始组织校友活动'
    },
    {
      year: '2000',
      event: '校友会网站上线',
      description: '建立线上平台，方便校友联系'
    },
    {
      year: '2024',
      event: '新版网站发布',
      description: '全面升级校友会服务平台'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">关于校友会</h1>
          <p className="text-xl text-gray-600">
            海林市高级中学校友会致力于为校友们提供全方位的服务，
            促进校友之间的情谊，支持母校的发展建设。
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的使命</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              校友会以服务校友、服务母校、服务社会为宗旨，搭建校友交流平台，
              促进校友事业发展，支持母校教育事业发展。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missionItems.map((item) => (
              <div key={item.title} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">发展历程</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200"></div>
            
            {timeline.map((item, index) => (
              <div key={item.year} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-1/2 pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.year}
                </div>
                
                <div className="w-1/2 pl-8">
                  {/* Empty space for alternating layout */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">组织机构</h2>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">理事会</h3>
                <p className="text-gray-600">
                  负责校友会的重大决策和战略规划，
                  由各届校友代表组成。
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">秘书处</h3>
                <p className="text-gray-600">
                  负责日常运营管理，组织校友活动，
                  维护校友信息数据库。
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">地区分会</h3>
                <p className="text-gray-600">
                  在全国主要城市设立分会，
                  方便各地校友开展活动。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">加入我们</h2>
          <p className="text-lg text-primary-100 mb-8">
            无论您是哪一届的校友，都欢迎加入校友会大家庭。
            让我们一起为母校的发展贡献力量！
          </p>
          <div className="space-y-4 text-primary-100">
            <p>联系电话：0453-1234567</p>
            <p>电子邮箱：alumni@hailinhs.edu.cn</p>
            <p>办公地址：海林市解放路123号海林市高级中学</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About