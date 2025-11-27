"use client";

import React, { useState } from "react";
import cadastroAction from "./actions";

export default function CadastroForm() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      username: String(formData.get("username")),
      email: String(formData.get("email")),
      password: String(formData.get("password"))
    };

    const result = await cadastroAction(data);
    if (result) {
      setError(result);
    }
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Nome</label>
      <input type="text" id="username" name="username" required />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Senha</label>
      <input type="password" id="password" name="password" required />

      <button type="submit" disabled={isSubmitting}>
        {
          isSubmitting ? "Entrando..." : "Iniciar sessão"
          // OPERADOR TERNÁRIO
          // condição ? True : False

          // se a variavel for true, retorna Entrando..., se for false, retorna iniciar sessão
        }
      </button>
      {
        error && <p>{error}</p>
        // SHORT-CIRCUIT
        // retorna <p>{error}</p>, CASO error não seja um Falsy Value
        // Falsy Value: "", 0, false, null, undefined, NaN 

        // se erro existe, renderiza o <p>, se não existe, nada é renderizado
        }
    </form>
  );
}