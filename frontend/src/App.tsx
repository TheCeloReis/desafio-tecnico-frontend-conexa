import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./lib/auth-context";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
