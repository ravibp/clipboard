import React from "react";
import toaster from "toasted-notes";
import "common/ToasterNotification.scss";

function showPopupNotification(message, notificationStylesClass) {
  const notificationDiv = (
    <div className={notificationStylesClass + " notification-popup"}>
      {message}
    </div>
  );
  toaster.notify(notificationDiv, {
    duration: 1000
  });
}
export function highlightOperationOnText(textID, notificationStylesClass) {
  if (textID) {
    let animation = "";
    switch (notificationStylesClass) {
      case "notify-delete":
        animation = "deleteAnimation 1s";
        break;
      case "notify-create":
      case "notify-update":
      default:
        animation = "sucessAnimation 1s";
    }
    document.getElementById(textID).style.animation = animation;
    if (notificationStylesClass !== "notify-delete") {
      setTimeout(() => {
        document.getElementById(textID).style.animation = "";
      }, 1000);
    }
  }
}

export default showPopupNotification;
