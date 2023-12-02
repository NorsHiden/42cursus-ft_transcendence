import React from 'react';

const ChatMainPannel: React.FC = () => {
  return (
    <>
      <div
        id="chat-main-pannel-header"
        className="flex justify-between bg-gradyDarkShade rounded-xl h-16 px-8"
      >
        <div id="chat-main-pannel-header-avatar" className="center gap-4">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
          <h1 className="text-white font-poppoins">DISPLAYNAME</h1>
        </div>
        <div id="chat-main-pannel-header-status" className=""></div>
      </div>
      <div id="chat-main-pannel-body" className="bg-lightBlack rounded-xl h-16"></div>
      <div id="chat-main-pannel-footer" className="bg-lightBlack rounded-xl h-16"></div>
    </>
  );
};

export default ChatMainPannel;
