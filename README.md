# Haku Plus 官网

这是一个使用 React + TypeScript + Tailwind CSS 构建的现代化官网项目。

## 技术栈

- **React 18** - 现代化的 UI 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 极速的前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **React Router** - 强大的路由解决方案
- **Axios** - 优秀的 HTTP 客户端

## 功能特性

- ✅ React + TypeScript 开发
- ✅ Tailwind CSS 样式支持
- ✅ React Router 路由配置
- ✅ Axios 请求封装
- ✅ 响应式设计
- ✅ 现代化的项目结构

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
haku-plus-websit/
├── src/
│   ├── components/      # 组件目录
│   │   └── Layout.tsx   # 布局组件
│   ├── pages/           # 页面目录
│   │   ├── Home.tsx     # 首页
│   │   ├── About.tsx    # 关于页面
│   │   └── Contact.tsx  # 联系页面
│   ├── utils/           # 工具函数
│   │   └── api.ts       # API 请求封装
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式
├── public/              # 静态资源
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
└── postcss.config.js    # PostCSS 配置
```

## 环境变量

创建 `.env` 文件来配置环境变量：

```env
VITE_API_BASE_URL=http://localhost:3000
```

## API 请求

项目已经封装了 Axios，可以在 `src/utils/api.ts` 中配置：

- 请求拦截器：可以添加 token 等认证信息
- 响应拦截器：统一处理错误响应
- 支持 TypeScript 类型推断

使用示例：

```typescript
import { api } from '@/utils/api'

// GET 请求
const response = await api.get('/api/users')

// POST 请求
const response = await api.post('/api/users', { name: 'John' })
```

## 路由配置

路由配置在 `src/App.tsx` 中，当前包含：

- `/` - 首页
- `/about` - 关于我们
- `/contact` - 联系我们

## 开发建议

1. 使用 TypeScript 的类型系统确保代码安全
2. 遵循 React Hooks 最佳实践
3. 使用 Tailwind CSS 工具类快速构建 UI
4. 保持组件小而专注，提高可维护性

## License

MIT

