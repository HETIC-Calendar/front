import { useStore } from "@/store/store";

const useLogout = () => {
  const { removeUser } = useStore();
  const logout = () => {
    removeUser();
    localStorage.removeItem("token");
  };
  return logout;
};

export default useLogout;
