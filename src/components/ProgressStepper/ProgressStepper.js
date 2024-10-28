// StepProgressBar.js
import React from "react";
import "./ProgressStepper.css";
import { FaStar } from "react-icons/fa";

const ProgressStepper = ({ currentStep }) => {
  const totalSteps = 7;

  // Calculate the width percentage of the progress bar based on the current step
  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar-background">
        <div
          className="progress-bar"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`step ${currentStep > index ? "completed" : ""} ${
            currentStep === index + 1 ? "current" : ""
          } ${index === totalSteps - 1 ? "last-step" : ""}`}
        >
          {index === totalSteps - 1 && (
            <FaStar size={25} color="#F4C46B"/>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;
