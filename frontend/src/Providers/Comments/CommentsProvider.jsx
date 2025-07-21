import { useState } from "react";
import { CommentsContext } from './CommentsContext'
import axios from "axios";

export function CommentsProvider({ children }) {

    const getCommentsByPostID = async (id) => {

        try {
            const res = await axios.get(`http://localhost:3048/comments/post/${id}`)
            return res
        } catch (error) {
            console.error('Error al cargar comentarios:', error)
        }
    };

    const createComment = async (newComment) => {
        console.log(newComment)
        try {
            const res = await axios.post('http://localhost:3048/comments', newComment)
        } catch (error) {
            console.error('Error al publicar el comentario:', error)
        }
    }

    const modifyCommentById = async (commentData, id) => {
        const isFullUpdate = ['id', 'content', 'user_id']
            .every(key => key in commentData);

        const url = `http://localhost:3048/comments/${id}`


        try {
            const res = await axios[isFullUpdate ? "put" : "patch"](url, commentData);
            if (!res.data || typeof res.data !== "object") {
                console.warn("Respuesta no válida:", res.data);
                return;
            }
            return res.data;
        } catch (err) {
            console.error("Error al modificar el comentario:", err.response?.data || err.message);
            throw err;
        }
    };


    const deleteCommentByID = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3048/comments/${id}`)
            return res
        } catch (error) {
            console.error('Error al cargar el post:', error)
        }
    };

    return (
        <CommentsContext.Provider value={{
            getCommentsByPostID,
            deleteCommentByID,
            modifyCommentById,
            createComment
        }}>
            {children}
        </CommentsContext.Provider>
    )
}