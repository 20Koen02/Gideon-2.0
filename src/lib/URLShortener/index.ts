import fetch from "node-fetch";

export const shorten = async (url:string) => {

  const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
  return res.text();
};