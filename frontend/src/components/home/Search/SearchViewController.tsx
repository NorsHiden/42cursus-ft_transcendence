import { useEffect,useState,useRef } from "react"

const SearchViewCOntroller = ()=>{
    const [FormData, setFormData] = useState("")
    const [inputtranslate, settranslate] = useState(false)
    const [hide, sethide] = useState(false)
    const inputRef = useRef(null)
    let handler:number;

    function handleInput(event: any) {
        const { value } = event.target;
        clearInterval(handler)
        settranslate(true)
        setFormData(value);
      }
    
      const handleClickOutside = (event:any) => {
          
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            console.log("im in")
            sethide(true)
            settranslate(false)
          }
        };

        function senddata(test:string){
            console.log("sending data")
            clearInterval(handler)

        }

        useEffect(()=>{
            handler = setInterval(senddata,500)
        },[FormData])
        
    return {
        FormData,
        inputRef,
        handleInput,
        handleClickOutside,
        hide,
        inputtranslate,
    }
}

export default SearchViewCOntroller