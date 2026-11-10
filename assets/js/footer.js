/**
 * Shared Footer Component for MINE-THE-GAP
 * This script defines a custom element <project-footer> that can be reused
 * across all subpages to ensure a consistent footer. No email address is
 * published: "Get in touch" opens the contact dialog (contact.js).
 */
class ProjectFooter extends HTMLElement {
    connectedCallback() {
        // Static markup only.
        this.innerHTML = `
        <footer>
            <div class="container footer-grid">

                <!-- Left Column: Funding and Support Information -->
                <div class="footer-funding">
                    <p>
                        Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Research Council Executive Agency. Neither the European Union nor the granting authority can be held responsible for them.
                    </p>
                    <p>
                        This work is supported by European Research Council (ERC) project MINE-THE-GAP (grant agreement no. 101170578
                        <a href="https://doi.org/10.3030/101170578" target="_blank" rel="noopener noreferrer">https://doi.org/10.3030/101170578</a>)
                    </p>
                    <img src="/assets/img/LOGO_ERC-FLAG_EU.png" alt="ERC &amp; EU Flag" class="erc-logo" width="136" height="62">
                </div>

                <!-- Right Column: Contact and Status -->
                <div class="footer-contact">
                    <h3>Contact</h3>
                    <p>Questions about the project, the data or a position?</p>
                    <button type="button" class="btn-primary" data-contact-open>Get in touch</button>
                    <p><a href="https://victormaus.github.io" target="_blank" rel="noopener noreferrer">victormaus.github.io</a></p>
                    <p class="footer-copy">&copy; 2025 Victor Maus. All rights reserved.</p>
                </div>

            </div>
        </footer>`;
    }
}

// Register the custom element
if (!customElements.get('project-footer')) {
    customElements.define('project-footer', ProjectFooter);
}
