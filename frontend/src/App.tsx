import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/Layout";
import { AuthProvider } from "./lib/auth-context";
import AppRoutes from "./routes";
import { OverlayProvider } from "react-aria";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </OverlayProvider>
    </QueryClientProvider>
  );
}

export default App;
