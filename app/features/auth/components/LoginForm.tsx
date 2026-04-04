"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "~/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form";
import type { LoginCredentials } from "~/lib/types/authUser"
import { loginAuthApi } from "../api/loginApi"
import { getAuthError } from "../utils/auth-error"
import { UserRole } from "~/lib/types/roles"
import { useNavigate } from "react-router"
import { FormMessage } from "~/components/ui/form-message"
import { Eye, EyeOff } from "lucide-react"
import { useAutoDismiss } from "~/lib/hooks/useAutoDismiss"
import { toast } from "sonner"

export function LoginForm() {
  const navigate = useNavigate();
  const [ isRedirecting, setIsRedirecting ] = useState(false);
  
  const {register, handleSubmit, formState: {errors, isSubmitting, } } = useForm<LoginCredentials>();
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useAutoDismiss<string>();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const { user, error } = await loginAuthApi(data);

      if (error){
        setErrorMsg(error)
        console.log(`Error: ${error}`);
        return;
      }

      if (!user) {
        setErrorMsg(getAuthError('other'));
        return;
      }

      //redirect base on role
      setIsRedirecting(true);
      console.log("Redirecting to dashboard...");

      switch (user.role) {
        case UserRole.LAB_ADMIN:
          console.log("Redirecting lab admin dashboard...");
          navigate("/lab-admin", {replace: true});
          break;

        case UserRole.LAB_ASSISTANT: 
          console.log("Redirecting to lab assistant dashboard...");
          navigate("/lab-assistant", {replace: true});
          break;

        case UserRole.LAB_TECHNICIAN: 
          console.log("Redirecting to lab technician dashboard...");
          navigate("/lab-technician", {replace: true});
          break;

        default:
          console.warn("Unknown user role.");
          throw new Error(`Unknown user role: ${user.role}`);
      }
    } catch (error) {
      console.log(`Login error: ${error}`);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <Card className="h-full w-full max-w-sm sm:max-w-md md:max-w-lg py-8 px-6 sm:py-10">
        <CardHeader>
          <CardTitle className="text-center text-lg">Login in to CLDRS</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="juandelacruz@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && <FormMessage variant="error" message={errors.email.message}/>}
              </Field>

              <Field>
                <div className="flex items-center justify-center gap-2">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">
                  <Input 
                    id="password" 
                    type= {showPassword ? "text" : "password"}
                    {...register("password", {required: "Password is required",})}
                    />

                    <button 
                    type="button"
                    onClick={() => {
                      setShowPassword((prev) => !prev)
                      console.log(`Eye is clicked. ${showPassword}`)
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && <FormMessage variant="error" message={errors.password.message}/>}
              </Field>
              <Field>
                <FieldDescription className="text-center">
                    {errorMsg && <FormMessage variant="error" message={errorMsg} className="text-center fade-out"/>}
                </FieldDescription>
                <Button type="submit" disabled= {isSubmitting || isRedirecting}>
                  {isSubmitting || isRedirecting? "Logging in..." : "Log in"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
