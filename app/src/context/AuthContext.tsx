import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { _login, _register } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types/auth";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

export const AuthContext = createContext<UserContextType>(
  {} as UserContextType
);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await _register(username, email, password);
      if (response) {
        localStorage.setItem("token", response.data.token);
        const userObj = {
          userName: response.data.userName,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(response.data.token);
        setUser(userObj);
        toast({
          title: "SUCCESS!",
          description: "You registered successfully!",
          variant: "success",
        });

        navigate("/");
      }
    } catch (e) {
      console.error("Error: ", e);
      toast({
        title: "ERROR!",
        description: e.response.data[0].description,
        variant: "destructive",
      });
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await _login(username, password);
      console.log(response);
      if (response) {
        localStorage.setItem("token", response.data.token);
        const userObj = {
          userName: response.data.userName,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(response.data.token);
        setUser(userObj);
        toast({
          title: "SUCCESS!",
          description: "You logged in successfully!",
          variant: "success",
        });
        navigate("/");
      }
    } catch (e) {
      console.error("Error: ", e);
      toast({
        title: "ERROR!",
        description: e.response.data,
        variant: "destructive",
      });
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
