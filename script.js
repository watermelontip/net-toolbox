/* ============================================================
   NetToolbox – script.js  (full rewrite)
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   CONSTANTS
   ---------------------------------------------------------- */
const SERVICES = [
  { name: 'Google',       url: 'https://www.google.com/favicon.ico',          color: '#4285F4' },
  { name: 'ChatGPT',      url: 'https://chatgpt.com/favicon.ico',            color: '#10A37F' },
  { name: 'OpenAI API',   url: 'https://platform.openai.com/favicon.ico',    color: '#000000' },
  { name: 'Claude',       url: 'https://claude.ai/favicon.ico',              color: '#D97706' },
  { name: 'GitHub',       url: 'https://github.com/favicon.ico',             color: '#333333' },
  { name: 'YouTube',      url: 'https://www.youtube.com/favicon.ico',        color: '#FF0000' },
  { name: 'Twitter/X',    url: 'https://x.com/favicon.ico',                  color: '#1DA1F2' },
  { name: 'Wikipedia',    url: 'https://www.wikipedia.org/favicon.ico',      color: '#000000' },
  { name: 'Cloudflare',   url: 'https://www.cloudflare.com/favicon.ico',     color: '#F38020' },
  { name: 'Baidu',        url: 'https://www.baidu.com/favicon.ico',          color: '#2932E1' },
  { name: 'Bilibili',     url: 'https://www.bilibili.com/favicon.ico',       color: '#FB7299' },
  { name: 'Zhihu',        url: 'https://www.zhihu.com/favicon.ico',          color: '#0084FF' },
  { name: 'Weibo',        url: 'https://weibo.com/favicon.ico',              color: '#E6162D' },
  { name: 'Douyin',       url: 'https://www.douyin.com/favicon.ico',         color: '#000000' },
  { name: 'Tencent',      url: 'https://www.tencent.com/favicon.ico',        color: '#0052D9' },
  { name: 'DeepSeek',     url: 'https://www.deepseek.com/favicon.ico',       color: '#0066FF' },
];

const DNS_TARGETS = [
  'google.com', 'github.com', 'chatgpt.com', 'claude.ai', 'openai.com',
  'baidu.com', 'bilibili.com', 'cloudflare.com', 'deepseek.com', 'wikipedia.org',
];

const DNS_RESOLVERS = [
  { name: 'AliDNS',      url: 'https://dns.alidns.com/resolve' },
  { name: 'AliDNS-2',    url: 'https://223.6.6.6/resolve' },
  { name: 'Google',      url: 'https://dns.google/resolve' },
  { name: 'Cloudflare',  url: 'https://cloudflare-dns.com/dns-query' },
];

/* ----------------------------------------------------------
   i18n
   ---------------------------------------------------------- */
const I18N = {
  zh: {
    nav_ip: 'IP ??',
    nav_env: '????',
    nav_latency: '????',
    nav_dns: 'DNS ??',
    nav_security: '????',
    nav_webrtc: 'WebRTC ??',
    nav_dns_leak: 'DNS ??',
    nav_fp: '?????',
    nav_fraud: '????',
    nav_whois: 'WHOIS ??',
    nav_headers: 'HTTP ?? / SSL',
    nav_speed: '????',
    nav_summary: '????',
    lang_toggle: 'EN',
    dark_toggle: '????',

    hero_badge: '?????????',
    hero_title: '????????',
    hero_desc: '???? IP ????????DNS ???WebRTC ?????????????????',
    hero_sub: '??????????',
    hero_ip_label: '?? IP ??',
    ip_label: 'IP ??',
    ip_location: '??',
    ip_isp: '???',

    btn_run: '????',
    btn_run_all: '????',
    btn_copy: '????',
    btn_ip: '?? IP',
    btn_env: '????',
    btn_latency: '????',
    btn_dns: '?? DNS ??',
    btn_webrtc: '?? WebRTC',
    btn_dnsleak: '?? DNS ??',
    btn_fp: '????',

    feat_ip: 'IP ??',
    feat_ip_desc: 'IP ????????ISP?ASN????',
    feat_env: '????',
    feat_env_desc: '??????????RTT?????? IPv6?',
    feat_latency: '????',
    feat_latency_desc: '?? Google?GitHub?ChatGPT ?????????',
    feat_dns: 'DNS ??',
    feat_dns_desc: '???? DoH ???????????????',
    feat_webrtc: 'WebRTC ??',
    feat_webrtc_desc: '?? WebRTC ???????? IP?',
    feat_dnsleak: 'DNS ??',
    feat_dnsleak_desc: '?? DNS ??????????????',
    feat_fp: '?????',
    feat_fp_desc: '?????????WebGL?Canvas ? Audio ???',
    feat_fraud: '????',
    feat_fraud_desc: '?????VPN?Tor????? IP ???',

    sec_ip: 'IP ?????',
    sec_latency: '??????',
    sec_dns: 'DNS ??',
    sec_leak: '???????',
    sec_tools: '????',
    sec_summary: '????',

    badge_pending: '???',
    empty_hint: '??????????????',
    summary_empty: '?????????????????',
    leak_webrtc: 'WebRTC ??',
    leak_dns: 'DNS ??',
    leak_fp: '?????',
    leak_waiting: '????',

    label_ip: 'IP ??',
    label_loc: '??',
    label_isp: 'ISP',
    label_asn: 'ASN',
    label_property: 'IP ??',
    label_country: '??',
    label_webrtc_ip: 'WebRTC ?? IP',
    label_tz: '??',
    label_conn: '????',
    label_down: '????',
    label_rtt: 'RTT',
    label_ipv6: 'IPv6',
    label_saver: '????',
    label_speed: '????',
    label_online: '????',

    ip_title: 'IP ??',
    ip_loading: '???? IP...',
    ip_city: '??',
    ip_region: '??',
    ip_country: '??',
    ip_org: '??',
    ip_tz: '??',
    ip_asn: 'ASN',
    ip_lat: '??',
    ip_lon: '??',
    ip_hosting: '????',
    ip_proxy: '??',
    ip_mobile: '????',
    ip_residential: '????',

    env_title: '????',
    env_loading: '????????...',
    env_type: '????',
    env_downlink: '????',
    env_rtt: 'RTT',
    env_save: '????',
    env_ipv6: 'IPv6 ??',
    env_speed_title: '????',
    env_speed_testing: '????...',
    env_speed_result: '????',

    yes: '?',
    no: '?',
    unknown: '??',
    timeout: '??',
    loading: '???...',
    error: '??',
    none: '?',
    not_available: '???',

    latency_title: '????',
    latency_running: '??????...',
    latency_service: '??',
    latency_latency: '??',
    latency_status: '??',
    latency_ok: '??',
    latency_fail: '???',
    latency_fast: '?',
    latency_medium: '?',
    latency_slow: '?',

    dns_title: 'DNS ??',
    dns_running: '???? DNS...',
    dns_domain: '??',
    dns_ips: '?? IP',
    dns_time: '??',
    dns_status: '??',
    dns_ok: '??',
    dns_fail: '??',
    dns_resolver: '???',

    webrtc_title: 'WebRTC ????',
    webrtc_checking: '???? WebRTC...',
    webrtc_ips: '???? IP',
    webrtc_public: '?? IP',
    webrtc_private: '?? IP',
    webrtc_safe: '??',
    webrtc_leaked: '??',
    webrtc_detail: '??',
    webrtc_no_leak: '?????? IP ??',
    webrtc_leak_detected: '????? IP ??',
    webrtc_not_supported: '???????? WebRTC',

    dns_leak_title: 'DNS ????',
    dns_leak_checking: '???? DNS ??...',
    dns_leak_ip: '?? IP',
    dns_leak_loc: '??',
    dns_leak_warp: 'WARP ??',
    dns_leak_safe: '??',
    dns_leak_warn: '??',
    dns_leak_warp_on: 'WARP ???',
    dns_leak_warp_off: 'WARP ???',

    fp_title: '?????',
    fp_checking: '??????...',
    fp_ua: 'User Agent',
    fp_platform: '??',
    fp_language: '??',
    fp_languages: '????',
    fp_screen: '??',
    fp_pixel_ratio: '???',
    fp_color_depth: '??',
    fp_timezone: '??',
    fp_touch: '????',
    fp_cookies: 'Cookies',
    fp_dnt: 'Do Not Track',
    fp_cores: 'CPU ???',
    fp_memory: '????',
    fp_webgl_vendor: 'WebGL ??',
    fp_webgl_renderer: 'WebGL ???',
    fp_canvas_hash: 'Canvas ??',
    fp_audio_hash: 'Audio ??',

    fraud_title: '????',
    fraud_desc: '?????VPN?Tor?????????',
    fraud_checking: '??????...',
    fraud_score: '????',
    fraud_ip: 'IP ??',
    fraud_proxy: '??',
    fraud_vpn: 'VPN',
    fraud_tor: 'Tor',
    fraud_cloud: '???',
    fraud_anonymous: '??',
    fraud_low: '???',
    fraud_mid: '???',
    fraud_high: '???',

    whois_title: 'Whois ????',
    whois_desc: '?????????????DNS ?????',
    whois_checking: '???? Whois...',
    whois_domain: '??',
    whois_registrar: '???',
    whois_created: '????',
    whois_expires: '????',
    whois_status: '??',
    whois_ns: '?????',
    whois_dnssec: 'DNSSEC',
    whois_registrant: '???',
    whois_email: '????',
    whois_input_hint: '??????? example.com',
    whois_query: '??',
    whois_gdpr: '????GDPR?',

    headers_title: 'HTTP ?? / SSL ??',
    headers_desc: '?? HTTP ???? SSL ????????',
    headers_checking: '????...',
    headers_http: 'HTTP ???',
    headers_ssl: 'SSL ?????????',
    headers_input_hint: '?? URL??? https://example.com',
    headers_query: '??',
    headers_cert_issuer: '???',
    headers_cert_not_before: '????',
    headers_cert_not_after: '????',
    headers_cert_name: '??',
    headers_cert_count: '????',

    speed_title: '????',
    speed_desc: '? Cloudflare ???????????',
    speed_start: '????',
    speed_testing: '????...',
    speed_result: '????',
    speed_time: '??',
    speed_size: '????',

    summary_title: '????',
    summary_copy: '????',
    summary_copied: '???????',
    summary_ip: 'IP ??',
    summary_location: '??',
    summary_isp: 'ISP',
    summary_latency_ok: '????',
    summary_latency_fail: '?????',
    summary_dns_ok: 'DNS ??',
    summary_dns_fail: 'DNS ??',
    summary_webrtc: 'WebRTC ??',
    summary_dns_leak: 'DNS ??',
    summary_fraud_score: '????',

    toast_online: '?????',
    toast_offline: '?????',
    toast_ip_changed: 'IP ?????',
    toast_error: '????',
  },
  en: {
    nav_ip: 'IP Info',
    nav_env: 'Network Env',
    nav_latency: 'Latency',
    nav_dns: 'DNS',
    nav_security: 'Security',
    nav_webrtc: 'WebRTC Leak',
    nav_dns_leak: 'DNS Leak',
    nav_fp: 'Browser Fingerprint',
    nav_fraud: 'Fraud Score',
    nav_whois: 'WHOIS Lookup',
    nav_headers: 'HTTP Headers / SSL',
    nav_speed: 'Speed Test',
    nav_summary: 'Summary',
    lang_toggle: 'ZH',
    dark_toggle: 'Toggle theme',

    hero_badge: 'All-in-one network diagnostics',
    hero_title: 'Inspect your network environment',
    hero_desc: 'Check IP address, latency, DNS resolution, WebRTC leaks, browser fingerprints, and more in one place.',
    hero_sub: 'All-in-one Network Diagnostic Toolbox',
    hero_ip_label: 'Your IP address',
    ip_label: 'IP Address',
    ip_location: 'Location',
    ip_isp: 'ISP',

    btn_run: 'Start checks',
    btn_run_all: 'Start checks',
    btn_copy: 'Copy report',
    btn_ip: 'Refresh IP',
    btn_env: 'Check env',
    btn_latency: 'Test latency',
    btn_dns: 'Run DNS',
    btn_webrtc: 'Check WebRTC',
    btn_dnsleak: 'Check DNS leak',
    btn_fp: 'Generate fingerprint',

    feat_ip: 'IP Info',
    feat_ip_desc: 'IP address, location, ISP, ASN, and timezone.',
    feat_env: 'Network Environment',
    feat_env_desc: 'Connection type, downlink, RTT, data saver, and IPv6.',
    feat_latency: 'Latency Test',
    feat_latency_desc: 'Test reachability for Google, GitHub, ChatGPT, and other services.',
    feat_dns: 'DNS Resolution',
    feat_dns_desc: 'Resolve common domains through multiple DoH resolvers and measure timing.',
    feat_webrtc: 'WebRTC Leak',
    feat_webrtc_desc: 'Check whether WebRTC exposes your real public IP.',
    feat_dnsleak: 'DNS Leak',
    feat_dnsleak_desc: 'Inspect DNS and exit information for possible leaks.',
    feat_fp: 'Browser Fingerprint',
    feat_fp_desc: 'Collect browser, screen, WebGL, Canvas, and Audio fingerprints.',
    feat_fraud: 'Fraud Score',
    feat_fraud_desc: 'Estimate proxy, VPN, Tor, cloud hosting, and IP risk.',

    sec_ip: 'IP and Network Info',
    sec_latency: 'Latency and Reachability',
    sec_dns: 'DNS Resolution',
    sec_leak: 'Security and Leak Tests',
    sec_tools: 'Extended Tools',
    sec_summary: 'Check Summary',

    badge_pending: 'Pending',
    empty_hint: 'Click a button or feature card to start testing.',
    summary_empty: 'Click ?Start checks? to run a full network diagnosis.',
    leak_webrtc: 'WebRTC Leak',
    leak_dns: 'DNS Leak',
    leak_fp: 'Browser Fingerprint',
    leak_waiting: 'Waiting',

    label_ip: 'IP Address',
    label_loc: 'Location',
    label_isp: 'ISP',
    label_asn: 'ASN',
    label_property: 'IP Property',
    label_country: 'Country',
    label_webrtc_ip: 'WebRTC Leak IP',
    label_tz: 'Timezone',
    label_conn: 'Connection Type',
    label_down: 'Downlink',
    label_rtt: 'RTT',
    label_ipv6: 'IPv6',
    label_saver: 'Data Saver',
    label_speed: 'Measured Speed',
    label_online: 'Online Status',

    ip_title: 'IP Info',
    ip_loading: 'Detecting IP...',
    ip_city: 'City',
    ip_region: 'Region',
    ip_country: 'Country',
    ip_org: 'Organization',
    ip_tz: 'Timezone',
    ip_asn: 'ASN',
    ip_lat: 'Latitude',
    ip_lon: 'Longitude',
    ip_hosting: 'Hosting',
    ip_proxy: 'Proxy',
    ip_mobile: 'Mobile Network',
    ip_residential: 'Residential Network',

    env_title: 'Network Environment',
    env_loading: 'Detecting network environment...',
    env_type: 'Connection Type',
    env_downlink: 'Downlink',
    env_rtt: 'RTT',
    env_save: 'Data Saver',
    env_ipv6: 'IPv6 Address',
    env_speed_title: 'Network Speed',
    env_speed_testing: 'Testing speed...',
    env_speed_result: 'Download Speed',

    yes: 'Yes',
    no: 'No',
    unknown: 'Unknown',
    timeout: 'Timeout',
    loading: 'Loading...',
    error: 'Error',
    none: 'None',
    not_available: 'N/A',

    latency_title: 'Latency Test',
    latency_running: 'Testing latency...',
    latency_service: 'Service',
    latency_latency: 'Latency',
    latency_status: 'Status',
    latency_ok: 'Reachable',
    latency_fail: 'Unreachable',
    latency_fast: 'Fast',
    latency_medium: 'Medium',
    latency_slow: 'Slow',

    dns_title: 'DNS Resolution',
    dns_running: 'Resolving DNS...',
    dns_domain: 'Domain',
    dns_ips: 'Resolved IPs',
    dns_time: 'Time',
    dns_status: 'Status',
    dns_ok: 'Success',
    dns_fail: 'Failed',
    dns_resolver: 'Resolver',

    webrtc_title: 'WebRTC Leak Detection',
    webrtc_checking: 'Checking WebRTC...',
    webrtc_ips: 'Detected IPs',
    webrtc_public: 'Public IPs',
    webrtc_private: 'Private IPs',
    webrtc_safe: 'Safe',
    webrtc_leaked: 'Leaked',
    webrtc_detail: 'Details',
    webrtc_no_leak: 'No public IP leak detected',
    webrtc_leak_detected: 'Public IP leak detected',
    webrtc_not_supported: 'WebRTC is not supported by this browser',

    dns_leak_title: 'DNS Leak Detection',
    dns_leak_checking: 'Checking DNS leak...',
    dns_leak_ip: 'Exit IP',
    dns_leak_loc: 'Location',
    dns_leak_warp: 'WARP Status',
    dns_leak_safe: 'Safe',
    dns_leak_warn: 'Warning',
    dns_leak_warp_on: 'WARP Enabled',
    dns_leak_warp_off: 'WARP Disabled',

    fp_title: 'Browser Fingerprint',
    fp_checking: 'Collecting fingerprint...',
    fp_ua: 'User Agent',
    fp_platform: 'Platform',
    fp_language: 'Language',
    fp_languages: 'Languages',
    fp_screen: 'Screen',
    fp_pixel_ratio: 'Pixel Ratio',
    fp_color_depth: 'Color Depth',
    fp_timezone: 'Timezone',
    fp_touch: 'Touch Support',
    fp_cookies: 'Cookies',
    fp_dnt: 'Do Not Track',
    fp_cores: 'CPU Cores',
    fp_memory: 'Device Memory',
    fp_webgl_vendor: 'WebGL Vendor',
    fp_webgl_renderer: 'WebGL Renderer',
    fp_canvas_hash: 'Canvas Fingerprint',
    fp_audio_hash: 'Audio Fingerprint',

    fraud_title: 'Fraud Score',
    fraud_desc: 'Detect proxy, VPN, Tor, datacenter, and anonymous IP risks.',
    fraud_checking: 'Evaluating risk...',
    fraud_score: 'Risk Score',
    fraud_ip: 'IP Address',
    fraud_proxy: 'Proxy',
    fraud_vpn: 'VPN',
    fraud_tor: 'Tor',
    fraud_cloud: 'Cloud Hosting',
    fraud_anonymous: 'Anonymous',
    fraud_low: 'Low Risk',
    fraud_mid: 'Medium Risk',
    fraud_high: 'High Risk',

    whois_title: 'Whois Domain Lookup',
    whois_desc: 'Query registrar, expiration date, name servers, and related domain data.',
    whois_checking: 'Querying Whois...',
    whois_domain: 'Domain',
    whois_registrar: 'Registrar',
    whois_created: 'Created',
    whois_expires: 'Expires',
    whois_status: 'Status',
    whois_ns: 'Name Servers',
    whois_dnssec: 'DNSSEC',
    whois_registrant: 'Registrant',
    whois_email: 'Email',
    whois_input_hint: 'Enter domain, e.g. example.com',
    whois_query: 'Query',
    whois_gdpr: 'Redacted (GDPR)',

    headers_title: 'HTTP Headers / SSL Certificates',
    headers_desc: 'Inspect HTTP response headers and certificate transparency logs.',
    headers_checking: 'Fetching...',
    headers_http: 'HTTP Response Headers',
    headers_ssl: 'SSL Certificates (CT)',
    headers_input_hint: 'Enter URL, e.g. https://example.com',
    headers_query: 'Check',
    headers_cert_issuer: 'Issuer',
    headers_cert_not_before: 'Not Before',
    headers_cert_not_after: 'Not After',
    headers_cert_name: 'Domain',
    headers_cert_count: 'Certificate Count',

    speed_title: 'Website Speed Test',
    speed_desc: 'Estimate bandwidth by downloading a test file from Cloudflare.',
    speed_start: 'Start test',
    speed_testing: 'Testing speed...',
    speed_result: 'Download Speed',
    speed_time: 'Duration',
    speed_size: 'Downloaded',

    summary_title: 'Summary Report',
    summary_copy: 'Copy Report',
    summary_copied: 'Copied to clipboard',
    summary_ip: 'IP Address',
    summary_location: 'Location',
    summary_isp: 'ISP',
    summary_latency_ok: 'Reachable Services',
    summary_latency_fail: 'Unreachable Services',
    summary_dns_ok: 'DNS OK',
    summary_dns_fail: 'DNS Failed',
    summary_webrtc: 'WebRTC Leak',
    summary_dns_leak: 'DNS Leak',
    summary_fraud_score: 'Fraud Score',

    toast_online: 'Network connected',
    toast_offline: 'Network disconnected',
    toast_ip_changed: 'IP address changed',
    toast_error: 'Operation failed',
  },
};

const ZH_OVERRIDES = {
  nav_ip: 'IP 信息',
  nav_env: '网络环境',
  nav_latency: '延迟测试',
  nav_dns: 'DNS 解析',
  nav_security: '安全检测',
  nav_webrtc: 'WebRTC 泄漏',
  nav_dns_leak: 'DNS 泄漏',
  nav_fp: '浏览器指纹',
  nav_fraud: '欺诈评分',
  nav_whois: 'WHOIS 查询',
  nav_headers: 'HTTP 头部 / SSL',
  nav_speed: '速度测试',
  nav_summary: '摘要报告',
  lang_toggle: 'EN',
  dark_toggle: '切换主题',
  hero_badge: '一站式网络诊断工具',
  hero_title: '检查你的网络环境',
  hero_desc: '一键检测 IP 地址、网络延迟、DNS 解析、WebRTC 泄漏、浏览器指纹等全方位网络信息。',
  hero_sub: '一站式网络诊断工具箱',
  hero_ip_label: '你的 IP 地址',
  ip_label: 'IP 地址',
  ip_location: '位置',
  ip_isp: '运营商',
  btn_run: '开始检测',
  btn_run_all: '开始检测',
  btn_copy: '复制报告',
  btn_ip: '刷新 IP',
  btn_env: '检测环境',
  btn_latency: '测试延迟',
  btn_dns: '运行 DNS 解析',
  btn_webrtc: '检测 WebRTC',
  btn_dnsleak: '检测 DNS 泄漏',
  btn_fp: '生成指纹',
  feat_ip: 'IP 信息',
  feat_ip_desc: 'IP 地址、地理位置、ISP、ASN、时区。',
  feat_env: '网络环境',
  feat_env_desc: '连接类型、下行速度、RTT、省流模式和 IPv6。',
  feat_latency: '延迟测试',
  feat_latency_desc: '测试 Google、GitHub、ChatGPT 等常用服务可达性。',
  feat_dns: 'DNS 解析',
  feat_dns_desc: '通过多个 DoH 解析器解析常用域名并统计耗时。',
  feat_webrtc: 'WebRTC 泄漏',
  feat_webrtc_desc: '检测 WebRTC 是否暴露真实公网 IP。',
  feat_dnsleak: 'DNS 泄漏',
  feat_dnsleak_desc: '检查 DNS 查询和出口信息是否可能泄漏。',
  feat_fp: '浏览器指纹',
  feat_fp_desc: '收集浏览器、屏幕、WebGL、Canvas 和 Audio 指纹。',
  feat_fraud: '欺诈评分',
  feat_fraud_desc: '评估代理、VPN、Tor、云服务等 IP 风险。',
  sec_ip: 'IP 与网络信息',
  sec_latency: '延迟与连通性',
  sec_dns: 'DNS 解析',
  sec_leak: '安全与泄漏检测',
  sec_tools: '扩展工具',
  sec_summary: '检测摘要',
  badge_pending: '等待中',
  empty_hint: '点击按钮或上方卡片开始测试。',
  summary_empty: '点击“开始检测”运行全面网络诊断。',
  leak_webrtc: 'WebRTC 泄漏',
  leak_dns: 'DNS 泄漏',
  leak_fp: '浏览器指纹',
  leak_waiting: '等待检测',
  label_ip: 'IP 地址',
  label_loc: '位置',
  label_isp: 'ISP',
  label_asn: 'ASN',
  label_property: 'IP 属性',
  label_country: '国家',
  label_webrtc_ip: 'WebRTC 泄漏 IP',
  label_tz: '时区',
  label_conn: '连接类型',
  label_down: '下行速度',
  label_rtt: 'RTT',
  label_ipv6: 'IPv6',
  label_saver: '省流模式',
  label_speed: '实测速度',
  label_online: '在线状态',
  ip_title: 'IP 信息',
  ip_loading: '正在检测 IP...',
  ip_city: '城市',
  ip_region: '地区',
  ip_country: '国家',
  ip_org: '组织',
  ip_tz: '时区',
  ip_asn: 'ASN',
  ip_lat: '纬度',
  ip_lon: '经度',
  ip_hosting: '托管网络',
  ip_proxy: '代理',
  ip_mobile: '移动网络',
  ip_residential: '住宅网络',
  env_title: '网络环境',
  env_loading: '正在检测网络环境...',
  env_type: '连接类型',
  env_downlink: '下行带宽',
  env_rtt: 'RTT',
  env_save: '省流模式',
  env_ipv6: 'IPv6 地址',
  env_speed_title: '网络速度',
  env_speed_testing: '正在测速...',
  env_speed_result: '下载速度',
  yes: '是',
  no: '否',
  unknown: '未知',
  timeout: '超时',
  loading: '加载中...',
  error: '错误',
  none: '无',
  not_available: '不支持',
  latency_title: '延迟测试',
  latency_running: '正在测试延迟...',
  latency_service: '服务',
  latency_latency: '延迟',
  latency_status: '状态',
  latency_ok: '可达',
  latency_fail: '不可达',
  latency_fast: '快',
  latency_medium: '中',
  latency_slow: '慢',
  dns_title: 'DNS 解析',
  dns_running: '正在解析 DNS...',
  dns_domain: '域名',
  dns_ips: '解析 IP',
  dns_time: '耗时',
  dns_status: '状态',
  dns_ok: '成功',
  dns_fail: '失败',
  dns_resolver: '解析器',
  webrtc_title: 'WebRTC 泄漏检测',
  webrtc_checking: '正在检测 WebRTC...',
  webrtc_ips: '检测到的 IP',
  webrtc_public: '公网 IP',
  webrtc_private: '私网 IP',
  webrtc_safe: '安全',
  webrtc_leaked: '泄漏',
  webrtc_detail: '详情',
  webrtc_no_leak: '未检测到公网 IP 泄漏',
  webrtc_leak_detected: '检测到公网 IP 泄漏',
  webrtc_not_supported: '当前浏览器不支持 WebRTC',
  dns_leak_title: 'DNS 泄漏检测',
  dns_leak_checking: '正在检测 DNS 泄漏...',
  dns_leak_ip: '出口 IP',
  dns_leak_loc: '位置',
  dns_leak_warp: 'WARP 状态',
  dns_leak_safe: '安全',
  dns_leak_warn: '警告',
  dns_leak_warp_on: 'WARP 已启用',
  dns_leak_warp_off: 'WARP 未启用',
  fp_title: '浏览器指纹',
  fp_checking: '正在收集指纹...',
  fp_ua: 'User Agent',
  fp_platform: '平台',
  fp_language: '语言',
  fp_languages: '所有语言',
  fp_screen: '屏幕',
  fp_pixel_ratio: '像素比',
  fp_color_depth: '色深',
  fp_timezone: '时区',
  fp_touch: '触摸支持',
  fp_cookies: 'Cookies',
  fp_dnt: 'Do Not Track',
  fp_cores: 'CPU 核心数',
  fp_memory: '设备内存',
  fp_webgl_vendor: 'WebGL 厂商',
  fp_webgl_renderer: 'WebGL 渲染器',
  fp_canvas_hash: 'Canvas 指纹',
  fp_audio_hash: 'Audio 指纹',
  fraud_title: '欺诈评分',
  fraud_desc: '检测代理、VPN、Tor、数据中心等风险。',
  fraud_checking: '正在评估风险...',
  fraud_score: '风险评分',
  fraud_ip: 'IP 地址',
  fraud_proxy: '代理',
  fraud_vpn: 'VPN',
  fraud_tor: 'Tor',
  fraud_cloud: '云服务',
  fraud_anonymous: '匿名',
  fraud_low: '低风险',
  fraud_mid: '中风险',
  fraud_high: '高风险',
  whois_title: 'Whois 域名查询',
  whois_desc: '查询域名注册商、过期时间、DNS 服务器等。',
  whois_checking: '正在查询 Whois...',
  whois_domain: '域名',
  whois_registrar: '注册商',
  whois_created: '创建时间',
  whois_expires: '到期时间',
  whois_status: '状态',
  whois_ns: '域名服务器',
  whois_dnssec: 'DNSSEC',
  whois_registrant: '注册人',
  whois_email: '联系邮箱',
  whois_input_hint: '输入域名，例如 example.com',
  whois_query: '查询',
  whois_gdpr: '已隐藏（GDPR）',
  headers_title: 'HTTP 头部 / SSL 证书',
  headers_desc: '查看 HTTP 响应头和 SSL 证书透明度日志。',
  headers_checking: '正在获取...',
  headers_http: 'HTTP 响应头',
  headers_ssl: 'SSL 证书（证书透明度）',
  headers_input_hint: '输入 URL，例如 https://example.com',
  headers_query: '检测',
  headers_cert_issuer: '颁发者',
  headers_cert_not_before: '生效时间',
  headers_cert_not_after: '到期时间',
  headers_cert_name: '域名',
  headers_cert_count: '证书数量',
  speed_title: '网站测速',
  speed_desc: '从 Cloudflare 下载测试文件估算带宽。',
  speed_start: '开始测速',
  speed_testing: '正在测速...',
  speed_result: '下载速度',
  speed_time: '耗时',
  speed_size: '下载大小',
  summary_title: '摘要报告',
  summary_copy: '复制报告',
  summary_copied: '已复制到剪贴板',
  summary_ip: 'IP 地址',
  summary_location: '位置',
  summary_isp: 'ISP',
  summary_latency_ok: '可达服务',
  summary_latency_fail: '不可达服务',
  summary_dns_ok: 'DNS 成功',
  summary_dns_fail: 'DNS 失败',
  summary_webrtc: 'WebRTC 泄漏',
  summary_dns_leak: 'DNS 泄漏',
  summary_fraud_score: '欺诈评分',
  toast_online: '网络已连接',
  toast_offline: '网络已断开',
  toast_ip_changed: 'IP 地址已变化',
  toast_error: '操作失败',
};

let _lang = localStorage.getItem('nettoolbox_lang') || 'zh';

function t(key) {
  if (_lang === 'zh' && ZH_OVERRIDES[key]) return ZH_OVERRIDES[key];
  return (I18N[_lang] && I18N[_lang][key]) || I18N.en[key] || key;
}

function toggleLang() {
  _lang = _lang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('nettoolbox_lang', _lang);
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = txt;
    } else {
      el.textContent = txt;
    }
  });
  /* update lang toggle button label if present */
  const btn = document.getElementById('btnLang');
  if (btn) btn.textContent = t('lang_toggle');
}

/* ----------------------------------------------------------
   DARK MODE
   ---------------------------------------------------------- */
function initDarkMode() {
  const saved = localStorage.getItem('nettoolbox_dark');
  const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  if (saved === 'false' || (saved === null && !prefersDark)) {
    document.documentElement.classList.add('light');
  }
}

function toggleDark() {
  document.documentElement.classList.toggle('light');
  localStorage.setItem('nettoolbox_dark', !document.documentElement.classList.contains('light'));
}

/* ----------------------------------------------------------
   UI HELPERS
   ---------------------------------------------------------- */
const $ = id => document.getElementById(id);
const esc = s => { const d = document.createElement('div'); d.textContent = String(s ?? ''); return d.innerHTML; };
function setText(id, text) { const el = $(id); if (el) el.textContent = text; }
function html(id, h) { const el = $(id); if (el) el.innerHTML = h; }

function setBadge(id, state, text) {
  const el = $(id);
  if (!el) return;
  el.className = 'badge badge-' + state;
  el.textContent = text;
}

function statusBox(type, msg) {
  return `<div class="status-box status-${type}">${esc(msg)}</div>`;
}

function tag(type, text) {
  return `<span class="tag tag-${type}">${esc(text)}</span>`;
}

async function safeFetch(url, opts = {}) {
  const timeout = opts.timeout || 10000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

/* ----------------------------------------------------------
   PROGRESS BAR
   ---------------------------------------------------------- */
let _progTotal = 0, _progStep = 0;

function initProgress(total) {
  _progTotal = total;
  _progStep = 0;
  const bar = $('progressBar');
  const wrap = $('progressWrap');
  if (wrap) wrap.style.display = 'block';
  if (bar) bar.style.width = '0%';
}

function updateProgress(step) {
  _progStep = step;
  const bar = $('progressBar');
  if (bar) bar.style.width = Math.round((_progStep / _progTotal) * 100) + '%';
}

function hideProgress() {
  const bar = $('progressBar');
  const wrap = $('progressWrap');
  if (bar) bar.style.width = '100%';
  setTimeout(() => { if (wrap) wrap.style.display = 'none'; }, 400);
}

/* ----------------------------------------------------------
   NAVIGATION
   ---------------------------------------------------------- */
function initNav() {
  const burger = $('btnHamburger');
  const navLinks = $('mainNav');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      if (navLinks) navLinks.classList.remove('open');
    });
  });
  /* scroll spy */
  const sections = document.querySelectorAll('.card[id]');
  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
  }
}

/* ----------------------------------------------------------
   TOAST
   ---------------------------------------------------------- */
function showToast(msg, type = 'info') {
  const container = $('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 400); }, 4000);
}

/* ----------------------------------------------------------
   IP DETECTION
   ---------------------------------------------------------- */
let _ipData = null;

async function fetchOneIP(url, parser) {
  try {
    const res = await safeFetch(url, { timeout: 5000 });
    if (!res.ok) return null;
    return parser(await res.json());
  } catch { return null; }
}

async function checkIP() {
  const container = $('ipResult');
  if (container) container.innerHTML = statusBox('loading', t('ip_loading'));

  const best = await fetchOneIP('https://ipinfo.io/json', d => ({
      ip: d.ip, city: d.city, region: d.region, country: d.country,
      org: d.org, timezone: d.timezone, asn: d.asn, loc: d.loc,
    })) || await fetchOneIP('https://api.ipify.org?format=json', d => ({ ip: d.ip }));

  if (!best) {
    if (container) container.innerHTML = statusBox('error', t('error'));
    return null;
  }

  _ipData = best;

  /* render hero */
  setText('heroIP', best.ip || '-');
  const loc = [best.city, best.region, best.country].filter(Boolean).join(', ');
  setText('heroLocation', loc || '-');
  setText('heroISP', best.org || '-');

  /* render detail grid */
  if (container) {
    const rows = [
      [t('ip_label'), best.ip],
      [t('ip_city'), best.city],
      [t('ip_region'), best.region],
      [t('ip_country'), best.country],
      [t('ip_org'), best.org],
      [t('ip_asn'), best.asn],
      [t('ip_tz'), best.timezone],
      [t('ip_lat'), best.lat],
      [t('ip_lon'), best.lon],
    ];
    let h = '<div class="detail-grid">';
    rows.forEach(([k, v]) => {
      h += `<div class="detail-item"><span class="detail-label">${esc(k)}</span><span class="detail-value">${esc(v || '-')}</span></div>`;
    });
    h += '</div>';
    h += renderIPProperty(best);
    container.innerHTML = h;
  }
  return best;
}

function renderIPProperty(d) {
  const tags = [];
  if (d.hosting) tags.push(tag('info', t('ip_hosting')));
  if (d.proxy)   tags.push(tag('warn', t('ip_proxy')));
  if (d.mobile)  tags.push(tag('info', t('ip_mobile')));
  if (!d.hosting && !d.proxy) tags.push(tag('ok', t('ip_residential')));
  if (!tags.length) return '';
  return `<div class="tag-row">${tags.join('')}</div>`;
}

/* ----------------------------------------------------------
   NETWORK ENVIRONMENT
   ---------------------------------------------------------- */
async function checkEnv() {
  const container = $('envResult');
  if (container) container.innerHTML = statusBox('loading', t('env_loading'));

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  let rows = [];
  if (conn) {
    rows = [
      [t('env_type'), conn.effectiveType || '-'],
      [t('env_downlink'), conn.downlink ? conn.downlink + ' Mbps' : '-'],
      [t('env_rtt'), conn.rtt !== undefined ? conn.rtt + ' ms' : '-'],
      [t('env_save'), conn.saveData ? t('yes') : t('no')],
    ];
  } else {
    rows = [[t('env_type'), t('not_available')]];
  }

  /* IPv6 */
  let ipv6 = '-';
  try {
    const r = await safeFetch('https://api64.ipify.org?format=json', { timeout: 5000 });
    if (r.ok) { const d = await r.json(); ipv6 = d.ip || '-'; }
  } catch {}
  rows.push([t('env_ipv6'), ipv6]);

  if (container) {
    let h = '<div class="detail-grid">';
    rows.forEach(([k, v]) => {
      h += `<div class="detail-item"><span class="detail-label">${esc(k)}</span><span class="detail-value">${esc(v)}</span></div>`;
    });
    h += '</div>';
    container.innerHTML = h;
  }
  return { connection: conn, ipv6 };
}

/* Simple inline speed test via picsum */
async function runSpeedTest() {
  const container = $('speedInlineResult');
  if (container) container.innerHTML = statusBox('loading', t('env_speed_testing'));
  const size = 2 * 1024 * 1024; // 2 MB
  const url = `https://picsum.photos/${size}?_=${Date.now()}`;
  const start = performance.now();
  try {
    const res = await safeFetch(url, { timeout: 30000, cache: 'no-store' });
    await res.blob();
    const elapsed = (performance.now() - start) / 1000;
    const mbps = ((size * 8) / elapsed / 1e6).toFixed(2);
    if (container) container.innerHTML = `<span class="detail-value">${mbps} Mbps</span>`;
    return mbps;
  } catch {
    if (container) container.innerHTML = statusBox('error', t('timeout'));
    return null;
  }
}

/* ----------------------------------------------------------
   LATENCY TEST
   ---------------------------------------------------------- */
async function ping(url, { timeout = 5000, samples = 3 } = {}) {
  const times = [];
  /* warm-up */
  try { await safeFetch(url, { mode: 'no-cors', cache: 'no-store', timeout }); } catch {}
  for (let i = 0; i < samples; i++) {
    const t0 = performance.now();
    try {
      await safeFetch(url, { mode: 'no-cors', cache: 'no-store', timeout });
      times.push(performance.now() - t0);
    } catch { times.push(Infinity); }
  }
  return Math.min(...times);
}

async function asyncPool(limit, items, fn) {
  const results = [];
  const executing = new Set();
  for (const [i, item] of items.entries()) {
    const p = Promise.resolve().then(() => fn(item, i));
    results.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean, clean);
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}

async function runLatency() {
  const container = $('latencyResult');
  if (container) container.innerHTML = statusBox('loading', t('latency_running'));

  const results = [];
  await asyncPool(6, SERVICES, async (svc, i) => {
    const ms = await ping(svc.url, { timeout: 5000, samples: 3 });
    results[i] = { ...svc, ms };
  });

  /* render */
  if (container) {
    let ok = 0, fail = 0;
    let h = '<table class="result-table"><thead><tr>';
    h += `<th>${esc(t('latency_service'))}</th><th>${esc(t('latency_latency'))}</th><th>${esc(t('latency_status'))}</th></tr></thead><tbody>`;
    results.forEach(r => {
      const isOk = isFinite(r.ms) && r.ms < 5000;
      if (isOk) ok++; else fail++;
      const ms = isOk ? Math.round(r.ms) : null;
      let speedClass = 'gray';
      let speedLabel = t('timeout');
      if (ms !== null) {
        speedClass = ms < 300 ? 'green' : ms < 1000 ? 'yellow' : 'red';
        speedLabel = ms < 300 ? t('latency_fast') : ms < 1000 ? t('latency_medium') : t('latency_slow');
      }
      const pct = ms !== null ? Math.min(ms / 2000 * 100, 100) : 100;
      h += '<tr>';
      h += `<td><img src="${esc(r.url)}" class="favicon" onerror="this.style.display='none'" width="16" height="16"> ${esc(r.name)}</td>`;
      h += `<td><div class="progress-bar-inline"><div class="progress-fill progress-${speedClass}" style="width:${pct}%"></div></div> <span class="latency-val">${ms !== null ? ms + ' ms' : t('timeout')}</span></td>`;
      h += `<td>${isOk ? '<span class="icon-ok">✓</span> ' + esc(speedLabel) : '<span class="icon-fail">✗</span> ' + t('latency_fail')}</td>`;
      h += '</tr>';
    });
    h += '</tbody></table>';
    container.innerHTML = h;
    setBadge('latencyBadge', fail === 0 ? 'ok' : 'warn', `${ok}/${results.length}`);
  }
  return { ok: results.filter(r => isFinite(r.ms) && r.ms < 5000).length, smooth: results.filter(r => isFinite(r.ms) && r.ms < 300).length, total: results.length, results };
}

/* ----------------------------------------------------------
   DNS RESOLUTION
   ---------------------------------------------------------- */
async function runDNS() {
  const container = $('dnsResult');
  if (container) container.innerHTML = statusBox('loading', t('dns_running'));

  const results = [];
  for (const domain of DNS_TARGETS) {
    let resolved = null, resolver = null, time = 0, ips = [];
    for (const r of DNS_RESOLVERS) {
      const start = performance.now();
      try {
        const res = await safeFetch(`${r.url}?name=${domain}&type=A`, {
          headers: { Accept: 'application/dns-json' }, timeout: 5000,
        });
        if (!res.ok) continue;
        const data = await res.json();
        time = Math.round(performance.now() - start);
        if (data.Answer && data.Answer.length) {
          ips = data.Answer.filter(a => a.type === 1 || a.type === 28).map(a => a.data);
          if (ips.length) { resolved = r.name; break; }
        }
      } catch {}
    }
    results.push({ domain, ips, resolver: resolved, time, ok: !!resolved });
  }

  if (container) {
    let h = '<table class="result-table"><thead><tr>';
    h += `<th>${esc(t('dns_domain'))}</th><th>${esc(t('dns_ips'))}</th><th>${esc(t('dns_resolver'))}</th><th>${esc(t('dns_time'))}</th><th>${esc(t('dns_status'))}</th></tr></thead><tbody>`;
    results.forEach(r => {
      h += '<tr>';
      h += `<td>${esc(r.domain)}</td>`;
      h += `<td>${r.ips.length ? esc(r.ips.join(', ')) : '-'}</td>`;
      h += `<td>${r.resolver ? esc(r.resolver) : '-'}</td>`;
      h += `<td>${r.time ? r.time + ' ms' : '-'}</td>`;
      h += `<td>${r.ok ? tag('ok', t('dns_ok')) : tag('fail', t('dns_fail'))}</td>`;
      h += '</tr>';
    });
    h += '</tbody></table>';
    container.innerHTML = h;
  }
  return results;
}

/* ----------------------------------------------------------
   WEBRTC LEAK
   ---------------------------------------------------------- */
function isValidIPv4(ip) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split('.').every(o => +o >= 0 && +o <= 255);
}
function isValidIPv6(ip) {
  return /^[0-9a-f:]{2,39}$/i.test(ip);
}
function isPrivateV4(ip) {
  const p = ip.split('.').map(Number);
  return p[0] === 10 || (p[0] === 172 && p[1] >= 16 && p[1] <= 31) || (p[0] === 192 && p[1] === 168) || p[0] === 127;
}
function isPrivateV6(ip) {
  return /^fc|^fd|^fe80|^::1$/i.test(ip);
}

async function checkWebRTC() {
  const container = $('webrtcResult');
  if (container) container.innerHTML = statusBox('loading', t('webrtc_checking'));

  const ips = new Set();
  const publicIPs = new Set();
  const privateIPs = new Set();

  try {
    await new Promise((resolve, reject) => {
      const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
      const timer = setTimeout(() => { pc.close(); resolve(); }, 10000);
      pc.onicecandidate = e => {
        if (!e.candidate) { clearTimeout(timer); pc.close(); resolve(); return; }
        const val = e.candidate.candidate;
        /* extract IP tokens from candidate string */
        const tokens = val.split(/\s+/);
        for (const tok of tokens) {
          if (isValidIPv4(tok)) {
            ips.add(tok);
            (isPrivateV4(tok) ? privateIPs : publicIPs).add(tok);
          } else if (isValidIPv6(tok)) {
            ips.add(tok);
            (isPrivateV6(tok) ? privateIPs : publicIPs).add(tok);
          }
        }
      };
      pc.createDataChannel('');
      pc.createOffer().then(o => pc.setLocalDescription(o)).catch(() => { clearTimeout(timer); resolve(); });
    });
  } catch {}

  const allIPs = [...ips];
  const pubIPs = [...publicIPs];
  const privIPs = [...privateIPs];
  const httpIP = _ipData ? _ipData.ip : null;
  const leakedIPs = httpIP ? pubIPs.filter(ip => ip !== httpIP) : pubIPs;
  const safe = leakedIPs.length === 0;

  if (container) {
    let h = '<div class="detail-grid">';
    h += `<div class="detail-item"><span class="detail-label">${esc(t('webrtc_ips'))}</span><span class="detail-value">${allIPs.length ? esc(allIPs.join(', ')) : '-'}</span></div>`;
    h += `<div class="detail-item"><span class="detail-label">${esc(t('webrtc_public'))}</span><span class="detail-value">${pubIPs.length ? esc(pubIPs.join(', ')) : '-'}</span></div>`;
    h += `<div class="detail-item"><span class="detail-label">${esc(t('webrtc_private'))}</span><span class="detail-value">${privIPs.length ? esc(privIPs.join(', ')) : '-'}</span></div>`;
    h += '</div>';
    h += safe ? statusBox('ok', t('webrtc_no_leak')) : statusBox('warn', t('webrtc_leak_detected'));
    container.innerHTML = h;
  }

  return { ips: allIPs, publicIPs: pubIPs, privateIPs: privIPs, safe, leakedIPs, detail: safe ? t('webrtc_no_leak') : t('webrtc_leak_detected') };
}

/* ----------------------------------------------------------
   DNS LEAK
   ---------------------------------------------------------- */
async function checkDNSLeak() {
  const container = $('dnsLeakResult');
  if (container) container.innerHTML = statusBox('loading', t('dns_leak_checking'));

  try {
    const res = await safeFetch('https://cloudflare.com/cdn-cgi/trace', { timeout: 8000 });
    const text = await res.text();
    const data = {};
    text.split('\n').forEach(line => {
      const [k, v] = line.split('=');
      if (k && v) data[k.trim()] = v.trim();
    });
    const warpOn = data.warp === 'on' || data.warp === 'plus';
    const result = {
      ip: data.ip || '-',
      location: [data.loc, data.ts].filter(Boolean).join(' '),
      warp: warpOn,
      safe: warpOn,
      detail: warpOn ? t('dns_leak_warp_on') : t('dns_leak_warp_off'),
    };
    if (container) {
      let h = '<div class="detail-grid">';
      h += `<div class="detail-item"><span class="detail-label">${esc(t('dns_leak_ip'))}</span><span class="detail-value">${esc(result.ip)}</span></div>`;
      h += `<div class="detail-item"><span class="detail-label">${esc(t('dns_leak_loc'))}</span><span class="detail-value">${esc(result.location)}</span></div>`;
      h += `<div class="detail-item"><span class="detail-label">${esc(t('dns_leak_warp'))}</span><span class="detail-value">${result.safe ? tag('ok', t('dns_leak_safe')) : tag('warn', t('dns_leak_warn'))} ${esc(result.detail)}</span></div>`;
      h += '</div>';
      container.innerHTML = h;
    }
    return result;
  } catch {
    if (container) container.innerHTML = statusBox('error', t('error'));
    return null;
  }
}

/* ----------------------------------------------------------
   BROWSER FINGERPRINT
   ---------------------------------------------------------- */
function getWebGLInfo() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    if (!gl) return { vendor: '-', renderer: '-' };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return { vendor: '-', renderer: '-' };
    return {
      vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || '-',
      renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '-',
    };
  } catch { return { vendor: '-', renderer: '-' }; }
}

function getCanvasHash() {
  try {
    const c = document.createElement('canvas');
    c.width = 280; c.height = 60;
    const ctx = c.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 280, 60);
    ctx.fillStyle = '#069';
    ctx.fillText('NetToolbox fingerprint test 🌐', 2, 15);
    ctx.fillStyle = 'rgba(102,204,0,0.7)';
    ctx.fillText('canvas-hash-check', 4, 35);
    /* simple djb2 hash */
    let hash = 5381;
    for (const ch of c.toDataURL()) { hash = ((hash << 5) + hash + ch.charCodeAt(0)) & 0xffffffff; }
    return (hash >>> 0).toString(16);
  } catch { return '-'; }
}

async function getAudioFingerprint() {
  try {
    const ctx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100);
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(10000, ctx.currentTime);
    const comp = ctx.createDynamicsCompressor();
    osc.connect(comp);
    comp.connect(ctx.destination);
    osc.start(0);
    const buffer = await ctx.startRendering();
    const data = buffer.getChannelData(0);
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += Math.abs(data[i]);
    return (sum % 1e6).toFixed(0);
  } catch { return '-'; }
}

async function checkFingerprint() {
  const container = $('fpResult');
  if (container) container.innerHTML = statusBox('loading', t('fp_checking'));

  const gl = getWebGLInfo();
  const canvasHash = getCanvasHash();
  const audioHash = await getAudioFingerprint();
  const nav = navigator;

  const touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const cookies = nav.cookieEnabled;
  const dnt = nav.doNotTrack === '1' || nav.doNotTrack === 'yes';

  const rows = [
    [t('fp_ua'), nav.userAgent],
    [t('fp_platform'), nav.platform],
    [t('fp_language'), nav.language],
    [t('fp_languages'), (nav.languages || []).join(', ')],
    [t('fp_screen'), `${screen.width}x${screen.height} @ ${window.devicePixelRatio}`],
    [t('fp_color_depth'), screen.colorDepth + ' bit'],
    [t('fp_timezone'), Intl.DateTimeFormat().resolvedOptions().timeZone],
    [t('fp_touch'), touch ? t('yes') : t('no')],
    [t('fp_cookies'), cookies ? t('yes') : t('no')],
    [t('fp_dnt'), dnt ? t('yes') : t('no')],
    [t('fp_cores'), nav.hardwareConcurrency || '-'],
    [t('fp_memory'), nav.deviceMemory ? nav.deviceMemory + ' GB' : '-'],
    [t('fp_webgl_vendor'), gl.vendor],
    [t('fp_webgl_renderer'), gl.renderer],
    [t('fp_canvas_hash'), canvasHash],
    [t('fp_audio_hash'), audioHash],
  ];

  if (container) {
    let h = '<div class="detail-grid">';
    rows.forEach(([k, v]) => {
      h += `<div class="detail-item"><span class="detail-label">${esc(k)}</span><span class="detail-value fp-value" title="${esc(String(v))}">${esc(String(v))}</span></div>`;
    });
    h += '</div>';
    container.innerHTML = h;
  }
  return { ua: nav.userAgent, platform: nav.platform, language: nav.language, screen: `${screen.width}x${screen.height}`, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, gl, canvasHash, audioHash };
}

/* ----------------------------------------------------------
   FRAUD SCORE
   ---------------------------------------------------------- */
const Fraud = {
  async run() {
    const container = $('fraudResult');
    if (container) container.innerHTML = statusBox('loading', t('fraud_checking'));

    try {
      const ip = _ipData ? _ipData.ip : '';
      if (!ip) throw new Error('no IP');
      const res = await safeFetch(`https://ipapi.co/${ip}/json/`, { timeout: 8000 });
      const d = await res.json();
      let score = 0;
      if (d.proxy)     score += 40;
      if (d.hosting)   score += 30;
      if (d.tor)       score += 20;
      if (d.anonymous) score += 10;

      const level = score < 30 ? 'low' : score < 70 ? 'mid' : 'high';
      const color = level === 'low' ? '#22c55e' : level === 'mid' ? '#eab308' : '#ef4444';
      const label = level === 'low' ? t('fraud_low') : level === 'mid' ? t('fraud_mid') : t('fraud_high');

      if (container) {
        let h = `<div class="score-circle" style="--score-color:${color}"><span class="score-num">${score}</span><span class="score-label">${esc(label)}</span></div>`;
        h += '<table class="result-table"><tbody>';
        h += `<tr><td>${esc(t('fraud_ip'))}</td><td>${esc(ip)}</td></tr>`;
        h += `<tr><td>${esc(t('fraud_proxy'))}</td><td>${d.proxy ? tag('fail', t('yes')) : tag('ok', t('no'))}</td></tr>`;
        h += `<tr><td>${esc(t('fraud_vpn'))}</td><td>${d.vpn ? tag('fail', t('yes')) : tag('ok', t('no'))}</td></tr>`;
        h += `<tr><td>${esc(t('fraud_tor'))}</td><td>${d.tor ? tag('fail', t('yes')) : tag('ok', t('no'))}</td></tr>`;
        h += `<tr><td>${esc(t('fraud_cloud'))}</td><td>${d.hosting ? tag('warn', t('yes')) : tag('ok', t('no'))}</td></tr>`;
        h += `<tr><td>${esc(t('fraud_anonymous'))}</td><td>${d.anonymous ? tag('warn', t('yes')) : tag('ok', t('no'))}</td></tr>`;
        h += '</tbody></table>';
        container.innerHTML = h;
      }
      return { score, proxy: d.proxy, vpn: d.vpn, tor: d.tor, hosting: d.hosting, anonymous: d.anonymous };
    } catch {
      if (container) container.innerHTML = statusBox('error', t('error'));
      return null;
    }
  },
};

/* ----------------------------------------------------------
   WHOIS
   ---------------------------------------------------------- */
const Whois = {
  async run(domain) {
    const container = $('whoisResult');
    if (!domain) {
      const input = $('whoisInput');
      domain = input ? input.value.trim() : '';
    }
    if (!domain) return;
    if (container) container.innerHTML = statusBox('loading', t('whois_checking'));

    try {
      const res = await safeFetch(`https://whoisfreeapi.com/whois/${encodeURIComponent(domain)}`, { timeout: 15000 });
      const d = await res.json();

      const safe = v => {
        if (!v || v === '' || /redacted/i.test(v)) return t('whois_gdpr');
        return Array.isArray(v) ? v.join(', ') : v;
      };

      const rows = [
        [t('whois_domain'), d.domainName],
        [t('whois_registrar'), d.registrarName || d.sponsorRegistrar],
        [t('whois_created'), d.creationDate || d.createdDate],
        [t('whois_expires'), d.expirationDate || d.registryExpiryDate],
        [t('whois_status'), safe(d.domainStatus)],
        [t('whois_ns'), safe(d.nameServer)],
        [t('whois_dnssec'), d.dnssec],
        [t('whois_registrant'), safe(d.registrantName || (d.contacts && d.contacts.registrant && d.contacts.registrant.name))],
        [t('whois_email'), safe(d.registrantEmail || (d.contacts && d.contacts.registrant && d.contacts.registrant.email))],
      ];

      if (container) {
        let h = '<table class="result-table"><tbody>';
        rows.forEach(([k, v]) => {
          h += `<tr><td class="detail-label">${esc(k)}</td><td>${esc(safe(v))}</td></tr>`;
        });
        h += '</tbody></table>';
        container.innerHTML = h;
      }
      return d;
    } catch {
      if (container) container.innerHTML = statusBox('error', t('error'));
      return null;
    }
  },
};
window.Whois = Whois;

/* ----------------------------------------------------------
   HTTP HEADERS / SSL
   ---------------------------------------------------------- */
const Headers = {
  async run(url) {
    const container = $('headersResult');
    if (!url) {
      const input = $('headersInput');
      url = input ? input.value.trim() : '';
    }
    if (!url) return;
    if (container) container.innerHTML = statusBox('loading', t('headers_checking'));

    const httpP = this.fetchHeaders(url, container);
    const sslP = this.fetchSSL(url, container);
    await Promise.all([httpP, sslP]);
  },

  async fetchHeaders(url, container) {
    try {
      const proxy = 'https://api.allorigins.win/raw?url=';
      const res = await safeFetch(proxy + encodeURIComponent(url), { timeout: 15000 });
      const headers = {};
      res.headers.forEach((v, k) => { headers[k] = v; });
      /* allorigins may not expose all headers; fall back to showing what we got */
      const el = $('headersHttp');
      if (el) {
        let h = `<h4>${esc(t('headers_http'))}</h4>`;
        if (Object.keys(headers).length) {
          h += '<table class="result-table"><tbody>';
          Object.entries(headers).forEach(([k, v]) => {
            h += `<tr><td class="detail-label">${esc(k)}</td><td class="fp-value">${esc(v)}</td></tr>`;
          });
          h += '</tbody></table>';
        } else {
          h += statusBox('warn', t('none'));
        }
        el.innerHTML = h;
      }
    } catch {
      const el = $('headersHttp');
      if (el) el.innerHTML = `<h4>${esc(t('headers_http'))}</h4>` + statusBox('error', t('error'));
    }
  },

  async fetchSSL(url, container) {
    try {
      let hostname;
      try { hostname = new URL(url).hostname; } catch { hostname = url.replace(/https?:\/\//, '').split('/')[0]; }
      const res = await safeFetch(`https://crt.sh/?q=${encodeURIComponent(hostname)}&output=json`, { timeout: 15000 });
      const certs = await res.json();
      const el = $('headersSSL');
      if (el) {
        let h = `<h4>${esc(t('headers_ssl'))}</h4>`;
        if (certs && certs.length) {
          /* deduplicate by common_name + not_before */
          const seen = new Set();
          const unique = certs.filter(c => {
            const key = c.common_name + '|' + c.not_before;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          }).slice(0, 5);
          h += `<p>${esc(t('headers_cert_count'))}: ${certs.length}</p>`;
          h += '<table class="result-table"><thead><tr>';
          h += `<th>${esc(t('headers_cert_name'))}</th><th>${esc(t('headers_cert_issuer'))}</th><th>${esc(t('headers_cert_not_before'))}</th><th>${esc(t('headers_cert_not_after'))}</th></tr></thead><tbody>`;
          unique.forEach(c => {
            h += `<tr><td>${esc(c.common_name)}</td><td>${esc(c.issuer_name || '-')}</td><td>${esc(c.not_before || '-')}</td><td>${esc(c.not_after || '-')}</td></tr>`;
          });
          h += '</tbody></table>';
        } else {
          h += statusBox('warn', t('none'));
        }
        el.innerHTML = h;
      }
    } catch {
      const el = $('headersSSL');
      if (el) el.innerHTML = `<h4>${esc(t('headers_ssl'))}</h4>` + statusBox('error', t('error'));
    }
  },
};
window.Headers = Headers;

/* ----------------------------------------------------------
   SPEED TEST (Cloudflare)
   ---------------------------------------------------------- */
const Speed = {
  async run() {
    const container = $('speedResult');
    const sizeEl = $('speedSize');
    const bytes = sizeEl ? parseInt(sizeEl.value, 10) : 25 * 1024 * 1024;
    const mb = (bytes / 1024 / 1024).toFixed(0);
    const btn = $('btnSpeed');
    if (btn) btn.disabled = true;

    if (container) {
      container.innerHTML = statusBox('loading', `${t('speed_testing')} ${mb} MB`) + '<div class="loading-bar"><div class="loading-bar-fill" id="speed-bar" style="width:0%"></div></div>';
    }

    const url = `https://speed.cloudflare.com/__down?bytes=${bytes}`;
    const start = performance.now();
    let downloaded = 0;

    try {
      const res = await safeFetch(url, { timeout: 60000, cache: 'no-store' });
      if (!res.ok || !res.body) {
        const blob = await res.blob();
        downloaded = blob.size;
      } else {
        const reader = res.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          downloaded += value.byteLength;
          const pct = Math.min(downloaded / bytes * 100, 100);
          const bar = document.getElementById('speed-bar');
          if (bar) bar.style.width = pct.toFixed(0) + '%';
        }
      }

      const elapsed = (performance.now() - start) / 1000;
      const mbps = ((downloaded * 8) / elapsed / 1e6).toFixed(2);
      const color = mbps > 50 ? 'green' : mbps > 10 ? 'yellow' : 'red';

      if (container) {
        container.innerHTML = `
          <div class="grid grid-3" style="margin-bottom:12px">
            <div class="card metric"><div class="metric-value ${color}">${mbps}<span style="font-size:.9rem">Mbps</span></div><div class="metric-label">${esc(t('speed_result'))}</div></div>
            <div class="card metric"><div class="metric-value">${elapsed.toFixed(2)}<span style="font-size:.9rem">s</span></div><div class="metric-label">${esc(t('speed_time'))}</div></div>
            <div class="card metric"><div class="metric-value">${(downloaded/1024/1024).toFixed(2)}<span style="font-size:.9rem">MB</span></div><div class="metric-label">${esc(t('speed_size'))}</div></div>
          </div>
          <div style="font-size:.85rem;color:var(--text2)">Cloudflare CDN | Download speed only</div>
        `;
      }
      return { mbps, elapsed, downloaded };
    } catch (e) {
      if (container) container.innerHTML = statusBox('error', t('error') + ': ' + esc(e.message));
      return null;
    } finally {
      if (btn) btn.disabled = false;
    }
  },
};
window.Speed = Speed;

/* ----------------------------------------------------------
   RUN ALL
   ---------------------------------------------------------- */
async function runAllChecks() {
  const btn = $('btnRun');
  if (btn) btn.disabled = true;

  initProgress(7);
  let step = 0;

  try {
    _ipData = await checkIP(); updateProgress(++step);
    await checkEnv(); updateProgress(++step);
    const latencyRes = await runLatency(); updateProgress(++step);
    const dnsRes = await runDNS(); updateProgress(++step);
    const webrtcRes = await checkWebRTC(); updateProgress(++step);
    const dnsLeakRes = await checkDNSLeak(); updateProgress(++step);
    const fpRes = await checkFingerprint(); updateProgress(++step);

    /* store for summary */
    window._results = {
      ip: _ipData, latency: latencyRes, dns: dnsRes,
      webrtc: webrtcRes, dnsLeak: dnsLeakRes, fp: fpRes,
    };

    rebuildSummary();
    const copyBtn = $('btnCopyReport');
    if (copyBtn) copyBtn.disabled = false;
  } catch (e) {
    console.error('runAllChecks error', e);
    showToast(t('toast_error'), 'error');
  }

  hideProgress();
  if (btn) btn.disabled = false;
}

/* ----------------------------------------------------------
   SUMMARY & REPORT
   ---------------------------------------------------------- */
function rebuildSummary() {
  const r = window._results || {};
  const container = $('summaryResult');
  if (!container) return;

  let h = '<div class="detail-grid">';
  const ip = r.ip;
  if (ip) {
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_ip'))}</span><span class="detail-value">${esc(ip.ip || '-')}</span></div>`;
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_location'))}</span><span class="detail-value">${esc([ip.city, ip.region, ip.country].filter(Boolean).join(', ') || '-')}</span></div>`;
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_isp'))}</span><span class="detail-value">${esc(ip.org || '-')}</span></div>`;
  }
  if (r.latency) {
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_latency_ok'))}</span><span class="detail-value">${r.latency.ok} / ${r.latency.total}</span></div>`;
  }
  if (r.dns) {
    const ok = r.dns.filter(d => d.ok).length;
    const fail = r.dns.filter(d => !d.ok).length;
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_dns_ok'))}</span><span class="detail-value">${ok}</span></div>`;
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_dns_fail'))}</span><span class="detail-value">${fail}</span></div>`;
  }
  if (r.webrtc) {
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_webrtc'))}</span><span class="detail-value">${r.webrtc.safe ? tag('ok', t('webrtc_safe')) : tag('fail', t('webrtc_leaked'))}</span></div>`;
  }
  if (r.dnsLeak) {
    h += `<div class="detail-item"><span class="detail-label">${esc(t('summary_dns_leak'))}</span><span class="detail-value">${r.dnsLeak.safe ? tag('ok', t('dns_leak_safe')) : tag('warn', t('dns_leak_warn'))}</span></div>`;
  }
  h += '</div>';
  container.innerHTML = h;
}

function generateReportMarkdown() {
  const r = window._results || {};
  let lines = ['=== NetToolbox Report ===', ''];

  const ip = r.ip;
  if (ip) {
    lines.push(`IP: ${ip.ip || '-'}`);
    lines.push(`Location: ${[ip.city, ip.region, ip.country].filter(Boolean).join(', ') || '-'}`);
    lines.push(`ISP: ${ip.org || '-'}`);
    lines.push(`ASN: ${ip.asn || '-'}`);
    lines.push('');
  }
  if (r.latency) {
    lines.push(`Latency: ${r.latency.ok}/${r.latency.total} reachable, ${r.latency.smooth} fast`);
    lines.push('');
  }
  if (r.dns) {
    lines.push('DNS Results:');
    r.dns.forEach(d => {
      lines.push(`  ${d.domain}: ${d.ok ? d.ips.join(', ') + ' (' + d.time + 'ms)' : 'FAILED'}`);
    });
    lines.push('');
  }
  if (r.webrtc) {
    lines.push(`WebRTC Leak: ${r.webrtc.safe ? 'Safe' : 'LEAKED! IPs: ' + r.webrtc.leakedIPs.join(', ')}`);
    lines.push('');
  }
  if (r.dnsLeak) {
    lines.push(`DNS Leak: ${r.dnsLeak.safe ? 'Safe' : 'Warning'} (Exit IP: ${r.dnsLeak.ip})`);
    lines.push('');
  }
  if (r.fp) {
    lines.push('Fingerprint:');
    lines.push(`  Screen: ${r.fp.screen}`);
    lines.push(`  Timezone: ${r.fp.timezone}`);
    lines.push(`  WebGL: ${r.fp.gl.vendor} / ${r.fp.gl.renderer}`);
    lines.push(`  Canvas: ${r.fp.canvasHash}`);
    lines.push(`  Audio: ${r.fp.audioHash}`);
  }

  return lines.join('\n');
}

function copyReport() {
  const text = generateReportMarkdown();
  navigator.clipboard.writeText(text).then(() => {
    showToast(t('summary_copied'), 'ok');
  }).catch(() => {
    /* fallback */
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast(t('summary_copied'), 'ok');
  });
}

/* ----------------------------------------------------------
   MONITORING
   ---------------------------------------------------------- */
let _lastIP = null;
let _monitorTimer = null;

function startMonitor() {
  window.addEventListener('online', () => showToast(t('toast_online'), 'ok'));
  window.addEventListener('offline', () => showToast(t('toast_offline'), 'warn'));

  /* poll for IP changes every 30s */
  _lastIP = _ipData ? _ipData.ip : null;
  _monitorTimer = setInterval(async () => {
    try {
      const res = await safeFetch('https://api.ipify.org?format=json', { timeout: 5000 });
      if (res.ok) {
        const d = await res.json();
        if (_lastIP && d.ip !== _lastIP) {
          showToast(t('toast_ip_changed') + `: ${d.ip}`, 'info');
          _lastIP = d.ip;
        }
      }
    } catch {}
  }, 30000);
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  applyLang();
  initNav();
  startMonitor();

  /* feature card click handlers */
  document.querySelectorAll('.feature-card[data-action]').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const href = card.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
      const action = card.dataset.action;
      if (action) {
        try {
          if (action.includes('.')) {
            const [mod, fn] = action.split('.');
            window[mod][fn]();
          } else {
            window[action]();
          }
        } catch {}
      }
    });
  });

  /* kick off initial checks */
  checkIP().then(() => { _lastIP = _ipData ? _ipData.ip : null; });
  checkEnv();

  /* run all button */
  const btnAll = $('btnRun');
  if (btnAll) btnAll.addEventListener('click', runAllChecks);

  /* copy report button */
  const btnCopy = $('btnCopyReport');
  if (btnCopy) btnCopy.addEventListener('click', copyReport);

  /* whois button */
  const btnWhois = $('btnWhois');
  if (btnWhois) btnWhois.addEventListener('click', () => Whois.run());

  /* headers button */
  const btnHeaders = $('btnHeaders');
  if (btnHeaders) btnHeaders.addEventListener('click', () => Headers.run());

  /* speed test button */
  const btnSpeed = $('btnSpeed');
  if (btnSpeed) btnSpeed.addEventListener('click', () => Speed.run());

  /* inline speed test button */
  const btnSpeedInline = $('btnSpeedInline');
  if (btnSpeedInline) btnSpeedInline.addEventListener('click', runSpeedTest);

  /* individual section buttons */
  const btnIP = $('btnIP');
  if (btnIP) btnIP.addEventListener('click', checkIP);

  const btnEnv = $('btnEnv');
  if (btnEnv) btnEnv.addEventListener('click', checkEnv);

  const btnLatency = $('btnLatency');
  if (btnLatency) btnLatency.addEventListener('click', runLatency);

  const btnDNS = $('btnDNS');
  if (btnDNS) btnDNS.addEventListener('click', runDNS);

  const btnWebRTC = $('btnWebRTC');
  if (btnWebRTC) btnWebRTC.addEventListener('click', checkWebRTC);

  const btnDNSLeak = $('btnDNSLeak');
  if (btnDNSLeak) btnDNSLeak.addEventListener('click', checkDNSLeak);

  const btnFP = $('btnFP');
  if (btnFP) btnFP.addEventListener('click', checkFingerprint);

  const btnFraud = $('btnFraud');
  if (btnFraud) btnFraud.addEventListener('click', () => Fraud.run());

  /* lang toggle */
  const btnLang = $('btnLang');
  if (btnLang) btnLang.addEventListener('click', toggleLang);

  /* dark mode toggle */
  const btnDark = $('btnDark');
  if (btnDark) btnDark.addEventListener('click', toggleDark);
});
