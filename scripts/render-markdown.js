#!/usr/bin/env node

/**
 * Markdown to HTML Pre-Renderer
 * Converts markdown content to static HTML with HiFi suite-colored sections
 * For static site deployment (no runtime JavaScript fetch required)
 */

import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HiFi Seven-Suite color rotation
const suiteColors = [
  'maroon',    // Suite 1: Read/Document
  'rust',      // Suite 2: Transform/Convert
  'ochre',     // Suite 3: Attention/Focus
  'viridian',  // Suite 4: Instillation/Setup
  'cobalt',    // Suite 5: Implementation/Execute
  'amethyst',  // Suite 6: Connection/Orchestrate
  'rose'       // Suite 7: System/Refine
];

let currentSectionIndex = 0;

// Read markdown file first
const markdownPath = path.join(__dirname, '../demo/content/unhex-binary.md');
const markdown = fs.readFileSync(markdownPath, 'utf8');

// Parse to HTML first (to get tokens)
let html = marked.parse(markdown);

// Now post-process HTML to add section wrappers based on headings
const lines = html.split('\n');
let processedHtml = '';
let inSection = false;

for (const line of lines) {
  // Detect H1 or H2 tags
  if (line.match(/<h[12][\s>]/)) {
    // Close previous section if exists
    if (inSection) {
      processedHtml += '</div>\n';
    }

    // Open new section with suite color
    const suite = suiteColors[currentSectionIndex % 7];
    currentSectionIndex++;
    processedHtml += `<div class="markdown-section" data-suite="${suite}">\n`;
    inSection = true;
  }

  processedHtml += line + '\n';
}

// Close final section if open
if (inSection) {
  processedHtml += '</div>';
}

// If no sections were created, wrap entire content in maroon section
if (currentSectionIndex === 0) {
  html = `<div class="markdown-section" data-suite="maroon">\n${html}\n</div>`;
} else {
  html = processedHtml;
}

// Output to stdout (can be piped or captured)
console.log(html);

console.error(`✓ Rendered ${currentSectionIndex} sections with HiFi suite colors`);
