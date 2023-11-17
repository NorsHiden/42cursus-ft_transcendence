import { useEffect} from 'react';
import logo from '/logo.svg';
// import aamoussa from '/aamoussa.jpeg';
// import update from '/update.svg';
// import CornerLinedCardTest from '../CornerLinedCard/CornerLinedCardTest';
import PostLoginViewController from './PostLoginViewController';
import Update from '../Icons/Update';
import { toast } from 'sonner';

const PostLoginView = () => {

  const {
    handleInput,
    handlesubmit,
    trigerupload,
    trigersubmit,
    handleUpload,
    NewUser,
    uploadRef,
    submitRef,
    errors,
    haserrors,
  } = PostLoginViewController();

  useEffect(() => {
    console.log(haserrors && errors.length > 0)
    if (haserrors && errors.length > 0) {
      toast.error(errors);
    }
  }, [haserrors]);

  return (
    <div className="grid sm:grid-cols-2 h-screen w-full grid-cols-1">
      <div id="login_section" className="w-full h-full overflow-hidden bg-background">
        <div id="logo" className="flex justify-center mt-5 sm:mt-7 md:mt-10 lg:mt-14 xl:mt-17">
          <img src={logo} alt="logo" className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48" />
        </div>
        <div
          id="providers_section"
          className="flex flex-col mt-20 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-40 items-center w-full h-full"
        >
          <div
            id="file1"
            className="relative rounded-full h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 cursor-pointer"
            onClick={trigerupload}
          >
            <img
              src={NewUser?.profile.avatar || ""}
              alt="img"
              id="file1"
              className="absolute rounded-full h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
            />
            
            <div className="flex justify-end h-full w-full " >
              <Update
                className="z-10 mt-1 sm:mt-1.5 mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 xl:mt-3 "
                width="24"
                height="24"
              />  
            </div>
          </div>
          <input
            ref={uploadRef}
            type="file"
            id="file1"
            name="file1"
            className="hidden"
            onChange={handleUpload}
          />
          <div id="inputs" className="flex mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10">
            <form onSubmit={handlesubmit}>
              <div className="flex flex-col">
                  <input 
                    className="input-placeholder h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-input-color border border-input-border-color font-inter text-input-text-color text-sm sm:text-base focus:outline-none" 
                    name="username"
                    style={{ paddingLeft: '1rem' }}
                    type="text"
                    value={NewUser?.username || ""}
                    placeholder="User Name"
                    onChange={handleInput}
                    autoComplete="off"
                  />
                <input 
                    className="input-placeholder mt-3 sm:mt-4 md:mt-5 h-12 sm:h-13 md:h-14 w-60 sm:w-64 md:w-72 rounded-lg sm:rounded-xl md:rounded-2xl bg-input-color border border-input-border-color text-input-text-color font-inter text-sm sm:text-base focus:outline-none" 
                    name="display_name"
                    style={{ paddingLeft: '1rem' }}
                    type="text"
                    value={NewUser?.display_name || ""}
                    placeholder="Display Name"
                    onChange={handleInput}
                    autoComplete="off"
                  />
                <div className="w-full flex justify-center mt-[3.24vh]">
                  <button
                    className="w-40 h-16 bg-vibrantOrange text-white text-center font-bold text-xl cursor-pointer"
                    onClick={trigersubmit}
                  >
                    SAVE
                  </button>
                  <input
                    ref={submitRef}
                    type="submit"
                    value="submit"
                    name="submit"
                    className="hidden"
                  />

                </div>            
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="loginIlustration" className="hidden sm:block w-full h-full bg-vibrantOrange"></div>
    </div>
  );
};

export default PostLoginView;
