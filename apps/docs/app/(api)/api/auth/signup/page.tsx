"use client";
import SigninSide from "@repo/ui/signIn";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  return (
    <SigninSide
      onSignIn={async (email, password) => {
        const response = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
          isNew: true,
        });
        if (response?.ok) router.push("/");
        return response;
      }}
    />
  );
}
