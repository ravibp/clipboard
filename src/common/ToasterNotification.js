import React from "react";
import "toasted-notes/src/styles.css"; // optional styles
import toaster from "toasted-notes";

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
