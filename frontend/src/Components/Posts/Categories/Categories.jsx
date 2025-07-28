import { useContext, useEffect, useState } from "react";
import { scrollToHeader } from "../../../Utils/scrollToHeader";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { useParams } from "react-router-dom";
import { PostThumbnail } from "../PostThumbnail/PostThumbnail";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

export function Category() {
    const { param } = useParams();
    const { getPostsByParams } = useContext(PostsContext);

    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 12;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setOffset(0);
    }, [param]);

    useEffect(() => {
        scrollToHeader();
    }, [offset])

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await getPostsByParams(param, { limit, offset });
            setPosts(response.data || []);
            setTotal(response.total || 0);
        };
        fetchCategory();
    }, [param, offset, getPostsByParams]);

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (page) => {
        setOffset((page - 1) * limit);
    };

    return (
        <section className="flex flex-center align-center column p-1 gap-5">
            <div className="flex flex-center align-center wrap width-100 gap-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostThumbnail
                            key={post.id}
                            post={post}
                        />
                    ))
                ) : (
                    <h3>No hay resultados.</h3>
                )}
            </div>
            {offset === 0 && offset + limit >= total ?
                (null) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setOffset(offset - limit)}
                            disabled={offset === 0}
                            className={`street-blue-button ${offset === 0 ? 'op-5 not-allowed' : ''}`}
                            title='Arterior'
                        >
                            <MdOutlineArrowBackIos className="size-2 flex flex-center align-center" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                disabled={currentPage === i + 1}
                                className={`size-2 flex flex-center align-center ${currentPage === i + 1 ? 'selected-page' : 'rust-button'}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setOffset(offset + limit)}
                            disabled={offset + limit >= total}
                            className={`street-blue-button ${offset + limit >= total ? 'op-5 not-allowed' : ''}`}
                            title='Siguiente'
                        >
                            <MdOutlineArrowForwardIos className="size-2 flex flex-center align-center" />
                        </button>
                    </div>
                )}
        </section>
    );
}