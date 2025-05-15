import { useEffect } from "react";
import { useStore } from "@/store/store";
import { jwtDecode } from "jwt-decode";

type AuthWrapperProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthWrapperProps) => {
  const { setUser, setAuthLoading } = useStore();

  useEffect(() => {
    setAuthLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<{ id: string; email: string; role: "organizer" | "talker" }>(token);
      setUser(decoded);
    }
    setAuthLoading(false);
  }, [setUser, setAuthLoading]);

  return <>{children}</>;
};
