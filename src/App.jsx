import { useState } from 'react';

// Basic Markdown Renderer
function renderMarkdown(text) {
  let html = text;

  // Escape HTML
  // html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Code blocks (```code```)
  html = html.replace(/```(?:\w+)?\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headings
  html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>');
  html = html.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
  html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '<hr>');

  // Blockquotes
  html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

  // Task Lists
  html = html.replace(/^- \[ \] (.*)$/gm, '<input type="checkbox" disabled> $1');
  html = html.replace(/^- \[x\] (.*)$/gim, '<input type="checkbox" disabled checked> $1');

  // Ordered Lists
  html = html.replace(/^\d+\. (.*)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gm, '<ol>$1</ol>');
  html = html.replace(/<\/ol>\s*<ol>/g, '');

  // Unordered Lists
  html = html.replace(/^[-*+] (.*)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gm, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // Bold + Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/(\s|\A)\*(.*?)\*(\s|\Z)/g, '$1<em>$2</em>$3');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');


  // Line breaks
  html = html.replace(/\n{2,}/g, '<br><br>');
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
