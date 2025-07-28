import { useState, useEffect } from 'react';

export const useYouTubeThumbnail = (videoUrl, placeholderImage = '/placeholder-image.jpg') => {
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
    const videoID = getYouTubeID(videoUrl);
    const fallbackChain = videoID ? [
        `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/sddefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${videoID}/default.jpg`,
    ] : [];
    const [thumbnailURL, setThumbnailURL] = useState(fallbackChain[0] || placeholderImage);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        const newVideoID = getYouTubeID(videoUrl);
        const newFallbackChain = newVideoID ? [/* URLs de fallback */] : [];

        setThumbnailURL(newFallbackChain[0] || placeholderImage);
        setCurrentIndex(0); 
    }, [videoUrl, placeholderImage]); 
    function handleError() {
        const nextIndex = currentIndex + 1;
        const nextURL = fallbackChain[nextIndex];

        if (nextURL) {
            setThumbnailURL(nextURL);
            setCurrentIndex(nextIndex);
        } else {
            setThumbnailURL(placeholderImage);
        }
    }
    function handleLoad(event) {
        const img = event.target;
        if (img.naturalWidth < 100 || img.naturalHeight < 100) {
            handleError();
        }
    }

    function resetThumbnail() {
        const newVideoID = getYouTubeID(videoUrl);
        const newFallbackChain = newVideoID ? [
            `https://img.youtube.com/vi/${newVideoID}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${newVideoID}/sddefault.jpg`,
            `https://img.youtube.com/vi/${newVideoID}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${newVideoID}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${newVideoID}/default.jpg`,
        ] : [];

        setThumbnailURL(newFallbackChain[0] || placeholderImage);
        setCurrentIndex(0);
    }
    return {
        thumbnailURL,
        handleError,
        handleLoad,
        resetThumbnail,
        videoID
    };
};