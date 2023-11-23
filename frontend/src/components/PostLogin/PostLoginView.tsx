import logo from '/logo.svg';
import PostLoginViewController from './PostLoginViewController';
import Update from '../Icons/Update';
import illustation from '../../assets/illustration.svg';
import UserForm from './UserForm';
import { useErrorToast,useLoadingToast} from './hooks';



const PostLoginView = () => {
  const {
    handleInput,
    handlesubmit,
    trigerupload,
    handleUpload,
    NewUser,
    uploadRef,
    errors,
    haserrors,
    loading
  } = PostLoginViewController();

  useErrorToast(haserrors, errors);
  useLoadingToast(loading, haserrors);

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
              <UserForm
                NewUser={NewUser!}
                loading={loading}
                handleInput={handleInput}
                handleSubmit={handlesubmit}
                errors={errors}
              />
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
