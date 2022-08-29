import React from "react";
import { useAuth } from "../lib/auth-context";
import clsx from "clsx";
import Button from "./Button";

function Appbar() {
  const { logout, isLoggedIn, user } = useAuth();

  return (
    <header
      className={clsx(
        "h-14 shadow-md w-full flex items-center fixed top-0 left-0 z-20 bg-white",
        isLoggedIn ? "px-4 justify-between" : "justify-center"
      )}
    >
      <img src="/logo.svg" alt="Conexa Saúde" />

      {isLoggedIn && (
        <div className="flex items-center">
          <p className="text-gray-dark font-semibold mr-4 hidden sm:block">
            Olá, Dr. {user}
          </p>

          <Button variant="outlined" onPress={logout}>
            Sair
          </Button>
        </div>
      )}
    </header>
  );
}

export default Appbar;
