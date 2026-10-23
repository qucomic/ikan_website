'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() {
  if (!menu || !nav) return;
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menu.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
let configuredDownloads = 0;
for (const link of document.querySelectorAll('.download-link')) {
  const download = window.IKAN_DOWNLOADS?.[link.dataset.platform];
  if (!download?.url) continue;
  try {
    const url = new URL(download.url);
    if (!['http:', 'https:'].includes(url.protocol)) continue;
    link.href = url.href;
    link.textContent = download.label;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    configuredDownloads += 1;
    link.removeAttribute('aria-disabled');
  } catch { /* 无效配置保留待发布状态。 */ }
}
const releaseNote = document.querySelector('#release-note');
if (releaseNote) {
  const status = configuredDownloads
    ? `已配置 ${configuredDownloads} 个平台的下载入口，点击将在新标签页打开；其他版本请等待发布。`
    : '正式下载链接尚未配置。';
  releaseNote.textContent = `${status}桌面平台的构建与播放能力有所不同，请以各版本的发布说明为准。`;
}
const preview = document.querySelector('#preview-content');
const discover = preview?.innerHTML;
const views = {
  discover,
  read: '<div class="reader-preview"><div class="reader-tools"><span>〈 山海之间</span><span>字号　Aa</span></div><small>第十二章</small><h3>风从远方来</h3><p>清晨的风越过山脊，带着草木的气息，轻轻推开半掩的窗。远处的海还笼着一层薄雾，像一封尚未展开的信。</p><p>他把书翻到昨天停下的那一页。阳光正好落在字里行间，屋子里很安静，只听得见风吹动纸张的声音。</p><p>有些旅途不必走得太远。翻过一页，就能抵达另一片山海。</p><div class="reader-position">阅读界面示意 <span>12 / 36</span></div></div>',
  save: '<div class="saved-preview"><p class="kicker">属于你的阅读角落</p><h3>故事还在，随时继续。</h3><p>收藏、历史与离线内容，各有归处。</p><div class="saved-row"><div class="tiny-cover cover-one">山海<br>之间</div><div><h4>山海之间</h4><p>上次读到 · 第十二章</p><span>继续阅读</span></div><b>〉</b></div><div class="saved-row"><div class="tiny-cover cover-two">漫长的<br>晴天</div><div><h4>漫长的晴天</h4><p>已加入收藏</p><span>开始阅读</span></div><b>〉</b></div><small>示例内容仅用于界面展示</small></div>'
};
for (const button of document.querySelectorAll('[data-view]')) {
  button.addEventListener('click', () => {
    for (const item of document.querySelectorAll('[data-view]')) item.setAttribute('aria-pressed', String(item === button));
    preview.innerHTML = views[button.dataset.view];
  });
}
for (const year of document.querySelectorAll('[data-year]')) year.textContent = new Date().getFullYear();
