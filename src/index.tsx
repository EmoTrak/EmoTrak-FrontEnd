import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (register: ServiceWorkerRegistration) => {
    // update
  },
  onSuccess: (register: ServiceWorkerRegistration) => {
    // success
    console.log("onSuccess");
  },
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.ts");
  });
}

// const registerServiceWorker = async () => {
//   if ("serviceWorker" in navigator) {
//     try {
//       const registration = await navigator.serviceWorker.register(
//         "/service-worker.ts",
//         {
//           scope: "/",
//         }
//       );
//       if (registration.installing) {
//         console.log("Service worker installing");
//       } else if (registration.waiting) {
//         console.log("Service worker installed");
//       } else if (registration.active) {
//         console.log("Service worker active");
//       }
//     } catch (error) {
//       console.error(`Registration failed with ${error}`);
//     }
//   }
// };
// registerServiceWorker();
reportWebVitals();
