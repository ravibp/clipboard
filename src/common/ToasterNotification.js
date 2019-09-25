import React from "react";
import toaster from "toasted-notes";
import "./ToasterNotification.scss";

function showPopupNotification(message, notificationStylesClass, textId, crudAction) {
  const notificationDiv = (
    <div className={notificationStylesClass + " notification-popup"}>
      {message}
    </div>
  );
  toaster.notify(notificationDiv, {
    duration: 2000
  });
  if(textId) {
    let animation = "sucessAnimation 2s";
    if(crudAction === "delete") {
      animation = "deleteAnimation 2s";
    }
    document.getElementById(
      "text-" + textId
    ).parentElement.style.animation = animation;
    setTimeout(() => {
      document.getElementById(
        "text-" + textId
      ).parentElement.style.animation = "";
    }, 1000);
  }
}

export default showPopupNotification;
