import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { UserContext } from "../../../Providers/Users/UserContext";
import { CommentsProvider } from "../../../Providers/Comments/CommentsProvider";
import { Comments } from "../../Comments/Comments";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaRegStar, FaStar } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { EditPost } from "../EditPost/EditPost";
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ConfirmAlert } from "../../ConfirmAlert/ConfirmAlert";


export function Post({onToggleFav}) {
    const { param } = useParams();
    const navigate = useNavigate();
    const { getPostByParams, deletePostById } = useContext(PostsContext);
    const { userAuthenticated, modifyUserById } = useContext(UserContext);

    const [post, setPost] = useState(null);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [publishDate, setPublishDate] = useState()
    const [favsArray, setFavsArray] = useState([])

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await getPostByParams(param);
                const fechaRaw = response.data?.data?.[0]?.publish_date;
                if (fechaRaw) {
                    setPublishDate(format(new Date(fechaRaw), "dd MMM yyyy", { locale: es }));
                }
                setPost(response.data);
            } catch (error) {
                console.error("Error al cargar el post:", error);
                setPost(null);
            }
        };
        getPost();
    }, [param]);

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

    const handleDeleteClick = (id) => {
        setPostIdToDelete(id);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setPostIdToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (postIdToDelete) {
            try {
                await deletePostById(postIdToDelete);
                setShowDeleteConfirm(false);
                setPostIdToDelete(null);
                navigate('/');
            } catch (error) {
                console.error('Error al eliminar el post:', error);
                alert('Hubo un error al eliminar el post.');
                setShowDeleteConfirm(false);
                setPostIdToDelete(null);
            }
        }
    };




    const handleEditClick = () => {
        setShowEditModal(true);
    };


    const handleSearchTag = (tag) => {
        navigate(`/search?filter=${tag}`);
    };

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



    return (
        <section className="flex flex-center align-center column p-2 gap-5">

            {userAuthenticated && userAuthenticated.user_type === 'admin' && post && (
                <div className="flex gap-1 flex-end">
                    <button className="rust-button" onClick={() => handleDeleteClick(post.data[0].id)}>
                        <MdDelete /> Eliminar Post
                    </button>
                    <button className="street-blue-button" onClick={handleEditClick}>
                        <FaEdit /> Editar Post
                    </button>
                </div>
            )}
            {post ? (

                <div className="flex column gap-2">
                    <h2 className="post-title text-street-blue">{post.data[0].title}</h2>
                    <h5 className="text-street-blue op-75 size-2">{post.data[0].description}</h5>
                    <div className='flex flex-between align-center m-bottom-4 border-bottom-3 p-bottom-4 bc-coal-black'>
                        {publishDate && (
                            <p className="text-rust-red bold capitalize">{publishDate}</p>
                        )}
                        {userAuthenticated.user_type != 'invitado' && (
                            <button
                                onClick={() => toogleFav(post.data[0].id)}
                                title={favsArray.includes(post.data[0].id) ?
                                    "Eliminar de Favoritos" :
                                    "Agregar a Favoritos"
                                }
                                className='scale'
                            >
                                {favsArray.includes(post.data[0].id) ? (
                                    <FaStar className='size-4 text-warning-yellow z-index-1' />
                                ) : (
                                    <FaRegStar className='size-4 text-warning-yellow z-index-1' />
                                )}
                            </button>
                        )}
                    </div>

                    {post.data[0].video_link && (
                        <div className="iframe-content">
                            <iframe
                                className="absolute top-0 left-0 width-100 height-100 radius-1"
                                src={post.data[0].video_link.replace("watch?v=", "embed/")}
                                title="Video de YouTube"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                    <h5 className="post-content text-coal-black size-3 m-block-4 border-top-3 p-top-4 bc-coal-black">{post.data[0].content}</h5>
                    {post.data[0].tags && (
                        <div className="flex gap-3 m-bottom-4 bold capitalize border-bottom-3 p-bottom-4 bc-coal-black">
                            <IoIosPricetags size={36} className="text-street-blue" />
                            <div>
                                {
                                    post.data[0].tags.split(',').map((tag, index, arr) => (
                                        <span key={tag.trim()}>
                                            <button className="rust-button" onClick={() => handleSearchTag(tag.trim())}>
                                                {tag.trim()}
                                            </button>
                                            {index < arr.length - 1 && ' · '}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                    <CommentsProvider>
                        <Comments key={post.data[0].title} id={post.data[0].id} />
                    </CommentsProvider>
                </div>
            ) : (
                <p>Cargando post...</p>
            )}

            {showDeleteConfirm && (
                <ConfirmAlert question={'Estás seguro de que quieres eliminar este post?'} infoMessage={'Esta acción es permanente y no se puede deshacer.'} confirm={handleConfirmDelete} cancel={handleCancelDelete} />
            )}

            {showEditModal && (
                <EditPost
                    setShowEditModal={setShowEditModal}
                    post={post}
                />
            )}



        </section>
    );
}
