import axios from 'axios';
import querystring from 'querystring';

export default function send(url : string, message : string, embed : any) {
    return new Promise((resolve, reject) => {

        axios.post(url, 
        {
            content: "",
            tts: false,
            embeds: [embed.embed]
        },
        {
            headers:{
                "Content-type": "application/json"
            }
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
            console.log(err.response.data);
        })
    });
}