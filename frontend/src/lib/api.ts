import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

type PostLoginResponse = {
  token: string;
  name: string;
};

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const { data } = await api.post<PostLoginResponse>("/login", {
      email,
      password,
    });

    return data;
  } catch (error: any) {
    if ((error as AxiosError).response?.status === 401) {
      throw new Error("E-mail ou senha inválidos");
    }

    throw new Error("Erro desconhecido, tente novamente");
  }
}
