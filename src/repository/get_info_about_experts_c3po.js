import fetch from 'node-fetch';

export async function getInfoAboutExpertsC3po(ids){
    let response = await fetch(`https://c3po.ru/api/experts.getInfo?user_ids=${ids}`)
    response = await response.json()
    if (response.error)
        return null;
    return response.items;
}