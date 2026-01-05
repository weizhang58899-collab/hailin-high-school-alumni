# 海林市高级中学校友会网站部署指南

## GitHub Pages 部署

### 准备工作

1. 在GitHub上创建一个新的仓库，命名为 `hailin-high-school-alumni`
2. 将本地代码推送到GitHub仓库

### 配置步骤

1. 更新 `package.json` 文件中的 `homepage` 字段，替换 `yourusername` 为你的GitHub用户名：
   ```json
   "homepage": "https://yourusername.github.io/hailin-high-school-alumni"
   ```

2. 确保已安装部署依赖：
   ```bash
   npm install gh-pages --save-dev
   ```

3. 构建并部署网站：
   ```bash
   npm run deploy
   ```

### 部署后访问

部署完成后，网站将通过以下URL访问：
`https://yourusername.github.io/hailin-high-school-alumni`

## 本地开发

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 功能说明

### 管理员功能
- 访问 `/admin` 路径进入管理员后台
- 默认管理员账号：admin / admin123
- 功能包括：
  - 审核校友注册申请
  - 发布和管理新闻
  - 创建和管理活动

### 校友功能
- 校友可以注册账号，需要管理员审核
- 注册后可以查看活动信息、新闻动态

### 访客功能
- 无需登录即可浏览网站内容
- 查看新闻、活动信息
- 了解校友会概况

## 技术栈

- React 19.2.0
- TypeScript
- Vite
- Tailwind CSS
- React Router
- GitHub Pages (部署)

## 注意事项

1. 当前使用 localStorage 存储数据，生产环境建议使用后端API
2. 管理员密码为硬编码，生产环境应使用安全的认证系统
3. 部署前请确保所有功能测试正常