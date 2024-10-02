import React, { useEffect } from "react";
import { ChatHeader } from "./header/index.js";
import { ChatMessages } from "./messages/index.js";
import { ChatActions } from "./actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chatSlice.js";
import { checkOnlineStatus } from "../../utils/chat.js";
import { FilesPreview } from "./preview/files";

const ChatContainer = ({ onlineUsers, typing, callUser }) => {
  const { activeConversation, files } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.user);
  const { token } = user;
  const dispatch = useDispatch();
  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* container */}
      <div>
        {/* chat header */}
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
          callUser={callUser}
        />
        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            {/*Chat messages*/}
            <ChatMessages typing={typing} />
            {/* Chat Actions */}
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
