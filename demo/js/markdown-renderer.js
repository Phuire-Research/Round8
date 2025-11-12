/**
 * Markdown Section Renderer
 * Parses markdown content and wraps sections in HiFi suite-colored divs
 * Uses marked.js from CDN for lightweight parsing
 */

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

class MarkdownSectionRenderer {
  constructor() {
    // HiFi Seven-Suite Prismatic Spectrum color rotation
    this.suiteColors = [
      'maroon',    // Suite 1: Read/Document
      'rust',      // Suite 2: Transform/Convert
      'ochre',     // Suite 3: Attention/Focus
      'viridian',  // Suite 4: Instillation/Setup
      'cobalt',    // Suite 5: Implementation/Execute
      'amethyst',  // Suite 6: Connection/Orchestrate
      'rose'       // Suite 7: System/Refine
    ];

    this.currentSectionIndex = 0;
    this.setupRenderer();
  }

  /**
   * Configure marked.js renderer to create section boundaries
   * H1 and H2 headings create new sections with HiFi suite colors
   */
  setupRenderer() {
    const renderer = new marked.Renderer();

    // Store original heading renderer
    const originalHeading = renderer.heading.bind(renderer);

    // Override heading renderer to create section boundaries
    renderer.heading = ({ text, depth }) => {
      // H1 and H2 create new sections with suite color rotation
      if (depth <= 2) {
        const suite = this.suiteColors[this.currentSectionIndex % 7];
        this.currentSectionIndex++;

        // Close previous section and open new one with suite color
        return `
          </div>
          <div class="markdown-section" data-suite="${suite}">
            ${originalHeading({ text, depth })}
        `;
      }

      // H3+ stay within current section
      return originalHeading({ text, depth });
    };

    // Configure marked with custom renderer
    marked.setOptions({
      renderer,
      breaks: true,     // Convert \n to <br>
      gfm: true,        // GitHub Flavored Markdown
      headerIds: true,  // Generate header IDs for anchor links
      mangle: false     // Don't escape autolinked email addresses
    });
  }

  /**
   * Fetch and render markdown file
   * @param {string} markdownPath - Path to markdown file (relative or absolute)
   * @param {HTMLElement} targetElement - DOM element to render into
   */
  async render(markdownPath, targetElement) {
    try {
      // Fetch markdown content
      const response = await fetch(markdownPath);

      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
      }

      const markdownText = await response.text();

      // Parse markdown to HTML
      let html = await marked.parse(markdownText);

      // Wrap entire content in initial maroon section
      html = `<div class="markdown-section" data-suite="maroon">${html}</div>`;

      // Render to target element
      targetElement.innerHTML = html;

      console.log(`✓ Markdown rendered: ${this.currentSectionIndex} sections created with HiFi suite colors`);

    } catch (error) {
      console.error('Markdown rendering error:', error);

      // Display error message in target element
      targetElement.innerHTML = `
        <div class="markdown-section" data-suite="rose">
          <h1 style="color: var(--color-rose-light);">Error Loading Content</h1>
          <p>Failed to load markdown content from: <code>${markdownPath}</code></p>
          <p><strong>Error:</strong> ${error.message}</p>
        </div>
      `;
    }
  }
}

// Initialize markdown renderer on page load
document.addEventListener('DOMContentLoaded', async () => {
  const renderer = new MarkdownSectionRenderer();
  const markdownContent = document.getElementById('markdown-content');

  if (markdownContent) {
    // Render UnHex Binary markdown
    await renderer.render('content/unhex-binary.md', markdownContent);
  } else {
    console.error('Markdown content element not found: #markdown-content');
  }
});

// Export for external use if needed
export { MarkdownSectionRenderer };
