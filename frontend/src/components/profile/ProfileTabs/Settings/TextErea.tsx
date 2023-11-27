
import React, { FC,useState, useRef, useEffect } from "react"

export type TextEreaProps = {
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    textContent?: string;
    type?: string;
    disabled?: boolean;
    placeholder?: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setactiveChanges: React.Dispatch<React.SetStateAction<boolean>>;
  };


const TextErea:FC<TextEreaProps> = (
    {
        className,
        id,
        style,
        textContent,
        type,
        disabled = false,
        setContent,
        setactiveChanges
    }
)=>{
    const [divHeight, setDivHeight] = useState<number>(0);
    // const [value, setValue] = useState<string>("");
    const [textlength, setTextlength] = useState<number>(0);
    const textlimit = 300;
    // const [redZone, setRedZone] = useState<boolean>(false);
    const textareaRef = useRef(null);
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setDivHeight(entries[0].contentRect.height);
        });
      
        if (textareaRef.current) {
          observer.observe(textareaRef.current);
        }
      
        return () => {
          if (textareaRef.current) {
            observer.unobserve(textareaRef.current);
          }
        };
      }, []);

      useEffect(() => {
        setTextlength(textContent!.length);
      }, [textContent]);

    //   console.log(textlength)

    return (
        <div id={id} className={`row-start-6 col-start-1 col-end-2 lg:row-start-4  lg:col-start-1 lg:col-end-3 h-[${divHeight}px]`}>
        <textarea
            className={` w-full  h-[10rem]
        input-placeholder rounded-lg sm:rounded-xl md:rounded-2xl bg-[#1E1F23] border border-[#3E4048] 
        font-inter text-[#71717A] text-sm sm:text-base focus:outline-none ${className}`}
            placeholder="Bio"
            style={{ paddingLeft: '1rem', paddingTop: '1rem' }}
            ref={textareaRef}
            value={textContent}
            onChange={(e) => setContent(()=>{
                setactiveChanges(false)
                return e.target.value
            })}
            disabled={disabled}
            typeof={type}
        />
        <div className="w-full flex justify-end mt-[-35px] ">
            <p className={`font-sans mr-[10px] ${textlength > textlimit?'text-[#F58A27]':'text-[#71717A]'} `}>{textlength}/300</p>
        </div>
        </div>
    )

}

export default TextErea