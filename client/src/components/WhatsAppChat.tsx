import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "👋 Hi there! Welcome to BaapDrop support. How can I help you today?",
    sender: "support",
    timestamp: new Date(),
  },
];

interface WhatsAppChatProps {
  phoneNumber: string;
  message?: string;
  position?: "left" | "right";
  delay?: number;
}

export default function WhatsAppChat({
  phoneNumber,
  message = "Hello! I'm interested in becoming a reseller. Can you provide more information?",
  position = "left",
  delay = 2000,
}: WhatsAppChatProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [showLocalChat, setShowLocalChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Properly formatted WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Quick replies
  const quickReplies = [
    "How do I start reselling?",
    "What are the fees?",
    "How much can I earn?",
    "How do payments work?",
  ];

  // Show widget after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Remember if user has interacted with the widget
  useEffect(() => {
    const interacted = localStorage.getItem("whatsapp_chat_interacted");
    if (interacted) {
      setHasInteracted(true);
      setIsOpen(false);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem("whatsapp_chat_interacted", "true");
    }
  };

  const handleStartChat = () => {
    if (showLocalChat) {
      // Add user message
      addMessage(message, "user");
      return;
    }
    
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  const addMessage = (text: string, sender: "user" | "support") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate response from support after user message
    if (sender === "user") {
      // Clear input
      setInputText("");
      
      // Simulate typing indicator
      setTimeout(() => {
        let responseText = "";
        
        // Generate appropriate response based on user message
        if (text.toLowerCase().includes("start") || text.toLowerCase().includes("begin")) {
          responseText = "To start reselling with BaapDrop, simply create an account on our platform, browse our catalog, and start promoting products to your customers. We handle inventory and shipping!";
        } else if (text.toLowerCase().includes("fee") || text.toLowerCase().includes("cost") || text.toLowerCase().includes("price")) {
          responseText = "Our Bronze plan starts at ₹999/month, Gold at ₹2,499/month, and Diamond at ₹4,999/month. Each offers different features and profit margins.";
        } else if (text.toLowerCase().includes("earn") || text.toLowerCase().includes("profit") || text.toLowerCase().includes("money")) {
          responseText = "Earnings vary depending on your effort and sales volume. Our average resellers make between ₹20,000-₹50,000 monthly, while top performers earn ₹1-2 lakhs or more!";
        } else if (text.toLowerCase().includes("payment") || text.toLowerCase().includes("payout")) {
          responseText = "We process payments weekly through bank transfers. You'll get your profit margin directly, with no need to handle product costs. We also offer instant payout options for Diamond members.";
        } else {
          responseText = "Thanks for your message! Our team will get back to you shortly. Meanwhile, feel free to check our website for more details about our reseller program.";
        }
        
        // Add support response
        addMessage(responseText, "support");
      }, 1500);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      addMessage(inputText, "user");
    }
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, "user");
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 ${position === "right" ? "right-6" : "left-6"} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 w-80"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="bg-[#25D366] p-2 rounded-full mr-2">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 9.00001 4.49999 7.90001 5.09999C6.80001 5.59999 5.90001 6.39999 5.10001 7.19999C4.30001 7.99999 3.70001 8.99999 3.20001 10.1C2.70001 11.2 2.50001 12.3 2.50001 13.5C2.40001 14.7 2.60001 15.8 2.90001 16.9C3.20001 18 3.80001 19 4.50001 19.9L2.50001 22H7.70001C8.80001 22.4 9.90001 22.5 11.1 22.5C12.3 22.5 13.4 22.3 14.5 21.9C15.6 21.5 16.6 20.9 17.5 20.1C18.4 19.3 19.1 18.4 19.7 17.3C20.3 16.2 20.6 15.1 20.8 13.9C21 12.7 20.9 11.6 20.7 10.5C20.4 9.39999 20.1 8.39999 19.4 7.49999C18.7 6.59999 18.2 6.49999 17.6 6.31999ZM16.8 15.7C16.6 16.1 16.4 16.4 16 16.7C15.6 17 15.3 17.1 14.9 17.3C14.5 17.5 14 17.5 13.5 17.4C13 17.3 12.4 17.1 11.8 16.9C11.2 16.7 10.5 16.3 9.80001 15.9C9.10001 15.5 8.40001 15 7.80001 14.4C7.20001 13.8 6.70001 13.1 6.20001 12.4C5.70001 11.7 5.40001 11 5.20001 10.3C5.00001 9.59999 4.90001 9.09999 4.90001 8.59999C4.90001 8.09999 5.00001 7.59999 5.20001 7.19999C5.40001 6.79999 5.70001 6.39999 6.00001 6.09999C6.40001 5.69999 6.80001 5.49999 7.30001 5.49999C7.50001 5.49999 7.70001 5.49999 7.90001 5.59999C8.10001 5.69999 8.30001 5.79999 8.50001 5.99999L10.3 8.49999C10.5 8.79999 10.6 8.99999 10.7 9.29999C10.8 9.59999 10.9 9.79999 10.9 9.99999C10.9 10.2 10.8 10.4 10.7 10.6C10.6 10.8 10.4 11 10.2 11.2L9.60001 11.9C9.50001 12 9.50001 12.1 9.50001 12.1C9.50001 12.2 9.50001 12.2 9.60001 12.3C9.70001 12.5 9.90001 12.7 10.1 12.9C10.3 13.1 10.5 13.4 10.8 13.6C11.1 13.9 11.3 14.1 11.6 14.3C11.8 14.5 12.1 14.7 12.3 14.8C12.4 14.9 12.5 14.9 12.6 14.9C12.7 14.9 12.8 14.8 12.9 14.7L13.6 14.1C13.8 13.9 14 13.7 14.2 13.6C14.4 13.5 14.6 13.4 14.8 13.4C15 13.4 15.2 13.5 15.5 13.6C15.8 13.7 16 13.9 16.3 14.1L18.7 16C18.9 16.2 19 16.4 19.1 16.6C19.1 16.9 19.1 17.1 16.8 15.7Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">WhatsApp Support</h3>
              </div>
              <button 
                onClick={handleToggle}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
{showLocalChat ? (
              <div className="flex flex-col">
                {/* Chat messages area */}
                <div className="bg-[#E5F7F0] rounded-lg p-3 mb-3 h-80 overflow-y-auto">
                  <div className="flex flex-col space-y-2">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-2 ${
                            msg.sender === 'user' 
                              ? 'bg-[#dcf8c6] text-gray-800 rounded-tr-none' 
                              : 'bg-white text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs text-right mt-1 opacity-70">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Quick replies */}
                {messages.length <= 2 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Message input */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full border border-gray-300 py-2 px-4 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-[#25D366] text-white p-2 rounded-full"
                    disabled={!inputText.trim()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <p className="text-gray-700">Hi there! 👋</p>
                  <p className="text-gray-700 mt-2">Need help with dropshipping or have questions about becoming a reseller?</p>
                  <p className="text-gray-700 mt-2">Chat with our support team now!</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowLocalChat(true);
                      addMessage("Hello! I'm interested in becoming a reseller. Can you provide more information?", "user");
                    }}
                    className="bg-[#25D366] hover:bg-[#20b958] text-white flex-1 py-2 rounded-lg font-medium flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat Here
                  </button>
                  <button
                    onClick={handleStartChat}
                    className="bg-[#25D366] hover:bg-[#20b958] text-white flex-1 py-2 rounded-lg font-medium flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 9.00001 4.49999 7.90001 5.09999C6.80001 5.59999 5.90001 6.39999 5.10001 7.19999C4.30001 7.99999 3.70001 8.99999 3.20001 10.1C2.70001 11.2 2.50001 12.3 2.50001 13.5C2.40001 14.7 2.60001 15.8 2.90001 16.9C3.20001 18 3.80001 19 4.50001 19.9L2.50001 22H7.70001C8.80001 22.4 9.90001 22.5 11.1 22.5C12.3 22.5 13.4 22.3 14.5 21.9C15.6 21.5 16.6 20.9 17.5 20.1C18.4 19.3 19.1 18.4 19.7 17.3C20.3 16.2 20.6 15.1 20.8 13.9C21 12.7 20.9 11.6 20.7 10.5C20.4 9.39999 20.1 8.39999 19.4 7.49999C18.7 6.59999 18.2 6.49999 17.6 6.31999ZM16.8 15.7C16.6 16.1 16.4 16.4 16 16.7C15.6 17 15.3 17.1 14.9 17.3C14.5 17.5 14 17.5 13.5 17.4C13 17.3 12.4 17.1 11.8 16.9C11.2 16.7 10.5 16.3 9.80001 15.9C9.10001 15.5 8.40001 15 7.80001 14.4C7.20001 13.8 6.70001 13.1 6.20001 12.4C5.70001 11.7 5.40001 11 5.20001 10.3C5.00001 9.59999 4.90001 9.09999 4.90001 8.59999C4.90001 8.09999 5.00001 7.59999 5.20001 7.19999C5.40001 6.79999 5.70001 6.39999 6.00001 6.09999C6.40001 5.69999 6.80001 5.49999 7.30001 5.49999C7.50001 5.49999 7.70001 5.49999 7.90001 5.59999C8.10001 5.69999 8.30001 5.79999 8.50001 5.99999L10.3 8.49999C10.5 8.79999 10.6 8.99999 10.7 9.29999C10.8 9.59999 10.9 9.79999 10.9 9.99999C10.9 10.2 10.8 10.4 10.7 10.6C10.6 10.8 10.4 11 10.2 11.2L9.60001 11.9C9.50001 12 9.50001 12.1 9.50001 12.1C9.50001 12.2 9.50001 12.2 9.60001 12.3C9.70001 12.5 9.90001 12.7 10.1 12.9C10.3 13.1 10.5 13.4 10.8 13.6C11.1 13.9 11.3 14.1 11.6 14.3C11.8 14.5 12.1 14.7 12.3 14.8C12.4 14.9 12.5 14.9 12.6 14.9C12.7 14.9 12.8 14.8 12.9 14.7L13.6 14.1C13.8 13.9 14 13.7 14.2 13.6C14.4 13.5 14.6 13.4 14.8 13.4C15 13.4 15.2 13.5 15.5 13.6C15.8 13.7 16 13.9 16.3 14.1L18.7 16C18.9 16.2 19 16.4 19.1 16.6C19.1 16.9 19.1 17.1 16.8 15.7Z" fill="currentColor"/>
                    </svg>
                    Open WhatsApp
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className={`bg-[#25D366] text-white p-3.5 rounded-full shadow-lg flex items-center justify-center relative ${isOpen ? 'ring-4 ring-[#25D366]/30' : ''}`}
      >
        {!isOpen && !hasInteracted && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            1
          </span>
        )}
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6 6.31999C16.8 5.49999 15.8 4.89999 14.7 4.49999C13.6 4.09999 12.5 3.99999 11.3 4.09999C10.1 4.19999 9.00001 4.49999 7.90001 5.09999C6.80001 5.59999 5.90001 6.39999 5.10001 7.19999C4.30001 7.99999 3.70001 8.99999 3.20001 10.1C2.70001 11.2 2.50001 12.3 2.50001 13.5C2.40001 14.7 2.60001 15.8 2.90001 16.9C3.20001 18 3.80001 19 4.50001 19.9L2.50001 22H7.70001C8.80001 22.4 9.90001 22.5 11.1 22.5C12.3 22.5 13.4 22.3 14.5 21.9C15.6 21.5 16.6 20.9 17.5 20.1C18.4 19.3 19.1 18.4 19.7 17.3C20.3 16.2 20.6 15.1 20.8 13.9C21 12.7 20.9 11.6 20.7 10.5C20.4 9.39999 20.1 8.39999 19.4 7.49999C18.7 6.59999 18.2 6.49999 17.6 6.31999ZM16.8 15.7C16.6 16.1 16.4 16.4 16 16.7C15.6 17 15.3 17.1 14.9 17.3C14.5 17.5 14 17.5 13.5 17.4C13 17.3 12.4 17.1 11.8 16.9C11.2 16.7 10.5 16.3 9.80001 15.9C9.10001 15.5 8.40001 15 7.80001 14.4C7.20001 13.8 6.70001 13.1 6.20001 12.4C5.70001 11.7 5.40001 11 5.20001 10.3C5.00001 9.59999 4.90001 9.09999 4.90001 8.59999C4.90001 8.09999 5.00001 7.59999 5.20001 7.19999C5.40001 6.79999 5.70001 6.39999 6.00001 6.09999C6.40001 5.69999 6.80001 5.49999 7.30001 5.49999C7.50001 5.49999 7.70001 5.49999 7.90001 5.59999C8.10001 5.69999 8.30001 5.79999 8.50001 5.99999L10.3 8.49999C10.5 8.79999 10.6 8.99999 10.7 9.29999C10.8 9.59999 10.9 9.79999 10.9 9.99999C10.9 10.2 10.8 10.4 10.7 10.6C10.6 10.8 10.4 11 10.2 11.2L9.60001 11.9C9.50001 12 9.50001 12.1 9.50001 12.1C9.50001 12.2 9.50001 12.2 9.60001 12.3C9.70001 12.5 9.90001 12.7 10.1 12.9C10.3 13.1 10.5 13.4 10.8 13.6C11.1 13.9 11.3 14.1 11.6 14.3C11.8 14.5 12.1 14.7 12.3 14.8C12.4 14.9 12.5 14.9 12.6 14.9C12.7 14.9 12.8 14.8 12.9 14.7L13.6 14.1C13.8 13.9 14 13.7 14.2 13.6C14.4 13.5 14.6 13.4 14.8 13.4C15 13.4 15.2 13.5 15.5 13.6C15.8 13.7 16 13.9 16.3 14.1L18.7 16C18.9 16.2 19 16.4 19.1 16.6C19.1 16.9 19.1 17.1 16.8 15.7Z" fill="currentColor"/>
        </svg>
      </motion.button>
    </div>
  );
}