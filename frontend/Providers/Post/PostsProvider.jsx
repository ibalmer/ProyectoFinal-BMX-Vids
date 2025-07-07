import { useState } from "react";
import { PostsContext } from './PostContext'
import axios from "axios";



export function PostsProvider({ children }) {
    const [posts, setPosts] = useState()
    const [loading, setLoading] = useState(true)


    const getPosts = async ({ limit = 10, offset = 0 }) => {
        try {
            const res = await axios.get('http://localhost:3048/posts', {
                params: { limit, offset }
            });
            setPosts(res.data);
        } catch (error) {
            console.error('Error al cargar los posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPostByParams = async (param) => {

        try {
            const res = await axios.get(`http://localhost:3048/post/${param}`)

            return res
        } catch (error) {
            console.error('Error al cargar el post:', error)
        }
    };
    const getPostsByParams = async (param, { limit = 10, offset = 0 }) => {
        try {
            const res = await axios.get(`http://localhost:3048/posts/${param}`, {
                params: { limit, offset }
            });
            return res.data;
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
            return { data: [], total: 0 };
        }
    };

    const getPostsByFilters = async (filter, { limit = 10, offset = 0 }) => {
        try {
            const res = await axios.get('http://localhost:3048/posts', {
                params: { filter, limit, offset }
            });
            return res.data;
        } catch (error) {
            console.error('Error al cargar los posts filtrados:', error);
            return { data: [], total: 0 };
        }
    };

    const createPost = async (newPost) => {
        try {
            const res = await axios.post("http://localhost:3048/post", newPost);

            if (!res.data || typeof res.data !== "object") {
                console.warn("La respuesta no contiene un post válido:", res.data);
                return;
            }

            return res.data;
        } catch (err) {
            console.error("Error al crear post:", err.response?.data || err.message);
            throw err;
        }
    };

    const deletePostById = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3048/post/${id}`)
            return res
        }catch (error) {
            console.error('Error al cargar el post:', error)
        }
    };

    return (
        <PostsContext.Provider value={{
            posts,
            loading,
            getPosts,
            getPostsByParams,
            getPostByParams,
            getPostsByFilters,
            createPost,
            deletePostById
        }}>
            {children}
        </PostsContext.Provider>
    );
};



