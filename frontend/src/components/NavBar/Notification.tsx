import CheckOutline from '@assets/novaIcons/outline/CheckOutline';
import CloseOutline from '@assets/novaIcons/outline/CloseOutline';
import Card from '@components/Card';
import { NotificationType } from '@globalTypes/notification';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

interface NotificationMessageProps {
  notificationMessage: NotificationType;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({ notificationMessage }) => {
  const avatar =
    notificationMessage.action == 'ACHIEVEMENT_UNLOCKED'
      ? notificationMessage.recipient.profile.avatar
      : notificationMessage.sender.profile.avatar;
  const displayName =
    notificationMessage.action == 'ACHIEVEMENT_UNLOCKED'
      ? notificationMessage.recipient.display_name
      : notificationMessage.sender.display_name;
  return (
    <div className="w-full " id="notification">
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
                  className="w-24 h-8 text-white text-sm hover:brightness-110"
                >
                  <button
                    className={`flex items-center w-full h-full gap-1 ${
                      notificationMessage.action == 'GAME_REQUEST' ? 'pl-4' : 'pl-2'
                    }`}
                  >
                    <CheckOutline className="h-5 w-5" />
                    <p>{notificationMessage.action == 'GAME_REQUEST' ? 'Play' : 'Accept'}</p>
                  </button>
                </Card>
                <Card
                  fill="#2B1F24"
                  cut={32}
                  className="w-24 h-8 text-red text-sm bg-opacity-25 hover:brightness-110"
                >
                  <button className="flex items-center pl-2 w-full h-full gap-1">
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

// const staticNotifications = [
//     {
//       id: '1',
//       recipient: {
//         id: 1,
//         username: 'john_doe',
//         display_name: 'John Doe',
//         email: 'john@example.com',
//         wins: 10,
//         loses: 5,
//         points: [{ value: 100 }],
//         verified: true,
//         profile: {
//           avatar: 'https://i.pravatar.cc/150?u=1',
//         },
//       },
//       sender: {
//         id: 2,
//         username: 'jane_doe',
//         display_name: 'Jane Doe',
//         email: 'jane@example.com',
//         wins: 8,
//         loses: 7,
//         points: [{ value: 90 }],
//         verified: true,
//         profile: {
//           avatar: 'https://i.pravatar.cc/150?u=2',
//         },
//       },
//       action: 'FRIEND_REQUEST',
//       status: 'pending',
//       description: 'You have a new friend request',
//       record_id: 123,
//       is_read: false,
//       created_at: new Date('2023-01-01T12:00:00'),
//     },
//     {
//       id: '2',
//       recipient: {
//         id: 3,
//         username: 'alice_smith',
//         display_name: 'Alice Smith',
//         email: 'alice@example.com',
//         wins: 15,
//         loses: 3,
//         points: [{ value: 120 }],
//         verified: true,
//         profile: {
//           avatar: 'https://i.pravatar.cc/150?u=3',
//         },
//       },
//       sender: {
//         id: 4,
//         username: 'bob_jones',
//         display_name: 'Bob Jones',
//         email: 'bob@example.com',
//         wins: 12,
//         loses: 8,
//         points: [{ value: 95 }],
//         verified: true,
//         profile: {
//           avatar: 'https://i.pravatar.cc/150?u=4',
//         },
//       },
//       action: 'GAME_REQUEST',
//       status: 'pending',
//       description: 'Bob Jones has challenged you to a game',
//       record_id: 456,
//       is_read: false,
//       created_at: new Date('2023-01-02T15:30:00'),
//     },
//     {
//       id: '3',
//       recipient: {
//         id: 5,
//         username: 'charlie_brown',
//         display_name: 'Charlie Brown',
//         email: 'charlie@example.com',
//         wins: 7,
//         loses: 12,
//         points: [{ value: 80 }],
//         verified: true,
//         profile: {
//           avatar: 'https://i.pravatar.cc/150?u=5',
//         },
//       },
//       sender: {
//         id: 6,
//         username: 'diana_williams',
//         display_name: 'Diana Williams',
//         email: 'diana@example.com',
//         wins: 20,
//         loses: 3,
//         points: [{ value: 150 }],
//         verified: true,
//         profile: {
//           avatar: 'https://i.pravatar.cc/150?u=6',
//         },
//       },
//       action: 'ACHIEVEMENT_UNLOCKED',
//       description: 'Congratulations! You have unlocked a new achievement',
//       is_read: true,
//       created_at: new Date('2023-01-03T08:45:00'),
//     },
//     // Add more static notifications as needed
//   ];
export const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(0);

  const observer = useRef<
    | IntersectionObserver
    | {
        disconnect: () => void;
        observe: (arg0: Element) => void;
      }
  >();

  const getNotif = async (page: number) => {
    setSearchLoading(true);
    const res = await axios.get(`/api/notification?page=${page}`);

    setNotifications((notifications) => [...notifications, ...res.data]);
    if (!res.data.length) setHasMore(false);
    setSearchLoading(false);
  };

  const lastNotifElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => {
          getNotif(prevPage);
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
  }, []);

  return (
    <div className="flex group opacity-0 flex-col absolute top-14 w-[26rem] h-0 p-8 bg-[#1E1F23] border-2 border-[#2C2D33] gap-8 z-20 rounded-lg pointer-events-none group-focus-within:h-[22rem] group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all">
      <div className="w-8 h-8 absolute bg-[#1E1F23] border-t-2 border-l-2 border-[#2C2D33] top-[-1.1rem] rounded-tl-lg right-1/2 rotate-45 translate-x-4" />
      <h1 className="text-xl text-white font-bold">Notifications</h1>
      <div className="flex flex-col gap-4 overflow-y-hidden group-hover:overflow-y-auto overflow-x-hidden scroll-smooth scrollbar scrollbar-track-lightBlack scrollbar-thumb-rounded scrollbar-thumb-[#5E6069] scrollbar-mr-1">
        {notifications.map((notification) => (
          <>
            <NotificationMessage notificationMessage={notification as NotificationType} />
            <hr className="h-px text-darkGray" />
          </>
        ))}
        {!searchLoading && hasMore && <div ref={lastNotifElementRef}></div>}
        {hasMore && (
          <div id="skeleton">
            <div />
            <div>
              <div />
              <div />
            </div>
          </div>
        )}
        {notifications.length == 0 && (
          <div className="flex w-full h-full items-center justify-center">
            <p className="text-gray font-serif">Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};
