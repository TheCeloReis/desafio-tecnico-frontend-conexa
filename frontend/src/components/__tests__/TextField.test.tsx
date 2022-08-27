import { render, screen, waitFor, act } from "@testing-library/react";
import TextField from "../TextField";

describe("TextField component", () => {
  it("Should render the label", () => {
    const label = Math.random().toString(36).substring(7);

    render(<TextField label={label} />);

    screen.getByLabelText(label);
  });

  it("Shows a button to show password when type is password", () => {
    render(<TextField label="senha" type="password" />);

    expect(screen.getByLabelText<HTMLInputElement>("senha").type).toBe(
      "password"
    );
    expect(screen.getByTitle("Mostrar senha")).toBeInTheDocument();
  });

  it("Doesn't show a button to show password when type is not password", () => {
    render(<TextField label="texto" type="text" />);

    expect(screen.getByLabelText<HTMLInputElement>("texto").type).toBe("text");
    expect(screen.queryByTitle("Mostrar senha")).not.toBeInTheDocument();
  });

  it("Toggles to view password", async () => {
    render(<TextField label="senha" type="password" />);

    const input = screen.getByLabelText<HTMLInputElement>("senha");
    expect(input.type).toBe("password");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const button = screen.getByRole("button");
      button.click();
    });

    await waitFor(() => {
      expect(input.type).toBe("text");
    });
  });
});
