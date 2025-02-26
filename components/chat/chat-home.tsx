"use client";

import React, { useState, useRef, useEffect } from "react";
import { MainContent } from "../main-content";
import { Button } from "../ui/button";
import {
  Atom,
  BookCopy,
  FileAudio,
  GraduationCap,
  Pin,
  Send,
} from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FaSave, FaStickyNote, FaVolumeUp, FaFileAlt } from "react-icons/fa"; // Icon từ react-icons
import { UploadDialog } from "./upload-dialog";
import { Textarea } from "../ui/textarea";

interface ChatMessage {
  id: number;
  sender: string;
  time: string;
  title: string;
  text: string;
  isUser?: boolean;
  suggestions?: string[];
}

const ChatHomeForm = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    // Tin nhắn ban đầu như trong hình
    {
      id: 1,
      sender: "Bob Johnson",
      time: "2 days ago",
      title: "Weekend Plans",
      text: "",
      isUser: false,
      suggestions: [
        "What updates the page as one edits?",
        "How can one deploy a Next.js app?",
      ],
    },
    {
      id: 2,
      sender: "Emily Davis",
      time: "2 days ago",
      title: "Re: Question about Budget",
      text: "",
      isUser: false,
      suggestions: [
        "What updates the page as one edits?",
        "How can one deploy a Next.js app?",
      ],
    },
    {
      id: 3,
      sender: "Michael Wilson",
      time: "1 week ago",
      title: "Important Announcement",
      text: "",
      isUser: false,
      suggestions: [],
    },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: "You", // Tin nhắn của người dùng
          time: new Date().toLocaleString(),
          title: "",
          text: input,
          isUser: true,
        },
      ]);
      setInput("");
      // Thêm logic trả lời AI (giả lập) sau 1 giây
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "NotebookLM",
            time: new Date().toLocaleString(),
            title: `Re: ${input}`,
            text: `This is a response to: "${input}" - NotebookLM can be inaccurate; please double check its responses.`,
            isUser: false,
            suggestions: [
              "What updates the page as one edits?",
              "How can one deploy a Next.js app?",
            ],
          },
        ]);
      }, 1000);
    }
  };

  // Cuộn chat xuống tin nhắn mới nhất khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSubmit(new Event("submit") as any); // Giả lập submit form
  };

  const charCount = input.length;

  return (
    <MainContent>
      <div className="p-4 overflow-hidden">
        <div className="flex flex-col bg-background border rounded-lg shadow-lg h-[calc(100vh-100px)]">
          {/* Header */}

          {/* Khu vực chat với scroll */}

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-white  mb-4 "
          >
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl text-purple-600">⚛️</span>{" "}
              {/* Logo Next.js */}
              <h1 className="text-2xl font-bold">
                Next.js Project: Getting Started and App Structure
              </h1>
              <button className="ml-auto text-gray-500 hover:text-gray-700">
                ↻ Refresh
              </button>
            </div>

            {/* Nội dung giới thiệu */}
            <p className="text-gray-700 mb-6">
              1 source
              <br />
              This text introduces a Next.js project. The provided instructions
              explain how to start a development server and edit the project's
              main page, which will automatically update. It highlights the use
              of a specific technology for font optimization. The documentation
              also offers resources for learning more about Next.js, including
              official documentation, tutorials, and its GitHub repository.
              Finally, it suggests Vercel as the easiest platform for deployment
              and describes a suggested file structure.
            </p>

            {/* Nút hành động */}
            <div className="flex space-x-4 mb-6">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <FaSave className="text-yellow-500" />
                <span>Save to note</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <FaStickyNote className="text-yellow-500" />
                <span>Add note</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <FaVolumeUp className="text-blue-500" />
                <span>Audio Overview</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600">
                <FaFileAlt className="text-white" />
                <span>Briefing doc</span>
              </button>
            </div>
            {messages.map((message) => (
              <div key={message.id} className="mb-4 border-b pb-4">
                {!message.isUser && (
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{message.sender}</span>
                      <span className="text-gray-500 text-sm">
                        {message.time}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">1 source</span>
                  </div>
                )}
                {message.title && (
                  <h3 className="font-semibold mb-2">{message.title}</h3>
                )}
                {message.text && (
                  <p
                    className={`text-gray-700 ${
                      message.isUser ? "text-right" : "text-left"
                    }`}
                  >
                    {message.text}
                  </p>
                )}
                {!message.isUser &&
                  message.suggestions &&
                  message.suggestions.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 text-blue-500 flex items-center space-x-2"
                        >
                          <span>{suggestion}</span>
                          <span>➔</span>
                        </button>
                      ))}
                    </div>
                  )}
                {!message.isUser && (
                  <div className="flex space-x-2 mt-2">
                    <button className="flex items-center space-x-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                      <FaSave className="text-gray-500" />
                      <span className="text-gray-500 text-sm">
                        Save to note
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                      <span className="text-gray-500 text-sm">...</span>
                    </button>
                    <button className="flex items-center space-x-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                      <span className="text-gray-500 text-sm">👍</span>
                    </button>
                    <button className="flex items-center space-x-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
                      <span className="text-gray-500 text-sm">👎</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Phần footer cố định (input chat, gợi ý, thông báo) */}
          <div className=" bg-white p-4 border-t shadow-lg">
            <form onSubmit={handleSubmit} className="relative mb-4">
              <div className="relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Start typing..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[40px] max-h-[200px] pr-16"
                  rows={1} // Bắt đầu với 1 dòng, tự động mở rộng
                  onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    e.target.style.height = "auto"; // Reset chiều cao
                    e.target.style.height = `${e.target.scrollHeight}px`; // Tự động mở rộng chiều cao
                  }}
                />
                <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  1 source
                </span>
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={(e) => handleSubmit(e as any)}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Gợi ý câu hỏi */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() =>
                  handleSuggestionClick(
                    "Where does one place Next.js UI components?"
                  )
                }
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <span>Where does one place Next.js UI components?</span>
                <span className="text-blue-500">➔</span>
              </button>
              <button
                onClick={() =>
                  handleSuggestionClick("What updates the page as one edits?")
                }
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <span>What updates the page as one edits?</span>
                <span className="text-blue-500">➔</span>
              </button>
              <button
                onClick={() =>
                  handleSuggestionClick("How can one deploy a Next.js app?")
                }
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <span>How can one deploy a Next.js app?</span>
                <span className="text-blue-500">➔</span>
              </button>
            </div>

            {/* Thông báo */}
            <p className="text-sm text-gray-500">
              NotebookLM can be inaccurate; please double check its responses.
            </p>
          </div>
        </div>
      </div>
    </MainContent>
  );
};

export default ChatHomeForm;
