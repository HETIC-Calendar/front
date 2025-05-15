import { Link } from "react-router";
import useLogout from "@/components/authentication/use-logout";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const logout = useLogout();
  return (
    <div>
      <Link to="/">Accueil</Link>
      <Button onClick={logout}>Se deconnecter</Button>
    </div>
  );
};

export default Dashboard;
