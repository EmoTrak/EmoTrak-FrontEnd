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
    // console.log("onSuccess");
  },
});

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", {
      scope: "/",
    });
  });

  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener(
    "beforeinstallprompt",
    (event: BeforeInstallPromptEvent) => {
      // 이벤트를 중단하여 기본 설치 팝업이 표시되지 않도록 합니다.
      event.preventDefault();

      // deferredPrompt 객체를 저장하여 나중에 설치 알림을 표시합니다.
      deferredPrompt = event;

      // 사용자에게 설치 알림을 표시하는 UI를 추가합니다.
      // 예를 들어, "Add to Home Screen" 버튼을 화면에 표시할 수 있습니다.
      // ...
      if (
        window.confirm(
          "홈 화면에 추가해서 일기를 매일 쓸 수 있어요! 추가하시겠어요?"
        )
      ) {
        // 사용자가 "확인"을 클릭하면 설치 알림을 표시합니다.
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            alert("감사합니다. 매일 감정을 기록해보세요!");
          }
          deferredPrompt = null;
        });
      } else {
        deferredPrompt = null;
      }
    }
  );
}

reportWebVitals();
