import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <div className="min-h-screen  h-max">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
