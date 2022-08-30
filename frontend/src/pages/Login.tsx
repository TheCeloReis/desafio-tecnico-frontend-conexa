import React from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { MdOutlineHelpOutline } from "react-icons/md";
import useForm from "../lib/useForm";
import { reValidEmail } from "../lib/regex";
import { useAuth } from "../lib/auth-context";
import clsx from "clsx";

function Login() {
  const { register, formState, isValid, validate } = useForm();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate(["email", "password"]);

    if (isValid) {
      try {
        setSubmitError(null);
        await login(formState.email, formState.password);
      } catch (error: any) {
        setSubmitError(error.message);
      }
    }
  };

  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-around sm:h-[calc(100vh-56px)] sm:pb-64">
        <div className="space-y-16 mb-11 sm:mb-0">
          <h1 className="text-center text-3xl sm:text-6xl text-primary-dark font-bold mt-9 font-montserrat">
            Faça Login
          </h1>

          <img
            className="hidden sm:block w-[338px] h-[266px]"
            src="/login-illustration.svg"
            alt=""
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full px-6 sm:max-w-[235px] sm:px-0"
        >
          <div
            className={clsx("space-y-3 ", {
              "mb-10": !submitError,
            })}
          >
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

          {submitError && (
            <div className="border-2 border-red-500 rounded-lg p-2 bg-red-50 text-sm text-red-800 my-4">
              {submitError}
            </div>
          )}

          <Button isDisabled={!isValid || isLoading} fullWidth type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
