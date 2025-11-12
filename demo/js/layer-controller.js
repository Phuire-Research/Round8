/**
 * Layer Mode Controller
 * Manages two-pane website architecture:
 * - Layer 1 (Calculator): Front by default (z-index 50)
 * - Layer 2 (Markdown): Background by default (z-index 1)
 *
 * Toggle behavior:
 * - Click markdown → Enter reader mode (markdown front, calculator shadow box)
 * - Click screen filter → Exit reader mode (calculator front, markdown background)
 */

class LayerModeController {
  constructor() {
    // Current mode state
    this.mode = 'background'; // 'background' | 'reader'

    // Layer elements
    this.markdownLayer = document.getElementById('markdown-layer');
    this.calculatorLayer = document.getElementById('calculator-layer');
    this.screenFilter = document.getElementById('screen-filter');
    this.closeButton = document.getElementById('close-reader');

    // Validate elements exist
    if (!this.markdownLayer || !this.calculatorLayer || !this.screenFilter || !this.closeButton) {
      console.error('Layer Mode Controller: Required elements not found');
      return;
    }

    // Bind event handlers
    this.bindEvents();

    console.log('✓ Layer Mode Controller initialized (silent monolith mode)');
  }

  /**
   * Attach event listeners
   */
  bindEvents() {
    // Click markdown layer to enter reader mode (silent discovery)
    this.markdownLayer.addEventListener('click', (e) => {
      if (this.mode === 'background') {
        // Background mode: Click anywhere on layer → enter reader mode
        this.enterReaderMode();
      }
    });

    // Click close button to exit reader mode (always exit, button only visible in reader mode)
    this.closeButton.addEventListener('click', () => {
      console.log('Close button clicked!');
      this.exitReaderMode();
    });

    // Click screen filter to exit reader mode (backup)
    this.screenFilter.addEventListener('click', () => {
      if (this.mode === 'reader') {
        this.exitReaderMode();
      }
    });

    // ESC key to exit reader mode
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mode === 'reader') {
        this.exitReaderMode();
      }
    });
  }

  /**
   * Enter Reader Mode
   * - Markdown layer → front (z-index 100), fully opaque, scrollable
   * - Calculator layer → shadow box back (z-index 10), 10% opacity
   * - Screen filter → active (z-index 90), shows vignette and blur
   * - Close button → visible (active class)
   */
  enterReaderMode() {
    this.mode = 'reader';

    // Markdown: background decoration → front readable content
    this.markdownLayer.setAttribute('data-mode', 'reader');
    this.markdownLayer.style.zIndex = '100';

    // Calculator: front tool → shadow box ghost
    this.calculatorLayer.classList.add('shadow-box-mode');
    this.calculatorLayer.style.zIndex = '10';

    // Screen filter: show vignette and blur
    this.screenFilter.classList.add('active');

    // Close button: show
    console.log('Close button element:', this.closeButton);
    console.log('Close button classes before:', this.closeButton.className);
    this.closeButton.classList.add('active');
    console.log('Close button classes after:', this.closeButton.className);

    console.log('→ Monolith opened: reader mode revealed');
  }

  /**
   * Exit Reader Mode
   * - Markdown layer → background (z-index 1), faded decoration, not scrollable
   * - Calculator layer → front (z-index 50), full opacity
   * - Screen filter → inactive (hidden)
   * - Close button → hidden (remove active class)
   */
  exitReaderMode() {
    this.mode = 'background';

    // Markdown: front readable content → background decoration
    this.markdownLayer.setAttribute('data-mode', 'background');
    this.markdownLayer.style.zIndex = '1';

    // Calculator: shadow box ghost → front tool
    this.calculatorLayer.classList.remove('shadow-box-mode');
    this.calculatorLayer.style.zIndex = '50';

    // Screen filter: hide vignette and blur
    this.screenFilter.classList.remove('active');

    // Close button: hide
    this.closeButton.classList.remove('active');

    console.log('← Monolith closed: calculator monolith restored');
  }

  /**
   * Get current mode
   * @returns {'background'|'reader'}
   */
  getMode() {
    return this.mode;
  }
}

// Initialize layer controller on page load (HTML pre-rendered, no delay needed)
document.addEventListener('DOMContentLoaded', () => {
  window.layerController = new LayerModeController();
});

// Export for external use if needed
export { LayerModeController };
