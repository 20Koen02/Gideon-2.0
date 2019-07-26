import fetch from "node-fetch";

export const searchAnime = async (query:string, offset:number) : Promise<any[]> => {
  const res = await fetch(
    `https://kitsu.io/api/edge/anime?filter[text]=${query}&page%5Boffset%5D=${(offset.toString()?offset:'0')}`,
    {
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Accept": "application/vnd.api+json"
      },
    }).then(r => r.json());
    return res.data;

};