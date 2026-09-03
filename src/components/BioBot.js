import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'persona_inbox_messages';

const INITIAL_MESSAGES = [
  {
    id: 'msg-welcome',
    sender: 'bot',
    text: "Hi! I'm Persona. Ask me anything about Shreshtha's skills, projects, or background.",
    time: 'Now',
    isTyping: false
  }
];

const SUGGESTIONS = [
  'Tell me about Shreshtha',
  'What are your top skills?',
  'What projects have you built?',
  'How to contact you?'
];

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Parses email addresses and URLs into clickable links
function parseLinksAndEmails(str, keyPrefix) {
  if (!str) return null;

  const linkRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(https?:\/\/[^\s)]+)/gi;
  const parts = [];
  let last = 0;
  let match;
  let counter = 0;

  while ((match = linkRegex.exec(str)) !== null) {
    if (match.index > last) {
      parts.push(str.slice(last, match.index));
    }

    const matchedStr = match[0];
    const key = `${keyPrefix}-l-${counter++}`;

    if (match[1]) {
      // Clickable Email link
      parts.push(
        <a
          key={key}
          href={`mailto:${matchedStr}`}
          style={{
            color: 'var(--accent, #c8a55c)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: '600',
            wordBreak: 'break-all',
            cursor: 'pointer'
          }}
        >
          {matchedStr}
        </a>
      );
    } else if (match[2]) {
      // Clickable URL link
      parts.push(
        <a
          key={key}
          href={matchedStr}
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'var(--accent, #c8a55c)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: '600',
            wordBreak: 'break-all',
            cursor: 'pointer'
          }}
        >
          {matchedStr}
        </a>
      );
    }

    last = linkRegex.lastIndex;
  }

  if (last < str.length) {
    parts.push(str.slice(last));
  }

  return parts.length > 0 ? parts : str;
}

// Parses markdown formatting: [label](url), emails, URLs, **bold**, `code`, *italic*
function parseInline(str, lineKey) {
  if (!str) return null;

  const tokenRegex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(https?:\/\/[^\s)]+)|(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\*([^*]+)\*)/g;

  const result = [];
  let lastIndex = 0;
  let match;
  let counter = 0;

  while ((match = tokenRegex.exec(str)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      result.push(str.slice(lastIndex, matchIndex));
    }

    const key = `${lineKey}-${counter++}`;

    if (match[1]) {
      // Markdown link [label](url)
      const label = match[2];
      const url = match[3];
      result.push(
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'var(--accent, #c8a55c)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: '600',
            wordBreak: 'break-all',
            cursor: 'pointer'
          }}
        >
          {label}
        </a>
      );
    } else if (match[4]) {
      // Direct email
      const email = match[4];
      result.push(
        <a
          key={key}
          href={`mailto:${email}`}
          style={{
            color: 'var(--accent, #c8a55c)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: '600',
            wordBreak: 'break-all',
            cursor: 'pointer'
          }}
        >
          {email}
        </a>
      );
    } else if (match[5]) {
      // Direct raw URL
      const url = match[5];
      result.push(
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'var(--accent, #c8a55c)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: '600',
            wordBreak: 'break-all',
            cursor: 'pointer'
          }}
        >
          {url}
        </a>
      );
    } else if (match[6]) {
      // Bold **text** (emails and links inside bold text are also parsed and made clickable)
      const boldText = match[7];
      result.push(
        <strong
          key={key}
          style={{
            fontWeight: '700',
            color: 'var(--ink)'
          }}
        >
          {parseLinksAndEmails(boldText, `${key}-b`)}
        </strong>
      );
    } else if (match[8]) {
      // Inline code `text`
      const codeText = match[9];
      result.push(
        <code
          key={key}
          style={{
            backgroundColor: 'var(--rule-strong, rgba(255, 255, 255, 0.1))',
            padding: '0.12rem 0.35rem',
            borderRadius: '0.25rem',
            fontSize: '0.82em',
            fontFamily: 'monospace',
            color: 'var(--accent, #c8a55c)'
          }}
        >
          {codeText}
        </code>
      );
    } else if (match[10]) {
      // Italic *text* (emails and links inside italic text are also parsed)
      const italicText = match[11];
      result.push(
        <em
          key={key}
          style={{
            fontStyle: 'italic',
            color: 'var(--ink)'
          }}
        >
          {parseLinksAndEmails(italicText, `${key}-i`)}
        </em>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < str.length) {
    result.push(str.slice(lastIndex));
  }

  return result.length > 0 ? result : str;
}

// Full message content renderer with line breaks, bullet lists, and numbered lists
function renderMessageContent(text) {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, idx) => {
    if (!line.trim()) {
      return <div key={`empty-${idx}`} style={{ height: '0.45rem' }} />;
    }

    // Bullet point: "- ", "* ", "• "
    const bulletMatch = line.match(/^(\s*)[-*•]\s+(.*)$/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length > 0 ? '1rem' : '0.35rem';
      const content = bulletMatch[2];
      return (
        <div
          key={`bullet-${idx}`}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.45rem',
            marginLeft: indent,
            lineHeight: 1.5,
            marginTop: '0.15rem'
          }}
        >
          <span style={{ color: 'var(--accent, #c8a55c)', fontSize: '0.75rem', lineHeight: 1 }}>•</span>
          <span style={{ flex: 1 }}>{parseInline(content, `b-${idx}`)}</span>
        </div>
      );
    }

    // Numbered list: "1. ", "2. "
    const numberedMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      const num = numberedMatch[2];
      const content = numberedMatch[3];
      return (
        <div
          key={`num-${idx}`}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.45rem',
            marginLeft: '0.35rem',
            lineHeight: 1.5,
            marginTop: '0.15rem'
          }}
        >
          <span style={{ color: 'var(--accent, #c8a55c)', fontSize: '0.8rem', fontWeight: '600' }}>{num}.</span>
          <span style={{ flex: 1 }}>{parseInline(content, `n-${idx}`)}</span>
        </div>
      );
    }

    // Regular line
    return (
      <div key={`line-${idx}`} style={{ lineHeight: 1.5, marginTop: idx > 0 ? '0.2rem' : 0 }}>
        {parseInline(line, `l-${idx}`)}
      </div>
    );
  });
}

// Typewriter Component for streaming bot responses smoothly
function TypewriterText({ text, onTick, onDone }) {
  const [displayedLen, setDisplayedLen] = useState(0);

  useEffect(() => {
    if (displayedLen >= text.length) {
      onDone && onDone();
      return;
    }

    // Smooth speed scaling: 1 char for short text, 2-3 for longer text
    const step = text.length > 200 ? 3 : text.length > 80 ? 2 : 1;
    const timer = setTimeout(() => {
      setDisplayedLen((prev) => Math.min(text.length, prev + step));
      onTick && onTick();
    }, 16);

    return () => clearTimeout(timer);
  }, [displayedLen, text, onTick, onDone]);

  const currentText = text.slice(0, displayedLen);

  return (
    <>
      {renderMessageContent(currentText)}
      {displayedLen < text.length && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.85em',
            backgroundColor: 'var(--accent, #c8a55c)',
            marginLeft: '2px',
            verticalAlign: 'baseline',
            opacity: 0.8
          }}
        />
      )}
    </>
  );
}

function BioBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m) => ({ ...m, isTyping: false }));
        }
      }
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_MESSAGES;
  });

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [, setThemeTick] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Re-render when Light/Dark mode is toggled from NavBar
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeTick((t) => t + 1);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    return () => observer.disconnect();
  }, []);

  // Save conversation messages to localStorage
  useEffect(() => {
    try {
      const sanitized = messages.map((m) => (m.isTyping ? { ...m, isTyping: false } : m));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    } catch (e) {
      console.warn(e);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, loading]);

  const handleSend = async (customText) => {
    const textToSend = (customText || prompt).trim();
    if (!textToSend || loading) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: formatTime(),
      isTyping: false
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('https://siri-like-bot.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: data.response || 'No response received.',
          time: formatTime(),
          isTyping: true // Trigger typewriter animation for new responses
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'bot',
          text: 'Unable to connect right now. Please try again.',
          time: formatTime(),
          isTyping: true
        }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleClear = () => {
    const reset = [
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Inbox cleared. What would you like to know?',
        time: formatTime(),
        isTyping: false
      }
    ];
    setMessages(reset);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.25rem', right: '1.25rem', zIndex: 9999 }}>
      {/* The Persona Chatbox */}
      <div
        id="chatbot-block"
        style={{
          position: 'absolute',
          bottom: '3.5rem',
          right: 0,
          width: 'clamp(18rem, 88vw, 24rem)',
          height: 'clamp(24rem, 64vh, 32rem)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--rule-strong)',
          borderRadius: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0.75rem 2.5rem rgba(0, 0, 0, 0.28)',
          transformOrigin: 'bottom right',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(1.2rem) scale(0.94)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'transform 0.25s ease, opacity 0.25s ease, background-color 0.3s ease, border-color 0.3s ease',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--rule)',
            backgroundColor: 'var(--bg-elevated)',
            transition: 'background-color 0.3s ease, border-color 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--rule-strong)',
                color: 'var(--accent, #c8a55c)',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: '700'
              }}
            >
              P
            </span>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'var(--accent, #c8a55c)',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  lineHeight: 1.1
                }}
              >
                Persona
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>AI Assistant</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleClear}
              title="Clear Inbox"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem'
              }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              title="Close chat"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                padding: '0.25rem 0.4rem',
                lineHeight: 1
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div
          style={{
            display: 'flex',
            gap: '0.35rem',
            padding: '0.5rem 0.75rem',
            backgroundColor: 'var(--bg-deep)',
            borderBottom: '1px solid var(--rule)',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.3s ease'
          }}
        >
          {SUGGESTIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSend(item)}
              disabled={loading}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--rule-strong)',
                color: 'var(--ink)',
                fontSize: '0.72rem',
                padding: '0.25rem 0.55rem',
                borderRadius: '999rem',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Messages Inbox Stream */}
        <div
          id="result-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            backgroundColor: 'var(--bg-surface)',
            transition: 'background-color 0.3s ease'
          }}
        >
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  id={isUser ? 'user-prompt' : 'bot-ans'}
                  style={{
                    maxWidth: '85%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: isUser ? '0.65rem 0.65rem 0.15rem 0.65rem' : '0.65rem 0.65rem 0.65rem 0.15rem',
                    backgroundColor: isUser ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    border: isUser ? '1px solid var(--rule-strong)' : '1px solid var(--rule)',
                    color: 'var(--ink)',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease'
                  }}
                >
                  {isUser || !m.isTyping ? (
                    renderMessageContent(m.text)
                  ) : (
                    <TypewriterText
                      text={m.text}
                      onTick={scrollToBottom}
                      onDone={() => {
                        setMessages((curr) =>
                          curr.map((msg) => (msg.id === m.id ? { ...msg, isTyping: false } : msg))
                        );
                      }}
                    />
                  )}
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '0.15rem', padding: '0 0.2rem' }}>
                  {m.time}
                </span>
              </div>
            );
          })}

          {loading && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--muted)', fontSize: '0.78rem', fontStyle: 'italic', padding: '0.25rem 0.5rem' }}>
              Persona is typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          id="input-area"
          style={{
            padding: '0.65rem',
            borderTop: '1px solid var(--rule)',
            backgroundColor: 'var(--bg-elevated)',
            transition: 'background-color 0.3s ease, border-color 0.3s ease'
          }}
        >
          <form
            id="prompt-box"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', gap: '0.45rem' }}
          >
            <input
              ref={inputRef}
              id="prompt"
              type="text"
              placeholder="Ask anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              style={{
                flex: 1,
                background: 'var(--bg-deep)',
                border: '1px solid var(--rule-strong)',
                borderRadius: '0.4rem',
                color: 'var(--ink)',
                padding: '0.45rem 0.65rem',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <button
              id="enter-prompt"
              type="submit"
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              disabled={loading || !prompt.trim()}
              style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                color: '#0d1117',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                borderRadius: '0.4rem',
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !prompt.trim() ? 0.5 : 1,
                outline: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.35s ease'
              }}
            >
              {/* Sliding yellow overlay from left to right */}
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--accent, #c8a55c)',
                  transform: btnHover ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: 0,
                  borderRadius: 'inherit'
                }}
              />
              {/* Text label sitting above the sliding layer */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#0d1117'
                }}
              >
                Send
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Floating Corner Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Persona chat' : 'Open Persona chat'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--rule-strong)',
          borderRadius: '999rem',
          padding: '0.45rem 0.9rem',
          color: 'var(--ink)',
          fontSize: '0.85rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 0.35rem 1.25rem rgba(0, 0, 0, 0.25)',
          transition: 'all 0.25s ease',
          outline: 'none'
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            color: 'var(--accent, #c8a55c)',
            fontWeight: '700',
            fontSize: '0.95rem'
          }}
        >
          P
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            display: 'inline-block',
            transition: 'transform 0.25s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--ink)'
          }}
        >
          ▲
        </span>
      </button>
    </div>
  );
}

export default BioBot;