import { useEffect, useContext, useState } from "react"
import { PostsContext } from "../../../Providers/Post/PostContext";


export function Home() {
    const { posts, getPosts } = useContext(PostsContext);
    const [selectedPost, setSelectedPost] = useState(3)

    const limit = 5
    const offset = 0

    useEffect(() => {
        getPosts({ limit, offset });
    }, []);

    return (
        <>
            <section>
                {posts?.data?.map((item, index) => (
                    index === selectedPost && (
                        <div key={index}>
                            <div style={{ position: "relative" }}>
                                
                                <iframe
                                    width="560"
                                    height="315"
                                    src={item.video_link.replace("watch?v=", "embed/")}
                                    title="Video de YouTube"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ pointerEvents: "none" }} 
                                />
                                <div className="block-clicks" />
                            </div>                            <iframe

                            />


                        </div>
                    )
                ))}
            </section>
        </>
    )
}