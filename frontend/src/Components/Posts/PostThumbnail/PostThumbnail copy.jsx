import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../../Providers/Users/UserContext";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { FaRegStar, FaStar } from "react-icons/fa";
import './PostThumbnail.css';

export function PostThumbnail({ post, onToggleFav }) {

    const { userAuthenticated, modifyUserById } = useContext(UserContext)
    const [favsArray, setFavsArray] = useState([])

    useEffect(() => {
        if (userAuthenticated && userAuthenticated.favs) {
            const parsedFavs = userAuthenticated.favs
                .split(",")
                .map(idStr => Number(idStr.trim()))
                .filter(id => !isNaN(id) && id > 0);
            setFavsArray(parsedFavs);
        } else {
            setFavsArray([]);
        }
    }, [userAuthenticated?.favs]);

    function getYouTubeID(url) {
        if (!url) return null;
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
            /youtube\.com\/shorts\/([^&\n?#]+)/,
            /youtube\.com\/live\/([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    }

    const videoID = getYouTubeID(post.video_link);

    const fallbackChain = videoID ? [
        `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/sddefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/default.jpg`,
    ] : [];

    const [thumbnailURL, setThumbnailURL] = useState(fallbackChain[0] || '/placeholder-image.jpg');
    const [currentIndex, setCurrentIndex] = useState(0);

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
    
    const time_ago = formatDistanceToNow(new Date(post.publish_date), {
        addSuffix: true,
        locale: es
    });



    async function toogleFav(postId) {
        if (!userAuthenticated || !userAuthenticated.id) {
            console.warn("Usuario no autenticado");
            return;
        }

        try {
            let stringFavsArray;
            if (favsArray.includes(postId)) {
                const cleanFavsArray = favsArray.filter(fav => fav !== postId);
                stringFavsArray = cleanFavsArray.length > 0 ? cleanFavsArray.join(',') : '';
            } else {
                const newFavsArray = [...favsArray, postId];
                stringFavsArray = newFavsArray.join(',')
            }
            await modifyUserById({ favs: stringFavsArray }, userAuthenticated.id);
            onToggleFav?.(postId);
        } catch (error) {
            console.error("Error al actualizar favoritos:", error);
        }
    }

    if (!videoID) {
        return (
            <div className="thumbnail-card radius-1 p-2 flex column gap-1">
                <div className="placeholder-thumbnail radius-1 width-100 flex center">
                    <span>Sin miniatura</span>
                </div>
                <h6 className="size-3">{post.title}</h6>
                <span className="size-2 text-urban-gray">
                    {post.description
                        ? post.description.length > 100
                            ? post.description.slice(0, 100) + '...'
                            : post.description
                        : 'Sin descripción'}
                </span>
            </div>
        );
    }

    return (
        <div className="thumbnail-card bg-concrete-gray radius-1 flex column">
            <Link key={post.id} to={`/post/${post.id}`}>
                <img
                    src={thumbnailURL}
                    alt={post.title}
                    className="thumbnail-img width-100"
                    onError={handleError}
                    onLoad={handleLoad}
                />
            </Link>
            <div className='flex flex-1 column height-100 p-2 flex-between'>
                <Link key={post.id} to={`/post/${post.id}`}>
                    <div className='flex-1 height-100'>
                        <h6 className="size-2 text-warning-yellow">{post.title}</h6>
                        <span className="thumbnail-description size-2 text-black normal break-word">
                            {post.description
                                ? post.description.length > 100
                                    ? post.description.slice(0, 100) + '...'
                                    : post.description
                                : 'Sin descripción'}
                        </span>
                    </div>
                </Link>
                <div className='flex flex-between align-end'>
                    <span className="text-warning-yellow bold op-5">Publicado {time_ago}</span>
                    {userAuthenticated.user_type != 'invitado' && (
                        <button
                            onClick={() => toogleFav(post.id)}
                            title={favsArray.includes(post.id) ?
                                "Eliminar de Favoritos" :
                                "Agregar a Favoritos"
                            }
                            className='scale'
                        >
                            {favsArray.includes(post.id) ? (
                                <FaStar className='size-4 text-warning-yellow z-index-1' />
                            ) : (
                                <FaRegStar className='size-4 text-warning-yellow z-index-1' />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
}