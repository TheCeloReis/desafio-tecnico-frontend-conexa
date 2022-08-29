import dayjs from "dayjs";
import React from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { Item } from "react-stately";
import {
  getPatients,
  postConsultation,
  GetConsultationsResponse,
} from "../lib/api";
import useForm from "../lib/useForm";
import AlertDialog from "./AlertDialog";
import Button from "./Button";
import ModalDialog from "./Modal";
import Select from "./Select";
import TextField from "./TextField";

type NewConsultationType = {
  patientId: number;
  date: string;
};

type PropsType = {
  onClose: () => void;
};

function CreateConsultationModal(props: PropsType) {
  const queryClient = useQueryClient();
  const [feedback, setFeedback] = React.useState({
    show: false,
    variant: "success" as "error" | "success",
    title: "",
    description: "",
  });

  const { register, formState, validate, isValid } = useForm();

  const {
    data,
    isLoading: isLoadingPatients,
    isError: isErrorPatients,
  } = useQuery("patients", getPatients);
  const { mutate, isLoading: isLoadingCreateConsultation } = useMutation(
    async (consultation: NewConsultationType) => {
      return await postConsultation(consultation.patientId, consultation.date);
    }
  );

  const onSubmit = async () => {
    const isValid = validate(["patient", "date"]);

    const consultationDatetime = new Date(
      `${formState.date} ${formState.time}`
    ).toString();

    if (!isValid) {
      return;
    }

    mutate(
      { patientId: +formState.patient, date: consultationDatetime },
      {
        onSuccess: (consultation) => {
          const consultations = queryClient.getQueryData(
            "consultations"
          ) as GetConsultationsResponse;

          consultation.patient = data!.find(
            (patient) => patient.id === consultation.patientId
          )!;

          consultations.push(consultation);

          consultations
            .sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            .reverse();

          queryClient.setQueryData("consultations", consultations);

          setFeedback({
            show: true,
            variant: "success",
            title: "Consulta criada com sucesso",
            description: `A consulta foi criada com sucesso para o dia ${dayjs(
              consultation?.date
            ).format("DD/MM/YYYY à[s] HH:mm")}.`,
          });
        },

        onError: (error: any) => {
          setFeedback({
            show: true,
            variant: "error",
            title: "Erro ao criar consulta",
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <>
      <ModalDialog
        title="Agendar consulta"
        isOpen
        onClose={() => props.onClose()}
        isDismissable
      >
        <form className="flex flex-col">
          <Select
            label="Paciente"
            placeholder={
              isLoadingPatients
                ? "Carregando..."
                : isErrorPatients
                ? "Erro ao carregar"
                : "Selecione um paciente"
            }
            isDisabled={isLoadingPatients}
            {...register("patient", { isRequired: true })}
          >
            {(data ?? []).map((patient) => {
              const fullName = `${patient.first_name} ${patient.last_name}`;

              return (
                <Item key={patient.id.toString()} textValue={fullName}>
                  {fullName}
                </Item>
              );
            })}
          </Select>

          <div className="grid sm:grid-cols-2 gap-4 mt-4 mb-8">
            <TextField
              label="Data"
              type="date"
              {...register("date", { isRequired: true })}
            />

            <TextField
              label="Horário"
              type="time"
              {...register("time", { isRequired: true })}
            />
          </div>

          <Button
            onPress={onSubmit}
            isDisabled={!isValid || isLoadingCreateConsultation}
          >
            Criar
          </Button>
        </form>
      </ModalDialog>

      {feedback.show && (
        <AlertDialog
          isOpen
          confirmText="Entendi"
          isDismissable
          onClose={() => {
            setFeedback((s) => ({ ...s, show: false }));
            if (feedback.variant === "success") {
              props.onClose();
            }
          }}
          {...feedback}
        />
      )}
    </>
  );
}

export default CreateConsultationModal;
