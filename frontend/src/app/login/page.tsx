"use client";
import LoginComponent from "@/components/Login";
import { LoginFormReturnInterface } from "@/components/Login/login-form.interface";
import { signInLogin, signOnInLogin } from "../../services/AuthService";
import { message } from "antd";
import { useEffect, useState } from "react";
import SignOn from "@/components/SignOn";
import { SignOnFormInterface } from "@/components/SignOn/sign-on.interface";
import { saveToken } from "../../../utils/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isSignOn, setSignOn] = useState(false);

  const signIn = async (values: LoginFormReturnInterface): Promise<void> => {
    try {
      const { data: token } = await signInLogin(values);
      saveToken(token);

      router.push("/usuarios");
    } catch (e: any) {
      console.log(e);
      message.error(e.data.message);
    }
  };

  const signOn = async (values: SignOnFormInterface): Promise<void> => {
    try {
      await signOnInLogin(values);
      setSignOn(false);
    } catch (e: any) {
      message.error(e.data.message);
    }
  };
  return (
    <div
      style={{ width: 350 }}
      className="mx-auto flex items-center justify-center h-full"
    >
      {!isSignOn ? (
        <LoginComponent
          onSignIn={signIn}
          onSignOn={() => {
            setSignOn(true);
          }}
        />
      ) : (
        <SignOn
          onSignOn={signOn}
          onBack={() => {
            console.log("a");
            setSignOn(false);
          }}
        />
      )}
    </div>
  );
}
