/**
 * Renders the MINE-THE-GAP open positions from assets/data/jobs.json
 * into the #jobs-mount container. Each vacancy is shown as a short teaser
 * (topics + deadline + link to the application portal). Vacancies whose
 * application deadline (the ISO "closes" field) has passed are hidden
 * automatically, so the page needs no manual cleanup after a call closes.
 */
(function () {
    const mount = document.getElementById('jobs-mount');
    if (!mount) return;

    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    const isOpen = (v) => !v.closes || new Date(v.closes).getTime() >= Date.now();

    fetch('assets/data/jobs.json', { cache: 'no-cache' })
        .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then((data) => render((data.vacancies || []).filter(isOpen)))
        .catch((err) => {
            console.error('Could not load jobs.json:', err);
            mount.innerHTML =
                '<p class="load-error">The current vacancies could not be loaded. ' +
                'Please visit the <a href="https://uef.varbi.com/what:job/jobID:978704/" target="_blank" rel="noopener">UEF job portal</a>.</p>';
        });

    function render(vacancies) {
        if (!vacancies.length) {
            mount.innerHTML = '<p class="muted">There are no open positions right now. Please check back later.</p>';
            return;
        }
        mount.innerHTML = vacancies.map(vacancyHtml).join('');
    }

    function vacancyHtml(v) {
        const topics = (v.topics || []).map((t, i) => `
            <div class="topic-card">
                <span class="topic-num">${i + 1}</span>
                <h4>${esc(t.title)}</h4>
                <p>${esc(t.description)}</p>
            </div>`).join('');

        return `
        <article class="job">
            <div class="job-head">
                <div>
                    <h2 class="job-title">${esc(v.title)}</h2>
                    ${v.org ? `<p class="job-unit">${esc(v.org)}</p>` : ''}
                </div>
                ${v.deadline ? `<div class="deadline"><span>Apply by</span><strong>${esc(v.deadline)}</strong></div>` : ''}
            </div>

            ${topics ? `<div class="topic-grid">${topics}</div>` : ''}

            <div class="cta-row cta-bottom">
                <a class="btn-apply" href="${esc(v.applyUrl)}" target="_blank" rel="noopener">Apply on the UEF portal →</a>
                ${v.postingUrl ? `<a class="btn-ghost" href="${esc(v.postingUrl)}" target="_blank" rel="noopener">Full posting</a>` : ''}
            </div>
        </article>`;
    }
})();
