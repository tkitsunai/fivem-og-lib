import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>OG Create APP!</h1>
      <h2>og-gpshub</h2>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);