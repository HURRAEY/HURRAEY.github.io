/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Code } from "lucide-react";

interface RetroCodeBlockProps {
  children: string;
  className?: string;
}

export function RetroCodeBlock({ children, className }: RetroCodeBlockProps) {
  const codeContent = String(children).trim();
  const lines = codeContent.split('\n');

  // Enhanced syntax highlighting for pink pixel theme
  const renderLine = (line: string, index: number) => {
    // Comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return (
        <div key={index} css={lineStyle} style={{ color: '#bd93f9', opacity: 0.7 }}>
          <span style={{ marginRight: '0.5rem' }}>💭</span>
          {line}
        </div>
      );
    }
    
    // Function/Class declarations
    if (line.includes('function') || line.includes('class') || line.includes('const') || line.includes('let') || line.includes('var')) {
      return (
        <div key={index} css={lineStyle}>
          <span style={{ color: '#ff79c6', marginRight: '0.5rem' }}>★</span>
          <span style={{ color: '#ff79c6' }}>{line}</span>
        </div>
      );
    }
    
    // Import/Export
    if (line.includes('import') || line.includes('export')) {
      return (
        <div key={index} css={lineStyle} style={{ color: '#8be9fd' }}>
          <span style={{ marginRight: '0.5rem' }}>⚡</span>
          {line}
        </div>
      );
    }
    
    // Return statements
    if (line.includes('return')) {
      return (
        <div key={index} css={lineStyle} style={{ color: '#50fa7b' }}>
          <span style={{ marginRight: '0.5rem' }}>←</span>
          {line}
        </div>
      );
    }
    
    // Strings
    if (line.includes('"') || line.includes("'") || line.includes('`')) {
      return (
        <div key={index} css={lineStyle} style={{ color: '#f1fa8c' }}>
          <span style={{ marginRight: '0.5rem' }}>✿</span>
          {line}
        </div>
      );
    }
    
    // JSX tags
    if (line.includes('<') && line.includes('>')) {
      return (
        <div key={index} css={lineStyle} style={{ color: '#ffb86c' }}>
          <span style={{ marginRight: '0.5rem' }}>♦</span>
          {line}
        </div>
      );
    }
    
    // Default
    return (
      <div key={index} css={lineStyle} style={{ color: '#f8f8f2' }}>
        {line || ' '}
      </div>
    );
  };

  return (
    <div css={containerStyle}>
      {/* Window Title Bar */}
      <div css={titleBarStyle}>
        <div css={titleLeftStyle}>
          <div css={iconBoxStyle}>
            <Code style={{ width: '12px', height: '12px', color: '#ff1493' }} />
          </div>
          <span css={titleTextStyle}>CODE_BLOCK.EXE</span>
          <div css={ledContainerStyle}>
            <div css={[ledStyle, greenLedStyle]}></div>
            <div css={[ledStyle, yellowLedStyle]}></div>
            <div css={[ledStyle, purpleLedStyle]}></div>
          </div>
        </div>
        <div css={controlButtonsStyle}>
          <button css={[buttonStyle, minimizeButtonStyle]}>_</button>
          <button css={[buttonStyle, maximizeButtonStyle]}>□</button>
          <button css={[buttonStyle, closeButtonStyle]}>×</button>
        </div>
      </div>

      {/* Menu Bar */}
      <div css={menuBarStyle}>
        <span css={menuItemStyle}>File</span>
        <span css={menuItemStyle}>Edit</span>
        <span css={menuItemStyle}>View</span>
        <span css={menuItemStyle}>Help</span>
      </div>
      
      {/* Code Content */}
      <div css={codeAreaStyle}>
        <div css={innerCodeAreaStyle}>
          <div css={lineNumbersStyle}>
            {/* Line Numbers */}
            <div css={lineNumberColumnStyle}>
              {lines.map((_, index) => (
                <div key={index} css={lineNumberStyle}>
                  {String(index + 1).padStart(3, '0')}
                </div>
              ))}
            </div>
            
            {/* Code Lines */}
            <div css={codeLinesStyle}>
              <pre css={preStyle}>
                {lines.map((line, index) => renderLine(line, index))}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div css={statusBarStyle}>
        <div css={statusLeftStyle}>
          <div css={statusIndicatorBoxStyle}>
            <div css={statusIndicatorStyle}></div>
            <span css={statusTextStyle}>LINES: {lines.length}</span>
          </div>
          <div css={statusIndicatorBoxStyle}>
            <div css={[statusIndicatorStyle, readyIndicatorStyle]}></div>
            <span css={statusTextStyle}>READY</span>
          </div>
        </div>
        <div css={statusRightStyle}>
          <span css={statusTextStyle}>UTF-8</span>
          <span css={separatorStyle}>│</span>
          <span css={statusTextStyle}>CRLF</span>
          <span css={separatorStyle}>│</span>
          <span css={statusTextStyle}>PIXEL MODE</span>
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle = css`
  margin: 2rem 0;
  background: #c0c0c0;
  border: 4px solid #ff1493;
  box-shadow: 8px 8px 0px 0px rgba(255, 20, 147, 0.5);
  overflow: hidden;
  image-rendering: pixelated;
`;

const titleBarStyle = css`
  background: linear-gradient(to right, #ff1493, #ff69b4);
  padding: 0.5rem 0.75rem;
  border-bottom: 4px solid #c71585;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 
    inset -1px -1px 0 0 rgba(0, 0, 0, 0.5),
    inset 1px 1px 0 0 rgba(255, 255, 255, 0.5);
  min-height: 2rem;
  
  @media (min-width: 768px) {
    min-height: 2.5rem;
  }
`;

const titleLeftStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const iconBoxStyle = css`
  width: 1rem;
  height: 1rem;
  background: white;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const titleTextStyle = css`
  color: white;
  font-size: 0.625rem;
  font-family: "Press Start 2P", monospace;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
  
  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ledContainerStyle = css`
  display: flex;
  gap: 0.25rem;
  margin-left: 0.5rem;
`;

const ledStyle = css`
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid black;
`;

const greenLedStyle = css`
  background: #00ff00;
  animation: blink 2s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
  }
`;

const yellowLedStyle = css`
  background: #ffff00;
`;

const purpleLedStyle = css`
  background: #ff00ff;
`;

const controlButtonsStyle = css`
  display: flex;
  gap: 0.25rem;
`;

const buttonStyle = css`
  width: 1.25rem;
  height: 1.25rem;
  background: #c0c0c0;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 
    inset -1px -1px 0 0 #000000,
    inset 1px 1px 0 0 #ffffff;
  transition: background 0.2s;
  
  &:hover {
    background: #a0a0a0;
  }
  
  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

const minimizeButtonStyle = css`
  &:hover {
    background: #a0a0a0;
  }
`;

const maximizeButtonStyle = css`
  &:hover {
    background: #a0a0a0;
  }
`;

const closeButtonStyle = css`
  &:hover {
    background: #ff0000;
    color: white;
  }
`;

const menuBarStyle = css`
  background: #c0c0c0;
  padding: 0.25rem 0.75rem;
  border-bottom: 2px solid #808080;
  display: flex;
  gap: 0.75rem;
  font-size: 0.625rem;
  font-family: "VT323", monospace;
  box-shadow: 
    inset -1px -1px 0 0 #000000,
    inset 1px 1px 0 0 #ffffff;
  
  @media (min-width: 768px) {
    font-size: 0.75rem;
    min-height: 1.75rem;
    align-items: center;
  }
`;

const menuItemStyle = css`
  padding: 0.125rem 0.5rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  
  &:hover {
    background: #ff1493;
    color: white;
    border-color: black;
  }
`;

const codeAreaStyle = css`
  background: linear-gradient(to bottom right, #1a0033, #2d0a4e, #1a0033);
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const innerCodeAreaStyle = css`
  background: rgba(0, 0, 0, 0.4);
  border: 4px solid rgba(255, 105, 180, 0.3);
  padding: 1rem;
  box-shadow: inset 4px 4px 8px rgba(255, 20, 147, 0.2);
`;

const lineNumbersStyle = css`
  display: flex;
  gap: 0.5rem;
`;

const lineNumberColumnStyle = css`
  padding-right: 1rem;
  border-right: 4px solid rgba(255, 20, 147, 0.5);
  background: rgba(45, 10, 78, 0.5);
  padding-left: 0.5rem;
  user-select: none;
`;

const lineNumberStyle = css`
  color: #ff69b4;
  font-size: 0.625rem;
  font-family: "Press Start 2P", monospace;
  text-align: right;
  padding: 0.125rem 0;
  line-height: 1.8;
  
  @media (min-width: 768px) {
    font-size: 0.75rem;
    line-height: 2;
  }
`;

const codeLinesStyle = css`
  flex: 1;
  overflow-x: auto;
`;

const preStyle = css`
  margin: 0;
  font-family: "VT323", monospace;
  font-size: 0.875rem;
  line-height: 1.8;
  
  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 2;
  }
`;

const lineStyle = css`
  padding: 0.125rem 0.5rem;
  display: flex;
  align-items: flex-start;
`;

const statusBarStyle = css`
  background: #c0c0c0;
  padding: 0.5rem 1rem;
  border-top: 2px solid #808080;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "VT323", monospace;
  font-size: 0.625rem;
  box-shadow: 
    inset -1px -1px 0 0 #000000,
    inset 1px 1px 0 0 #ffffff;
  min-height: 2rem;
  
  @media (min-width: 768px) {
    font-size: 0.75rem;
    min-height: 2.25rem;
  }
`;

const statusLeftStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const statusIndicatorBoxStyle = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const statusIndicatorStyle = css`
  width: 0.75rem;
  height: 0.75rem;
  background: #ff1493;
  border: 1px solid black;
`;

const readyIndicatorStyle = css`
  background: #00ff00;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.5; }
  }
`;

const statusTextStyle = css`
  color: black;
`;

const statusRightStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const separatorStyle = css`
  color: #808080;
`;
