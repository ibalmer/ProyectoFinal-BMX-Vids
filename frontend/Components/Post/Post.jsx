import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../Providers/PostProvider/PostContext";

export function Post() {
    const { param } = useParams();
    const { getPostByParams } = useContext(PostsContext);
    const [post, setPost] = useState(null);


    useEffect(() => {

        const getPost = async () => {
            const response = await getPostByParams(param);
            setPost(response.data);
        };
        console.log(post)
        getPost();
    }, [param]);

    return (
        <div>
            <h1>Post</h1>
            {post ? (
                <>
                    <h2>{post.data[0].title}</h2>
                    {post.data[0].video_link && (
                        <div style={{ marginTop: "1rem" }}>
                            <iframe
                                width="560"
                                height="315"
                                src={post.data[0].video_link.replace("watch?v=", "embed/")}
                                title="Video de YouTube"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                />
                        </div>
                    )}
                    <h5>Tags:{post.data[0].tags?.split(",").join(" · ")}</h5>
                    <h5>{post.data[0].description}</h5>
                </>
            ) : (
                <p>Cargando post...</p>
            )}
        </div>
    );
};