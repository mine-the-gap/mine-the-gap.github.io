/**
 * Renders MINE-THE-GAP publications and software from
 * assets/data/publications.json into the #pubs-mount container.
 */
(function () {
    const mount = document.getElementById('pubs-mount');
    if (!mount) return;

    const PI = 'Victor Maus';

    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    // Bold the project PI within an author string.
    const authorsHtml = (authors) =>
        !authors ? '' : authors.split(/\s*,\s*/).map((a) => {
            const name = a.trim();
            return name === PI ? `<strong>${esc(name)}</strong>` : esc(name);
        }).join(', ');

    const doiLink = (doi) =>
        doi ? `<a class="doi" href="https://doi.org/${encodeURIComponent(doi)}" target="_blank" rel="noopener">doi.org/${esc(doi)}</a>` : '';

    fetch('assets/data/publications.json', { cache: 'no-cache' })
        .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(render)
        .catch((err) => {
            console.error('Could not load publications.json:', err);
            mount.innerHTML =
                '<p class="load-error">The publication list could not be loaded. ' +
                'See the project results on <a href="https://cordis.europa.eu/project/id/101170578/results" target="_blank" rel="noopener">CORDIS</a>.</p>';
        });

    function render(data) {
        const pubs = data.publications || [];
        const software = data.software || [];
        let html = '';

        if (pubs.length) {
            html += '<h2 class="section-title">Publications</h2>';
            html += pubs.map(pubHtml).join('');
        }
        if (software.length) {
            html += '<h2 class="section-title">Software &amp; code</h2>';
            html += software.map(softwareHtml).join('');
        }
        mount.innerHTML = html || '<p class="muted">Outputs will appear here as the project progresses.</p>';
    }

    function pubHtml(p) {
        const meta = [p.venue, p.year].filter(Boolean).map(esc).join(' · ');
        return `
        <article class="pub">
            ${p.type ? `<span class="tag">${esc(p.type)}</span>` : ''}
            <h3 class="pub-title">${esc(p.title)}</h3>
            ${p.authors ? `<p class="pub-authors">${authorsHtml(p.authors)}</p>` : ''}
            ${meta ? `<p class="pub-meta">${meta}</p>` : ''}
            ${doiLink(p.doi)}
        </article>`;
    }

    function softwareHtml(s) {
        return `
        <article class="pub software">
            <span class="tag tag-sw">Software</span>
            <h3 class="pub-title">${esc(s.title || s.name)}</h3>
            ${s.authors ? `<p class="pub-authors">${authorsHtml(s.authors)}</p>` : ''}
            ${s.description ? `<p class="pub-desc">${esc(s.description)}</p>` : ''}
            <p class="pub-links">
                ${s.repo ? `<a href="${esc(s.repo)}" target="_blank" rel="noopener">GitHub repository</a>` : ''}
                ${doiLink(s.doi)}
            </p>
        </article>`;
    }
})();
