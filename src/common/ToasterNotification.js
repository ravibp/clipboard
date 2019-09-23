import React from "react";
import toaster from "toasted-notes";
import "./ToasterNotification.scss";

function showPopupNotification(message, notificationStylesClass) {
  const notificationDiv = (
    <div className={notificationStylesClass + " notification-popup"}>
      {message}
    </div>
  );
  toaster.notify(notificationDiv, {
    duration: 2000
  });
}

export default showPopupNotification;
