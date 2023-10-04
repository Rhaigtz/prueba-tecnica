import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  ILoginInterface,
  LoginFormReturnInterface,
} from "./login-form.interface";
import Link from "next/link";

const Item = Form.Item;

const LoginComponent = ({ onSignIn, onSignOn }: ILoginInterface) => {
  const [form] = Form.useForm();
  const onFinish = async (values: LoginFormReturnInterface): Promise<void> => {
    return await onSignIn(values);
  };

  const onRegister = (): void => {
    onSignOn();
  };

  return (
    <Card className="w-full">
      <p className="mb-4 text-lg">
        <strong>Inicio de sesion</strong>
      </p>
      <Form
        name="normal_login"
        className="login-form"
        form={form}
        onFinish={onFinish}
      >
        <Item
          name="email"
          rules={[
            { required: true, message: "Ingresa tu correo electronico!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email@domain.cl"
          />
        </Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full bg-sky-500"
          >
            Entrar
          </Button>
          <br />
          <br />
          <Button type="link" onClick={onRegister}>
            Registrate ahora!
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginComponent;
