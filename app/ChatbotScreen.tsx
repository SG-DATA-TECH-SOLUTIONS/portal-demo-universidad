import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PaperClipIcon, PaperAirplaneIcon, PencilIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { Pencil, BotMessageSquare , Paperclip, SendHorizontal } from 'lucide-react';
import { Image, View } from "react-native";
import avatar from "../assets/images/avatar.jpeg";
import "./styles/ChatbotScreen.css";

type ChatMessage = {
  text: string;
  sender: "user" | "bot";
  time?: string;
  typing?: boolean;
};

type Props = {
  user: {
    id?: string;
    role: string;
    name: string;
  };
};

export default function ChatbotScreen({ user }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState("");
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "¡Hola! ¿En qué puedo ayudarte hoy?", sender: "bot", time: getCurrentTime(), },
  ]);
  const isBotTyping = messages.some((m) => m.typing);

/* -------------------- SEND -------------------- */
const handleSendMessage = async () => {
  if (!userInput.trim()) return;

  // Agregar mensaje del usuario
  setMessages((prev) => [
    ...prev,
    {
      text: userInput,
      sender: "user",
      time: getCurrentTime(),
    },
  ]);

  setUserInput("");
  await sleep(500);

  // Mensaje de bot "typing"
  setMessages((prev) => [...prev, { text: "...", sender: "bot", typing: true }]);

  const startTime = Date.now();
  const botResponse = await getBotResponse(userInput);
  const elapsed = Date.now() - startTime;
  if (elapsed < 1500) await sleep(1500 - elapsed);

  setMessages((prev) => {
    const copy = [...prev];
    const typingIndex = copy.findIndex((m) => m.typing);
    if (typingIndex !== -1) {
      copy[typingIndex] = { text: botResponse, sender: "bot", time: getCurrentTime(), };
    }
    return copy;
  });
};

/* -------------------- BOT -------------------- */
const getBotResponse = async (userMessage: string,): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("message", userMessage);
    formData.append("role", String(user.role));

    // Ejemplo de llamada al backend
    const response = await fetch("https://agente-demo-git-467701688054.europe-west1.run.app/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          message: userMessage,
          include_sources: true,
        }),
      });

    if (!response.ok) throw new Error("Error en la respuesta del bot");

    const data = await response.json();
    return data.answer || data.response || "🤖 No he podido responder";
  } catch (error: any) {
    console.error("❌ Error:", error);
    return `❌ Error de conexión: ${error.message ?? String(error)}`;
  }
};

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!isBotTyping) return;
    const i = setInterval(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.typing
            ? { ...m, text: m.text.length >= 3 ? "." : m.text + "." }
            : m
        )
      );
    }, 300);
    return () => clearInterval(i);
  }, [isBotTyping]);

  /* -------------------- UI -------------------- */
  return (
    <div className="chatbot-container">
      {/* LEFT */}
      <aside className="chat-list">

        <h4>Conversaciones</h4>
        <div className="chat-list-scroll">
  <div className="chat-item">
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Image
        source={avatar}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
    </View><span>Emily Johnson</span>
  </div>

  <div className="chat-item">
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Image
        source={avatar}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
    <span>Pierre Laurent</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>Juan Pérez</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>Marie Dupont</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>Ahmed Benali</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>Laura Gómez</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>John Smith</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>Sofía Martínez</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>Paul Martin</span>
  </div>

  <div className="chat-item">
    <View style={{ width: 40, height: 40, borderRadius: 20, overflow: "hidden" }}>
      <Image source={avatar} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
    </View>
    <span>Carlos Núñez</span>
  </div>
</div>

      </aside>

      {/* CHAT */}
      <section className="chat">
        <h3> Demo FGULEM <BotMessageSquare  className="icon-svg" /></h3>

        <div className="chat-card">
          <div className="messages" ref={scrollRef}>
            <div className="message"> </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`message ${m.sender === "bot" ? "bot" : "user"}`}
              >
                <ReactMarkdown>{m.text}</ReactMarkdown>
                <div className="message-time">{m.time}</div>
              </div>
            ))}
          </div>

          <div className="input-area">
            <form
              className="input-row"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <textarea
  value={userInput}
  onChange={(e) => setUserInput(e.target.value)}
  placeholder="Escribe un mensaje..."
  rows={1}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }}
/>

              <button type="submit" className="icon-button">
                <SendHorizontal className="icon-svg" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}