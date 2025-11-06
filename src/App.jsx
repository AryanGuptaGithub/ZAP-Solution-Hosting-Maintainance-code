// src/App.jsx
import Router from "./router/Router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Router />
    </>
  );
}
