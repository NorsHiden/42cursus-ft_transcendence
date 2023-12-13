import React, { FC, useState, useRef, useEffect } from 'react';

export type TextEreaProps = {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  textContent?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  setactiveChanges: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextErea: FC<TextEreaProps> = ({
  className,
  id,
  textContent,
  type,
  disabled = false,
  onChange,
}) => {
  const [divHeight, setDivHeight] = useState<number>(0);
  // const [value, setValue] = useState<string>("");
  const [textlength, setTextlength] = useState<number>(0);
  const textlimit = 300;
  // const [redZone, setRedZone] = useState<boolean>(false);
  const textareaRef = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
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
    <div
      id={id}
      className={`row-start-6 col-start-1 col-end-2 lg:row-start-4  lg:col-start-1 lg:col-end-3 h-[${divHeight}px]`}
    >
      <textarea
        className={`w-full h-[10rem] input-placeholder rounded-lg sm:rounded-xl md:rounded-2xl bg-[#1E1F23] border border-[#3E4048] text-[#71717A] text-sm sm:text-base focus:outline-none ${className}`}
        placeholder="Bio"
        style={{ paddingLeft: '1rem', paddingTop: '1rem' }}
        ref={textareaRef}
        value={textContent}
        onChange={onChange}
        disabled={disabled}
        typeof={type}
        name="about"
      />
      <div className="w-full flex justify-end mt-[-35px]">
        <p className={`mr-[10px] ${textlength > textlimit ? 'text-yellow-600' : 'text-gray'}`}>
          {textlength}/300
        </p>
      </div>
    </div>
  );
};

export default TextErea;
