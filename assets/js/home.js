/**
 * Home page behaviour (was inline; moved out so the CSP can be script-src 'self'):
 *  - fade-in of the sections as they scroll into view;
 *  - hide a figure that fails to load;
 *  - hide the "we're hiring" link once every vacancy's application deadline
 *    (jobs.json "closes") has passed. Fails open: if the check cannot run,
 *    the link stays visible.
 */
(function () {
    'use strict';

    // Fade-in animations
    const fades = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        fades.forEach((el) => observer.observe(el));
    } else {
        fades.forEach((el) => el.classList.add('visible'));
    }

    // Hide broken figures (the error may already have fired before this deferred script ran).
    document.querySelectorAll('img[data-hide-on-error]').forEach((img) => {
        const hide = () => img.classList.add('is-hidden');
        if (img.complete && img.naturalWidth === 0) hide();
        else img.addEventListener('error', hide);
    });

    // Hiring call-to-action
    const cta = document.getElementById('hiring-cta');
    if (!cta) return;
    fetch('assets/data/jobs.json', { cache: 'no-cache' })
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((data) => {
            const open = (data.vacancies || []).some((v) => !v.closes || new Date(v.closes).getTime() >= Date.now());
            if (!open) cta.classList.add('is-hidden');
        })
        .catch(() => { /* leave the link visible if the check fails */ });
})();
