import { render, screen, act } from "../../test-utils";
import Home from "../Home";
import { server } from "../../mocks/server";
import {
  allConsultations,
  emptyConsultations,
  errorConsultations,
} from "../../mocks/handlers";

describe("Home", () => {
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
