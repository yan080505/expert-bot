import fetch from 'node-fetch';

const serverIp = process.env.SERVER_IP;

export async function getInfoAboutExperts(ids, type){
    let response = await fetch(`http://${serverIp}/api/getExperts?ids=${ids}&type=${type}`)
    response = await response.json()
    if (response.error)
        return null;
    return response;
}