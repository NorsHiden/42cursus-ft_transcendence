import { useState } from "react";

const PostLoginViewController = ()=>{
    const [FormData, setFormData] = useState({
        name: 'aamoussa',
        displayname: 'Anas',
        avatar: '',
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
    
    return{
        handleInput,handlesubmit,trigerupload,trigersubmit,handleUpload,FormData
    }
}

export default PostLoginViewController
