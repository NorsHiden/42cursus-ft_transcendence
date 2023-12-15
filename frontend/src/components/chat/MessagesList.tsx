import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelectedChannel } from '@context/Channel';
import { getDms } from './utils';
import DmElement from './DmElement.tsx';

const MessagesList: React.FC = () => {
  const { Dms, setDms, LogedUser } = useSelectedChannel();

  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>();
  const [loading, setLoading] = useState(false);

  const lastMatchElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageRef.current += 1;
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    getDms(pageRef.current, setDms, setHasMore, setLoading);
  }, [pageRef.current]);

  return (
    <ul
      id="chat-list"
      className=" grid row-start-3 overflow-auto gap-4 scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-darkGray"
    >
      {Dms?.map((dm,index) => (
        <NavLink
          key={index}
          to={`/chat/messages/${dm.id}`}
          className={({ isActive }) => {
            return `flex items-center justify-between rounded-xl mr-4 ml-4 h-[68px] hover:bg-CharcoalGray hover:p-4 ${
              isActive ? 'bg-CharcoalGray p-4' : ''
            }`;
          }}
        >
          <DmElement
            name={
              dm.members[0].userId == LogedUser.id
                ? dm.members[1].displayName
                : dm.members[0].displayName
            }
            avatar={
              dm.members[0].userId == LogedUser.id ? dm.members[1].avatar : dm.members[0].avatar
            }
            presence={
              dm.members[0].userId == LogedUser.id ? dm.members[1].presence : dm.members[0].presence
            }
          />
        </NavLink>
      ))}
      {loading
        ? Array.from({ length: 10 }).map((_,i) => (
            <li key={i} className="flex items-center justify-between rounded-xl mr-4 ml-4 h-[68px]">
              <div className="flex  items-center gap-4 animate-pulse bg-darkGray">
                <div className="rounded-2xl h-[52px] w-[52px] animate-pulse bg-darkGray" />
                <div className="w-[118px]  h-[52px] animate-pulse bg-darkGray"></div>
              </div>
            </li>
          ))
        : ''}
      {hasMore ? <div ref={lastMatchElementRef} className=" h-[25px] w-[350px]" /> : ''}
    </ul>
  );
};

export default MessagesList;
