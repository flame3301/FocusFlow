import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let currentListType: 'ul' | 'ol' | null = null;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          currentListType === 'ul' ? (
            <ul key={elements.length} className="list-disc list-inside space-y-1 mb-4 ml-4 text-gray-800 dark:text-gray-200">
              {currentList}
            </ul>
          ) : (
            <ol key={elements.length} className="list-decimal list-inside space-y-1 mb-4 ml-4 text-gray-800 dark:text-gray-200">
              {currentList}
            </ol>
          )
        );
        currentList = [];
        currentListType = null;
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <div key={elements.length} className="mb-4">
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto border border-gray-200 dark:border-gray-700">
              <code className={`text-sm ${codeBlockLanguage ? `language-${codeBlockLanguage}` : ''} text-gray-800 dark:text-gray-200`}>
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          </div>
        );
        codeBlockContent = [];
        codeBlockLanguage = '';
      }
    };

    const parseInlineElements = (text: string): React.ReactNode[] => {
      const parts: React.ReactNode[] = [];
      let currentText = text;
      let key = 0;

      // Parse inline code first
      const codeRegex = /`([^`]+)`/g;
      const codeParts = currentText.split(codeRegex);
      
      for (let i = 0; i < codeParts.length; i++) {
        if (i % 2 === 0) {
          // Regular text - continue parsing for other elements
          let textPart = codeParts[i];
          
          // Parse bold text
          const boldRegex = /\*\*([^*]+)\*\*/g;
          const boldParts = textPart.split(boldRegex);
          
          for (let j = 0; j < boldParts.length; j++) {
            if (j % 2 === 0) {
              // Regular text - parse italic
              let regularText = boldParts[j];
              const italicRegex = /\*([^*]+)\*/g;
              const italicParts = regularText.split(italicRegex);
              
              for (let k = 0; k < italicParts.length; k++) {
                if (k % 2 === 0) {
                  // Parse links
                  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                  const linkParts = italicParts[k].split(linkRegex);
                  
                  for (let l = 0; l < linkParts.length; l++) {
                    if (l % 3 === 0 && linkParts[l]) {
                      parts.push(<span key={key++}>{linkParts[l]}</span>);
                    } else if (l % 3 === 1) {
                      // Link text
                      const linkText = linkParts[l];
                      const linkUrl = linkParts[l + 1];
                      parts.push(
                        <a
                          key={key++}
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
                        >
                          {linkText}
                        </a>
                      );
                    }
                  }
                } else {
                  // Italic text
                  parts.push(
                    <em key={key++} className="italic text-gray-700 dark:text-gray-300">
                      {italicParts[k]}
                    </em>
                  );
                }
              }
            } else {
              // Bold text
              parts.push(
                <strong key={key++} className="font-semibold text-gray-900 dark:text-white">
                  {boldParts[j]}
                </strong>
              );
            }
          }
        } else {
          // Inline code
          parts.push(
            <code key={key++} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              {codeParts[i]}
            </code>
          );
        }
      }

      return parts;
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Empty line
      if (line.trim() === '') {
        flushList();
        if (elements.length > 0) {
          elements.push(<div key={elements.length} className="h-2" />);
        }
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={elements.length} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 first:mt-0">
            {parseInlineElements(line.slice(2))}
          </h1>
        );
        return;
      }

      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={elements.length} className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-5 first:mt-0">
            {parseInlineElements(line.slice(3))}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={elements.length} className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-4 first:mt-0">
            {parseInlineElements(line.slice(4))}
          </h3>
        );
        return;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote key={elements.length} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-r-lg">
            <p className="text-gray-700 dark:text-gray-300 italic">
              {parseInlineElements(line.slice(2))}
            </p>
          </blockquote>
        );
        return;
      }

      // Horizontal rule
      if (line.trim() === '---' || line.trim() === '***') {
        flushList();
        elements.push(
          <hr key={elements.length} className="border-gray-300 dark:border-gray-600 my-6" />
        );
        return;
      }

      // Unordered lists
      if (line.match(/^[\s]*[•\-\*]\s/)) {
        if (currentListType !== 'ul') {
          flushList();
          currentListType = 'ul';
        }
        const content = line.replace(/^[\s]*[•\-\*]\s/, '');
        currentList.push(
          <li key={currentList.length} className="text-gray-800 dark:text-gray-200">
            {parseInlineElements(content)}
          </li>
        );
        return;
      }

      // Ordered lists
      if (line.match(/^[\s]*\d+\.\s/)) {
        if (currentListType !== 'ol') {
          flushList();
          currentListType = 'ol';
        }
        const content = line.replace(/^[\s]*\d+\.\s/, '');
        currentList.push(
          <li key={currentList.length} className="text-gray-800 dark:text-gray-200">
            {parseInlineElements(content)}
          </li>
        );
        return;
      }

      // Regular paragraph
      flushList();
      if (line.trim()) {
        elements.push(
          <p key={elements.length} className="text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
            {parseInlineElements(line)}
          </p>
        );
      }
    });

    // Flush any remaining content
    flushList();
    flushCodeBlock();

    return elements;
  };

  return <div className="prose prose-sm max-w-none dark:prose-invert">{parseMarkdown(content)}</div>;
};

export default MarkdownRenderer;