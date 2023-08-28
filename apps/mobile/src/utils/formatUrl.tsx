export const formatUrl = (url: string) => {
  let formattedUrl = url.replace(/^https?:\/\//, "").replace(/^www\./, ""); //Remove "http://" or "https://" and  "www" prefix

  const index = formattedUrl.indexOf("/");
  if (index !== -1) {
    formattedUrl = formattedUrl.slice(0, index); //Remove everything after the first "/"
  }

  return formattedUrl;
};
