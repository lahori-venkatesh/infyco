"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { mentorsData } from "@/lib/mentors-data";

interface Message {
  id: string;
  text: string;
  sender: "user" | "mentor";
  timestamp: Date;
}

export function RandomMentorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [randomMentor] = useState(() => 
    mentorsData[Math.floor(Math.random() * mentorsData.length)]
  );

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: "1",
        text: `Hi! I'm ${randomMentor.name}, a ${randomMentor.profession} at ${randomMentor.company}. How can I help you today?`,
        sender: "mentor",
        timestamp: new Date(),
      },
    ]);
  }, [randomMentor]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate mentor response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I understand your concern. Here's what I suggest...",
        "Based on my experience, I would recommend...",
        "Let me share some insights about this...",
      ];
      
      const mentorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "mentor",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, mentorResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center space-x-4 p-4 border-b">
        <Avatar>
          <AvatarImage src={randomMentor.image} alt={randomMentor.name} />
          <AvatarFallback>{randomMentor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{randomMentor.name}</h3>
          <p className="text-sm text-muted-foreground">{randomMentor.profession}</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}