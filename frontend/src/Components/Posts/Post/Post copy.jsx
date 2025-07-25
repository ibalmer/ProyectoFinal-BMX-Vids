import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { UserContext } from "../../../Providers/Users/UserContext";
import { CommentsProvider } from "../../../Providers/Comments/CommentsProvider";
import { Comments } from "../../Comments/Comments";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";
import { EditPost } from "../EditPost/EditPost";
import { format } from 'date-fns'
import { es } from 'date-fns/locale'


export function Post() {
    const { param } = useParams();
    const navigate = useNavigate();
    const { getPostByParams, deletePostById, modifyPostById } = useContext(PostsContext);
    const { userAuthenticated } = useContext(UserContext);

    const [post, setPost] = useState(null);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [editTags, setEditTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [showEditConfirm, setShowEditConfirm] = useState(false);
    const [publishDate, setPublishDate] = useState()

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
        setEditForm({});
        setEditTags(post.data[0].tags?.split(',').map(t => t.trim()) || []);
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !editTags.includes(trimmed)) {
            setEditTags(prev => [...prev, trimmed]);
        }
        setTagInput('');
    };

    const handleRemoveTag = (index) => {
        const updated = [...editTags];
        updated.splice(index, 1);
        setEditTags(updated);
    };

    const handleSearchTag = (tag) => {
        navigate(`/search?filter=${tag}`);
    };

    const handleSubmitEdit = () => {
        setShowEditConfirm(true);
    };

    const handleConfirmEdit = async () => {
        const original = post.data[0];
        const modifiedFields = {};

        if (editForm.title && editForm.title !== original.title) modifiedFields.title = editForm.title;
        if (editForm.description && editForm.description !== original.description) modifiedFields.description = editForm.description;
        if (editForm.content && editForm.content !== original.content) modifiedFields.content = editForm.content;
        if (editForm.video_link && editForm.video_link !== original.video_link) modifiedFields.video_link = editForm.video_link;
        if (editForm.type_id && Number(editForm.type_id) !== original.type_id)
            modifiedFields.type_id = Number(editForm.type_id);


        const currentTags = original.tags?.split(',').map(t => t.trim()).join(',') || '';
        const newTags = editTags.join(',');
        if (newTags !== currentTags) modifiedFields.tags = newTags;

        if (Object.keys(modifiedFields).length === 0) {
            alert("No se modificó ningún campo.");
            setShowEditConfirm(false);
            return;
        }

        try {
            console.log("Enviando a modifyPostById:", modifiedFields, original.id);
            await modifyPostById(modifiedFields, original.id);
            setShowEditModal(false);
            setShowEditConfirm(false);
            navigate(0); // recarga
        } catch (err) {
            console.log("Enviando a modifyPostById:", modifiedFields, original.id);
            console.error("Error al modificar el post:", err?.response?.data || err?.message || err);
            alert("Error al modificar el post.");
        }
    };

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
                    <h2 className="text-street-blue">{post.data[0].title}</h2>
                    <h5 className="text-street-blue op-75 size-2">{post.data[0].description}</h5>
                    {publishDate && (
                        <p className="text-rust-red m-bottom-4 bold capitalize border-bottom-3 p-bottom-4 bc-coal-black">{publishDate}</p>
                    )}
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
                    <h5 className="text-coal-black size-3 m-block-4 border-top-3 p-top-4 bc-coal-black">{post.data[0].content}</h5>
                    {post.data[0].tags && (
                        <div className="flex gap-3 m-bottom-4 bold capitalize border-bottom-3 p-bottom-4 bc-coal-black">
                            <IoIosPricetags size={36} className="text-street-blue"/>
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
                <div className="modal-overlay">
                    <div className="register-alert">
                        <h3 className="size-4 bold text-warning-yellow">¿Estás seguro de que quieres eliminar este post?</h3>
                        <p className="size-3 text-warning-yellow">Esta acción es permanente y no se puede deshacer.</p>
                        <div className="flex gap-2 m-top-2 flex-center">
                            <button className="street-blue-button" onClick={handleConfirmDelete}><IoCheckmarkSharp /></button>
                            <button className="rust-button" onClick={handleCancelDelete}><IoCloseSharp /></button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <EditPost
                    setShowEditModal={setShowEditModal}
                    post={post}
                    handleEditChange={handleEditChange}
                    handleAddTag={handleAddTag}
                    handleRemoveTag={handleRemoveTag}
                    handleSubmitEdit={handleSubmitEdit}
                    editTags={editTags}
                    tagInput={tagInput}
                    setTagInput={setTagInput}
                    editForm={editForm}
                />
            )}


            {showEditConfirm && (
                <div className="modal-overlay">
                    <div className="register-alert">
                        <h3 className="size-4 bold text-warning-yellow">¿Guardar los cambios en este post?</h3>
                        <p className="size-3 text-warning-yellow">Esta acción sobrescribirá la información anterior.</p>
                        <div className="flex gap-2 m-top-2 flex-center">
                            <button className="street-blue-button" onClick={handleConfirmEdit}><IoCheckmarkSharp /></button>
                            <button className="rust-button" onClick={() => setShowEditConfirm(false)}><IoCloseSharp /></button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
