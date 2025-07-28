import { useEffect, useContext, useState } from "react";
import { useYouTubeThumbnail } from "../../Hooks/useYouTubeThumbnail";
import { Link } from "react-router-dom";
import { PostsContext } from "../../Providers/Post/PostContext";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import './Home.css'
import { LatestPostsByCategory } from "./LatestPostsByCategory/LatestPostsByCategory";

export function Home() {
    const { posts, getPosts } = useContext(PostsContext);
    const [selectedPost, setSelectedPost] = useState(0);
    const selectedItem = posts?.data?.[selectedPost];
    const { thumbnailURL, handleError, handleLoad } = useYouTubeThumbnail(
        selectedItem?.video_link,
        '/placeholder-image.jpg'
    );
    const limit = 5;
    const offset = 0;

    useEffect(() => {
        getPosts({ limit, offset });
    }, []);

    const handlePostChange = (pos) => {
        const total = posts?.data?.length || 0;
        if (total === 0) return;

        if (pos < 0) {
            setSelectedPost(total - 1);
        } else if (pos >= total) {
            setSelectedPost(0);
        } else {
            setSelectedPost(pos);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSelectedPost(prev => (prev + 1) % (posts?.data?.length || 1));
        }, 5000);

        return () => clearTimeout(timer);
    }, [selectedPost, posts]);

    return (
        <>
            <section className="flex flex-center column relative bg-coal-black">
                {selectedItem && (
                    <Link to={`/post/${selectedItem.id}`} className="width-100  radius-1">
                        <img
                            src={thumbnailURL}
                            alt={selectedItem.title}
                            onError={handleError}
                            onLoad={handleLoad}
                            className="width-100 ratio-16-9"
                        />
                    </Link>
                )}
                <button className="carrousel-left-button street-blue-button height-content absolute" title='Siguiente' onClick={() => handlePostChange(selectedPost + 1)}><MdOutlineArrowForwardIos /></button>
                <button className="carrousel-right-button street-blue-button height-content absolute" title='Anterior' onClick={() => handlePostChange(selectedPost - 1)}><MdOutlineArrowBackIos /></button>
                <div className="flex gap-2 carrousel-selected absolute
                ">
                    {posts?.data?.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => handlePostChange(index)}
                            className={`m-bottom-3 height-content ${index === selectedPost ? 'selected-page' : 'rust-button'}`}
                        >
                            {index + 1}
                        </span>
                    ))}
                </div>
            </section>
            {selectedItem && (<h2 className="carrousel-title width-100 bg-coal-black text-center text-warning-yellow">{selectedItem.title}</h2>)}

            <section className="flex column flex-center align-center m-top-3 ">
                <h3 className="latest-title border-bottom-3 bc-rust-red">Ultimos Videos</h3>
                <LatestPostsByCategory category={'full videos'} />
                <LatestPostsByCategory category={'web videos'} />
                <LatestPostsByCategory category={'event videos'} />
            </section>
        </>
    );
}