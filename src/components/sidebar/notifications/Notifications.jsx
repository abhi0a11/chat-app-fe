import React, { useState } from "react";
import { ArrowIcon, CloseIcon, NotificationIcon } from "../../../svg";

export default function Notifications() {
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);

  const handleNotification = () => {
    setIsNotificationVisible(false);
  };

  return (
    <>
      {isNotificationVisible && (
        <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px]">
          {/* container */}
          <div className="w-full flex items-center justify-between">
            {/* left */}
            <div className="item-center flex gap-x-4">
              <div>
                <NotificationIcon className="dark:fill-blue_1 cursor-pointer" />
              </div>
              <div className="flex flex-col">
                <span className="textPrimary">
                  Get notified of new messages
                </span>
                <span className="textSecondary mt-0.5 flex items-center gap-0.5">
                  Turn on Desktop Notifications
                  <ArrowIcon className="dark:fill-dark_svg_1 mt-1" />
                </span>
              </div>
            </div>
            {/* right */}
            <div onClick={handleNotification}>
              <CloseIcon className="dark:fill-dark_svg_2 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
