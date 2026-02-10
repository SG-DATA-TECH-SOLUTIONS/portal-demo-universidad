import React, { useState } from "react";
import "./styles/LoginScreen.css";
import { Image, View } from "react-native";
import logotipo from "./logotipo.jpeg";

interface Props {onLogin: (role: string, name: string) => void;}

export default function LoginScreen({ onLogin }: Props) {
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    const correctPassword = "admin123";

    if (password === correctPassword) {
      onLogin("admin", "Admin");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="login-container">
      <View
  style={{
    width: 160,
    height: 160,
    borderRadius: 80, // la mitad del tamaño
    overflow: "hidden",
    marginBottom: 20,
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

      <h1 className="title">Acceso</h1>

      <form
        style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center"}}
        onSubmit={(e) => {
          e.preventDefault();
          handleAdminLogin();
        }}
      >
        <input
          type="password"
          className="input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="button admin-button">
          Entrar
        </button>
      </form>
    </div>
  );
}