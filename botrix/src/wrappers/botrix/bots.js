import axios from 'axios';


export async function getBots(amount){
    return new Promise(async (resolve, reject) => {
        await axios.get("http://localhost:3001/get/bots?page=1")
        .then((res) => {
            resolve(res.data);
        }).catch((e) => {
            reject(e);
        });
    });
    
}

export function getBot(id) {

}