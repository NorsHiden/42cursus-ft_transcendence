import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Card from '@components/Card';
import { NotificationType } from '@globalTypes/notification';
import CheckOutline from '@assets/novaIcons/outline/CheckOutline';
import CloseOutline from '@assets/novaIcons/outline/CloseOutline';

interface NotificationMessageProps {
  notificationMessage: NotificationType;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  notificationMessage,
  setNotifications,
}) => {
  const acceptFriendRequest = async () => {
    axios.post(`/api/friendlist/${notificationMessage.sender.id}/accept`).catch();
    axios.post(`/api/notification/${notificationMessage.id}/mark-read`).catch();
    notificationMessage.is_read = true;
    notificationMessage.status = 'accepted';
    setNotifications((notifications) =>
      notifications.map((notification) =>
        notification.id == notificationMessage.id ? notificationMessage : notification,
      ),
    );
  };

  const declineFriendRequest = async () => {
    axios.delete(`/api/friendlist/${notificationMessage.sender.id}`).catch();
    axios.post(`/api/notification/${notificationMessage.id}/mark-read`).catch();
    notificationMessage.is_read = true;
    notificationMessage.status = 'accepted';
    setNotifications((notifications) =>
      notifications.map((notification) =>
        notification.id == notificationMessage.id ? notificationMessage : notification,
      ),
    );
  };

  const avatar =
    notificationMessage.action == 'ACHIEVEMENT_UNLOCKED'
      ? notificationMessage.recipient?.profile?.avatar
      : notificationMessage.sender?.profile?.avatar;
  const displayName =
    notificationMessage.action == 'ACHIEVEMENT_UNLOCKED'
      ? notificationMessage.recipient.display_name
      : notificationMessage.sender.display_name;
  return (
    <div className="w-full" id="notification">
      <div className={'flex items-start gap-x-4'}>
        <img src={avatar} className="w-14 h-14 rounded-full empty" />
        <div className="flex flex-col">
          <p className="text-white font-bold">{displayName}</p>
          <p className={`text-sm w-52 ${notificationMessage.is_read ? 'text-gray' : 'text-white'}`}>
            {notificationMessage.description}
          </p>
          {notificationMessage.action != 'ACHIEVEMENT_UNLOCKED' &&
            notificationMessage.status == 'pending' && (
              <div className="flex items-center justify-center pt-2 gap-4">
                <Card
                  fill="#FE5821"
                  cut={32}
                  className={`w-24 h-8 text-white text-sm hover:brightness-110`}
                >
                  <button
                    className={`flex items-center w-full h-full gap-1 ${
                      notificationMessage.action == 'GAME_REQUEST' ? 'pl-4' : 'pl-2'
                    }`}
                    onClick={
                      notificationMessage.action == 'FRIEND_REQUEST'
                        ? acceptFriendRequest
                        : () => {}
                    }
                  >
                    <CheckOutline className="h-5 w-5" />
                    <p>{notificationMessage.action == 'GAME_REQUEST' ? 'Play' : 'Accept'}</p>
                  </button>
                </Card>
                <Card
                  fill="#2B1F24"
                  cut={32}
                  className={`w-24 h-8 text-red text-sm bg-opacity-25 hover:brightness-110`}
                >
                  <button
                    className="flex items-center pl-2 w-full h-full gap-1"
                    onClick={
                      notificationMessage.action == 'FRIEND_REQUEST'
                        ? declineFriendRequest
                        : () => {}
                    }
                  >
                    <CloseOutline className="h-5 w-5" />
                    <p>Decline</p>
                  </button>
                </Card>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const observer = useRef<
    | IntersectionObserver
    | {
        disconnect: () => void;
        observe: (arg0: Element) => void;
      }
  >();

  const getNotification = async (page: number) => {
    setIsLoading(true);
    const res = await axios.get(`/api/notification?page=${page}`);
    setNotifications((notifications) => [...notifications, ...res.data]);
    if (res.data.length < 10) setHasMore(false);
    setIsLoading(false);
  };

  const lastNotifElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => {
          getNotification(prevPage);
          return prevPage + 1;
        });
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    const event = new EventSource('/api/notification/sse-notifications');
    event.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((notifications) => [notification, ...notifications]);
    };

    return () => {
      event.close();
    };
  }, []);

  return (
    <div className="flex flex-col fixed top-0 max-lg:left-0 lg:absolute group lg:top-14 w-full h-0 lg:w-[26rem] p-8 bg-[#1E1F23] border-2 border-[#2C2D33] gap-8 z-20 rounded-lg pointer-events-none group-focus-within:h-[calc(100vh-5rem)] lg:group-focus-within:h-[22rem] opacity-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all">
      <div className="w-8 h-8 absolute bg-[#1E1F23] border-t-2 border-l-2 border-[#2C2D33] top-[-1.1rem] rounded-tl-lg right-1/2 rotate-45 translate-x-4" />
      <h1 className="text-xl text-white font-bold">Notifications</h1>
      <div className="flex flex-col gap-4 overflow-y-hidden group-hover:overflow-y-auto overflow-x-hidden scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-[#5E6069] scrollbar-mr-1">
        {notifications.map((notification, index) => (
          <div key={index} className="flex flex-col w-full gap-4">
            <NotificationMessage
              notificationMessage={notification as NotificationType}
              setNotifications={setNotifications}
            />
            <hr className="h-px text-darkGray" />
          </div>
        ))}
        {!isLoading && hasMore && <div ref={lastNotifElementRef}></div>}
        {(isLoading || hasMore) && (
          <div id="skeleton" className="flex items-center gap-4 animate-pulse">
            <div className="h-14 w-14 bg-darkGray rounded-full" />
            <div className="flex flex-col items-start gap-2">
              <div className="h-4 w-48 bg-darkGray rounded-full" />
              <div className="h-2 w-32 bg-darkGray rounded-full" />
            </div>
          </div>
        )}
        {!isLoading && notifications.length == 0 && (
          <div className="flex w-full h-full items-center justify-center">
            <p className="text-gray font-serif">Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
