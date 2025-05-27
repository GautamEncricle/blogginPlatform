import { useState, useEffect, useContext, createContext } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async (req, res) => {
            try {
                const res = await axios.get('/user/protect/testing');
                setUser(res.data.user);
            }
            catch (error) {
                setUser(null);
                console.error(`Error occurred 💥: ${error}`);
            }
            finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    //logout handler
    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);