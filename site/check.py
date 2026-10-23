from pathlib import Path
from html.parser import HTMLParser
import re
from urllib.parse import unquote
root = Path(__file__).parent
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.links=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        for name in ('href','src'):
            if name in a: self.links.append(a[name])
for path in sorted(root.rglob('*.html')):
    name=str(path.relative_to(root))
    assert path.exists(), f'Missing page: {name}'
    p=Page(); p.feed(path.read_text())
    assert len(p.ids)==len(set(p.ids)), f'Duplicate IDs: {name}'
    for link in p.links:
        if link.startswith(('http:', 'https:', 'mailto:', 'data:')): continue
        file, _, anchor=link.partition('#')
        target=path.parent/file if file else path
        assert target.is_file(), f'Broken local link: {name} -> {link}'
        if anchor:
            q=Page(); q.feed(target.read_text())
            assert unquote(anchor) in q.ids, f'Broken anchor: {name} -> {link}'
    assert 'name="viewport"' in path.read_text()
assert 'prefers-reduced-motion' in (root/'styles.css').read_text()
print('PASS: pages, local links, anchors, viewport, reduced motion')
