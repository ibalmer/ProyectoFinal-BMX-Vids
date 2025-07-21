import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Providers/Users/UserContext";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { PostThumbnail } from "../../Posts/PostThumbnail/PostThumbnail";

export function Favorites() {

    const { getPostByParams } = useContext(PostsContext);
    const { userAuthenticated } = useContext(UserContext)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (!userAuthenticated?.favs) {
            setPosts([]); 
            return;
        }

        const favsArray = userAuthenticated.favs
            .split(",")
            .map(id => Number(id.trim()))
            .filter(id => !isNaN(id) && id > 0);

        if (favsArray.length === 0) {
            setPosts([]);
            return;
        }

        const fetchAllPosts = async () => {
            const postsData = await Promise.allSettled(
                favsArray.map(id =>
                    getPostByParams(id).catch(error => {
                        console.error(`Error al cargar el post ${id}:`, error);
                        return null;
                    })
                )
            );

            const cleanData = postsData
                .filter(result => result.status === "fulfilled" && result.value?.data)
                .map(result => result.value.data);

            setPosts(cleanData);
        };

        fetchAllPosts();
    }, [userAuthenticated?.favs, getPostByParams]);

    function handleToggleFav(postId) {
        setPosts(prevPosts => prevPosts.filter(post => {
            const actualPostId = post.data ? post.data[0]?.id : post.id;
            return actualPostId !== postId;
        }));
    }

    return (
        <section className="flex flex-center align-center column p-5 gap-5">
            <div className="flex flex-center align-center wrap gap-6">
                {posts.length > 0 ? posts.map((post) => {
                    const postData = post.data ? post.data[0] : post;
                    
                    return (
                        <PostThumbnail
                            key={postData.id}
                            post={postData}
                            onToggleFav={handleToggleFav}
                        />
                    );
                }) : <p>No hay resultados.</p>}
            </div>
        </section>
    )
}