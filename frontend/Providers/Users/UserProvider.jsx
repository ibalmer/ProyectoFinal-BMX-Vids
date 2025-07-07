/* import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export function UserProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [userAuthenticated, setUserAuthenticated] = useState({
        id:null,
        user_name: null,
        name: null,
        last_name: null,
        email: null,
        user_type: 'invitado'
    })

    const getUsers = async ({ limit = 20, offset = 0 }) => {
        try {
            const res = await axios.get('http://localhost:3048/Users', {
                params: { limit, offset }
            });
            return (res.data);
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        } finally {
            setLoading(false);
        }
    };
    const getUserById = async (Id) => {

        try {
            const res = await axios.get(`http://localhost:3048/users/${id}`)

            return res
        } catch (error) {
            console.error('Error al cargar el Usuario:', error)
        }
    };

    const createUser = async (newUser) => {
        try {
            const res = await axios.post("http://localhost:3048/users", newUser);

            if (!res.data || typeof res.data !== "object") {
                console.warn("La respuesta no contiene un Usuario válido:", res.data);
                return;
            }

            return res.data;
        } catch (err) {
            console.error("Error al crear post:", err.response?.data || err.message);
            throw err;
        }
    };

    const loginUser = async (userLogin) => {
        try {
            const res = await axios.post('http://localhost:3048/users/login', userLogin)
            console.log(res.data)

            if (!res.data || typeof res.data !== "object") {
                console.warn("La respuesta no contiene un Usuario válido:", res.data);
                return;
            }
            setUserAuthenticated({
                id: res.data.data.id,
                user_name: res.data.data.user_name,
                name: res.data.data.name,
                last_name: res.data.data.last_name,
                email: res.data.data.email,
                user_type: res.data.data.user_type
            })
            console.log(userAuthenticated)
            return res.data;

        } catch (err) {
            console.error("Error al ingresar el usuario:", err.response?.data || err.message);
            throw err;
        }
    };

    return (
        <UserContext.Provider value={{
            loading,
            userAuthenticated,
            setUserAuthenticated,
            getUsers,
            getUserById,
            createUser,
            loginUser
        }}>
            {children}
        </UserContext.Provider>
    );
}
 */

import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export function UserProvider({ children }) {
    const [loading, setLoading] = useState(true);

    const [userAuthenticated, setUserAuthenticated] = useState(() => {
        const storedUser = localStorage.getItem("userAuthenticated");
        return storedUser
            ? JSON.parse(storedUser)
            : {
                  id: null,
                  user_name: null,
                  name: null,
                  last_name: null,
                  email: null,
                  user_type: 'invitado'
              };
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("userAuthenticated");
        if (storedUser) {
            setUserAuthenticated(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const getUsers = async ({ limit = 20, offset = 0 }) => {
        try {
            const res = await axios.get('http://localhost:3048/Users', {
                params: { limit, offset }
            });
            return res.data;
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const getUserById = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3048/users/${id}`);
            return res;
        } catch (error) {
            console.error('Error al cargar el Usuario:', error);
        }
    };

    const createUser = async (newUser) => {
        try {
            const res = await axios.post("http://localhost:3048/users", newUser);

            if (!res.data || typeof res.data !== "object") {
                console.warn("La respuesta no contiene un Usuario válido:", res.data);
                return;
            }

            return res.data;
        } catch (err) {
            console.error("Error al crear usuario:", err.response?.data || err.message);
            throw err;
        }
    };

    const loginUser = async (userLogin) => {
        try {
            const res = await axios.post('http://localhost:3048/users/login', userLogin);
            const user = res.data.data;

            if (!user || typeof user !== "object") {
                console.warn("La respuesta no contiene un Usuario válido:", res.data);
                return;
            }

            setUserAuthenticated(user);
            localStorage.setItem("userAuthenticated", JSON.stringify(user));

            return user;
        } catch (err) {
            console.error("Error al ingresar el usuario:", err.response?.data || err.message);
            throw err;
        }
    };

    const logoutUser = () => {
        localStorage.removeItem("userAuthenticated");
        setUserAuthenticated({
            id: null,
            user_name: null,
            name: null,
            last_name: null,
            email: null,
            user_type: 'invitado'
        });
    };

    return (
        <UserContext.Provider
            value={{
                loading,
                userAuthenticated,
                setUserAuthenticated,
                getUsers,
                getUserById,
                createUser,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
