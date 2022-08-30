import React from "react";
import { useQuery } from "react-query";
import { getConsultations } from "../lib/api";
import dayjs from "dayjs";
import ConsultationList from "../components/ConsultationList";
import BottomBar from "../components/BottomBar";

function Home() {
  const { data, error } = useQuery("consultations", async () => {
    const consultations = await getConsultations();

    consultations
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .reverse();

    return consultations;
  });

  return (
    <>
      <div className="pt-4 px-4 sm:pt-8 sm:px-8">
        <h1 className="text-2xl sm:text-5xl text-primary-dark font-bold mb-8 sm:mb-20">
          Consultas
        </h1>

        <div className="max-w-xl mx-auto">
          {error ? (
            <div className="flex flex-col items-center">
              <p className="text-center text-bold text-2xl sm:text-3xl mb-4 text-red-700 font-bold">
                Erro ao carregar
              </p>

              <img
                className="sm:w-[400px] mb-6"
                src="/listing-error.svg"
                alt="Erro"
              />

              <p className="mb-6 sm:w-80 text-gray-dark text-center">
                Parece que temos um problema no servidor, tente novamente mais
                tarde.
              </p>
            </div>
          ) : data?.length === 0 ? (
            <div className="relative w-full h-56 grid items-center">
              <img
                className="absolute bottom-0 left-0"
                src="/consultations-plant.svg"
                alt=""
              />

              <p className="font-bold text-gray-medium text-lg text-center">
                Não há nenhuma
                <br />
                consulta agendada
              </p>

              <img
                className="absolute top-0 right-0"
                src="/consultations-certificates.svg"
                alt=""
              />
            </div>
          ) : data && data?.length > 0 ? (
            <ConsultationList
              consultations={data.map((consultation) => ({
                id: consultation.id,
                patientName: `${consultation.patient?.first_name} ${consultation.patient?.last_name}`,
                date: dayjs(consultation.date).format("DD/MM/YYYY à[s] HH:mm"),
              }))}
            />
          ) : (
            <div>Carregando...</div>
          )}
        </div>
      </div>
      <BottomBar />
    </>
  );
}

export default Home;
