import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import ChatbotScreen from "./ChatbotScreen";
import "./styles/index.css";
import { Image, View } from "react-native";
import logotipo from "./logotipo.jpeg";

type User = {
  role: string;
  name: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: string, name: string) => {
    setUser({ role, name });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // 🔐 Si no hay usuario → LOGIN
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // ✅ Usuario loggeado
  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-left">
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20, // la mitad del tamaño
              overflow: "hidden",
            }}
          >
            <Image
              source={logotipo}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />
          </View>
        </div>

        <div className="header-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="app-content">
        {/* Aquí irá el Chatbot */}
        <ChatbotScreen user={user} />
      </main>
    </div>
  );
}