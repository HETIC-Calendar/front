import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import type { User } from "@/lib/types";
import { useStore } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import { login } from "@/lib/api";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const token = await login(data.email, data.password);
      localStorage.setItem("token", token);

      const decoded: User = jwtDecode(token);
      // TODO: when the api is ready, remove the role
      useStore.getState().setUser({ ...decoded, role: "talker" });

      toast("Bienvenue!");
      if (decoded.role === "organizer") {
        navigate("/dashboard-organizer");
      }
      navigate("/dashboard-talker");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>Entrez votre email ci-dessous pour vous connecter</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <Input id="password" type="password" required {...register("password")} />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte?{" "}
              <Link to="/register" className="underline underline-offset-4">
                S'inscrire
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
