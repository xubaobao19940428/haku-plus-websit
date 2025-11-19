const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          关于我们
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          了解 Haku Plus 的故事和使命
        </p>
      </div>

      <div className="mt-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">我们的使命</h2>
          <p className="text-gray-600 leading-relaxed">
            Haku Plus 致力于为用户提供最优质的产品和服务体验。我们相信通过技术创新和持续改进，
            可以为用户创造更大的价值。
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">技术栈</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>React 18 - 现代化的 UI 框架</li>
            <li>TypeScript - 类型安全的 JavaScript</li>
            <li>Tailwind CSS - 实用优先的 CSS 框架</li>
            <li>React Router - 强大的路由解决方案</li>
            <li>Axios - 优秀的 HTTP 客户端</li>
            <li>Vite - 极速的前端构建工具</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About

