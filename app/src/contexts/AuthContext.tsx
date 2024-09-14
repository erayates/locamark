import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { _login, _register } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  isAdmin: boolean;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type CustomJwtPayload = {
  role: string;
  [key: string]: string | number;
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
  const [isAdmin, setIsAdmin] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);

      const decodedToken: CustomJwtPayload = jwtDecode(token);
      setIsAdmin(decodedToken.role === "Admin" && true);
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

        const decodedToken: CustomJwtPayload = jwtDecode(response.data.token);
        setIsAdmin(decodedToken.role === "Admin" && true);

        toast({
          title: "SUCCESS!",
          description: "You registered successfully!",
          variant: "success",
        });

        navigate("/");
      }
    } catch (e) {
      toast({
        title: "ERROR!",
        description: (e as Error).message,
        variant: "destructive",
      });
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await _login(username, password);
      if (response) {
        localStorage.setItem("token", response.data.token);
        const userObj = {
          userName: response.data.userName,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(response.data.token);
        setUser(userObj);

        const decodedToken: CustomJwtPayload = jwtDecode(response.data.token);
        setIsAdmin(decodedToken.role === "Admin" && true);

        toast({
          title: "SUCCESS!",
          description: "You logged in successfully!",
          variant: "success",
        });
        navigate("/");
      }
    } catch (e) {
      toast({
        title: "ERROR!",
        description: (e as Error).message,
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
      value={{
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        registerUser,
        isAdmin,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
