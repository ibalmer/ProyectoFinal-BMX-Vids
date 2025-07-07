import { useState } from "react";
import { CommentsContext } from './CommentsContext'
import axios from "axios";

export function CommentsProvider({ children }) {

    const getCommentsByPostID = async (id) => {

        try {
            const res = await axios.get(`http://localhost:3048/comments/${id}`)
            console.log(res)
            return res
        } catch (error) {
            console.error('Error al cargar comentarios:', error)
        }
    };

    const createComment = async (newComment) => {

        try {
            const res = await axios.post('http://localhost:3048/comments', newComment)
        } catch (error) {
            console.error('Error al publicar el comentario:', error)
        }
    }

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
            createComment
        }}>
            {children}
        </CommentsContext.Provider>
    )
}