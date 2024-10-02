/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CloseIcon, ValidIcon } from "../../../svg";

const Ringing = ({ call, setCall, answerCall, endCall }) => {
  const { name, picture } = call;
  const [timer, setTimer] = useState(0);
  let interval;
  const handleTimer = () => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };
  useEffect(() => {
    if (timer <= 10) {
      handleTimer();
    } else {
      setCall({ ...call, receiveingCall: false });
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      {/* container */}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/* call info */}
        <div className="flex items-center gap-x-2">
          <img src={picture} alt={name} className="w-28 h-28 rounded-full " />
          <div>
            <h1 className="dark:text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2">whatsapp video...</span>
          </div>
        </div>
        {/* call actions */}
        <ul className="flex items-center gap-x-2">
          <li>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500"
              onClick={endCall}
            >
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500"
              onClick={answerCall}
            >
              <ValidIcon className="fill-white w-6 mt-1.5" />
            </button>
          </li>
        </ul>
      </div>
      {/* ringtone */}
      <audio src="../../../../audio/ringtone.mp3" autoPlay loop></audio>
    </div>
  );
};

export default Ringing;
