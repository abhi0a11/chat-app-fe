import React from "react";
import { useSelector } from "react-redux";
import {
  CallIcon,
  DotsIcon,
  SearchLargeIcon,
  VideoCallIcon,
} from "../../../svg";
import { capitalize } from "../../../utils/string";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";

const ChatHeader = ({ online, callUser }) => {
  // online = true;
  const { activeConversation } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);
  // const { name, picture } = activeConversation;

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/* container */}
      <div className="w-full items-center flex justify-between">
        {/* left */}
        <div className="flex items-center gap-x-4">
          {/* conversation image */}
          <button className="btn">
            <img
              src={getConversationPicture(user, activeConversation.users)}
              alt={getConversationName(user, activeConversation.users)}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* conversation name and online status */}
          <div className="flex flex-col ">
            <h1 className="dark:text-white text-md font-bold ">
              {capitalize(
                getConversationName(user, activeConversation.users).split(
                  " "
                )[0]
              )}
            </h1>
            <span className="dark:text-dark_svg_2 text-xs">
              {online ? "online" : ""}
            </span>
          </div>
        </div>
        {/* right */}
        <ul className="flex items-center gap-x-2.5">
          <li onClick={() => callUser()}>
            <button className="btn">
              <VideoCallIcon />
            </button>
          </li>

          <li>
            <button className="btn">
              <CallIcon />
            </button>
          </li>
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
