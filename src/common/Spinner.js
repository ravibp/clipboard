import React from "react";
import "./Spinner.scss";

const SpinnerPage = () => {
  return (
    <div class="spinner-container">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default SpinnerPage;