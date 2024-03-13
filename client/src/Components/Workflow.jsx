import React from "react";
import { useSelector } from "react-redux";
import { privateRequest } from "../utils/useFetch";
import StepperComponent from "./Stepper";

const Workflow = ({ id, userRecord, setUserRecord }) => {
  const steps = [
    "User Details",
    "Upload Document",
    "Acceptance",
    "Download PDF",
  ];

  const { stepsCompleted, comments } = userRecord;
  const user = useSelector((state) => state.user);
  const makeRequest = privateRequest(user.accessToken, user.refreshToken);
  // const stepsCompleted = 2;
  return (
    <div className=" flex flex-col justify-center col-span-3 shadow-lg p-8 gap-10">
      <StepperComponent steps={steps} stepsCompleted={stepsCompleted || 0} />
      <div className="w-full mt-10 flex justify-around">
        <button
          onClick={() => {
            makeRequest.put("/reservation/approve/" + id, { comments });
          }}
          className="border rounded-lg p-3 px-4 bg-green-400 hover:bg-green-500"
        >
          Approve
        </button>
        <button
          onClick={() => {
            makeRequest.put("/reservation/reject/" + id, { comments });
          }}
          className="border rounded-lg p-3 px-4 bg-red-400 hover:bg-red-500"
        >
          Reject
        </button>
        <button
          onClick={() => {
            makeRequest.put("/reservation/hold/" + id, { comments });
          }}
          className="border rounded-lg p-3 px-4 bg-yellow-400 hover:bg-yellow-500"
        >
          Review
        </button>
      </div>
      <div className="w-full">
        <textarea
          className="w-full p-2"
          rows={5}
          value={comments || ""}
          onChange={(e) =>
            setUserRecord({ ...userRecord, comments: e.target.value })
          }
          placeholder="Write any review or comments"
        ></textarea>
      </div>
    </div>
  );
};

export default Workflow;
