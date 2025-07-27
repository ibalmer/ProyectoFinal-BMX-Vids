import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { UserContext } from "../../../Providers/Users/UserContext";
import { ConfirmAlert } from "../../ConfirmAlert/ConfirmAlert";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

export function CreatePost({ setShowCreateModal }) {
    const { createPost } = useContext(PostsContext);
    const { userAuthenticated } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        content: '',
        video_link: '',
        tags: '',
        type_id: ''
    });

    const [tagInput, setTagInput] = useState('');
    const [postAlert, setPostAlert] = useState(false);
    const [createdPostId, setCreatedPostId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: name === "user_id" || name === "type_id" ? parseInt(value) : value
        }));
    };

    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed) return;

        const currentTags = newPost.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        if (!currentTags.includes(trimmed)) {
            const updatedTags = [...currentTags, trimmed].join(', ');
            setNewPost(prev => ({
                ...prev,
                tags: updatedTags
            }));
        }
        setTagInput('');
    };

    const handleRemoveTag = (indexToRemove) => {
        const updatedTags = newPost.tags
            .split(',')
            .map(tag => tag.trim())
            .filter((tag, index) => index !== indexToRemove)
            .join(', ');

        setNewPost(prev => ({
            ...prev,
            tags: updatedTags
        }));
    };

    const handleConfirm = () => {
        setPostAlert(false);
        setShowCreateModal(false)
        navigate(`/post/${createdPostId}`);
    };

    const handleCancel = () => {
        setPostAlert(false)
        setShowCreateModal(false)
    };

    const sendData = async (e) => {
        e.preventDefault();

        const postToSend = {
            ...newPost,
            author: userAuthenticated.user_name,
            user_id: userAuthenticated.id
        };
        try {
            const response = await createPost(postToSend);
            const insertId = response?.data?.[0]?.insertId;
            if (insertId) {
                setCreatedPostId(insertId);
                setPostAlert(true);
            } else {
                alert("Post creado pero no se recibió el ID");
            }
        } catch (err) {
            setErrors(err.response.data.errors)
            console.error("Error al crear el post:", err);
        }
    };

    return (
        <section className="modal-overlay">
            <div className="edit-box">
                <h2>Crear Post</h2>
                {userAuthenticated.user_type === 'admin' ? (
                    <form className="flex gap-1 column" onSubmit={sendData}>
                        <label className="size-2 bold" htmlFor="title">Título</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Título"
                            onChange={handleChange}
                            value={newPost.title}
                            className="concrete-input"
                        />
                        {errors.find(e => e.title) && (
                            <p className="bold text-alert-red">{errors.find(e => e.title).title}</p>
                        )}

                        <label className="size-2 bold" htmlFor="description">Descripción</label>
                        <textarea
                            name="description"
                            placeholder="Descripción"
                            rows="2"
                            onChange={handleChange}
                            value={newPost.description}                           
                            className="concrete-input"
                        />
                        {errors.find(e => e.description) && (
                            <p className="bold text-alert-red">{errors.find(e => e.description).description}</p>
                        )}

                        <label className="size-2 bold" htmlFor="content">Contenido</label>
                        <textarea
                            name="content"
                            placeholder="Contenido"
                            rows="3"
                            onChange={handleChange}
                            value={newPost.content}                          
                            className="concrete-input"
                        />
                        {errors.find(e => e.content) && (
                            <p className="bold text-alert-red">{errors.find(e => e.content).content}</p>
                        )}

                        <label className="size-2 bold" htmlFor="video_link">Enlace del video (YouTube)</label>
                        <input
                            type="url"
                            name="video_link"
                            placeholder="Enlace del video (YouTube)"
                            onChange={handleChange}
                            value={newPost.video_link}
                            className="concrete-input"
                        />
                        {errors.find(e => e.video_link) && (
                            <p className="bold text-alert-red">{errors.find(e => e.video_link).video_link}</p>
                        )}

                        <div className="flex gap-1 column">
                            <div className="flex gap-1">
                                <label className="size-2 bold" htmlFor="tag">Tag</label>
                                <input
                                    type="text"
                                    name="tag"
                                    placeholder="Agregar tag"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    className="concrete-input"
                                />
                                <button className="street-blue-button flex align-center" type="button" title='Agregar Tag' onClick={handleAddTag}>
                                    <FaPlus /> tag
                                </button>
                            </div>
                            {errors.find(e => e.tags) && (
                                <p className="bold text-alert-red">{errors.find(e => e.tags).tags}</p>
                            )}
                            <ul className="flex gap-1 wrap">
                                {newPost.tags
                                    .split(',')
                                    .map(tag => tag.trim())
                                    .filter(tag => tag !== '')
                                    .map((tag, index) => (
                                        <li className="flex gap-1 align-center" key={index}>
                                            <p className="bold size-2">{tag}</p>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(index)}
                                                className="rust-button"
                                                title='Eliminar Tag'
                                            >
                                                <IoCloseSharp />
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        <div className="flex gap-1">
                            <label className="size-2 bold" htmlFor="type_id">Categoría</label>
                            <select
                                name="type_id"
                                value={newPost.type_id}
                                onChange={handleChange}
                                
                                className="concrete-input"
                            >
                                <option value="" disabled className="text-off-white">Seleccionar Categoría</option>
                                <option value="1">Full Video</option>
                                <option value="2">Web Video</option>
                                <option value="3">Event Video</option>
                            </select>
                        </div>
                        {errors.find(e => e.type_id) && (
                            <p className="bold text-alert-red">Selecciona una categoria</p>
                        )}

                        <div className="flex gap-1 m-top-2">
                            <button className="street-blue-button width-content" title='Crear Post' type="submit">Crear Post</button>
                            <button
                                type="button"
                                className="rust-button width-content"
                                title="Cancelar"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>

                ) : (
                    <h2>No tenés permisos para crear un posteo</h2>
                )}
            </div>

            {postAlert && (
                <ConfirmAlert question={'Ver post?'} infoMessage={'¡Tu contenido ha sido publicado!'} confirm={handleConfirm} cancel={handleCancel} />

            )}
        </section>
    );
}
