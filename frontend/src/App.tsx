import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./lib/auth-context";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
