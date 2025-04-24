import { useState } from 'react';
import './index.css';

// Basic Markdown Renderer
function renderMarkdown(text) {
  let html = text;

  // Headings
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Italic *text*
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Inline Code `code`
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Links [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>');

  // New lines to <br>
  html = html.replace(/\n/g, '<br>');

  return html.trim();
}

export default function App() {
  const [markdown, setMarkdown] = useState(`# Hello 👋\n\nThis is a **README Editor** with *no libraries*!`);

  return (
    <div className="container">
      <h1>📝 README Editor</h1>
      <div className="columns">
        {/* Editor */}
        <div className="card">
          <h2>Editor</h2>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>

        {/* Raw Preview */}
        <div className="card">
          <h2>Raw Preview</h2>
          <pre>{markdown}</pre>
        </div>

        {/* Rich Preview */}
        <div className="card">
          <h2>Rich Preview</h2>
          <div
            className="rich"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}
