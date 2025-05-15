import useLogout from "@/components/authentication/use-logout";
import { Button } from "@/components/ui/button";

export default function CalendarHeaderActionsLogout() {
  const logout = useLogout();
  return (
    <Button variant="destructive" onClick={logout}>
      Se deconnecter
    </Button>
  );
}
