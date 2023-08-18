import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client

//   {
//   defaultOptions: {
//     queries: {
//       // You can set default stale time for all queries unless they have their own set.
//       staleTime: 60 * 1000 * 5,
//     },
//   },
// }

const root = ReactDOM.createRoot(document.getElementById("root"));

// Provide the client to your App by wrapping it with provider component.
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
