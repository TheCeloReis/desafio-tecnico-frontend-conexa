import React from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { MdOutlineHelpOutline } from "react-icons/md";
import useForm from "../lib/useForm";
import { reValidEmail } from "../lib/regex";

function Login(): JSX.Element {
  const { register, formState, isValid, validate } = useForm();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate(["email", "password"]);

    if (isValid) {
      console.log("formState :>> ", formState);
    }
  };

  return (
    <div>
      <header className="h-14 shadow-md w-full flex items-center justify-center">
        <img src="/logo.svg" alt="Conexa Saúde" />
      </header>

      <div className="sm:flex sm:items-center sm:justify-around sm:h-[calc(100vh-56px)] sm:pb-64">
        <div className="space-y-16 mb-11 sm:mb-0">
          <h1 className="text-center text-3xl sm:text-6xl text-primary-dark font-bold mt-9">
            Faça Login
          </h1>

          <img
            className="hidden sm:block"
            src="/login-illustration.svg"
            alt=""
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full px-6 sm:max-w-[235px] sm:px-0"
        >
          <div className="space-y-3 mb-10">
            <TextField
              label="E-mail"
              placeholder="Digite seu e-mail"
              type="email"
              {...register("email", {
                isRequired: true,
                validate: (value) => {
                  if (!value) {
                    return "E-mail é obrigatório";
                  }

                  if (!reValidEmail.test(value)) {
                    return "E-mail inválido";
                  }

                  return false;
                },
              })}
            />

            <TextField
              label={
                <span className="inline-flex items-center">
                  Senha
                  <MdOutlineHelpOutline
                    className="text-base text-gray-medium ml-2"
                    title="Senha disponibilizada pela Conexa Saúde"
                  />
                </span>
              }
              placeholder="Digite sua senha"
              type="password"
              {...register("password", {
                isRequired: true,
                validate: (value) => {
                  if (!value || !value.trim()) {
                    return "Senha é obrigatória";
                  }
                  if (value.length < 6) {
                    return "A senha deve ter no mínimo 8 caracteres";
                  }

                  return false;
                },
              })}
            />
          </div>

          <Button isDisabled={!isValid} fullWidth type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
