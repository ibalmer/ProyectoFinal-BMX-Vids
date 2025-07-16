import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { Link } from "react-router-dom";
import { PostThumbnail } from "../PostThumbnail/PostThumbnail";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";


export function Posts() {
    const { posts, getPosts } = useContext(PostsContext);

    const limit = 12;
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
        <section className="flex flex-center align-center column">
            <div className="flex flex-center align-center wrap gap-6">
                {posts?.data?.map((item) => (
                    <Link key={item.id} to={`/post/${item.id}`}>
                        <div>
                            <PostThumbnail post={item} />
                        </div>
                    </Link>
                ))}

            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setOffset(offset - limit)}
                    disabled={offset === 0}
                    className='street-blue-button'
                >
                    <MdOutlineArrowBackIos className="size-2 flex flex-center align-center" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={currentPage === i + 1}
                        className="rust-button size-2 flex flex-center align-center"
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setOffset(offset + limit)}
                    disabled={offset + limit >= total}
                    className='street-blue-button'
                >
                    <MdOutlineArrowForwardIos className="size-2 flex flex-center align-center" />
                </button>
            </div>
        </section>
    );
}
