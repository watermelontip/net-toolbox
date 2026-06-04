<div align="center">

<img src="logo.svg" width="96" alt="NetToolbox Logo">

# ⚡ NetToolbox — 综合网络工具箱

> ### 🔗 在线体验：[https://watermelontip.github.io/net-toolbox](https://watermelontip.github.io/net-toolbox)

一个纯前端、零后端依赖的网络诊断工具箱，提供 14+ 项网络检测功能。

</div>

## 🚀 功能列表

| # | 功能 | 说明 |
|---|------|------|
| 1 | **IP 信息检测** | 3 个 API 并行查询，自动择优（ipapi.co + ipinfo.io + ip-api.com） |
| 2 | **网络环境检测** | 连接类型、下行速度、RTT、IPv6、省流模式 |
| 3 | **延迟测试** | 16 个国内外服务并发 Ping，带进度条和颜色分级 |
| 4 | **DNS 解析** | 10 域名 × 4 DoH 解析器（阿里DNS/Google/Cloudflare）自动故障转移 |
| 5 | **WebRTC 泄露** | 严格 IPv4/IPv6 验证 + 私网/公网分类 |
| 6 | **DNS 泄露** | 通过 Cloudflare Trace 检测 DNS 是否暴露 |
| 7 | **浏览器指纹** | Canvas 哈希 + WebGL 渲染器 + Audio 音频指纹（16+ 维度） |
| 8 | **IP 欺诈评分** | 代理/VPN/Tor/数据中心风险评分 (0-100) ⭐ 独有 |
| 9 | **Whois 查询** | 域名注册商、过期时间、DNS 服务器 ⭐ 独有 |
| 10 | **HTTP 头部 / SSL** | 响应头 + SSL 证书透明度日志 ⭐ 独有 |
| 11 | **下载测速** | Cloudflare CDN 实时进度条测速 ⭐ 独有 |

## 🛠️ 技术栈

- **HTML5 + CSS3 + Vanilla JavaScript** — 零框架，零构建
- 暗色/浅色主题切换
- 中英文国际化 (i18n)
- 响应式设计（PC / 平板 / 手机）
- 一键全部检测 + 检测摘要报告

## 📡 使用的公共 API

| 功能 | API | 限制 |
|------|-----|------|
| IP 查询 | ipapi.co, ipinfo.io, ip-api.com | 免费，有频率限制 |
| DNS 解析 | dns.alidns.com, dns.google, cloudflare-dns.com | 免费 |
| Whois | whoisfree API | 免费，支持有限 TLD |
| SSL 证书 | crt.sh | 免费 |
| 测速 | speed.cloudflare.com | 免费 |
| WebRTC | Google STUN 服务器 | 免费 |

## ⚠️ 已知限制

- **无法 ICMP Ping**：浏览器限制，使用 HTTP HEAD RTT 替代
- **无法 Traceroute**：浏览器无法发送递增 TTL 包
- **HTTP 头部受 CORS 限制**：通过 allorigins 代理获取
- **Whois 数据可能不完整**：GDPR 隐私保护 + 免费 API 限制
- **测速仅支持下载**：GitHub Pages 无上传接收端

## 📦 部署方式

### 方式一：GitHub Pages（推荐）

直接在仓库 Settings → Pages → Source 选 main 分支即可。

### 方式二：直接打开

双击 `index.html` 即可在浏览器中使用。

## 📄 License

MIT
