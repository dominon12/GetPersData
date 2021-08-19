const BACKEND_URL = "http://localhost:3000/api/v1/";

const URLS = {
  // internal APIs
  trackingRequest: BACKEND_URL + "tracking-request/",
  // external APIs
  linkShortenerAPI: "https://api-ssl.bitly.com/v4/shorten",
};

export default URLS;
