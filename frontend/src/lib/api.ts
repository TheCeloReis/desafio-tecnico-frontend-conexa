import axios, { AxiosError } from "axios";
import { getToken } from "./auth-context";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
    const { data, headers } = await api.post<PostLoginResponse>("/login", {
      email,
      password,
    });

    // If using the My JSON Server the token could be a hard coded string, since the server is not running auth.
    // This is just a code to make the example work with my deployed example
    if (new URL(headers.location).host === "my-json-server.typicode.com") {
      return {
        token: "123",
        name: "Gandalf",
      };
    }

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
  patient?: PatientType;
};

type PatientType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type GetConsultationsResponse = ConsultationType[];

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

export async function postConsultation(
  patientId: number,
  date: string
): Promise<ConsultationType> {
  try {
    const { data } = await api.post<ConsultationType>("/consultations", {
      patientId,
      date,
    });

    return data;
  } catch (error: any) {
    if ((error as AxiosError).response?.status === 403) {
      throw new Error("Você não tem permissão para acessar essa página");
    }

    throw new Error("Erro desconhecido, tente novamente");
  }
}

export async function getPatients(): Promise<PatientType[]> {
  try {
    const { data } = await api.get<PatientType[]>("/patients");

    return data;
  } catch (error: any) {
    if ((error as AxiosError).response?.status === 403) {
      throw new Error("Você não tem permissão para acessar essa página");
    }

    throw new Error("Erro desconhecido, tente novamente");
  }
}
