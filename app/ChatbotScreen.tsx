import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PaperClipIcon, PaperAirplaneIcon, PencilIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { Pencil, BotMessageSquare , Paperclip, SendHorizontal } from 'lucide-react';
import "./styles/ChatbotScreen.css";

type ChatMessage = {
  text: string;
  sender: "user" | "bot";
  time: string;
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
  const [attachedFile, setAttachedFile] = useState<{uri: string; name: string; type: string;} | null>(null);
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

 /* -------------------- FILE -------------------- */
const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;

  const file = e.target.files[0];
  setAttachedFile({
    uri: URL.createObjectURL(file), // 🔹 crea un URI temporal para mostrar el archivo
    name: file.name,
    type: file.type,
  });
};

/* -------------------- SEND -------------------- */
const handleSendMessage = async () => {
  if (!userInput.trim()) return;

  // Agregar mensaje del usuario
  setMessages((prev) => [
    ...prev,
    {
      text: attachedFile
        ? `${userInput}\n📎 ${attachedFile.name}`
        : userInput,
      sender: "user",
      time: getCurrentTime(),
    },
  ]);

  setUserInput("");
  setAttachedFile(null);
  await sleep(500);

  // Mensaje de bot "typing"
  setMessages((prev) => [...prev, { text: "...", sender: "bot", typing: true, time: getCurrentTime(), }]);

  const startTime = Date.now();
  const botResponse = await getBotResponse(userInput, attachedFile);
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
const getBotResponse = async (
  userMessage: string,
  file?: { uri: string; name: string; type: string; rawFile?: File } | null
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("message", userMessage);
    formData.append("role", String(user.role));

    if (file?.rawFile) {
      formData.append("file", file.rawFile);
    }

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
        <button className="new-chat-button" onClick={() => console.log("Nuevo chat")}>
            <Pencil className="icon-svg" />
            <span>Nuevo chat</span>
        </button>

        <h4>Conversaciones</h4>
        <div className="chat-list-scroll">
          <div className="chat-item">📁 Emily Johnson (+1 415 555 0198) · What is the contact email?</div>
          <div className="chat-item">📁 Pierre Laurent (+33 6 12 34 56 78) · Où se situe l'université?</div>
          <div className="chat-item">📁 Juan Pérez (+34 612 345 678) · Precio curso inglés</div>
          <div className="chat-item">📁 Marie Dupont (+33 6 45 78 91 23) · Cours de français</div>
          <div className="chat-item">📁 Ahmed Benali (+212 612 987 654) · Visa requirements</div>
          <div className="chat-item">📁 Laura Gómez (+34 699 112 233) · Horarios del Centro</div>
          <div className="chat-item">📁 John Smith (+44 7700 900123) · English summer course</div>
          <div className="chat-item">📁 Sofía Martínez (+34 622 445 889) · Matrícula reducida</div>
          <div className="chat-item">📁 Paul Martin (+33 7 88 55 44 11) · Paiement et inscription</div>
          <div className="chat-item">📁 Carlos Núñez (+34 655 778 990) · Cursos intensivos</div>
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
            {attachedFile && (
              <div className="attachment">
                📎 {attachedFile.name}
                <button onClick={() => setAttachedFile(null)}>✖</button>
              </div>
            )}

            <div className="input-row">
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe un mensaje..."
              />
              <label className="icon-button">
                <Paperclip className="icon-svg" />
                <input type="file" hidden onChange={pickFile} />
              </label>

              <button className="icon-button" onClick={handleSendMessage}>
                <SendHorizontal className="icon-svg" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}