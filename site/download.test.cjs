const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(__dirname + '/app.js', 'utf8');
function run(url) {
  const link = { dataset: { platform: 'android' }, href: '#release-note', textContent: '待发布', attrs: {'aria-disabled': 'true'}, removeAttribute(k) { delete this.attrs[k]; } };
  const note = {textContent:''};
  vm.runInNewContext(source, {
    URL,
    window: { IKAN_DOWNLOADS: { android: {url,label:'下载 Android 版'} }, matchMedia: () => ({addEventListener(){}}) },
    document: { querySelector: selector => selector === '#release-note' ? note : null, querySelectorAll: selector => selector === '.download-link' ? [link] : [], addEventListener(){} }
  });
  return {link,note};
}
for (const url of ['http://example.com/download', 'https://example.com/download']) {
  const {link,note} = run(url);
  assert.equal(link.href,url,'Valid web download URL must be applied');
  assert.equal(link.target,'_blank','Download must open a new tab');
  assert.match(link.rel,/noopener/);
  assert.equal(link.attrs['aria-disabled'],undefined);
  assert.match(note.textContent,/已配置/);
}
for (const url of ['', 'invalid', 'javascript:alert(1)', 'data:text/html,test', 'ftp://example.com']) {
  const {link,note} = run(url);
  assert.equal(link.href,'#release-note');
  assert.equal(link.attrs['aria-disabled'],'true');
  assert.match(note.textContent,/尚未配置/);
}
console.log('PASS: HTTP/HTTPS downloads, new tab, disabled invalid URLs, release status');
