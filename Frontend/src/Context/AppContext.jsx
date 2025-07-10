import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credits, setCredits] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // 🔁 Load credits when token changes
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  // ✅ Fetch credits from backend
  const loadCreditsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      });

      const data = res.data;

      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
        console.log("✅ Credits loaded:", data.credits);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔓 Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(false);
    setCredits(0);
  };

  // 🧠 Image generation
  const generateImage = async (prompt) => {
    try {
      if (!prompt) {
        toast.error("Prompt missing");
        return null;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt }, // ✅ only prompt — no userId
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
        return null;
      }
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  // 🌐 All values passed into context
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credits,
    setCredits,
    loadCreditsData,
    logout,
    generateImage,
  };
  

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
