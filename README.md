# ⚡ NetToolbox — 综合网络工具箱

一个纯前端、零后端依赖的网络工具箱，提供 8 个常用网络诊断功能。

## 🚀 功能列表

| # | 功能 | 说明 |
|---|------|------|
| 1 | **本机 IP 查询** | 获取公网 IP + 归属地/ISP/ASN 信息 |
| 2 | **IP 欺诈评分** | 检测代理/VPN/Tor/数据中心，输出 0-100 风险评分 |
| 3 | **HTTP Ping** | HTTP RTT 延迟测试，支持预设目标和自定义 URL |
| 4 | **DNS 记录查询** | 查询 A/AAAA/CNAME/MX/TXT/NS/SOA/CAA 记录 |
| 5 | **Whois 域名查询** | 查询域名注册商、过期时间、DNS 服务器等 |
| 6 | **HTTP 头部 / SSL 检测** | 查看响应头 + SSL 证书透明度日志 |
| 7 | **浏览器泄露检测** | WebRTC IP 泄露检测 + 浏览器指纹收集 |
| 8 | **网站测速** | 从 Cloudflare CDN 下载测速，显示 Mbps |

## 🛠️ 技术栈

- **HTML5 + CSS3 + Vanilla JavaScript**
- 零框架依赖，零构建工具
- 单文件 `index.html`，可直接打开使用
- 响应式暗色主题设计

## 📡 使用的公共 API

| 功能 | API | 限制 |
|------|-----|------|
| IP 查询 | ipify.org, ipinfo.io, ipapi.co | 免费，有频率限制 |
| 代理检测 | ipapi.co (security 字段) | 免费 30k/月 |
| DNS | Google DNS (dns.google) | 免费，无明确限制 |
| Whois | whoisfree API | 免费，支持有限 TLD |
| SSL 证书 | crt.sh | 免费 |
| 测速 | Cloudflare Speed Test | 免费，无明确限制 |
| WebRTC | Google STUN 服务器 | 免费 |

## ⚠️ 已知限制

- **无法 ICMP Ping**：浏览器限制，使用 HTTP HEAD RTT 替代
- **无法 Traceroute**：浏览器无法发送递增 TTL 包
- **HTTP 头部受 CORS 限制**：通过 allorigins 代理获取
- **Whois 数据可能不完整**：GDPR 隐私保护 + 免费 API 限制
- **测速仅支持下载**：GitHub Pages 无上传接收端

## 📦 部署方式

### 方式一：GitHub Pages（推荐）

```bash
# 1. 创建仓库并推送
cd D:\Coding\net-toolbox
git init
git add .
git commit -m "feat: NetToolbox v1.0"
git remote add origin https://github.com/<你的用户名>/net-toolbox.git
git push -u origin main

# 2. 在 GitHub 仓库 Settings → Pages → Source 选 main 分支 → Save
# 3. 访问 https://<你的用户名>.github.io/net-toolbox/
```

### 方式二：直接打开

双击 `index.html` 即可在浏览器中使用（部分功能受 file:// 协议限制）。

### 方式三：Cloudflare Pages / Vercel

直接导入 GitHub 仓库，无需任何构建配置。

## 📄 License

MIT
