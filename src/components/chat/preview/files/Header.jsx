import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../../../svg";
import { clearFiles } from "../../../../features/chatSlice";

const Header = ({ activeIndex, closeRef }) => {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.chat);
  const clearFilesHandler = () => {
    dispatch(clearFiles());
  };
  return (
    <div className="w-full">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* close icon / empty files */}
        <div
          className="translate-x-4 cursor-pointer"
          onClick={() => clearFilesHandler()}
          ref={closeRef}
        >
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        {/* file name */}
        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex]?.file?.name}
        </h1>
        {/* empty tag */}
        <span></span>
      </div>
    </div>
  );
};

export default Header;
