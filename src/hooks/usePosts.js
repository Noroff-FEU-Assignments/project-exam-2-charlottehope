import { useState, useEffect } from "react";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const MAX_RETRIES = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      let attempts = 0;

      while (attempts <= MAX_RETRIES) {
        try {
          const cachedPosts = JSON.parse(localStorage.getItem("cachedPosts"));
          if (cachedPosts) setPosts(cachedPosts);

          const response = await fetch(
            "https://api.noroff.dev/api/v1/social/posts",
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setPosts(data);
            localStorage.setItem("cachedPosts", JSON.stringify(data));
            break;
          }

          if (response.status === 429) {
            attempts++;
            const delay = response.headers.get("Retry-After")
              ? Number(response.headers.get("Retry-After")) * 1000
              : 2 ** attempts * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }

          throw new Error("Failed to fetch posts");
        } catch (error) {
          console.error("Error fetching posts:", error);
          break;
        }
      }
    };

    fetchPosts();
  }, []);

  return { posts, setPosts };
};

export default usePosts;
