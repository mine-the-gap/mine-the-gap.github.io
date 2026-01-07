/**
 * Shared Header Component for MINE-THE-GAP
 * Defines a custom element <project-header> with responsive navigation.
 */
class ProjectHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="nav-header">
            <a href="https://minethegap.eu" class="brand" style="display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="color: var(--yellow-light);">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span>MINE-THE-GAP</span>
            </a>

            <nav>
                <button class="mtg-menu-toggle" id="mobile-toggle" aria-label="Toggle navigation">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                    </svg>
                </button>
                <ul class="mtg-nav-menu" id="nav-list">
                    <li><a href="https://maps.minethegap.eu" class="mtg-nav-link">Maps</a></li>
                    <!-- Add more links here in the future -->
                </ul>
            </nav>
        </header>`;

        this.initMobileMenu();
    }

    initMobileMenu() {
        const toggle = this.querySelector('#mobile-toggle');
        const menu = this.querySelector('#nav-list');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('active');
            });

            // Close menu when clicking a link
            this.querySelectorAll('.mtg-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    menu.classList.remove('active');
                }
            });
        }
    }
}

if (!customElements.get('project-header')) {
    customElements.define('project-header', ProjectHeader);
}