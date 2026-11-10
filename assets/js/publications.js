/**
 * Renders MINE-THE-GAP publications and software from
 * assets/data/publications.json into the #pubs-mount container.
 *
 * The page is built with createElement/textContent (never innerHTML from the
 * JSON), and links are only accepted with an http(s) scheme.
 */
(function () {
    const mount = document.getElementById('pubs-mount');
    if (!mount) return;

    const PI = 'Victor Maus';

    // Return the URL if it is http(s), otherwise null.
    const safeUrl = (u) => {
        try {
            const url = new URL(String(u), location.href);
            return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
        } catch (e) { return null; }
    };

    function el(tag, attrs, children) {
        const node = document.createElement(tag);
        Object.entries(attrs || {}).forEach(([k, v]) => {
            if (v == null || v === false) return;
            if (k === 'text') node.textContent = String(v);
            else node.setAttribute(k, v);
        });
        (children || []).forEach((c) => { if (c) node.append(c); });
        return node;
    }

    function extLink(href, cls, text) {
        const url = safeUrl(href);
        if (!url) return null;
        return el('a', { class: cls, href: url, target: '_blank', rel: 'noopener noreferrer', text });
    }

    // Author list with the project PI in bold.
    function authorsNode(authors) {
        const p = el('p', { class: 'pub-authors' });
        String(authors).split(/\s*,\s*/).forEach((a, i) => {
            const name = a.trim();
            if (i) p.append(', ');
            p.append(name === PI ? el('strong', { text: name }) : name);
        });
        return p;
    }

    const doiLink = (doi) =>
        doi ? extLink('https://doi.org/' + encodeURIComponent(doi).replace(/%2F/gi, '/'), 'doi', 'doi.org/' + doi) : null;

    fetch('assets/data/publications.json', { cache: 'no-cache' })
        .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(render)
        .catch((err) => {
            console.error('Could not load publications.json:', err);
            const p = el('p', { class: 'load-error', text: 'The publication list could not be loaded. See the project results on ' });
            p.append(extLink('https://cordis.europa.eu/project/id/101170578/results', null, 'CORDIS'), '.');
            mount.replaceChildren(p);
        });

    function render(data) {
        const pubs = data.publications || [];
        const software = data.software || [];
        const nodes = [];

        if (pubs.length) {
            nodes.push(el('h2', { class: 'section-title', text: 'Publications' }), ...pubs.map(pubNode));
        }
        if (software.length) {
            nodes.push(el('h2', { class: 'section-title', text: 'Software & code' }), ...software.map(softwareNode));
        }
        if (!nodes.length) nodes.push(el('p', { class: 'muted', text: 'Outputs will appear here as the project progresses.' }));
        mount.replaceChildren(...nodes);
    }

    function pubNode(p) {
        const meta = [p.venue, p.year].filter(Boolean).join(' · ');
        return el('article', { class: 'pub' }, [
            p.type ? el('span', { class: 'tag', text: p.type }) : null,
            el('h3', { class: 'pub-title', text: p.title }),
            p.authors ? authorsNode(p.authors) : null,
            meta ? el('p', { class: 'pub-meta', text: meta }) : null,
            doiLink(p.doi),
        ]);
    }

    function softwareNode(s) {
        return el('article', { class: 'pub software' }, [
            el('span', { class: 'tag tag-sw', text: 'Software' }),
            el('h3', { class: 'pub-title', text: s.title || s.name }),
            s.authors ? authorsNode(s.authors) : null,
            s.description ? el('p', { class: 'pub-desc', text: s.description }) : null,
            el('p', { class: 'pub-links' }, [
                s.repo ? extLink(s.repo, null, 'GitHub repository') : null,
                doiLink(s.doi),
            ]),
        ]);
    }
})();
