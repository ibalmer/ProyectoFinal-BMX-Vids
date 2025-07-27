import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { UserContext } from "../../../Providers/Users/UserContext";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

export function CreatePost({ setShowCreateModal }) {
    const { createPost } = useContext(PostsContext);
    const { userAuthenticated } = useContext(UserContext);
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

    const sendData = async (e) => {
        e.preventDefault();

        if (newPost.content.length < 20) {
            alert("El contenido debe tener al menos 20 caracteres");
            return;
        }

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
        } catch (error) {
            console.error("Error al crear el post:", error);
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
                            required
                            className="concrete-input"
                        />
                        <label className="size-2 bold" htmlFor="description">Descripción</label>
                        <textarea
                            name="description"
                            placeholder="Descripción"
                            rows="4"
                            onChange={handleChange}
                            value={newPost.description}
                            required
                            className="concrete-input"
                        />
                        <label className="size-2 bold" htmlFor="content">Contenido</label>
                        <textarea
                            name="content"
                            placeholder="Contenido"
                            rows="4"
                            onChange={handleChange}
                            value={newPost.content}
                            required
                            className="concrete-input"
                        />
                        <label className="size-2 bold" htmlFor="video_link">Enlace del video (YouTube)</label>
                        <input
                            type="url"
                            name="video_link"
                            placeholder="Enlace del video (YouTube)"
                            onChange={handleChange}
                            value={newPost.video_link}
                            required
                            className="concrete-input"
                        />
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
                                required
                                className="concrete-input"
                            >
                                <option value="" disabled className="text-off-white">Seleccionar Categoría</option>
                                <option value="1">Full Video</option>
                                <option value="2">Web Video</option>
                                <option value="3">Event Video</option>
                            </select>
                        </div>
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
                <div className="modal-overlay">
                    <div className="register-alert text-center width-content justify-self-center">
                        <h3 className="size-4 bold text-warning-yellow">¡Post creado con éxito!</h3>
                        <p className="size-3 text-warning-yellow">Tu contenido ha sido publicado</p>
                        <button
                            className="rust-button m-top-2 width-content"
                            onClick={() => {
                                setPostAlert(false);
                                navigate(`/post/${createdPostId}`);
                            }}
                            title='Ver Post'
                        >
                            Ver post
                        </button>
                    </div>
                    <div className="register-backdrop"></div>
                </div>
            )}
        </section>
    );
}
