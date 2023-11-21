// import CornerLinedCard from '../../CornerLinedCard/CornerLinedCard';
// import MatchCard from './MatchCard';
// import GeneralChat from '../GeneralChat/GeneralChat';
// import useLiveMatchesViewControler from './LiveMatchesViewController';

// interface prop {
//   reminder: number;
// }

// const LiveMatchesAndGeneralChat: React.FC<prop> = () => {
//   // function LiveMatchesAndGeneralChat(data: prop) {
//   const { header_ref, header, taken } = useLiveMatchesViewControler(data);

//   return (
//     <div className="grid grid-cols-5 mt-[4.62vh] ml-[8.38vw]  mr-[8.38vw] gap-[1vw]">
//       <section
//         id="live-matches"
//         className={`col-span-4 flex flex-col  gap-[4.62vh] h-[${95 - taken}vh]`}
//       >
//         <div ref={header_ref} id="liveMatches-header" className="flex justify-between items-center">
//           <h1 className={`font-sans text-[${header.title}px] game-mode-font `}>Recent Matches</h1>
//           <div className="flex">
//             <div className="flex items-center ml-[30px]">
//               <input
//                 style={{ '--data': header.radio_buttone.size }}
//                 id="default-radio-1"
//                 type="radio"
//                 value=""
//                 name="default-radio"
//                 className=""
//               />
//               <label
//                 htmlFor="default-radio-1"
//                 className={`ml-2 text-[${header.radio_buttone.text}px] font-medium text-gray-900 `}
//               >
//                 ALL
//               </label>
//             </div>
//             <div className="flex items-center ml-[30px]">
//               <input
//                 defaultChecked
//                 style={{ '--data': header.radio_buttone.size }}
//                 id="default-radio-2"
//                 type="radio"
//                 value=""
//                 name="default-radio"
//                 className="w-4 h-4 "
//               />
//               <label
//                 htmlFor="default-radio-2"
//                 className={`ml-2 text-[${header.radio_buttone.text}px] font-medium text-gray-900 `}
//               >
//                 Live
//               </label>
//             </div>
//             <div className="flex items-center ml-[30px]">
//               <input
//                 defaultChecked
//                 style={{ '--data': header.radio_buttone.size }}
//                 id="default-radio-3"
//                 type="radio"
//                 value=""
//                 name="default-radio"
//                 className="w-4 h-4 "
//               />
//               <label
//                 htmlFor="default-radio-3"
//                 className={`ml-2 text-[${header.radio_buttone.text}px] font-medium text-gray-900 `}
//               >
//                 Done
//               </label>
//             </div>
//             <CornerLinedCard
//               childComp={
//                 <div className="center w-[98%] h-[98%] flex justify-center">
//                   <select
//                     name="language"
//                     id="language"
//                     className="flex pl-[6px] justify-center w-[100%] [background:none] [color:white]"
//                   >
//                     <option
//                       className="text-[2px]"
//                       style={{ display: 'none' }}
//                       value="c++"
//                       disabled
//                       selected
//                     >
//                       sort by
//                     </option>
//                     <option value="javascript">cursed</option>
//                     <option value="python">Regular</option>
//                     <option value="java">Vanish</option>
//                     <option value="java">Goldrush</option>
//                   </select>
//                 </div>
//               }
//               fill="[color:#2D313A]"
//               cornerredius="0"
//               stroke="[color:#4B5261]"
//               strokesize={1}
//               width={header.select_button.w}
//               height={header.select_button.w * (21 / 100)}
//               cornershape={[8, 0, 8, 0]}
//               margine="ml-[38px]"
//             />
//           </div>
//         </div>
//         <div
//           id="live-matches-cards"
//           className=" grid grid-cols-3 gap-[1.04vw] overflow-scroll  max-h-[50vh]"
//         >
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//           <MatchCard class="" />
//         </div>
//       </section>
//       {/* spletting general chat section and make a component for it  */}
//       <GeneralChat />
//     </div>
//   );
// };

// export default LiveMatchesAndGeneralChat;
