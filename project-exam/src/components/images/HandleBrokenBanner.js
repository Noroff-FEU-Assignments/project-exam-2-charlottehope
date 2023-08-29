export const fallbackBanner =
  "https://cdn.pixabay.com/photo/2022/11/13/15/34/tunnel-7589526_1280.jpg";

const HandleBrokenBanner = (e) => {
  if (e.target.src !== fallbackBanner) {
    e.target.src = fallbackBanner;
  }
};

export default HandleBrokenBanner;
