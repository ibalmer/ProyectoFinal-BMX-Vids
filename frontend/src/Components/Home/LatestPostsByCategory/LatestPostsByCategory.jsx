import { useState, useEffect, useContext } from "react";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { Link } from "react-router-dom";

export function LatestPostsByCategory({ category }) {
    const { getPostsByParams } = useContext(PostsContext);
    const [posts, setPosts] = useState([]);

    const limit = 4;
    const offset = 0;

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await getPostsByParams(category, { limit, offset });
            const originalPosts = response.data || [];

            const postsWithFallbacks = originalPosts.map(post => {
                const videoID = getYouTubeID(post.video_link);
                const fallbackChain = videoID ? [
                    `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
                    `https://img.youtube.com/vi/${videoID}/sddefault.jpg`,
                    `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
                    `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`,
                    `https://img.youtube.com/vi/${videoID}/default.jpg`,
                ] : ['/placeholder-image.jpg'];

                return {
                    ...post,
                    fallbackChain,
                    thumbnailURL: fallbackChain[0],
                    currentIndex: 0,
                };
            });

            setPosts(postsWithFallbacks);
        };

        fetchCategory();
    }, [category]);

    function getYouTubeID(url) {
        if (!url) return null;
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
            /youtube\.com\/shorts\/([^&\n?#]+)/,
            /youtube\.com\/live\/([^&\n?#]+)/,
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    }

    const handleError = (index) => {
        setPosts(prev => {
            const newPosts = [...prev];
            const post = newPosts[index];
            const nextIndex = post.currentIndex + 1;
            const nextURL = post.fallbackChain[nextIndex] || '/placeholder-image.jpg';

            post.currentIndex = nextIndex;
            post.thumbnailURL = nextURL;

            return newPosts;
        });
    };

    const handleLoad = (event, index) => {
        const img = event.target;
        if (img.naturalWidth < 100 || img.naturalHeight < 100) {
            handleError(index);
        }
    };

    return (
        <div className="flex flex-center align-center border-bottom-3 bc-rust-red column  m-top-4  width-100 m-block-2 m-bottom-2 p-block-2">
            <p className="text-coal-black bold size-2 m-bottom-1">{category}</p>
            <div className="flex gap-2 flex-around">
                {posts.map((post, index) => (
                    <Link to={`/post/${post.id}`} className="width-20" key={post.id}>
                        <img
                            className="ratio-16-9 width-100"
                            src={post.thumbnailURL}
                            alt={post.title}
                            onError={() => handleError(index)}
                            onLoad={(e) => handleLoad(e, index)}
                        />
                        <p className="text-coal-black bold">{post.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
