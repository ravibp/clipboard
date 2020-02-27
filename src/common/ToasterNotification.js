import React from "react";
import toaster from "toasted-notes";
import "./ToasterNotification.scss";

function showPopupNotification(
  message,
  notificationStylesClass,
) {
  const notificationDiv = (
    <div className={notificationStylesClass + " notification-popup"}>
      {message}
    </div>
  );
  toaster.notify(notificationDiv, {
    duration: 1000
  });
}
// function highlightOperationOnText(notificationStylesClass, textID) {
//   if (textID) {
//     let animation = "sucessAnimation 1s";
//     if (notificationStylesClass === "notify-delete") {
//       animation = "deleteAnimation 1s";
//     }
//     const id = textID;
//     document.getElementById(id).parentElement.style.animation = animation;
//     setTimeout(() => {
//       document.getElementById(id).parentElement.style.animation = "";
//     }, 1000);
//   }
// }

export default showPopupNotification;
