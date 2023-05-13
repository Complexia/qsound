import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
const Status = ({ status }) => {
  return status == false ? (
    <div className="px-3 py-2 bg-red-500 font-semibold rounded h-[40px] w-[150px] flex justify-center">
      <FontAwesomeIcon icon={faTimesCircle} width={25} height={25} />
      <p className="ml-2  text-md">Unavailable</p>
    </div>
  ) : (
    <div className="px-3 py-2 bg-green-500 font-semibold rounded h-[40px] flex justify-center w-[150px]">
      <FontAwesomeIcon icon={faCheckCircle} width={25} height={25} />
      <p className="ml-2 text-md">Satisfied</p>
    </div>
  );
};

export default Status;
