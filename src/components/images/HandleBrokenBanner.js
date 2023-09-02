export const fallbackBanner =
  "https://cdn.pixabay.com/photo/2022/11/13/15/34/tunnel-7589526_1280.jpg";

const handleBrokenBanner = (e) => {
  const { target } = e;

  if (target.src !== fallbackBanner) {
    target.src = fallbackBanner;
  }
};

export default handleBrokenBanner;
