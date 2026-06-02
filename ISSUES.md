# NetToolbox 网站问题诊断报告

## 项目信息
- 仓库：https://github.com/watermelontip/net-toolbox
- 在线地址：https://watermelontip.github.io/net-toolbox/
- 项目路径：D:\Coding\net-toolbox
- 文件结构：index.html + style.css + script.js（三文件分离）

## 问题总览

页面打开后，大量 UI 元素显示为原始 i18n 键名（如 `feat_ip`、`sec_ip`、`btn_run`）而非翻译后的中文文本。整体布局也有问题。

---

## 问题 1（最严重）：i18n 翻译键名不匹配

### 现象
页面上大量文字显示为占位符键名：
- 导航栏显示 `nav_security` 而非 "安全检测"
- 按钮显示 `btn_run` 而非 "开始检测"
- Hero 区域显示 `hero_badge`、`hero_desc`、`hero_ip_label`
- 所有功能卡片标题显示 `feat_ip`、`feat_env`、`feat_latency`、`feat_dns`、`feat_webrtc`、`feat_dnsleak`、`feat_fp`
- 所有区域标题显示 `sec_ip`、`sec_latency`、`sec_dns`、`sec_leak`、`sec_summary`
- 泄露检测显示 `leak_webrtc`、`leak_dns`、`leak_fp`
- IP 详情标签显示 `badge_pending`、`label_ip`、`label_loc` 等

### 根本原因
**HTML 中的 `data-i18n` 属性使用的键名，与 JS 中 `I18N` 对象定义的键名不一致。**

两个文件是由不同子任务并行生成的，没有协调键名。

### 具体不匹配示例

| HTML 中的键 (data-i18n) | JS I18N.zh 中实际有的键 | 状态 |
|---|---|---|
| `nav_security` | `nav_webrtc`, `nav_dns_leak` 等 | ❌ 不存在 |
| `btn_run` | `btn_run_all` | ❌ 不存在 |
| `hero_badge` | 无（hero_title 才是标题） | ❌ 不存在 |
| `hero_desc` | `hero_sub` | ❌ 不存在 |
| `hero_ip_label` | `ip_label` | ❌ 不存在 |
| `feat_ip` | 无 | ❌ 不存在 |
| `feat_ip_desc` | 无 | ❌ 不存在 |
| `feat_env` | 无 | ❌ 不存在 |
| `feat_latency` | 无 | ❌ 不存在 |
| `feat_dns` | 无 | ❌ 不存在 |
| `feat_webrtc` | 无 | ❌ 不存在 |
| `feat_dnsleak` | 无 | ❌ 不存在 |
| `feat_fp` | 无 | ❌ 不存在 |
| `sec_ip` | 无 | ❌ 不存在 |
| `sec_latency` | 无 | ❌ 不存在 |
| `sec_dns` | 无 | ❌ 不存在 |
| `sec_leak` | 无 | ❌ 不存在 |
| `sec_summary` | 无 | ❌ 不存在 |
| `leak_webrtc` | 无 | ❌ 不存在 |
| `leak_dns` | 无 | ❌ 不存在 |
| `leak_fp` | 无 | ❌ 不存在 |
| `badge_pending` | 无 | ❌ 不存在 |
| `label_ip` | 无 | ❌ 不存在 |
| `label_loc` | 无 | ❌ 不存在 |
| `label_isp` | 无 | ❌ 不存在 |
| `label_asn` | 无 | ❌ 不存在 |

JS 中有的键（部分）：`nav_ip`, `nav_env`, `nav_latency`, `nav_dns`, `nav_webrtc`, `nav_dns_leak`, `nav_fp`, `nav_fraud`, `btn_run_all`, `hero_title`, `hero_sub`, `ip_label`, `ip_location`, `ip_isp`

### 修复方案
**方案 A（推荐）**：修改 `script.js` 中的 `I18N` 对象，添加 HTML 中使用的所有键名及其中文/英文翻译值。保持 HTML 不变。

**方案 B**：修改 `index.html` 中所有 `data-i18n` 属性的值，改为与 JS `I18N` 对象匹配的键名。

---

## 问题 2：Font Awesome 图标不显示

### 现象
功能卡片中的图标位置显示为深色空白方块，Font Awesome 图标未渲染。

### 已确认
- Font Awesome CDN 链接已正确引入（`cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css`）
- 页面中有 24 个 `.fas` 图标元素
- 可能是 CSS 中 `content` 属性被覆盖，或者图标字体文件加载失败（网络问题）

### 修复方案
检查 Font Awesome CDN 是否在国内可访问。如不可访问，可替换为：
- unpkg CDN: `https://unpkg.com/@fortawesome/fontawesome-free@6.5.0/css/all.min.css`
- 或者使用 SVG 图标替代

---

## 问题 3：Hero 区域内容缺失

### 现象
- Hero 区域标题只显示 "NetToolbox"（硬编码），而非翻译后的标题
- 副标题 `hero_badge` 和 `hero_desc` 显示为键名
- IP 卡片（heroIP/heroLoc/heroISP）可能存在但被 i18n 键名覆盖

### 根本原因
同样是 i18n 键名不匹配导致。JS 中 `hero_title` 的值是 "NetToolbox"，但 HTML 用的是 `hero_badge`（不存在）。

---

## 问题 4：功能卡片布局

### 现象
8 个功能卡片应该是 4 列网格布局，但实际显示为垂直堆叠。

### 可能原因
CSS 中 `.features` 的 `grid-template-columns: repeat(4, 1fr)` 可能被其他样式覆盖，或者 `.features` 类没有正确应用到容器上。

---

## 问题 5：`applyLang()` 可能未正确执行

### 已确认
- `I18N` 对象存在（有 `zh` 和 `en` 两个子对象）
- `applyLang()` 函数存在
- 但页面加载后 `data-i18n` 元素未被翻译

### 可能原因
1. `applyLang()` 在 DOMContentLoaded 中调用时，I18N 键名与 HTML 不匹配，导致查找失败
2. `applyLang()` 函数内部的 `t()` 查找函数可能没有 fallback 到正确的默认值

---

## 修复优先级

1. **🔴 最高**：修复 i18n 键名不匹配（问题 1）— 这导致页面 80% 的文字无法显示
2. **🟠 高**：修复 Font Awesome 图标（问题 2）— 影响视觉体验
3. **🟡 中**：修复 Hero 区域（问题 3）— 首屏体验
4. **🟢 低**：修复卡片布局（问题 4）— 可能随问题 1 修复后自动解决

---

## 上下文信息

### 技术栈
- 纯 HTML + CSS + Vanilla JavaScript，零框架
- Font Awesome 6.5.0 CDN（图标）
- Google Fonts Inter（字体）
- 暗色主题优先（html.dark class 切换）

### 文件结构
```
D:\Coding\net-toolbox\
├── index.html    (274 行) — 页面结构
├── style.css     (1376 行) — 所有样式
├── script.js     (1325 行) — 所有逻辑
└── README.md     — 项目说明
```

### 核心 JS 模块
- `I18N` — 中英文翻译对象（键名需要与 HTML data-i18n 匹配）
- `checkIP()` — 3 API 并行 IP 检测
- `runLatency()` — 16 服务延迟测试
- `runDNS()` — 10 域名 × 4 DoH 解析器
- `checkWebRTC()` — WebRTC 泄露检测
- `checkDNSLeak()` — DNS 泄露检测
- `checkFingerprint()` — 浏览器指纹（含 Canvas/WebGL/Audio）
- `Fraud` — IP 欺诈评分模块
- `Whois` — Whois 查询模块
- `Headers` — HTTP 头部/SSL 检测模块
- `Speed` — 下载测速模块
- `runAllChecks()` — 一键全部检测

### 部署
- GitHub Pages 自动部署（main 分支根目录）
- 推送后约 10-30 秒自动构建生效

### 代理环境
- Git 配置了 Clash 代理 http://127.0.0.1:7890
- `git push` 需要代理才能访问 GitHub
