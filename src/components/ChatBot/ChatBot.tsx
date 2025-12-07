import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoClose, IoSend, IoSparkles } from "react-icons/io5";
import { MdSmartToy } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./ChatBot.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  inline?: boolean;
  onSendMessage?: (message: string) => void;
}

const API_URL = "http://localhost:3002/api";
export const ChatBot = ({ inline = false, onSendMessage }: ChatBotProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(inline ? true : false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t("chatbot.welcome", {
        defaultValue:
          "Hello! I'm GreenMind AI, your factory copilot. Ask me about CO₂ emissions, energy efficiency, predictive maintenance, or machine health!",
      }),
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch suggestions when chatbot opens
  useEffect(() => {
    if (isOpen && suggestions.length === 0) {
      fetchSuggestions();
    }
  }, [isOpen, suggestions.length]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(`${API_URL}/suggestions`);
      const data = await response.json();
      if (data.success) {
        // Agar backend massiv qaytarsa
        setSuggestions(data.suggestions);
        // Agar backend obyekt (uz/ru/en) qaytaradigan bo‘lsa, shu yerda moslash mumkin:
        // setSuggestions(data.suggestions.en || []);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend) return;

    // Call onSendMessage callback if provided
    if (onSendMessage) {
      onSendMessage(textToSend);
    }

    // Add user message to UI
    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Build history for API (old messages only)
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message,
          timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please make sure the backend server is running and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className={inline ? styles.chatBotInline : styles.chatBot}>
      {/* Floating Button */}
      {!isOpen && !inline && (
        <button
          className={styles.floatingButton}
          onClick={() => setIsOpen(true)}
          aria-label="Open GreenMind AI Chat"
        >
          <IoSparkles />
          <IoSparkles className={styles.sparkle1} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={inline ? styles.chatWindowInline : styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.iconWrapper}>
                <MdSmartToy className={styles.icon} />
              </div>
              <div>
                <h3>GreenMind AI</h3>
                <p>Industrial Copilot</p>
              </div>
            </div>
            {!inline && (
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <IoClose />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.role === "user"
                    ? styles.userMessage
                    : styles.assistantMessage
                }`}
              >
                <div className={styles.messageContent}>
                  {message.role === "assistant" && (
                    <IoSparkles className={styles.messageSparkle} />
                  )}
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    // shu yerda markdown taglariga maxsus class lar berib styleni nazorat qilsang bo'ladi
                    components={{
                      p: ({ node, ...props }) => (
                        <p className={styles.mdParagraph} {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className={styles.mdStrong} {...props} />
                      ),
                      em: ({ node, ...props }) => (
                        <em className={styles.mdEmphasis} {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className={styles.mdList} {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className={styles.mdOrderedList} {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className={styles.mdListItem} {...props} />
                      ),
                      br: ({ node, ...props }) => <br {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && suggestions.length > 0 && (
            <div className={styles.suggestions}>
              <p className={styles.suggestionsTitle}>Try asking:</p>
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  className={styles.suggestionButton}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Ask something..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send message"
            >
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
