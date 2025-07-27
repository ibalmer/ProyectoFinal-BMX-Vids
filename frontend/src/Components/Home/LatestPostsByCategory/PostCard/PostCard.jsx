import { useYouTubeThumbnail } from "../../../../Hooks/useYouTubeThumbnail"
import { Link } from "react-router-dom";


export function PostCard({ post }) {
    const { thumbnailURL, handleError, handleLoad } = useYouTubeThumbnail(
        post.video_link,
        '/placeholder-image.jpg'
    );

    return (
        <Link to={`/post/${post.id}`} className="post-card">
            <img
                className="ratio-16-9 width-100"
                src={thumbnailURL}  // Usa el del hook
                alt={post.title}
                onError={handleError}
                onLoad={handleLoad}
            />
            <p className="text-coal-black bold">
                {post.title.length > 30 ?
                    post.title.slice(0, 30) + '...'
                    : post.title
                }
            </p>
        </Link>
    );
}