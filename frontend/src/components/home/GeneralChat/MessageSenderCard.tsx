interface props {
  content?: string;
  avatar?: string;
  name?: string;
}

function MessageSenderCard(props: props) {
  return (
    <>
      <div
        id="message"
        className="relative m-[35px] mt-[0px] flex flex-col justify-end  h-[22%] gap-[9px]"
      >
        <div
          id="message-profile"
          className="relative flex justify-end gap-[3px] h-[100%]"
        >
          <img
            src={props.avatar}
            alt="profile"
            className="w-[10%] h-[100%]  rounded-full order-1"
          />
          <h2 id="name" className="[color:white]">
            {props.name}
          </h2>
          <h2 id="time"></h2>
        </div>
        <div className="flex w-full justify-end">
          <div
            id="message-content"
            className="flex bg-[#FE5821] w-fit max-w-[100%] rounded-[12px] rounded-tr-[0px]"
          >
            <p
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              className="color-[white] break-all font-sans text-[10px] m-[10px]"
            >
              {props.content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageSenderCard;
