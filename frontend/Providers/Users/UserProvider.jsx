import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export function UserProvider({ children }) {
    const [loading, setLoading] = useState(true);

    const [userAuthenticated, setUserAuthenticated] = useState({
        id: null,
        user_name: null,
        name: null,
        last_name: null,
        email: null,
        user_type: 'invitado'
    });

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
            const res = await axios.post("http://localhost:3048/users/register", newUser);

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
            const res = await axios.post('http://localhost:3048/users/login', userLogin, {
                withCredentials: true
            });
            const user = res.data.data;

            if (!user || typeof user !== "object") {
                console.warn("La respuesta no contiene un Usuario válido:", res.data);
                return;
            }
            const authData = await axios.get('http://localhost:3048/users/auth', { withCredentials: true })

            const authUserData = authData.data.data

            if (user.id === authUserData.id) {
                const authUser = {
                    ...user,
                    ...authUserData
                };
                setUserAuthenticated(authUser);
                return authUser;
            }

        } catch (err) {
            console.error("Error al ingresar el usuario:", err.response?.data || err.message);
            throw err;
        }
    };

    const auth = async () => {
        try {
            const authData = await axios.get('http://localhost:3048/users/auth', { withCredentials: true })
            const authUserData = authData.data.data
            const userData = await getUserById(authUserData.id)

            const user = {
                id: userData.data.data[0].id,
                user_name: userData.data.data[0].user_name,
                name: userData.data.data[0].name,
                last_name: userData.data.data[0].last_name,
                email: userData.data.data[0].email,
            }

            if (user.id === authUserData.id) {
                const authUser = {
                    ...user,
                    ...authUserData
                };
                setUserAuthenticated(authUser);
                return authUser;
            }

        } catch (error) {
            console.log(error)
        }

    }

    const logOutUser = async () => {
        console.log('el logou')
        try {
            const response = await axios.post('http://localhost:3048/users/closeSession', null, { withCredentials: true });

            if (response.ok) {
                console.log("¡Sesión cerrada!");
            }
        } catch (err) {
            console.log("Error al cerrar la sesión: ", err);
        }
    }



    return (
        <UserContext.Provider
            value={{
                loading,
                userAuthenticated,
                setUserAuthenticated,
                getUsers,
                getUserById,
                createUser,
                logOutUser,
                loginUser,
                auth
            }}
        >
            {children}
        </UserContext.Provider>
    );

};
