import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminPage from "./screens/AdminPage";



import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<AdminPage/>} />
          </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
