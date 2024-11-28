import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const RegisterPage = () => {
  const {register, token} = useUserContext();
  const navigate = useNavigate()

  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
    register(values.email, values.password, ()=> {navigate("/auth/login")} )
  };

  if(token) {
    navigate("/app");
  }

  return (
    <section className="max-w-96 p-6 bg-slate-50 rounded self-center">
      <h1 className="text-center font-bold font-montserrat mb-6"> Register </h1>
       <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !clientReady ||
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Register
          </Button>
        )}
      </Form.Item>
    </Form>
    </section>
  );
}

export default RegisterPage;