/// <reference types="vite/client" />

// 图片文件类型声明
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

// 注意：TypeScript 的模块声明不支持通配符路径
// 但 '*.png' 等声明已经覆盖了所有 PNG 文件的导入，包括使用路径别名的
// 如果仍有问题，请重启 TypeScript 服务器

