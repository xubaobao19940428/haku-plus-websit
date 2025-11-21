#!/usr/bin/env python3
"""
启动 dist 目录的静态文件服务器
支持 SPA 路由（所有路由都返回 index.html）
"""
import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

# 设置端口，默认 8000
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

# 切换到 dist 目录
dist_dir = os.path.join(os.path.dirname(__file__), 'dist')
if not os.path.exists(dist_dir):
    print(f"错误: dist 目录不存在！请先运行构建命令: npm run build")
    sys.exit(1)

os.chdir(dist_dir)


class SPAHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """支持 SPA 路由的请求处理器"""
    
    def end_headers(self):
        # 添加 CORS 头（如果需要）
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        # 解析 URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 如果请求的是文件且文件存在，直接返回
        if path != '/' and os.path.exists(path.lstrip('/')):
            return super().do_GET()
        
        # 否则返回 index.html（支持 SPA 路由）
        self.path = '/index.html'
        return super().do_GET()


# 创建服务器
Handler = SPAHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 服务器启动在 http://localhost:{PORT}")
    print(f"📁 服务目录: {os.path.abspath(dist_dir)}")
    print(f"⏹️  按 Ctrl+C 停止服务器")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ 服务器已停止")

