/* import { useContext } from "react";
import { PostsContext } from "../../Providers/PostProvider/PostContext";
import { Link } from "react-router-dom";

export function Posts() {
    const { posts } = useContext(PostsContext);
    console.log('los posts', posts)
    return (
        <>
            <h2>Posts</h2>
            {posts && posts?.data?.map((item) => (
                <Link key={item.id} to={`/posts/${item.id}`}>
                    <h5>{item.title}</h5>
                </Link>
            ))}
        </>
    );
};
 */

import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../Providers/PostProvider/PostContext";
import { Link } from "react-router-dom";

export function Posts() {
    const { posts, getPosts } = useContext(PostsContext);

    const limit = 10;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getPosts({ limit, offset });
    }, [offset]);

    const total = posts?.total || 0;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (page) => {
        setOffset((page - 1) * limit);
    };

    return (
        <>
            <h2>Posts</h2>

            {posts?.data?.map((item) => (
                <Link key={item.id} to={`/post/${item.id}`}>
                    <h5>{item.title}</h5>
                </Link>
            ))}

            <div style={{ marginTop: '1rem' }}>
                <button
                    onClick={() => setOffset(offset - limit)}
                    disabled={offset === 0}
                >
                    Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={currentPage === i + 1}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setOffset(offset + limit)}
                    disabled={offset + limit >= total}
                >
                    Siguiente
                </button>
            </div>
        </>
    );
}
