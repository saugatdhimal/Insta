import React from "react";

function FallbackLoading() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <img src="/images/cameraLogo.png" alt="loading" />
    </div>
  );
}

export default FallbackLoading;