import { Button, Form } from "antd";
import InputField from "pages/Login/components/inputField";

import { useTranslation } from "react-i18next";

export default function LoginForm() {

  const { t } = useTranslation();
  // const onSubmit = async (data: LoginResponse) => {
  //   try {
  //     const response = await loginPost(data).unwrap();

  //     storage.set(ACCESS_TOKEN_KEY, response.access);
  //     storage.set(REFRESH_TOKEN_KEY, response.refresh);

  //     dispatch(authApi.util.resetApiState());
  //     navigate("/");
  //   } catch (error) {
  //     const err = error as ResponseError;
  //     message.error(err.error_description || "Login failed. Please try again.");
  //     console.error("Login Error:", err);
  //   }
  // };

  return (
    <Form
      name="login"
      // onFinish={onSubmit}
      layout="vertical"
      className="space-y-4"
    >
      <div>
        <p className=" text-[22px] flex items-center justify-center my-2 pb-2">
          {t("Enter your data to login")}
        </p>
      </div>
      <InputField name="username" label="Username" required />

      <InputField name="password" label="Password" type="password" required />
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          {t("Enter")}
        </Button>
      </Form.Item>
    </Form>
  );
}
