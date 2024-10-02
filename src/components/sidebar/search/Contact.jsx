import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_open_conversation } from "../../../features/chatSlice";
import SocketContext from "../../../context/SocketContext";

const Contact = ({ contact, setSearchResults, socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    receiver_id: contact._id,
    token,
  };
  const openConversation = async () => {
    let newConvo = await dispatch(create_open_conversation(values));
    socket.emit("join conversation", newConvo.payload._id);
    setSearchResults([]);
  };
  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* container */}
      <div className="flex items-center gap-x-3 py-[10px] ">
        {/* contact infos */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture  */}
          <div className="relative h-[50px] min-w-[50px] rounded-full overflow-hidden">
            <img
              src={contact.picture}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* conversation name and message */}
          <div className="flex w-full flex-col">
            {/* conversation name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {contact.name}
            </h1>
            {/* conversation status */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                  {/* convo.latestMessage.message- this might get error as some conversations might not have latest message */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

const ContactWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Contact {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ContactWithContext;
