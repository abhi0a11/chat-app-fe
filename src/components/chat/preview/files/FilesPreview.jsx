import React, { useRef, useState } from "react";
import { Input, FileViewer, Header, HandleAndSend } from ".";

const FilesPreview = () => {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const closeRef = useRef(null);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* container */}
      <div className="w-full flex flex-col items-center">
        {/* header */}
        <Header activeIndex={activeIndex} closeRef={closeRef} />
        {/* viewing selecting file */}
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center">
          {/* message input */}
          <Input message={message} setMessage={setMessage} />
          {/* handle and send */}
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
            closeRef={closeRef}
          />
        </div>
      </div>
    </div>
  );
};

export default FilesPreview;
