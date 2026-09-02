/* ============ 背景壁纸轮播配置 ============ */
const BACKGROUNDS = [
  'images/backgrounds/bg1.jpg',
  'images/backgrounds/bg2.jpg',
  'images/backgrounds/bg3.jpg',
  'images/backgrounds/bg4.jpg',
  'images/backgrounds/bg5.jpg',
  'images/backgrounds/bg1.webp',
  'images/backgrounds/bg2.webp',
  'images/backgrounds/bg3.webp',
  'images/backgrounds/bg1.svg',
  'images/backgrounds/bg2.svg',
  'images/backgrounds/bg3.svg',
];
const BG_INTERVAL = 8000; // 轮播间隔（毫秒，默认 8 秒）

function initBackgroundSlider() {
  const slider = document.getElementById('bgSlider');
  if (!slider) return;

  const validImgs = [];
  let pending = BACKGROUNDS.length;
  let curSlide = 0;
  let slides = [];

  function checkDone() {
    if (validImgs.length === 0) return;
    slider.innerHTML = '';
    slides = validImgs.map((src, idx) => {
      const el = document.createElement('div');
      el.className = 'bg-slide' + (idx === 0 ? ' active' : '');
      el.style.backgroundImage = `url("${src}")`;
      slider.appendChild(el);
      return el;
    });

    if (slides.length > 1) {
      setInterval(() => {
        slides[curSlide].classList.remove('active');
        curSlide = (curSlide + 1) % slides.length;
        slides[curSlide].classList.add('active');
      }, BG_INTERVAL);
    }
  }

  BACKGROUNDS.forEach(src => {
    const img = new Image();
    img.onload = () => {
      validImgs.push(src);
      pending--;
      if (pending === 0) checkDone();
    };
    img.onerror = () => {
      pending--;
      if (pending === 0) checkDone();
    };
    img.src = src;
  });
}
initBackgroundSlider();

/* ============ 顶部链接（在这里改成你自己的地址） ============ */
const LINKS = [
  { name: 'GitHub', url: 'https://github.com/Tomato-0914', icon: 'github' },
  { name: 'Gitee', url: 'https://gitee.com/tb_siran', icon: 'gitee' },
  { name: 'Twitter / X', url: 'https://x.com/yourname', icon: 'x' },
  { name: '邮箱', url: 'tb_siran@163.com', icon: 'mail' },
];
const ICONS = {
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.2 5.4 18.3.5 12 .5z"/></svg>`,
  gitee: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.6.5.5 5.6.5 12S5.6 23.5 12 23.5 23.5 18.4 23.5 12 18.4.5 12 .5zm5.7 10.4c0 .3-.2.5-.5.5H12c-.3 0-.5.2-.5.5v.5c0 .3.2.5.5.5h3.5c.3 0 .5.2.5.5v2.4c0 1.4-1.2 2.6-2.6 2.6H8.6c-.3 0-.5-.2-.5-.5V11c0-1.4 1.2-2.6 2.6-2.6h6.5c.3 0 .5.2.5.5v2z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>`,
};
const linkRow = document.getElementById('linkRow');
LINKS.forEach(l => {
  const a = document.createElement('a');
  let href = l.url;
  if (l.icon === 'mail' || (typeof href === 'string' && href.includes('@') && !href.startsWith('mailto:') && !href.startsWith('http'))) {
    href = 'mailto:' + href;
  }
  a.href = href;
  a.title = l.name;
  if (!href.startsWith('mailto:')) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
  a.innerHTML = ICONS[l.icon] || ICONS.link;
  linkRow.appendChild(a);
});

/* ============ 时钟 ============ */
const hEl = document.getElementById('h'), mEl = document.getElementById('m'), sEl = document.getElementById('s');
const c1 = document.getElementById('c1'), c2 = document.getElementById('c2');
const dateLine = document.getElementById('dateLine');
const weekMap = ['日', '一', '二', '三', '四', '五', '六'];
function pad(n) { return n.toString().padStart(2, '0'); }
function tickClock() {
  const now = new Date();
  hEl.textContent = pad(now.getHours());
  mEl.textContent = pad(now.getMinutes());
  sEl.textContent = pad(now.getSeconds());
  const dim = now.getSeconds() % 2 === 0;
  c1.classList.toggle('dim', dim);
  c2.classList.toggle('dim', dim);
  dateLine.innerHTML = `<b>${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日</b> · 星期${weekMap[now.getDay()]}`;
}
tickClock();
setInterval(tickClock, 1000);

/* ============ 天气（Open-Meteo，免费无需 key） ============ */
const wIcon = document.getElementById('wIcon'), wTemp = document.getElementById('wTemp');
const wPlace = document.getElementById('wPlace'), wDesc = document.getElementById('wDesc');
const cityPop = document.getElementById('cityPop'), weatherEditBtn = document.getElementById('weatherEditBtn');
const cityInput = document.getElementById('cityInput'), geoBtn = document.getElementById('geoBtn');

function codeToIcon(code) {
  if (code === 0) return ['☀️', '晴'];
  if ([1, 2].includes(code)) return ['🌤️', '少云'];
  if (code === 3) return ['☁️', '多云'];
  if ([45, 48].includes(code)) return ['🌫️', '雾'];
  if ([51, 53, 55, 56, 57].includes(code)) return ['🌦️', '毛毛雨'];
  if ([61, 63, 65, 66, 67].includes(code)) return ['🌧️', '雨'];
  if ([71, 73, 75, 77].includes(code)) return ['❄️', '雪'];
  if ([80, 81, 82].includes(code)) return ['🌦️', '阵雨'];
  if ([85, 86].includes(code)) return ['🌨️', '阵雪'];
  if ([95, 96, 99].includes(code)) return ['⛈️', '雷暴'];
  return ['🌡️', '—'];
}
async function loadWeatherByCoords(lat, lon, label) {
  wPlace.textContent = label + '…';
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`);
    const d = await r.json();
    const [icon, desc] = codeToIcon(d.current.weather_code);
    wIcon.textContent = icon;
    wTemp.textContent = Math.round(d.current.temperature_2m) + '°C';
    wDesc.textContent = desc;
    wPlace.textContent = label;
    localStorage.setItem('lastPlace', JSON.stringify({ lat, lon, label }));
  } catch (e) {
    wPlace.textContent = '天气获取失败';
    wDesc.textContent = '请检查网络';
  }
}
async function searchCity(name) {
  wPlace.textContent = '搜索中…';
  try {
    const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=zh`);
    const d = await r.json();
    if (!d.results || !d.results.length) { wPlace.textContent = '未找到该城市'; return; }
    const res = d.results[0];
    const label = res.name + (res.country ? ' · ' + res.country : '');
    await loadWeatherByCoords(res.latitude, res.longitude, label);
  } catch (e) {
    wPlace.textContent = '搜索失败';
  }
}
weatherEditBtn.addEventListener('click', () => cityPop.classList.toggle('open'));
document.addEventListener('click', (e) => {
  if (!cityPop.contains(e.target) && e.target !== weatherEditBtn && !weatherEditBtn.contains(e.target)) {
    cityPop.classList.remove('open');
  }
});
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && cityInput.value.trim()) {
    searchCity(cityInput.value.trim());
    cityPop.classList.remove('open');
  }
});
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    searchCity(chip.dataset.city);
    cityPop.classList.remove('open');
  });
});
geoBtn.addEventListener('click', () => { cityPop.classList.remove('open'); tryGeolocate(); });

function tryGeolocate() {
  if (!navigator.geolocation) { searchCity('东京'); return; }
  navigator.geolocation.getCurrentPosition(
    pos => loadWeatherByCoords(pos.coords.latitude, pos.coords.longitude, '当前位置'),
    () => {
      const last = localStorage.getItem('lastPlace');
      if (last) { const p = JSON.parse(last); loadWeatherByCoords(p.lat, p.lon, p.label); }
      else searchCity('东京');
    },
    { timeout: 6000 }
  );
}
const lastSaved = localStorage.getItem('lastPlace');
if (lastSaved) { const p = JSON.parse(lastSaved); loadWeatherByCoords(p.lat, p.lon, p.label); }
else tryGeolocate();

/* ============ 音乐播放器（自动读取 music/playlist.json） ============
   用同目录下的 生成歌单.html 工具选中你的 music 文件夹，一键生成
   playlist.json 放进 music/ 目录，网页会自动读取，不需要手改代码。
*/
const audio = document.getElementById('audio');
const playerEmpty = document.getElementById('playerEmpty');
const trackArt = document.getElementById('trackArt');
const trackArtContent = document.getElementById('trackArtContent');
const trackInfo = document.getElementById('trackInfo');
const controlsWrap = document.getElementById('controlsWrap');
const progressWrap = document.getElementById('progressWrap');
const volWrap = document.getElementById('volWrap');
const trackTitle = document.getElementById('trackTitle');
const trackSub = document.getElementById('trackSub');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const listBtn = document.getElementById('listBtn');
const playlistPop = document.getElementById('playlistPop');
const seek = document.getElementById('seek');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const volume = document.getElementById('volume');
const volBtn = document.getElementById('volBtn');
const volIcon = document.getElementById('volIcon');

// 全屏歌词弹窗组件
const lyricModal = document.getElementById('lyricModal');
const lmCloseBtn = document.getElementById('lmCloseBtn');
const lmMetaTitle = document.getElementById('lmMetaTitle');
const lmMetaArtist = document.getElementById('lmMetaArtist');
const lmCoverTitle = document.getElementById('lmCoverTitle');
const lmCoverArtist = document.getElementById('lmCoverArtist');
const lmDiscBox = document.getElementById('lmDiscBox');
const lmDiscCover = document.getElementById('lmDiscCover');
const lmLyricsBox = document.getElementById('lmLyricsBox');
const lmCurTime = document.getElementById('lmCurTime');
const lmDurTime = document.getElementById('lmDurTime');
const lmSeek = document.getElementById('lmSeek');
const lmPlayBtn = document.getElementById('lmPlayBtn');
const lmPlayIcon = document.getElementById('lmPlayIcon');
const lmPrevBtn = document.getElementById('lmPrevBtn');
const lmNextBtn = document.getElementById('lmNextBtn');
const lmVolume = document.getElementById('lmVolume');
const lmVolBtn = document.getElementById('lmVolBtn');
const lmVolIcon = document.getElementById('lmVolIcon');

let PLAYLIST = [];
let curIndex = -1;
let currentLyrics = [];
let currentLyricIndex = -1;
let isUserScrollingLyrics = false;
let userScrollTimer = null;

function escapeAttr(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getCoverHTML(song, isLarge = false) {
  let coverUrl = song && song.cover;
  if (!coverUrl && song && song.src) {
    const base = song.src.split('/').pop().replace(/\.[^.]+$/, '');
    coverUrl = 'music/covers/' + base + '.jpg';
  }
  if (coverUrl) {
    return `<img src="${escapeAttr(coverUrl)}" alt="${escapeAttr(song.title)}">`;
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>`;
}

function parseLRC(lrcText) {
  if (!lrcText) return [];
  const lines = lrcText.split(/\r?\n/);
  const result = [];
  const timeReg = /\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // 1. 兼容网易云等导出的 JSON 结构化歌词（如 {"t":0,"c":[{"tx":"作词: "},{"tx":"林夕"}]}）
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const obj = JSON.parse(trimmed);
        if (obj && typeof obj.t === 'number') {
          let text = '';
          if (Array.isArray(obj.c)) {
            text = obj.c.map(item => (item && item.tx) ? item.tx : '').join('');
          } else if (typeof obj.tx === 'string') {
            text = obj.tx;
          } else if (typeof obj.text === 'string') {
            text = obj.text;
          }
          text = text.trim();
          if (text) {
            result.push({ time: obj.t / 1000, text });
          }
        }
        return;
      } catch (e) {
        // 解析 JSON 失败则继续按普通文本处理
      }
    }

    // 2. 标准 LRC 歌词行解析
    const matches = [...trimmed.matchAll(timeReg)];
    if (matches.length > 0) {
      const text = trimmed.replace(timeReg, '').trim();
      if (!text) return;
      matches.forEach(m => {
        const min = parseInt(m[1], 10);
        const sec = parseInt(m[2], 10);
        let ms = 0;
        if (m[3]) {
          const msStr = m[3];
          if (msStr.length === 1) ms = parseInt(msStr, 10) / 10;
          else if (msStr.length === 2) ms = parseInt(msStr, 10) / 100;
          else ms = parseInt(msStr, 10) / 1000;
        }
        const time = min * 60 + sec + ms;
        result.push({ time, text });
      });
    }
  });

  result.sort((a, b) => a.time - b.time);
  return result;
}

async function loadLyrics(t) {
  currentLyrics = [];
  currentLyricIndex = -1;

  if (t.lrcContent) {
    currentLyrics = parseLRC(t.lrcContent);
  } else {
    let lrcUrl = t.lrc;
    if (!lrcUrl && t.src) {
      const base = t.src.split('/').pop().replace(/\.[^.]+$/, '');
      lrcUrl = 'music/lyrics/' + base + '.lrc';
    }
    if (lrcUrl) {
      try {
        const r = await fetch(lrcUrl);
        if (r.ok) {
          const text = await r.text();
          currentLyrics = parseLRC(text);
        }
      } catch (e) {
        /* 忽略 fetch 错误 */
      }
    }
  }

  renderFullLyrics();
}

function renderFullLyrics() {
  if (!currentLyrics.length) {
    lmLyricsBox.innerHTML = '<div class="lm-no-lrc">纯音乐 / 暂无歌词</div>';
    return;
  }
  lmLyricsBox.innerHTML = '';
  currentLyrics.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'lm-lrc-item' + (index === currentLyricIndex ? ' active' : '');
    div.dataset.index = index;
    div.textContent = item.text;
    div.addEventListener('click', () => {
      audio.currentTime = item.time;
      if (audio.paused) audio.play();
    });
    lmLyricsBox.appendChild(div);
  });
  scrollActiveLyric(true);
}

function scrollActiveLyric(immediate = false) {
  if (isUserScrollingLyrics && !immediate) return;
  const activeEl = lmLyricsBox.querySelector(`.lm-lrc-item[data-index="${currentLyricIndex}"]`);
  if (activeEl) {
    activeEl.scrollIntoView({
      behavior: immediate ? 'auto' : 'smooth',
      block: 'center'
    });
  }
}

function updateLyrics(time) {
  if (!currentLyrics.length) return;
  let idx = -1;
  for (let i = 0; i < currentLyrics.length; i++) {
    if (currentLyrics[i].time <= time) {
      idx = i;
    } else {
      break;
    }
  }
  if (idx !== currentLyricIndex) {
    currentLyricIndex = idx;

    // 同步高亮全屏滚动歌词并平滑居中
    const prevActive = lmLyricsBox.querySelector('.lm-lrc-item.active');
    if (prevActive) prevActive.classList.remove('active');
    const nextActive = lmLyricsBox.querySelector(`.lm-lrc-item[data-index="${idx}"]`);
    if (nextActive) {
      nextActive.classList.add('active');
      scrollActiveLyric(false);
    }
  }
}

function openLyricModal() {
  if (curIndex === -1 && (!PLAYLIST || !PLAYLIST.length)) return;
  lyricModal.classList.add('open');
  syncModalTrackInfo();
  scrollActiveLyric(true);
}

function closeLyricModal() {
  lyricModal.classList.remove('open');
}

function syncModalTrackInfo() {
  if (curIndex < 0 || curIndex >= PLAYLIST.length) return;
  const t = PLAYLIST[curIndex];
  const title = t.title || '未选择音乐';
  const artist = t.artist || '未知歌手';

  lmMetaTitle.textContent = title;
  lmMetaArtist.textContent = artist;
  lmCoverTitle.textContent = title;
  lmCoverArtist.textContent = artist;

  const coverHTML = getCoverHTML(t, true);
  lmDiscCover.innerHTML = coverHTML;
}

function fmtTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return m + ':' + pad(s);
}

function renderPlaylistPop() {
  playlistPop.innerHTML = '';
  PLAYLIST.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'pl-item' + (i === curIndex ? ' active' : '');
    item.innerHTML = `<span class="n">${pad(i + 1)}</span><span>${t.title}</span>`;
    item.addEventListener('click', () => { loadTrack(i); playlistPop.classList.remove('open'); });
    playlistPop.appendChild(item);
  });
}

function loadTrack(i, autoplay = true) {
  if (i < 0 || i >= PLAYLIST.length) return;
  curIndex = i;
  const t = PLAYLIST[i];
  audio.src = t.src;
  trackTitle.textContent = t.title;
  trackSub.textContent = (t.artist ? t.artist + ' · ' : '') + `第 ${i + 1} / ${PLAYLIST.length} 首`;
  trackArtContent.innerHTML = getCoverHTML(t, false);

  syncModalTrackInfo();
  renderPlaylistPop();
  loadLyrics(t);
  if (autoplay) audio.play().catch(() => { /* 浏览器阻止自动播放 */ });
}

function showPlayerUI() {
  playerEmpty.style.display = 'none';
  trackInfo.style.display = 'block';
  controlsWrap.style.display = 'flex';
  progressWrap.style.display = 'flex';
  volWrap.style.display = 'flex';
  if (PLAYLIST.length > 1) listBtn.style.display = 'flex';
}

async function initPlayer() {
  // 1. 优先尝试 JS 引入的数据（适合本地 file:// 协议免跨域限制）
  if (window.PLAYLIST_DATA && Array.isArray(window.PLAYLIST_DATA) && window.PLAYLIST_DATA.length) {
    PLAYLIST = window.PLAYLIST_DATA;
    showPlayerUI();
    loadTrack(0, false);
    return;
  }
  // 2. 尝试读取 music/playlist.json (Web 服务器环境)
  try {
    const r = await fetch('music/playlist.json', { cache: 'no-store' });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data) && data.length) {
        PLAYLIST = data;
        showPlayerUI();
        loadTrack(0, false);
        return;
      }
    }
  } catch (e) { /* 没有清单文件或读取失败，走下面的空状态 */ }
  playerEmpty.style.display = 'flex';
  playerEmpty.innerHTML = '还没有歌单 —— 用「生成歌单.html」工具选中 music 文件夹，一键生成 <b>music/playlist.json</b>';
}
initPlayer();

// 交互绑定：展开全屏歌词
trackArt.addEventListener('click', openLyricModal);
trackInfo.addEventListener('click', openLyricModal);
lmCloseBtn.addEventListener('click', closeLyricModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lyricModal.classList.contains('open')) {
    closeLyricModal();
  }
});

lmLyricsBox.addEventListener('wheel', () => {
  isUserScrollingLyrics = true;
  clearTimeout(userScrollTimer);
  userScrollTimer = setTimeout(() => {
    isUserScrollingLyrics = false;
  }, 3000);
}, { passive: true });

listBtn.addEventListener('click', () => playlistPop.classList.toggle('open'));
document.addEventListener('click', (e) => {
  if (!playlistPop.contains(e.target) && e.target !== listBtn && !listBtn.contains(e.target)) {
    playlistPop.classList.remove('open');
  }
});

function togglePlay() {
  if (curIndex === -1) return;
  if (audio.paused) audio.play(); else audio.pause();
}
playBtn.addEventListener('click', togglePlay);
lmPlayBtn.addEventListener('click', togglePlay);

function playPrev() {
  if (PLAYLIST.length) loadTrack((curIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
}
function playNext() {
  if (PLAYLIST.length) loadTrack((curIndex + 1) % PLAYLIST.length);
}
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);
lmPrevBtn.addEventListener('click', playPrev);
lmNextBtn.addEventListener('click', playNext);
audio.addEventListener('ended', playNext);

audio.addEventListener('play', () => {
  playIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
  lmPlayIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
  lmDiscBox.classList.add('playing');
});
audio.addEventListener('pause', () => {
  playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
  lmPlayIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
  lmDiscBox.classList.remove('playing');
});

audio.addEventListener('loadedmetadata', () => {
  seek.max = audio.duration;
  lmSeek.max = audio.duration;
  const totalFormatted = fmtTime(audio.duration);
  durTime.textContent = totalFormatted;
  lmDurTime.textContent = totalFormatted;
});

audio.addEventListener('timeupdate', () => {
  seek.value = audio.currentTime;
  lmSeek.value = audio.currentTime;
  const curFormatted = fmtTime(audio.currentTime);
  curTime.textContent = curFormatted;
  lmCurTime.textContent = curFormatted;

  const pct = audio.duration ? (audio.currentTime / audio.duration * 100) : 0;
  const gradient = `linear-gradient(to right, var(--amber) ${pct}%, var(--panel2) ${pct}%)`;
  seek.style.background = gradient;
  lmSeek.style.background = gradient;

  updateLyrics(audio.currentTime);
});

seek.addEventListener('input', () => {
  audio.currentTime = seek.value;
  lmSeek.value = seek.value;
});
lmSeek.addEventListener('input', () => {
  audio.currentTime = lmSeek.value;
  seek.value = lmSeek.value;
});

let lastVol = 70;
const updateVolState = () => {
  const isMuted = audio.muted || Number(volume.value) === 0;
  const v = isMuted ? 0 : volume.value;
  const volGradient = `linear-gradient(to right, var(--amber) ${v}%, var(--panel2) ${v}%)`;
  volume.style.background = volGradient;
  lmVolume.style.background = volGradient;
  volume.value = v;
  lmVolume.value = v;

  const muteIconSVG = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
  const soundIconSVG = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';

  if (isMuted) {
    volIcon.innerHTML = muteIconSVG;
    lmVolIcon.innerHTML = muteIconSVG;
    volBtn.title = "取消静音";
    lmVolBtn.title = "取消静音";
  } else {
    volIcon.innerHTML = soundIconSVG;
    lmVolIcon.innerHTML = soundIconSVG;
    volBtn.title = "静音";
    lmVolBtn.title = "静音";
  }
};

function toggleMute() {
  if (audio.muted || Number(volume.value) === 0) {
    audio.muted = false;
    const newV = lastVol > 0 ? lastVol : 70;
    volume.value = newV;
    lmVolume.value = newV;
    audio.volume = newV / 100;
  } else {
    lastVol = Number(volume.value) || 70;
    volume.value = 0;
    lmVolume.value = 0;
    audio.muted = true;
  }
  updateVolState();
}
volBtn.addEventListener('click', toggleMute);
lmVolBtn.addEventListener('click', toggleMute);

function onVolumeChange(newVal) {
  const val = Number(newVal);
  if (val > 0) {
    audio.muted = false;
    lastVol = val;
  } else {
    audio.muted = true;
  }
  volume.value = val;
  lmVolume.value = val;
  audio.volume = val / 100;
  updateVolState();
}
volume.addEventListener('input', (e) => onVolumeChange(e.target.value));
lmVolume.addEventListener('input', (e) => onVolumeChange(e.target.value));

audio.volume = 0.7;
updateVolState();
