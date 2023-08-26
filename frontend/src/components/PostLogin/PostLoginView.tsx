import { useState } from 'react';
import logo from '/logo.svg';
import aamoussa from '/aamoussa.jpeg';
import update from '/update.svg';
import CornerLinedCardTest from '../CornerLinedCard/CornerLinedCardTest';

const PostLoginView = () => {
  const [FormData, setFormData] = useState({
    name: 'aamoussa',
    displayname: 'Anas',
    value: '',
  });

  function handleInput(event: any) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handlesubmit(event: any) {
    event.preventDefault();
    alert(`Name:  ${FormData.name}\ndisplayname:  ${FormData.displayname}`);
  }

  function trigerupload(event: any) {
    const target = event.target.id;
    const upload = document.getElementsByName(target);
    upload[0]?.click();
  }

  function trigersubmit() {
    const submit = document.getElementsByName('submit');
    submit[0]?.click();
  }

  function handleUpload(event: any) {
    const path = URL.createObjectURL(event.target.files[0]);
    setFormData((prevFormData) => ({ ...prevFormData, value: path }));
  }

  return (
    <div className="grid grid-cols-2 h-[100vh] w-[100wh]">
      <div id="login_section" className="w-full h-full overflow-hidden">
        <div id="logo" className="flex justify-center mt-[7.59vh]">
          <img src={logo} alt="logo" className=" w-[13.58vw]" />
        </div>
        <div
          id="providers_section"
          className="flex flex-col mt-[18.14vh] items-center w-full h-full"
        >
          <div
            id="file1"
            className="relative rounded-full h-[14.16vh] w-[14.16vh] cursor-pointer"
            onClick={trigerupload}
          >
            <img
              src={FormData.value ? FormData.value : aamoussa}
              alt="img"
              id="file1"
              className="absolute rounded-full h-[14.16vh] w-[14.16vh] "
            />
            <div className="flex justify-end h-full w-full z-15 mt-[6px] ">
              <img
                id="file1"
                src={update}
                alt=""
                className="absolute h-[3.33vh] w-[3.33vh] z-15"
              />
            </div>
          </div>
          <input
            type="file"
            id="file1"
            name="file1"
            className="hidden"
            onChange={handleUpload}
          />
          <div id="inputs" className="flex mt-[3.42vh]">
            <form onSubmit={handlesubmit}>
              <div className="flex flex-col">
                <div className=" h-[5.92vh] w-[14.57vw] rounded-[1.29vh] bg-[#1E1F23] border-[1px]  text-[1.48vh] border-[#3E4048]">
                  <input
                    className=" ml-[1.14vw] h-full w-[90%] bg-[#1E1F23]  text-[1.48vh] focus:outline-none"
                    name="name"
                    type="text"
                    value={FormData.name}
                    onChange={handleInput}
                    placeholder="User Name"
                  />
                </div>
                <div className="mt-[1.29vh] h-[5.92vh] w-[14.57vw] rounded-[1.29vh] bg-[#1E1F23] border-[1px] text-[1.48vh] border-[#3E4048]">
                  <input
                    className=" ml-[1.14vw] h-full w-[90%] bg-[#1E1F23] rounded-[14px] focus:outline-none text-[1.48vh]"
                    name="displayname"
                    type="text"
                    value={FormData.displayname}
                    onChange={handleInput}
                    placeholder="Display Name"
                  />
                </div>
                <div className="w-full flex justify-center mt-[3.24vh]">
                  <div
                    className="w-[8.12vw] h-[6.29vh] cursor-pointer"
                    onClick={trigersubmit}
                  >
                    <CornerLinedCardTest
                      childComp={
                        <h2 className={`play font-Rowdies text-[2.59vh]`}>
                          {' '}
                          SAVE{' '}
                        </h2>
                      }
                      fill="[color:#FE5821]"
                      cornerredius="2"
                      stroke="[color:#FE5821]"
                      cornershape={[24, 0, 24, 0]}
                      strokesize={0}
                      width={200}
                      height={87}
                      margine=""
                      ratio={43 / 100}
                    />
                  </div>
                  <input
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
      <div id="loginIlustration" className="w-full h-full bg-[#FE5821]"></div>
    </div>
  );
};

export default PostLoginView;