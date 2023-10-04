"use client";
import { Button, Drawer, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { createUser } from "@/services/UserService";
import { IUserInterface } from "@/app/usuarios/user.interface";

const CreateUserDrawer = ({
  onSave,
}: {
  onSave: (user: IUserInterface) => void;
}) => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: IUserInterface) => {
    try {
      const user = await createUser(values);
      onSave(user.data);
      return user;
    } catch (e: any) {
      message.error(e.data.message);
    }
  };

  return (
    <>
      <Button
        type="primary"
        className="bg-blue-950 float-right"
        onClick={showDrawer}
      >
        Crear nuevo usuario
      </Button>
      <Drawer
        title="Crear nuevo usuario"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form
          name="normal_login"
          className="login-form"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Ingresa tu correo Nombre!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nombre"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Ingresa tu correo electronico!" },
              { type: "email", message: "Favor ingresar un email valido" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email@domain.cl"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Ingresa tu contrasena!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Numero requerido!" }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="987654321"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full bg-sky-500"
            >
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateUserDrawer;
