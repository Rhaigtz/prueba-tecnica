"use client";
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { ISignOnInterface, SignOnFormInterface } from "./sign-on.interface";

const SignOn = ({ onSignOn, onBack }: ISignOnInterface) => {
  const [form] = Form.useForm();
  const onFinish = async (values: SignOnFormInterface): Promise<void> => {
    return await onSignOn(values);
  };
  return (
    <Card className="w-full">
      <Button type="link" onClick={onBack}>
        Volver
      </Button>
      <p className="mb-4 text-lg">
        <strong>Registrate!</strong>
      </p>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Ingresa tu Nombre!" }]}
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
    </Card>
  );
};
export default SignOn;
