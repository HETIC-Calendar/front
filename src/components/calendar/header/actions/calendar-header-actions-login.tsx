import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

export default function CalendarHeaderActionLogin() {
  return (
    <Link to="/login" className={buttonVariants({ variant: "outline" })}>
      Se connecter
    </Link>
  );
}
