import { useEffect} from 'react';
import logo from '/logo.svg';
// import aamoussa from '/aamoussa.jpeg';
// import update from '/update.svg';
// import CornerLinedCardTest from '../CornerLinedCard/CornerLinedCardTest';
import PostLoginViewController from './PostLoginViewController';
import Update from '../Icons/Update';
import { toast } from 'sonner';
import Card from '../Card';
import illustation from '../../assets/illustration.svg';
import { to } from 'mathjs';

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
    loading
  } = PostLoginViewController();

  useEffect(() => {
    console.log(haserrors && errors.length > 0)
    toast.dismiss();
    if (haserrors && errors.length > 0) {
      toast.error(errors);
    }
  }, [haserrors]);

  useEffect(() => {
    if (loading && !haserrors) {
      toast.loading("Updating your profile");
    }
  }, [loading]);
  
  return (
    <div className='relative overflow-hidden'>
    <div className='absolute bottom-0 right-0  hidden lg:block w-[50%] h-full  z-10'>
      <img src={illustation} alt="Illustration" className="relative  object-none w-full h-full transform  object-right-top " />
    </div>
    <div className="grid relative lg:grid-cols-2 h-[100vh] w-[100vw] grid-cols-1  overflow-hidden">
      <div id="login_section" className="w-full h-full  bg-background">
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
              className="absolute rounded-full object-cover h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36"
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
                <div className="w-full flex justify-center mt-[3.24vh]" onClick={trigersubmit}>
                  <Card className={`flex w-32 sm:w-34 md:w-36 justify-center h-14 sm:h-15 md:h-16 z-10 text-[#FE5821] ${loading?"filter brightness-75":""} hover:filter hover:brightness-75`} cut={8} >
                    <button className="text-white sm:text-base md:text-lg font-serif py-4 px-10 rounded " disabled={loading}>
                      SAVE
                    </button>
                  </Card>
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
      <div id="loginIlustration" className="bottom-0 right-0  hidden lg:block w-full h-full bg-[#70311E] ">
        {/* <img src={illustation} alt="Illustration" className="  object-cover  transform translate-x-[0%] w-full h-[110%]   object-bottom object-right scale-60" />  */}
      </div>
    </div>
    </div>
  );
};

export default PostLoginView;
