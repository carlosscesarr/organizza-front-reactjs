import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.min.css";
import "./assets/css/tailwind.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";

//import reportWebVitals from './reportWebVitals';
import ThemedSuspense from "./components/ThemedSuspense";

ReactDOM.render(
  <React.StrictMode>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <App />
      </Suspense>
    </SidebarProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
