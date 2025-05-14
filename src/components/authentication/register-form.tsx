"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { register } from "@/lib/api";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const {
    register: registerForm,
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
      await register(data.email, data.password);
      toast("Utilisateur enregistré avec succès");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>S'inscrire</CardTitle>
          <CardDescription>Entrez votre email ci-dessous pour vous inscrire</CardDescription>
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
                  {...registerForm("email")}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <Input id="password" type="password" required {...registerForm("password")} />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  S'inscrire
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
