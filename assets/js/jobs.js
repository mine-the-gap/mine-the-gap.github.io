/**
 * Renders the MINE-THE-GAP open positions from assets/data/jobs.json
 * into the #jobs-mount container. Each vacancy is shown as a short teaser
 * (topics + deadline + link to the application portal). Vacancies whose
 * application deadline (the ISO "closes" field) has passed are hidden
 * automatically, so the page needs no manual cleanup after a call closes.
 *
 * The page is built with createElement/textContent (never innerHTML from the
 * JSON), and links are only accepted with an http(s) scheme.
 */
(function () {
    const mount = document.getElementById('jobs-mount');
    if (!mount) return;

    const isOpen = (v) => !v.closes || new Date(v.closes).getTime() >= Date.now();

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

    function message(cls, text, link) {
        const p = el('p', { class: cls, text });
        if (link) p.append(link, '.');
        mount.replaceChildren(p);
    }

    fetch('assets/data/jobs.json', { cache: 'no-cache' })
        .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then((data) => render((data.vacancies || []).filter(isOpen)))
        .catch((err) => {
            console.error('Could not load jobs.json:', err);
            message('load-error', 'The current vacancies could not be loaded. Please visit the ',
                extLink('https://uef.varbi.com/what:job/jobID:978704/', null, 'UEF job portal'));
        });

    function render(vacancies) {
        if (!vacancies.length) {
            message('muted', 'There are no open positions right now. Please check back later.');
            return;
        }
        mount.replaceChildren(...vacancies.map(vacancyNode));
    }

    function vacancyNode(v) {
        const topics = (v.topics || []).map((t, i) => el('div', { class: 'topic-card' }, [
            el('span', { class: 'topic-num', text: i + 1 }),
            el('h4', { text: t.title }),
            el('p', { text: t.description }),
        ]));

        const head = el('div', { class: 'job-head' }, [
            el('div', {}, [
                el('h2', { class: 'job-title', text: v.title }),
                v.org ? el('p', { class: 'job-unit', text: v.org }) : null,
            ]),
            v.deadline ? el('div', { class: 'deadline' }, [
                el('span', { text: 'Apply by' }),
                el('strong', { text: v.deadline }),
            ]) : null,
        ]);

        return el('article', { class: 'job' }, [
            head,
            topics.length ? el('div', { class: 'topic-grid' }, topics) : null,
            el('div', { class: 'cta-row cta-bottom' }, [
                extLink(v.applyUrl, 'btn-apply', 'Apply on the UEF portal →'),
                v.postingUrl ? extLink(v.postingUrl, 'btn-ghost', 'Full posting') : null,
            ]),
        ]);
    }
})();
