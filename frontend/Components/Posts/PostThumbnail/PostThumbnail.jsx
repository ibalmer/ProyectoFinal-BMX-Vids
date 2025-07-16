import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import './PostThumbnail.css';

export function PostThumbnail({ post }) {
    function getYouTubeID(url) {
        if (!url) return null;

        // Patrones más completos para detectar URLs de YouTube
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

    // Cadena de fallback para las miniaturas
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
            // Si no hay más opciones, usar una imagen placeholder
            setThumbnailURL('/placeholder-image.jpg');
        }
    }



    const time_ago = formatDistanceToNow(new Date(post.publish_date), {
        addSuffix: true, // agrega "hace" al resultado
        locale: es       // idioma español
    });

    function handleLoad(event) {
        const img = event.target;
        // Verificar si la imagen es muy pequeña (probablemente un placeholder/error de YouTube)
        if (img.naturalWidth < 100 || img.naturalHeight < 100) {
            handleError();
        } else {  
        }
    }

    // Si no hay video ID, mostrar placeholder directamente
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
            <img
                src={thumbnailURL}
                alt={post.title}
                className="thumbnail-img width-100"
                onError={handleError}
                onLoad={handleLoad}
            />
            <div className='flex flex-1 column height-100 p-2 '>
                <div className='flex-1 height-100'>
                    <h6 className="size-2 text-warning-yellow">{post.title}</h6>
                    <span className="thumbnail-description size-2 text-black normal">
                        {post.description
                            ? post.description.length > 100
                                ? post.description.slice(0, 100) + '...'
                                : post.description
                            : 'Sin descripción'}
                    </span>
                </div>
                <span className="text-warning-yellow bold op-5">Publicado {time_ago}</span>
            </div>
        </div>
    );
}