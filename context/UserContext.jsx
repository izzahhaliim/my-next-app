"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Menyimpan user yang menjadi favorite
  const [favorites, setFavorites] = useState([]);

  // Menambah / menghapus favorite
  function toggleFavorite(user) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === user.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== user.id
        );
      }

      return [...currentFavorites, user];
    });
  }

  const value = {
    name,
    email,
    message,
    submitted,

    setName,
    setEmail,
    setMessage,
    setSubmitted,

    favorites,
    toggleFavorite,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser harus dipakai di dalam <UserProvider>");
  }

  return context;
}