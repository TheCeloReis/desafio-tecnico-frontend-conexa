import axios, { AxiosError } from "axios";
import { getToken } from "./auth-context";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
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

type ConsultationType = {
  id: number;
  patientId: number;
  date: string;
  patient: PatientType;
};

type PatientType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type GetConsultationsResponse = ConsultationType[];

export async function getConsultations(): Promise<GetConsultationsResponse> {
  try {
    const { data } = await api.get<GetConsultationsResponse>(
      "/consultations?_expand=patient"
    );

    return data;
  } catch (error: any) {
    if ((error as AxiosError).response?.status === 403) {
      throw new Error("Você não tem permissão para acessar essa página");
    }

    throw new Error("Erro desconhecido, tente novamente");
  }
}
