/* ======================== NAV ======================== */
const SECTIONS = [
  { id:'ip', label:'IP 查询', icon:'🌐' },
  { id:'fraud', label:'欺诈评分', icon:'🛡️' },
  { id:'ping', label:'HTTP Ping', icon:'📡' },
  { id:'dns', label:'DNS', icon:'🔍' },
  { id:'whois', label:'Whois', icon:'📋' },
  { id:'headers', label:'HTTP/SSL', icon:'🔒' },
  { id:'leak', label:'泄露检测', icon:'🕵️' },
  { id:'speed', label:'测速', icon:'⚡' },
];

function initNav() {
  const nav = document.getElementById('nav');
  SECTIONS.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.textContent = s.icon + ' ' + s.label;
    btn.onclick = () => switchSection(s.id);
    nav.appendChild(btn);
  });
  switchSection('ip');
}

function switchSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  const idx = SECTIONS.findIndex(s => s.id === id);
  const btns = document.querySelectorAll('.nav-btn');
  if (btns[idx]) btns[idx].classList.add('active');
}

/* ======================== UTILS ======================== */
function $(id) { return document.getElementById(id); }
function html(id, h) { $(id).innerHTML = h; }
function esc(s) { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function statusBox(type, msg) { return `<div class="status-box status-${type}">${msg}</div>`; }
function tag(type, text) { return `<span class="tag tag-${type}">${esc(text)}</span>`; }

async function safeFetch(url, opts={}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || 10000);
  try {
    const r = await fetch(url, { ...opts, signal: ctrl.signal });
    clearTimeout(timer);
    return r;
  } catch(e) {
    clearTimeout(timer);
    throw e;
  }
}

/* ======================== 1. IP QUERY ======================== */
const IP = {
  async run() {
    try {
      // Get public IP
      let ip = '';
      try {
        const r1 = await safeFetch('https://api.ipify.org?format=json');
        const d1 = await r1.json();
        ip = d1.ip;
      } catch {
        const r2 = await safeFetch('https://api.sb.sb/ip');
        ip = (await r2.text()).trim();
      }
      if (!ip) throw new Error('无法获取公网 IP');

      // Get geo info
      let geo = null;
      try {
        const r = await safeFetch(`https://ipinfo.io/${ip}/json`);
        geo = await r.json();
      } catch {
        try {
          const r = await safeFetch(`https://ipapi.co/${ip}/json/`);
          geo = await r.json();
        } catch {}
      }

      // Display basic
      html('ip-result', `
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <div class="metric" style="flex:1;min-width:200px">
            <div class="metric-value green">${esc(ip)}</div>
            <div class="metric-label">公网 IP 地址</div>
          </div>
          ${geo ? `
          <div class="metric" style="flex:1;min-width:120px">
            <div class="metric-value" style="font-size:1.5rem">${esc(geo.country || '-')}</div>
            <div class="metric-label">国家/地区</div>
          </div>
          <div class="metric" style="flex:1;min-width:120px">
            <div class="metric-value" style="font-size:1.5rem">${esc(geo.city || geo.region || '-')}</div>
            <div class="metric-label">城市</div>
          </div>
          <div class="metric" style="flex:1;min-width:120px">
            <div class="metric-value" style="font-size:1.5rem">${esc(geo.org || geo.asn || '-')}</div>
            <div class="metric-label">ISP / ASN</div>
          </div>
          ` : ''}
        </div>
      `);

      // Show detail card
      if (geo) {
        $('ip-detail-card').style.display = '';
        const fields = [
          ['IP 地址', ip],
          ['国家', geo.country_name || geo.country],
          ['地区', geo.region || geo.region_name],
          ['城市', geo.city],
          ['邮编', geo.postal],
          ['经纬度', geo.loc || (geo.latitude && geo.longitude ? `${geo.latitude}, ${geo.longitude}` : '')],
          ['时区', geo.timezone],
          ['ISP', geo.org || geo.isp],
          ['ASN', geo.asn || geo.as],
        ].filter(f => f[1]);
        html('ip-detail', `
          <div class="table-wrap"><table>
            ${fields.map(([k,v]) => `<tr><td style="color:var(--text2);width:140px">${k}</td><td>${esc(String(v))}</td></tr>`).join('')}
          </table></div>
        `);
      }
    } catch(e) {
      html('ip-result', statusBox('err', '❌ 查询失败: ' + esc(e.message)));
    }
  }
};

/* ======================== 2. FRAUD SCORE ======================== */
const Fraud = {
  async run() {
    html('fraud-result', statusBox('loading', '<span class="spinner"></span> 正在检测...'));
    try {
      const r = await safeFetch('https://ipapi.co/json/');
      const d = await r.json();
      const sec = d.security || {};
      const isProxy = sec.is_proxy || sec.is_vpn || sec.is_tor || sec.is_webcrawler;
      const isHosting = sec.is_cloud || d.type === 'hosting';
      let score = 0;
      if (isProxy) score += 40;
      if (isHosting) score += 30;
      if (sec.is_tor) score += 20;
      if (sec.is_anonymous) score += 10;
      const cls = score < 30 ? 'low' : score < 70 ? 'mid' : 'high';
      const risk = score < 30 ? '低风险' : score < 70 ? '中风险' : '高风险';

      html('fraud-result', `
        <div class="score-circle score-${cls}">${score}</div>
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:1.2rem;font-weight:700">${risk}</div>
          <div style="color:var(--text2);font-size:.85rem">欺诈评分 (0-100)，仅供参考</div>
        </div>
        <div class="grid grid-3" style="margin-bottom:16px">
          <div class="card metric"><div class="metric-value ${isProxy?'red':'green'}">${isProxy?'是':'否'}</div><div class="metric-label">代理/VPN</div></div>
          <div class="card metric"><div class="metric-value ${sec.is_tor?'red':'green'}">${sec.is_tor?'是':'否'}</div><div class="metric-label">Tor 出口</div></div>
          <div class="card metric"><div class="metric-value ${isHosting?'yellow':'green'}">${isHosting?'是':'否'}</div><div class="metric-label">数据中心/云</div></div>
        </div>
        <div class="table-wrap"><table>
          <tr><td style="color:var(--text2);width:140px">IP</td><td>${esc(d.ip)}</td></tr>
          <tr><td style="color:var(--text2)">代理检测</td><td>${sec.is_proxy ? tag('red','是') : tag('green','否')}</td></tr>
          <tr><td style="color:var(--text2)">VPN</td><td>${sec.is_vpn ? tag('red','是') : tag('green','否')}</td></tr>
          <tr><td style="color:var(--text2)">Tor</td><td>${sec.is_tor ? tag('red','是') : tag('green','否')}</td></tr>
          <tr><td style="color:var(--text2)">云/托管</td><td>${sec.is_cloud ? tag('yellow','是') : tag('green','否')}</td></tr>
          <tr><td style="color:var(--text2)">匿名</td><td>${sec.is_anonymous ? tag('orange','是') : tag('green','否')}</td></tr>
        </table></div>
        <p style="font-size:.75rem;color:var(--text2);margin-top:8px">⚠️ 数据来自 ipapi.co 免费接口，检测精度有限，仅供参考</p>
      `);
    } catch(e) {
      html('fraud-result', statusBox('err', '❌ 检测失败: ' + esc(e.message)));
    }
  }
};

/* ======================== 3. HTTP PING ======================== */
const Ping = {
  async run() {
    const url = $('ping-custom').value.trim() || $('ping-preset').value;
    const count = parseInt($('ping-count').value);
    if (!url) return;
    html('ping-result', statusBox('loading', '<span class="spinner"></span> 正在测试延迟...'));
    const results = [];
    for (let i = 0; i < count; i++) {
      try {
        const t0 = performance.now();
        await fetch(url, { mode: 'no-cors', cache: 'no-store' });
        const rtt = Math.round(performance.now() - t0);
        results.push(rtt);
      } catch {
        results.push(-1);
      }
    }
    const ok = results.filter(r => r >= 0);
    if (ok.length === 0) {
      html('ping-result', statusBox('err', '❌ 所有请求失败，目标可能不可达或 CORS 限制'));
      return;
    }
    const min = Math.min(...ok);
    const max = Math.max(...ok);
    const avg = Math.round(ok.reduce((a,b) => a+b, 0) / ok.length);
    const color = avg < 100 ? 'green' : avg < 300 ? 'yellow' : 'red';
    html('ping-result', `
      <div class="grid grid-3" style="margin-bottom:16px">
        <div class="card metric"><div class="metric-value green">${min}<span style="font-size:.9rem">ms</span></div><div class="metric-label">最低延迟</div></div>
        <div class="card metric"><div class="metric-value ${color}">${avg}<span style="font-size:.9rem">ms</span></div><div class="metric-label">平均延迟</div></div>
        <div class="card metric"><div class="metric-value red">${max}<span style="font-size:.9rem">ms</span></div><div class="metric-label">最高延迟</div></div>
      </div>
      <div style="font-size:.85rem;color:var(--text2)">目标: ${esc(url)} | 采样 ${count} 次，成功 ${ok.length} 次 | HTTP RTT（非 ICMP Ping）</div>
    `);
  }
};

/* ======================== 4. DNS ======================== */
const DNS = {
  TYPES: ['A','AAAA','CNAME','MX','TXT','NS','SOA','CAA'],
  async run() {
    const domain = $('dns-domain').value.trim();
    if (!domain) return;
    html('dns-result', statusBox('loading', '<span class="spinner"></span> 正在查询...'));
    try {
      const allResults = [];
      for (const type of this.TYPES) {
        try {
          const r = await safeFetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
          const d = await r.json();
          if (d.Answer && d.Answer.length) {
            d.Answer.forEach(a => allResults.push({ type, data: a.data, ttl: a.TTL }));
          }
        } catch {}
      }
      if (allResults.length === 0) {
        html('dns-result', statusBox('warn', '⚠️ 未找到任何 DNS 记录'));
        return;
      }
      html('dns-result', `
        <div class="table-wrap"><table>
          <thead><tr><th>类型</th><th>值</th><th>TTL</th></tr></thead>
          <tbody>${allResults.map(r => `
            <tr>
              <td>${tag('blue', r.type)}</td>
              <td style="word-break:break-all">${esc(r.data)}</td>
              <td>${r.ttl || '-'}s</td>
            </tr>
          `).join('')}</tbody>
        </table></div>
        <p style="font-size:.75rem;color:var(--text2);margin-top:8px">数据来源: Google Public DNS | 查询域名: ${esc(domain)}</p>
      `);
    } catch(e) {
      html('dns-result', statusBox('err', '❌ 查询失败: ' + esc(e.message)));
    }
  }
};

/* ======================== 5. WHOIS ======================== */
const Whois = {
  async run() {
    const domain = $('whois-domain').value.trim();
    if (!domain) return;
    html('whois-result', statusBox('loading', '<span class="spinner"></span> 正在查询...'));
    try {
      const r = await safeFetch(`https://whois.freeaiapi.xyz/?name=${encodeURIComponent(domain)}`, { timeout: 15000 });
      const d = await r.json();
      if (d.error) throw new Error(d.error);
      const fields = [
        ['域名', d.domainName],
        ['注册商', d.registrar],
        ['创建时间', d.creationDate],
        ['过期时间', d.expirationDate],
        ['更新时间', d.updatedDate],
        ['域名状态', Array.isArray(d.domainStatus) ? d.domainStatus.join(', ') : d.domainStatus],
        ['Name Server', Array.isArray(d.nameServers) ? d.nameServers.join(', ') : d.nameServers],
        ['DNSSEC', d.dnssec],
        ['注册人', d.registrant || d.registrantName],
        ['邮箱', d.contactEmail],
      ].filter(f => f[1]);
      if (fields.length === 0) {
        html('whois-result', statusBox('warn', '⚠️ 未查询到信息，可能是 GDPR 隐私保护或 API 不支持该 TLD'));
        return;
      }
      html('whois-result', `
        <div class="table-wrap"><table>
          ${fields.map(([k,v]) => `<tr><td style="color:var(--text2);width:140px">${k}</td><td style="word-break:break-all">${esc(String(v))}</td></tr>`).join('')}
        </table></div>
        <p style="font-size:.75rem;color:var(--text2);margin-top:8px">数据来源: whoisfree API | 部分信息可能因 GDPR 隐私保护而隐藏</p>
      `);
    } catch(e) {
      html('whois-result', statusBox('err', '❌ 查询失败: ' + esc(e.message) + '。该 API 可能不支持此 TLD 或暂时不可用。'));
    }
  }
};

/* ======================== 6. HEADERS / SSL ======================== */
const Headers = {
  async run() {
    let url = $('headers-url').value.trim();
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    html('headers-result', statusBox('loading', '<span class="spinner"></span> 正在检测...'));
    let headersHtml = '';
    let sslHtml = '';
    // HTTP Headers via CORS proxy
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const r = await safeFetch(proxyUrl, { timeout: 15000 });
      const d = await r.json();
      if (d.status && d.status.headers) {
        const h = d.status.headers;
        headersHtml = `
          <div class="card-header" style="margin-top:12px">📄 HTTP 响应头</div>
          <div class="table-wrap"><table>
            ${Object.entries(h).map(([k,v]) => `<tr><td style="color:var(--text2);min-width:180px">${esc(k)}</td><td style="word-break:break-all">${esc(v)}</td></tr>`).join('')}
          </table></div>
        `;
      }
    } catch(e) {
      headersHtml = statusBox('warn', '⚠️ HTTP 头部获取失败 (CORS 限制): ' + esc(e.message));
    }

    // SSL via crt.sh
    try {
      const domain = new URL(url).hostname;
      const r = await safeFetch(`https://crt.sh/?q=${encodeURIComponent(domain)}&output=json`, { timeout: 15000 });
      const certs = await r.json();
      if (certs && certs.length) {
        const latest = certs[0];
        sslHtml = `
          <div class="card-header" style="margin-top:16px">🔐 SSL 证书 (来自证书透明度日志)</div>
          <div class="table-wrap"><table>
            <tr><td style="color:var(--text2);min-width:180px">颁发者</td><td>${esc(latest.issuer_name)}</td></tr>
            <tr><td style="color:var(--text2)">通用名称</td><td>${esc(latest.common_name)}</td></tr>
            <tr><td style="color:var(--text2)">生效时间</td><td>${esc(latest.not_before)}</td></tr>
            <tr><td style="color:var(--text2)">过期时间</td><td>${esc(latest.not_after)}</td></tr>
            <tr><td style="color:var(--text2)">证书数量</td><td>${certs.length} 条记录</td></tr>
          </table></div>
        `;
      } else {
        sslHtml = statusBox('warn', '⚠️ 未在证书透明度日志中找到该域名的证书');
      }
    } catch(e) {
      sslHtml = statusBox('warn', '⚠️ SSL 证书查询失败: ' + esc(e.message));
    }

    html('headers-result', statusBox('ok', '✅ 检测完成') + headersHtml + sslHtml);
  }
};

/* ======================== 7. LEAK DETECTION ======================== */
const Leak = {
  async runWebRTC() {
    html('webrtc-result', statusBox('loading', '<span class="spinner"></span> 正在检测 WebRTC 泄露...'));
    const ips = new Set();
    try {
      const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
      pc.createDataChannel('');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await new Promise((resolve) => {
        pc.onicecandidate = (e) => {
          if (!e.candidate) { resolve(); return; }
          const c = e.candidate.candidate;
          const m = c.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
          if (m) ips.add(m[1]);
        };
        setTimeout(resolve, 5000);
      });
      pc.close();
    } catch(e) {
      html('webrtc-result', statusBox('err', '❌ WebRTC 检测失败: ' + esc(e.message)));
      return;
    }
    const ipList = [...ips];
    if (ipList.length === 0) {
      html('webrtc-result', statusBox('ok', '✅ 未检测到 WebRTC 泄露（未发现 IP 地址）'));
      return;
    }
    html('webrtc-result', `
      ${statusBox('warn', '⚠️ 检测到以下 IP 可能泄露:')}
      <div class="table-wrap"><table>
        <thead><tr><th>IP 地址</th><th>类型</th></tr></thead>
        <tbody>${ipList.map(ip => {
          const isLocal = ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.');
          return `<tr><td>${esc(ip)}</td><td>${isLocal ? tag('yellow','内网 IP') : tag('red','公网 IP')}</td></tr>`;
        }).join('')}</tbody>
      </table></div>
      <p style="font-size:.75rem;color:var(--text2);margin-top:8px">Chrome 可能显示 .local 随机名而非真实 IP，属正常行为</p>
    `);
  },

  async runFingerprint() {
    html('fingerprint-result', statusBox('loading', '<span class="spinner"></span> 正在收集...'));
    const fp = [
      ['User Agent', navigator.userAgent],
      ['语言', navigator.language],
      ['平台', navigator.platform],
      ['屏幕分辨率', `${screen.width} x ${screen.height}`],
      ['可用屏幕', `${screen.availWidth} x ${screen.availHeight}`],
      ['色深', screen.colorDepth + ' bit'],
      ['像素比', window.devicePixelRatio],
      ['时区', Intl.DateTimeFormat().resolvedOptions().timeZone],
      ['Do Not Track', navigator.doNotTrack || '未设置'],
      ['Cookie 支持', navigator.cookieEnabled ? '是' : '否'],
      ['在线状态', navigator.onLine ? '在线' : '离线'],
      ['CPU 核心数', navigator.hardwareConcurrency || '未知'],
      ['最大触点数', navigator.maxTouchPoints || 0],
      ['WebGL', (() => { try { const c=document.createElement('canvas'); return !!c.getContext('webgl2') ? '支持 (WebGL2)' : !!c.getContext('webgl') ? '支持 (WebGL1)' : '不支持'; } catch { return '不支持'; }})()],
    ];
    html('fingerprint-result', `
      ${statusBox('ok', '✅ 浏览器指纹信息已收集')}
      <div class="table-wrap"><table>
        ${fp.map(([k,v]) => `<tr><td style="color:var(--text2);min-width:140px">${k}</td><td style="word-break:break-all;font-size:.83rem">${esc(String(v))}</td></tr>`).join('')}
      </table></div>
    `);
  }
};

/* ======================== 8. SPEED TEST ======================== */
const Speed = {
  async run() {
    const bytes = parseInt($('speed-size').value);
    const mb = (bytes / 1000000).toFixed(0);
    $('speed-btn').disabled = true;
    html('speed-result', statusBox('loading', `<span class="spinner"></span> 正在下载 ${mb} MB 测试文件...`) + '<div class="loading-bar"><div class="loading-bar-fill" id="speed-bar" style="width:0%"></div></div>');
    try {
      const url = `https://speed.cloudflare.com/__down?bytes=${bytes}`;
      const t0 = performance.now();
      const r = await fetch(url, { cache: 'no-store' });
      const reader = r.body.getReader();
      let received = 0;
      const startTime = performance.now();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.length;
        const elapsed = (performance.now() - startTime) / 1000;
        const speed = (received * 8) / elapsed / 1000000;
        const pct = Math.min(100, (received / bytes) * 100);
        const bar = $('speed-bar');
        if (bar) bar.style.width = pct + '%';
      }
      const totalTime = (performance.now() - t0) / 1000;
      const speedMbps = ((received * 8) / totalTime / 1000000).toFixed(2);
      const color = speedMbps > 50 ? 'green' : speedMbps > 10 ? 'yellow' : 'red';
      html('speed-result', `
        <div class="grid grid-3" style="margin-bottom:16px">
          <div class="card metric"><div class="metric-value ${color}">${speedMbps}<span style="font-size:.9rem">Mbps</span></div><div class="metric-label">下载速度</div></div>
          <div class="card metric"><div class="metric-value">${totalTime.toFixed(2)}<span style="font-size:.9rem">s</span></div><div class="metric-label">耗时</div></div>
          <div class="card metric"><div class="metric-value">${(received/1000000).toFixed(2)}<span style="font-size:.9rem">MB</span></div><div class="metric-label">已下载</div></div>
        </div>
        <div style="font-size:.85rem;color:var(--text2)">测试服务器: Cloudflare CDN | 仅测量下载速度 | 单线程测试</div>
      `);
    } catch(e) {
      html('speed-result', statusBox('err', '❌ 测速失败: ' + esc(e.message)));
    } finally {
      $('speed-btn').disabled = false;
    }
  }
};

/* ======================== INIT ======================== */
initNav();
IP.run();
