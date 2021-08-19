// const BACKEND_URL = "http://127.0.0.1:8000/api/v0.1/";
const BACKEND_URL = "https://pokyza.space/api/v0.1/";

const URLS = {
  // internal APIs
  mailAPI: BACKEND_URL + "mailing/send-mail/",
  // external APIs
  linkShortenerAPI: "https://api-ssl.bitly.com/v4/shorten",
};

export default URLS;
