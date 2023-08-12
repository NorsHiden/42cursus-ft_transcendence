import channel1 from "../../../public/channel1.png"
import channel2 from "../../../public/channel2.png"
import channel3 from "../../../public/channel3.png"
import channel4 from "../../../public/channel4.png"

function SideBar() {

    function signOut() {
        localStorage.removeItem('token');
        window.location.href = "/login";
    }

    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-[161px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            
            <div className="h-full h-full pt-[180px]">
                <ul className="space-y-[24PX]">
                    <li>
                        <a href="#" className="flex justify-center p-2">
                            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.3055 8.10432L18.124 2.16665C15.7051 0.166618 12.2951 0.166615 9.87612 2.16665L2.6947 8.10432C1.40087 9.17407 0.666748 10.796 0.666748 12.4884V23.1652C0.666748 25.3892 2.38199 27.3333 4.66675 27.3333H7.33341C9.54255 27.3333 11.3334 25.5424 11.3334 23.3333V18.913C11.3334 18.0058 12.006 17.4116 12.6667 17.4116H15.3334C15.9942 17.4116 16.6667 18.0058 16.6667 18.913V23.3333C16.6667 25.5424 18.4576 27.3333 20.6667 27.3333H23.3334C25.6182 27.3333 27.3334 25.3892 27.3334 23.1652V12.4884C27.3334 10.796 26.5993 9.17407 25.3055 8.10432Z" fill="white" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex justify-center p-2">
                            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6667 3.33329C7.51209 3.33329 3.33341 7.51197 3.33341 12.6666C3.33341 17.8213 7.51209 22 12.6667 22C17.8214 22 22.0001 17.8213 22.0001 12.6666C22.0001 7.51197 17.8214 3.33329 12.6667 3.33329ZM0.666748 12.6666C0.666748 6.03921 6.03933 0.666626 12.6667 0.666626C19.2942 0.666626 24.6667 6.03921 24.6667 12.6666C24.6667 19.294 19.2942 24.6666 12.6667 24.6666C6.03933 24.6666 0.666748 19.294 0.666748 12.6666Z" fill="#5E6069" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.724 19.7238C20.2447 19.2031 21.0889 19.2031 21.6096 19.7238L26.943 25.0571C27.4637 25.5778 27.4637 26.422 26.943 26.9427C26.4223 27.4634 25.5781 27.4634 25.0574 26.9427L19.724 21.6094C19.2033 21.0887 19.2033 20.2445 19.724 19.7238Z" fill="#5E6069" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex justify-center p-2">
                            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33341 2.66663C5.65152 2.66663 2.66675 5.65139 2.66675 9.33329V22.6666C2.66675 26.3485 5.65152 29.3333 9.33341 29.3333H22.6667C26.3486 29.3333 29.3334 26.3485 29.3334 22.6666V9.33329C29.3334 5.65139 26.3486 2.66663 22.6667 2.66663H9.33341ZM17.3334 10.6666C17.3334 9.93025 16.7365 9.33329 16.0001 9.33329C15.2637 9.33329 14.6667 9.93025 14.6667 10.6666V21.3333C14.6667 22.0697 15.2637 22.6666 16.0001 22.6666C16.7365 22.6666 17.3334 22.0697 17.3334 21.3333V10.6666ZM10.6667 13.3333C11.4031 13.3333 12.0001 13.9302 12.0001 14.6666V21.3333C12.0001 22.0697 11.4031 22.6666 10.6667 22.6666C9.93037 22.6666 9.33341 22.0697 9.33341 21.3333V14.6666C9.33341 13.9302 9.93037 13.3333 10.6667 13.3333ZM21.3334 16C22.0698 16 22.6667 16.5969 22.6667 17.3333V21.3333C22.6667 22.0697 22.0698 22.6666 21.3334 22.6666C20.597 22.6666 20.0001 22.0697 20.0001 21.3333V17.3333C20.0001 16.5969 20.597 16 21.3334 16Z" fill="#5E6069" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex justify-center p-2">
                            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.61241 8C5.36682 8 2.87368 10.8746 3.33268 14.0876L4.69295 23.6095C5.16214 26.8938 7.97495 29.3333 11.2926 29.3333H20.7081C24.0258 29.3333 26.8386 26.8938 27.3078 23.6095L28.6681 14.0876C29.1271 10.8746 26.6339 8 23.3883 8H8.61241Z" fill="#5E6069" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5964 2.80747C13.255 3.13679 13.522 3.93768 13.1927 4.59632L10.8075 9.3666C10.4782 10.0252 9.67731 10.2922 9.01867 9.96288C8.36003 9.63357 8.09307 8.83267 8.42238 8.17403L10.8075 3.40375C11.1368 2.74511 11.9377 2.47815 12.5964 2.80747Z" fill="#5E6069" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4038 2.8074C20.0624 2.47808 20.8633 2.74505 21.1926 3.40369L23.5777 8.17397C23.9071 8.8326 23.6401 9.6335 22.9815 9.96282C22.3228 10.2921 21.5219 10.0252 21.1926 9.36653L18.8075 4.59626C18.4781 3.93762 18.7451 3.13672 19.4038 2.8074Z" fill="#5E6069" />
                            </svg>
                        </a>
                    </li>
                    <li className="flex justify-center py-[39px]">
                        <div style={{ background: "rgba(217, 217, 217, 0.36)" }} className="w-[80px] h-[1px] ">
                        </div>
                    </li>

                    {/* <li className="flex justify-center">
                        <div style={{ background: "background: url(<frontend/public/assets/Defaultchannl2.png>)" }} className="w-[80px] h-[1px] ">
                        </div>
                    </li> */}

                    <li className="flex justify-center">
                            <img src={channel1} alt="img" className="rounded-[20px] h-[52px] w-[52px]"/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel2} alt="img" className="rounded-[20px] h-[52px] w-[52px]"/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel3} alt="img" className="rounded-[20px] h-[52px] w-[52px]"/>   
                    </li>
                    <li className="flex justify-center">
                            <img src={channel4} alt="img" className="rounded-[20px] h-[52px] w-[52px]"/>   
                    </li>
                    <li className="flex justify-center">
                        <button onClick={signOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Log Out
                        </button>
                    </li>
                </ul>

            </div>
        </aside>
    )
}

export default SideBar;