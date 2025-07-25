import { useState, useEffect, useContext } from "react";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { PostCard } from "./PostCard/PostCard";

export function LatestPostsByCategory({ category }) {
    const { getPostsByParams } = useContext(PostsContext);
    const [posts, setPosts] = useState([]);
    const limit = 4;
    const offset = 0;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('Cargando posts para categoría:', category);
                const result = await getPostsByParams(category, { limit, offset });
                setPosts(result.data);
            } catch (error) {
                console.error('Error al cargar posts:', error);
                setPosts([]);
            }
        };

        if (category) {
            fetchPosts();
        }
    }, [category, getPostsByParams, limit, offset]);

    return (
        <div className="flex flex-center align-center border-bottom-3 bc-rust-red column m-top-4 width-100 m-block-2 m-bottom-2 p-block-2">
            <p className="text-coal-black bold size-3 m-bottom-4 capitalize">{category}</p>
            <div className="flex gap-2 flex-around">
                {posts && posts.length > 0 && posts.map((post) => (
                    <>
                    <PostCard key={post.id} post={post} />
                    </>
                ))}
            </div>
        </div>
    );
}