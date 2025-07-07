import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { UserContext } from "../../../Providers/Users/UserContext";

export function CreatePost() {
    const { createPost } = useContext(PostsContext);
    const { userAuthenticated } = useContext(UserContext)
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewPost(prev => ({
            ...prev,
            [name]: name === "user_id" ? parseInt(value) : value
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
                navigate(`/post/${insertId}`);
            } else {
                alert("Post creado pero no se recibió el ID");
            }

        } catch (error) {
            console.error("Error al crear el post:", error);
        }
    };



    return (
        <>
            <h2>Crear Post</h2>
            {userAuthenticated.user_type === 'admin' ? (
                <form onSubmit={sendData}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        onChange={handleChange}
                        value={newPost.title}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        rows="4"
                        onChange={handleChange}
                        value={newPost.description}
                        required
                    />

                    <textarea
                        name="content"
                        placeholder="Contenido"
                        rows="4"
                        onChange={handleChange}
                        value={newPost.content}
                        required
                    />

                    <input
                        type="url"
                        name="video_link"
                        placeholder="Enlace del video (YouTube)"
                        onChange={handleChange}
                        value={newPost.video_link}
                        required
                    />

                    <h3>Tags</h3>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="Agregar tag"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <button type="button" onClick={handleAddTag}>
                            Agregar tag
                        </button>
                    </div>

                    <ul>
                        {newPost.tags
                            .split(',')
                            .map(tag => tag.trim())
                            .filter(tag => tag !== '')
                            .map((tag, index) => (
                                <li key={index}>
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(index)}
                                        style={{ marginLeft: '0.5rem' }}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                    </ul>

                    <select
                        name="type_id"
                        value={newPost.type_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar tipo de video</option>
                        <option value="1">Full Video</option>
                        <option value="2">Web Video</option>
                        <option value="3">Event Video</option>
                    </select>

                    <button type="submit">Crear Post</button>
                </form>
            ) : (
                <h2>No tenes permisos para crear un posteo</h2>
            )}
        </>
    )
};