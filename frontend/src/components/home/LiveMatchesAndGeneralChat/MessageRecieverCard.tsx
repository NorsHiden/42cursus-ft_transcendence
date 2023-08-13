import aamoussa from "/aamoussa.jpeg"

function MessageRecieverCard(){
    return(
        <>
            <div id="message" className="relative m-[35px] mt-[0px] flex flex-col justify-end  h-[22%] gap-[9px]">

                <div id="message-profile" className="relative flex justify-start gap-[3px] h-[100%]">
                    <img src={aamoussa} alt="profile" className="w-[10%] h-[100%]  rounded-full order-0" />
                    <h2 id="name" className="[color:white]">Aamoussa</h2>
                    <h2 id="time" ></h2>
                </div>
                <div className="flex w-full justify-start">
                    <div id="message-content" className="flex bg-[#2B2F33] w-fit max-w-[100%] rounded-[12px] rounded-tl-[0px]">
                        <p style={{ color: "rgba(255, 255, 255, 0.8)" }} className="color-[white] break-all font-sans text-[10px] m-[10px]">HADAK ghir message khawi</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MessageRecieverCard