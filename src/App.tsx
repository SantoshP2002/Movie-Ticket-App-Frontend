import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./styles/global.style.css";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full min-h-screen text-primary dark:bg-black overflow-x-hidden">
        <div className="max-w-full w-full h-full mx-auto">
          <Toaster position="bottom-center" reverseOrder={false} />

          <RouterProvider router={router} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
