import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { OverlayProvider } from "react-aria";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <OverlayProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </OverlayProvider>
);

export * from "@testing-library/react";

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { ...options, wrapper: AllProviders });

export { customRender as render };
