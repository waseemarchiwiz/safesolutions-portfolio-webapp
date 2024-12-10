import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/lottie/loadanimate.json";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie
        animationData={loaderAnimation}
        loop
        style={{ height: "50px", width: "50px" }}
      />
    </div>
  );
};

export default LoadingPage;
