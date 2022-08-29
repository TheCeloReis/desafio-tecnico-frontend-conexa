import React from "react";
import Button from "./Button";

type PropsType = {
  consultations: {
    id: number;
    patientName: string;
    date: string;
  }[];
};

function ConsultationList(props: PropsType) {
  return (
    <div>
      <h2 className="font-bold text-gray-dark mb-9">
        {props.consultations.length} consultas agendadas
      </h2>

      <ul className="w-full space-y-8">
        {props.consultations.map((consultation) => (
          <li
            className="flex justify-between items-center"
            key={consultation.id}
          >
            <div className="flex flex-col w-[calc(100%-85px-16px)]">
              <span className="text-gray-dark truncate text-ellipsis">
                {consultation.patientName}
              </span>
              <span className="text-gray-dark">{consultation.date}</span>
            </div>

            <Button>Atender</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsultationList;
