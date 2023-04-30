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
    if (Notification.permission === "default") {
      // 사용자에게 알림 권한 요청
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("알림 권한이 허용되었습니다.");
          // 알림 표시 코드를 여기에 추가
        } else {
          console.log("알림 권한이 거부되었습니다.");
        }
      });
    } else if (Notification.permission === "granted") {
      console.log("알림 권한이 이미 허용되어 있습니다.");
      // 알림 표시 코드를 여기에 추가
    } else {
      console.log("알림 권한이 거부되어 있습니다.");
    }
  },
  onSuccess: (register: ServiceWorkerRegistration) => {
    // success
    // console.log("onSuccess");
    // 알림 권한 확인
    if (Notification.permission === "default") {
      // 사용자에게 알림 권한 요청
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("알림 권한이 허용되었습니다.");
          // 알림 표시 코드를 여기에 추가
        } else {
          console.log("알림 권한이 거부되었습니다.");
        }
      });
    } else if (Notification.permission === "granted") {
      console.log("알림 권한이 이미 허용되어 있습니다.");
      // 알림 표시 코드를 여기에 추가
    } else {
      console.log("알림 권한이 거부되어 있습니다.");
    }
  },
});

reportWebVitals();
