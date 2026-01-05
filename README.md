# 海林市高级中学校友会官方网站

一个功能完整的校友会网站，支持管理员管理、校友注册、新闻发布和活动管理。

## 🚀 功能特性

### 访客功能
- ✅ 浏览首页和校友会介绍
- ✅ 查看新闻动态和活动通知
- ✅ 了解校友会历史和联系方式

### 校友功能
- ✅ 校友注册（需要管理员审核）
- ✅ 登录后查看专属内容
- ✅ 参与活动报名

### 管理员功能
- ✅ 审核校友注册申请
- ✅ 发布和管理新闻内容
- ✅ 创建和管理校友活动
- ✅ 后台管理界面

## 🛠️ 技术栈

- **前端框架**: React 19.2.0 + TypeScript
- **构建工具**: Vite 6.0.1
- **样式框架**: Tailwind CSS 3.4.0
- **路由管理**: React Router 7.4.0
- **图标库**: Lucide React
- **部署平台**: GitHub Pages

## 📦 安装与运行

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 本地开发
```bash
# 克隆项目
git clone <repository-url>
cd alumni-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🌐 部署到GitHub Pages

### 步骤1：准备GitHub仓库
1. 在GitHub创建新仓库：`hailin-high-school-alumni`
2. 将本地代码推送到仓库

### 步骤2：配置部署
1. 更新 `package.json` 中的 `homepage` 字段：
   ```json
   "homepage": "https://yourusername.github.io/hailin-high-school-alumni"
   ```
2. 安装部署依赖：`npm install gh-pages --save-dev`

### 步骤3：部署网站
```bash
# 一键部署
npm run deploy
```

部署完成后，网站将通过以下URL访问：
`https://yourusername.github.io/hailin-high-school-alumni`

## 🔐 管理员登录

- **管理员后台**: `/admin`
- **默认账号**: admin
- **默认密码**: admin123

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Header.tsx      # 网站头部
│   ├── Footer.tsx      # 网站底部
│   └── admin/          # 管理员组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── About.tsx       # 关于我们
│   ├── Alumni.tsx      # 校友风采
│   ├── Events.tsx      # 活动通知
│   ├── News.tsx        # 新闻动态
│   ├── Contact.tsx     # 联系我们
│   ├── Login.tsx       # 登录注册
│   └── AdminDashboard.tsx # 管理员后台
├── types/              # TypeScript类型定义
│   ├── auth.ts         # 认证相关类型
│   └── content.ts      # 内容相关类型
└── App.tsx            # 应用入口
```

## 💾 数据存储

当前版本使用 `localStorage` 进行数据持久化，支持以下功能：
- 用户认证信息
- 新闻内容管理
- 活动信息管理
- 校友注册申请

**注意**: 生产环境建议使用后端API和数据库进行数据存储。

## 🔧 自定义配置

### 修改学校信息
编辑 `src/pages/About.tsx` 文件，更新学校介绍和联系信息。

### 修改默认内容
- 新闻内容：`src/pages/News.tsx`
- 活动内容：`src/pages/Events.tsx`
- 校友信息：`src/pages/Alumni.tsx`

### 修改样式主题
通过修改 `tailwind.config.js` 文件中的颜色配置来自定义主题。

## 🐛 故障排除

### 常见问题

1. **构建失败**
   - 检查TypeScript语法错误
   - 确保所有依赖正确安装

2. **页面空白**
   - 检查浏览器控制台错误信息
   - 确认路由配置正确

3. **部署失败**
   - 确认GitHub仓库名称与homepage配置一致
   - 检查GitHub Pages设置

## 📄 许可证

本项目采用MIT许可证。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。

## 📞 联系方式

如有问题或建议，请联系项目维护者。

---

**海林市高级中学校友会** © 2024