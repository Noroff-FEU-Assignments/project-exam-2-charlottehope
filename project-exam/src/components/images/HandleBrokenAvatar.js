export const fallbackAvatar =
  "https://images.unsplash.com/photo-1533835673073-b2575dde4265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const HandleBrokenAvatar = (e) => {
  if (e.target.src !== fallbackAvatar) {
    e.target.src = fallbackAvatar;
  }
};

export default HandleBrokenAvatar;
