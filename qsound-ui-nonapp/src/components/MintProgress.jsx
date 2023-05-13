import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function MintProgress({ percentage, total = 20, amount = 8 }) {
  return (
    <div className="flex">
      <div style={{ width: "100px" }} className="ml-8">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={15}
          styles={{
            path: {
              stroke: `rgba(107, 33, 168)`,
              strokeLinecap: "round",
            },
            text: {
              fill: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      </div>
      <div className="my-auto ml-8 font-semibold text-2xl">
        {amount + " / " + total}
      </div>
    </div>
  );
}

export default MintProgress;
