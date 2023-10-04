"use client";
import { Button, Layout } from "antd";
import { useEffect, useState } from "react";
import { IUserInterface } from "./user.interface";
import { getMe } from "@/services/UserService";
import { removeToken } from "../../../utils/auth";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;
export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<IUserInterface>();

  useEffect(() => {
    getMe().then(({ data }) => {
      setUser(data);
    });
  }, []);
  return (
    <Layout className="mx-auto h-screen">
      <Header
        style={{ display: "flex", alignItems: "center" }}
        className="p-4 flex align-center justify-between"
      >
        <p className="text-white">{`Bienvenido ${user?.name}`}</p>
        <Button
          type="link"
          className="text-white float-left"
          onClick={() => {
            router.push("/login");
            removeToken();
          }}
        >
          Cerrar sesion
        </Button>
      </Header>
      <Layout>
        <Content className="m-10">{children}</Content>
      </Layout>
    </Layout>
  );
}
