import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostsContext } from "../../Providers/Post/PostContext";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import './Home.css'
import { LatestPostsByCategory } from "./LatestPostsByCategory/LatestPostsByCategory";

export function Home() {
    const { posts, getPosts } = useContext(PostsContext);
    const [selectedPost, setSelectedPost] = useState(0);
    const [thumbnailURL, setThumbnailURL] = useState('/placeholder-image.jpg');
    const [fallbackChain, setFallbackChain] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const limit = 5;
    const offset = 0;

    useEffect(() => {
        getPosts({ limit, offset });
    }, []);

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

    const handlePostChange = (pos) => {
        const total = posts?.data?.length || 0;
        if (total === 0) return;

        if (pos < 0) {
            setSelectedPost(total - 1); // vuelve al último
        } else if (pos >= total) {
            setSelectedPost(0); // vuelve al primero
        } else {
            setSelectedPost(pos);
        }
    };

    useEffect(() => {
        const currentItem = posts?.data?.find((_, index) => index === selectedPost);
        const videoID = getYouTubeID(currentItem?.video_link);
        const chain = videoID ? [
            `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${videoID}/sddefault.jpg`,
            `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${videoID}/default.jpg`,
        ] : ['/placeholder-image.jpg'];

        setFallbackChain(chain);
        setThumbnailURL(chain[0]);
        setCurrentIndex(0);

        const timer = setTimeout(() => {
            setSelectedPost(prev => (prev + 1) % (posts?.data?.length || 1));
        }, 5000);

        return () => clearTimeout(timer);
    }, [selectedPost, posts]);

    function handleError() {
        const nextIndex = currentIndex + 1;
        const nextURL = fallbackChain[nextIndex];

        if (nextURL) {
            setThumbnailURL(nextURL);
            setCurrentIndex(nextIndex);
        } else {
            setThumbnailURL('/placeholder-image.jpg');
        }
    }

    function handleLoad(event) {
        const img = event.target;
        if (img.naturalWidth < 100 || img.naturalHeight < 100) {
            handleError();
        }
    }

    const selectedItem = posts?.data?.find((_, index) => index === selectedPost);

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
                <h3 className="border-bottom-3 bc-rust-red">Ultimos Videos</h3>
                <LatestPostsByCategory category={'full videos'} />
                <LatestPostsByCategory category={'web videos'} />
                <LatestPostsByCategory category={'event videos'} />
            </section>
        </>
    );
}