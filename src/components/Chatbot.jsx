import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, BarChart2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const extractMessageFromResponse = (data) => {
    try {
      // Handle different response formats
      if (typeof data === 'string') {
        return data;
      }
      
      if (data.message) {
        return data.message;
      }
      
      if (data.outputs && data.outputs[0]?.outputs[0]?.results?.message?.text) {
        return data.outputs[0].outputs[0].results.message.text;
      }
      
      if (data.outputs && data.outputs[0]?.outputs[0]?.artifacts?.message) {
        return data.outputs[0].outputs[0].artifacts.message;
      }
      
      // If none of the above formats match, try to find any text content
      if (data.text) {
        return data.text;
      }
      
      if (data.content) {
        return data.content;
      }
      
      return 'No response content available.';
    } catch (error) {
      console.error('Error extracting message:', error);
      return 'Error processing response.';
    }
  };

  // Convert table string to data array
  const tableToData = (tableLines) => {
    const rows = tableLines
      .map(line => line.split('|').filter(cell => cell.trim() !== ''))
      .filter(row => row.some(cell => !cell.includes('---')));

    if (rows.length < 2) return null;

    const headers = rows[0].map(h => h.trim());
    const data = rows.slice(1).map(row => {
      const obj = {};
      row.forEach((cell, idx) => {
        const value = parseFloat(cell.trim());
        obj[headers[idx]] = isNaN(value) ? cell.trim() : value;
      });
      return obj;
    });

    return data;
  };

  const detectGraphData = (text) => {
    try {
      // First try to find JSON arrays
      const jsonMatches = text.match(/\[.*?\]/gs);
      if (jsonMatches) {
        for (const match of jsonMatches) {
          try {
            const data = JSON.parse(match);
            if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
              return data;
            }
          } catch (e) {
            // Not valid JSON, continue checking
          }
        }
      }
      
      // If no JSON found, try to parse tables
      const { tables } = parseTableContent(text);
      for (const table of tables) {
        const data = tableToData(table);
        if (data && data.length > 0) {
          return data;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error detecting graph data:', error);
      return null;
    }
  };

  const GraphComponent = ({ data }) => {
    const keys = Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');
    
    if (keys.length === 0) return null;

    return (
      <div className="w-full h-64 my-4 bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height="100%">
          {keys.length === 1 ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={keys[0]} fill="#8884d8" />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              {keys.map((key, index) => (
                <Line 
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={`hsl(${(index * 137) % 360}, 70%, 50%)`}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  const parseTableContent = (text) => {
    const lines = text.split('\n');
    const tables = [];
    let currentTable = [];
    let isInTable = false;

    lines.forEach((line) => {
      if (line.includes('|')) {
        if (!isInTable) {
          isInTable = true;
        }
        currentTable.push(line);
      } else {
        if (isInTable) {
          tables.push(currentTable);
          currentTable = [];
          isInTable = false;
        }
      }
    });

    if (currentTable.length > 0) {
      tables.push(currentTable);
    }

    return { tables, remainingText: lines.filter(line => !line.includes('|')).join('\n') };
  };

  const renderTable = (tableLines) => {
    const rows = tableLines.map(line => 
      line.split('|')
        .filter(cell => cell.trim() !== '')
        .map(cell => cell.trim())
    );

    const isHeaderRow = (row) => row.some(cell => cell.includes('---'));

    return (
      <div className="overflow-x-auto w-full my-2">
        <table className="min-w-full border-collapse">
          <tbody>
            {rows.map((row, rowIndex) => {
              if (isHeaderRow(row)) return null;
              return (
                <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-100' : ''}>
                  {row.map((cell, cellIndex) => {
                    const Element = rowIndex === 0 ? 'th' : 'td';
                    return (
                      <Element
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2 text-sm text-left font-['Inter']"
                      >
                        {cell}
                      </Element>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const MessageContent = ({ text, sender }) => {
    const graphData = detectGraphData(text);
    const { tables, remainingText } = parseTableContent(text);
    
    return (
      <div className="w-full">
        {remainingText && (
          <div className={`whitespace-pre-wrap font-['Inter'] text-${sender === 'user' ? 'right' : 'left'}`}>
           {formatMessage(remainingText)}
          </div>
        )}
        {tables.map((table, index) => renderTable(table))}
        {graphData && <GraphComponent data={graphData} />}
      </div>
    );
  };


  const Message = ({ msg }) => (
    <div className={`w-full flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            msg.sender === 'user'
              ? 'bg-blue-600 text-white rounded-br-none'
              : msg.isError
              ? 'bg-red-50 text-red-700 rounded-bl-none border border-red-200'
              : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'
          } shadow-sm font-['Inter']`}
        >

          <MessageContent text={msg.text} sender={msg.sender} />
          <div className={`text-xs mt-1 ${
            msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
          }`}>
            {msg.timestamp}
          </div>
        </div>
      </div>
    </div>
  );

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
const formatMessage = (text) => {
  // Handle bold text wrapped in ** and regular text
  const parts = text.split(/\*\*\*|\*\*/);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // Bold text (wrapped in **)
      return <strong key={index} className="font-semibold">{part}</strong>;
    } else {
      // Regular text, no bullet points
      return <span key={index}>{part}</span>;
    }
  });
};

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    setError(null);
    const timestamp = formatTimestamp();
    const userMessage = { 
      text: input.trim(), 
      sender: 'user',
      timestamp 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const messageText = extractMessageFromResponse(data);
      const botMessage = {
        text: messageText,
        sender: 'bot',
        timestamp: formatTimestamp()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setError(error.message);
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: formatTimestamp(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 to-gray-50 "  >
      <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-['Inter'] tracking-tight">Social Media Data Analysis</h1>
            <p className="text-gray-400 text-sm font-['Inter']">Powered by Langflow • Created by whiteSnake</p>
          </div>
          <div className="p-2 bg-gray-800 rounded-xl">
            <BarChart2 className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 font-['Inter'] space-y-2">
            <BarChart2 className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-lg font-semibold">Welcome to Data Analysis</p>
            <p className="text-sm text-gray-400">Start your analysis by sending a message</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <Message key={idx} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 shadow-lg">
        {error && (
          <div className="mb-2 text-sm text-red-600 font-['Inter'] bg-red-50 p-2 rounded-lg">
            Error: {error}
          </div>
        )}
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 h-12 max-h-32 resize-none border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 font-['Inter'] shadow-sm"
            disabled={isSending}
          />
          <button
            onClick={sendMessage}
            disabled={isSending || !input.trim()}
            className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {isSending ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="mt-1 text-xs text-gray-500 font-['Inter']">
          Press Enter to send, Shift + Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatBox;