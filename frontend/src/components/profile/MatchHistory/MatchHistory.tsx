import { Outlet, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { useState,useEffect,useCallback,useRef} from "react"
import { User } from '@globalTypes/types';
import axios from "axios";
import MatchCard from "../../MatchCard.tsx";


const MatchHistory = ()=>{
    const user = useRouteLoaderData("profule") as User;

    const [matchType, setMatchType] = useState('all');
    const [matches, setMatches] = useState([]);
    const [page, setPage] = useState(0);
    const observer = useRef();

    const lastMatchElementRef = useCallback(node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, []);

    useEffect(() => {
      const fetchMatches = async () => {
        let url = `/api/match_history/${user.id}`;
        if (matchType !== 'all') {
          url += `/${matchType}`;
        }
        url += `?page=${page}`;
        console.log(url);
        try {
          const res = await axios.get(url);
          setMatches(res.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchMatches();
    }, [matchType, page]);
  
   
    // const [friendType, setFriendType] = useState('Pending');
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatchType(event.target.value);
      };

    
    return (
        <section className="mt-24">        
        <div id="redio-buttons" className="flex justify-end">
          <div id="Pending" className="flex items-center ml-[30px]">
            <input
              id="default-radio-1"
              type="radio"
              name="default-radio"
              value="all"
              checked={matchType === 'all'}
              className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none"
              onChange={handleTypeChange}
            />
            <label
              htmlFor="default-radio-1"
              className={`  ml-2 text-['1rem'] font-medium text-[#717178] `}
            >
              All
            </label>
          </div>
          <div id="Blocked" className="flex items-center ml-[30px]">
            <input
              id="default-radio-2"
              type="radio"
              name="default-radio-2"
              value="Won"
              checked={matchType === 'Won'}
              className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none"
              onChange={handleTypeChange}
            />
            <label
              htmlFor="default-radio-2"
              className={`  font-poppins ml-2 text-['1rem'] font-medium text-[#717178] `}
            >
              Won
            </label>
          </div>
          <div id="Accepted" className="flex items-center ml-[30px]">
            <input
              id="default-radio-3"
              type="radio"
              name="default-radio-3"
              value="Lost"
              checked={matchType === 'Lost'}
              className="w-6 h-6 appearance-none border-4 border-[#717178] rounded-full checked:bg-[#717178] checked:border-transparent focus:outline-none"
              onChange={handleTypeChange}
            />
            <label
              htmlFor="default-radio-3"
              className={`ml-2 text-[${'1rem'}px] font-medium text-[#717178] `}
            >
              Lost
            </label>
          </div>
        </div>
      <div
        id="MatchHistory"
        className="mt-[42px] grid grid-flow-cols grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* {matches.map((match, index) => {
          
        })} */}
        <div ref={lastMatchElementRef} />
      </div>
      
    </section>
    );
}
export default MatchHistory