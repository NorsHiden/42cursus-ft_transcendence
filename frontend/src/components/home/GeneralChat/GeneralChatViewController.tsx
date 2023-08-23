import useMeasure from "react-use-measure"

interface GeneralChat {
    chatsize:number,
    header_size:number,
    channel_name:number,
    channel_online:number,
    chat_header: {
        title:number,
        description:number,
    }
}


const GeneralChatViewCOntroller = ()=> {
    const [header_ref, data] = useMeasure()
    // const data = 400;
    const chat:GeneralChat = {
        chatsize : data.width * (32 / 100),
        header_size:data.width * (16 / 100),
        channel_name:  data.width * (4.15 / 100),
        channel_online: data.width * (2.15 / 100),
        chat_header : {
            title: data.width * (2 / 100),
            description: data.width * (2 / 100)
        }

    }
    return {
        header_ref,
        chat
    }
}

export default GeneralChatViewCOntroller