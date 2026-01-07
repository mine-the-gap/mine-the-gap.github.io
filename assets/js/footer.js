/**
 * Shared Footer Component for MINE-THE-GAP
 * This script defines a custom element <project-footer> that can be reused
 * across all subpages to ensure a consistent footer.
 */
class ProjectFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer style="text-align: left;">
            <div class="container" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 3rem; align-items: flex-start;">
                
                <!-- Left Column: Funding and Support Information -->
                <div style="flex: 1; min-width: 300px; max-width: 650px;">
                    <p style="font-size: 0.85rem; line-height: 1.6; opacity: 0.8; margin-bottom: 1.2rem;">
                        Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Research Council Executive Agency. Neither the European Union nor the granting authority can be held responsible for them.
                    </p>
                    <p style="font-size: 0.85rem; line-height: 1.6; opacity: 0.8; margin-bottom: 1.5rem;">
                        This work is supported by European Research Council (ERC) project MINE-THE-GAP (grant agreement no. 101170578 
                        <a href="https://doi.org/10.3030/101170578" target="_blank" style="color: white; text-decoration: underline;">https://doi.org/10.3030/101170578</a>)
                    </p>
                    <img src="https://erc.europa.eu/sites/default/files/2025-08/LOGO_ERC-FLAG_EU.png" 
                         alt="ERC & EU Flag" 
                         class="erc-logo" 
                         style="margin: 0; height: 50px; width: auto; display: block;">
                </div>

                <!-- Right Column: Contact and Status -->
                <div style="flex: 0 1 auto; min-width: 280px; text-align: right; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div style="margin-bottom: 2rem;">
                        <p style="margin: 0.5rem 0;"><strong>Contact:</strong><br>
                            <a href="mailto:victor.maus@wu.ac.at">victor.maus@wu.ac.at</a> | 
                            <a href="https://victormaus.github.io" target="_blank">victormaus.github.io</a>
                        </p>
                    </div>
                    <p style="font-size: 0.8rem; opacity: 0.5; margin: 0;">&copy; 2025 Victor Maus. All rights reserved.</p>
                </div>

            </div>
        </footer>`;
    }
}

// Register the custom element
customElements.define('project-footer', ProjectFooter);