import { useStore } from "@/store/store";
import { toast } from "sonner";

const useLogout = () => {
  const { removeUser } = useStore();
  const logout = () => {
    removeUser();
    toast.success("Vous êtes déconnecté avec succès");
    localStorage.removeItem("token");
  };
  return logout;
};

export default useLogout;
