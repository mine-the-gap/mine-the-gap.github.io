/**
 * Shared Header Component for MINE-THE-GAP
 * Defines a custom element <project-header> with responsive navigation.
 * Same links, in the same order, as the nav pill on maps.minethegap.eu.
 * The envelope opens the contact dialog from contact.js (data-contact-open); the moon/sun button switches the theme
 * (theme.js).
 */
class ProjectHeader extends HTMLElement {
    connectedCallback() {
        // Static markup only.
        this.innerHTML = `
        <header id="nav-header">
            <a href="/" class="brand" aria-label="MINE-THE-GAP home">
                <svg class="brand-mark" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="18" rx="4" fill="currentColor"/><path d="M7 8h10l-2 3h-6zM9 13h6l-2 3h-2z" fill="rgba(0,0,0,.35)"/></svg>
                <span>MINE-THE-GAP</span>
            </a>

            <nav aria-label="Main">
                <button class="mtg-menu-toggle" id="mobile-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-list">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
                </button>
                <ul class="mtg-nav-menu" id="nav-list">
                    <li><a href="/publications.html" class="mtg-nav-link" data-nav="publications.html">Publications</a></li>
                    <li><a href="/jobs.html" class="mtg-nav-link" data-nav="jobs.html">Jobs</a></li>
                    <li><a href="/app.html" class="mtg-nav-link" data-nav="app.html">App</a></li>
                    <li><a href="https://maps.minethegap.eu/" class="mtg-nav-link">Maps</a></li>
                    <li><a href="#contact" class="mtg-nav-icon" data-contact-open title="Get in touch" aria-label="Contact: get in touch">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg><span class="label">Contact</span></a></li>
                    <li><button type="button" class="mtg-nav-icon" data-theme-toggle title="Switch between light and dark" aria-label="Switch between light and dark">
                        <svg class="theme-icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        <svg class="theme-icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg><span class="label">Light / dark</span></button></li>
                </ul>
            </nav>
        </header>`;

        this.initMobileMenu();
        this.highlightCurrent();
    }

    highlightCurrent() {
        const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        this.querySelectorAll('.mtg-nav-link[data-nav]').forEach((link) => {
            if (link.getAttribute('data-nav').toLowerCase() === current) {
                link.classList.add('active-link');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    initMobileMenu() {
        const toggle = this.querySelector('#mobile-toggle');
        const menu = this.querySelector('#nav-list');
        if (!toggle || !menu) return;

        const setOpen = (open) => {
            menu.classList.toggle('active', open);
            toggle.setAttribute('aria-expanded', String(open));
        };

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setOpen(!menu.classList.contains('active'));
        });

        // Close menu when clicking a link
        this.querySelectorAll('.mtg-nav-link').forEach((link) => {
            link.addEventListener('click', () => setOpen(false));
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) setOpen(false);
        });
    }
}

if (!customElements.get('project-header')) {
    customElements.define('project-header', ProjectHeader);
}
