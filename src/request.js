import axios from "axios";

export async function tiktokDown(link) {
  const options = {
    method: "GET",
    url: "https://tiktok-video-no-watermark2.p.rapidapi.com/",
    params: {
      url: link,
      hd: "1",
    },
    headers: {
      "X-RapidAPI-Key": "dd577e1dd4msh9a522d8276fe93cp1b5792jsnd87ac9c89c58",
      "X-RapidAPI-Host": "tiktok-video-no-watermark2.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return console.log(response.data.path);
  } catch (error) {
    console.error(error);
  }
}
