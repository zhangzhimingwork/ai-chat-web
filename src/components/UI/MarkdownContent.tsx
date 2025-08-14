import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ 
  content, 
  className = '' 
}) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          // 标题样式
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-5 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2 mt-3 first:mt-0">
              {children}
            </h4>
          ),
          
          // 段落样式
          p: ({ children }) => (
            <p className="text-gray-900 dark:text-gray-100 mb-4 last:mb-0 leading-relaxed">
              {children}
            </p>
          ),
          
          // 强调文本
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-white">
              {children}
            </strong>
          ),
          
          // 斜体
          em: ({ children }) => (
            <em className="italic text-gray-800 dark:text-gray-200">
              {children}
            </em>
          ),
          
          // 链接
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              {children}
            </a>
          ),
          
          // 列表
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-gray-900 dark:text-gray-100">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-900 dark:text-gray-100">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-900 dark:text-gray-100">
              {children}
            </li>
          ),
          
          // 代码块
          code: ({ inline, children }) => {
            if (inline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                {children}
              </code>
            );
          },
          
          // 预格式化文本
          pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4 border border-gray-200 dark:border-gray-700">
              {children}
            </pre>
          ),
          
          // 引用块
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 mb-4 italic text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          
          // 分割线
          hr: () => (
            <hr className="border-t border-gray-300 dark:border-gray-600 my-6" />
          ),
          
          // 表格
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 dark:border-gray-600">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white dark:bg-gray-900">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};