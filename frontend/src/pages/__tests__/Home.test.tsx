import { render, screen, act, within } from "../../test-utils";
import Home from "../Home";
import { server } from "../../mocks/server";
import {
  allConsultations,
  allPatients,
  emptyConsultations,
  errorConsultations,
  postErrorConsultation,
  postSuccessfulConsultation,
} from "../../mocks/handlers";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  describe("When listing patients", () => {
    it("render a list of consultations", async () => {
      server.use(allConsultations);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(<Home />);
      });

      expect(screen.getByText("Carregando...")).toBeInTheDocument();

      expect(
        await screen.findByText(/4 consultas agendada/i)
      ).toBeInTheDocument();
    });

    it("renders a disclaimer when there are no consultations", async () => {
      server.use(emptyConsultations);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(<Home />);
      });

      expect(screen.getByText("Carregando...")).toBeInTheDocument();

      expect(await screen.findByText(/Não há nenhuma/i)).toBeInTheDocument();
    });

    it("renders an error when there is an error", async () => {
      server.use(errorConsultations);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(<Home />);
      });

      expect(screen.getByText("Carregando...")).toBeInTheDocument();

      expect(await screen.findByText(/Erro ao carregar/i)).toBeInTheDocument();
    });
  });

  describe("When creating a consultation", () => {
    beforeEach(() => {
      server.use(allConsultations);
    });

    const getModal = async () => {
      const consultation = screen.getByRole("button", {
        name: /agendar consulta/i,
      });
      userEvent.click(consultation);

      return await screen.findByTestId("modal");
    };

    it("opens a modal to fill the consultation", async () => {
      server.use(allPatients);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(<Home />);
      });

      const modal = await getModal();

      within(modal).getByRole("heading", { name: /agendar consulta/i });
      within(modal).getByLabelText(/data/i);
      within(modal).getByLabelText(/horário/i);
      within(modal).getByRole("button", { name: /criar/i });
    });

    it("renders select with a list of patients", async () => {
      server.use(allPatients);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(<Home />);
      });

      const modal = await getModal();

      const patientSelect = await screen.findByLabelText(
        /Selecione um paciente/i
      );

      userEvent.click(patientSelect);
      userEvent.type(patientSelect, "Enter");

      expect(
        await within(modal).findByText(/Frodo Baggins/i)
      ).toBeInTheDocument();
    });

    it("creates a consultation and renders it when successful", async () => {
      server.use(allPatients, postSuccessfulConsultation);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(<Home />);
      });

      const modal = await getModal();

      const dataField = within(modal).getByLabelText(/data/i);
      userEvent.type(dataField, "2020-01-01");

      const timeField = within(modal).getByLabelText(/horário/i);
      userEvent.type(timeField, "10:00");

      const patientSelect = await screen.findByLabelText(
        /Selecione um paciente/i
      );
      userEvent.click(patientSelect);
      userEvent.click(
        await within(modal).findByRole("option", { name: /Frodo Baggins/i })
      );

      expect(screen.getAllByRole("listitem")).toHaveLength(4);

      const createButton = within(modal).getByRole("button", {
        name: /criar/i,
      });
      userEvent.click(createButton);

      expect(
        await screen.findByText(/Consulta criada com sucesso/i)
      ).toBeInTheDocument();

      const okButton = screen.getByRole("button", { name: /entendi/i });
      userEvent.click(okButton);

      expect(screen.getAllByRole("listitem")).toHaveLength(5);
    });

    it("renders an error when there is an error", async () => {
      server.use(allPatients, postErrorConsultation);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(<Home />);
      });

      const modal = await getModal();

      const dataField = within(modal).getByLabelText(/data/i);
      userEvent.type(dataField, "2020-01-01");

      const timeField = within(modal).getByLabelText(/horário/i);
      userEvent.type(timeField, "10:00");

      const patientSelect = await screen.findByLabelText(
        /Selecione um paciente/i
      );
      userEvent.click(patientSelect);
      userEvent.click(
        await within(modal).findByRole("option", { name: /Frodo Baggins/i })
      );

      const createButton = within(modal).getByRole("button", {
        name: /criar/i,
      });
      userEvent.click(createButton);

      expect(
        await screen.findByText(/Erro ao criar consulta/i)
      ).toBeInTheDocument();

      const okButton = screen.getByRole("button", { name: /entendi/i });
      userEvent.click(okButton);
    });
  });
});
