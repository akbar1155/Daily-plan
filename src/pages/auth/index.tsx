"use client"

import type React from "react"
import { useState } from "react"
import { Card, Tabs, Form, Input, Button, Divider, Typography, Space, notification } from "antd"
import {
    GoogleOutlined,
    AppleOutlined,
    MailOutlined,
    PhoneOutlined,
    LockOutlined,
    UserOutlined,
    GlobalOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { TabPane } = Tabs

interface LoginFormValues {
    email: string
    password: string
}

interface PhoneFormValues {
    phoneNumber: string
    verificationCode: string
}

const AuthPage: React.FC = () => {
    const [loginForm] = Form.useForm()
    const [phoneForm] = Form.useForm()
    const [isVerificationSent, setIsVerificationSent] = useState(false)

    const handleLoginSubmit = (values: LoginFormValues) => {
        console.log("Login form submitted:", values)
        notification.success({
            message: "Login Attempted",
            description: `Attempting to log in with email: ${values.email}`,
        })
    }

    const handlePhoneSubmit = (values: PhoneFormValues) => {
        console.log("Phone verification submitted:", values)
        notification.success({
            message: "Phone Verification",
            description: `Verification code submitted for: ${values.phoneNumber}`,
        })
    }

    const sendVerificationCode = () => {
        const phoneNumber = phoneForm.getFieldValue("phoneNumber")
        if (phoneNumber && phoneNumber.length >= 9) {
            setIsVerificationSent(true)
            notification.info({
                message: "Verification Code Sent",
                description: `A verification code has been sent to ${phoneNumber}`,
            })
        } else {
            notification.error({
                message: "Invalid Phone Number",
                description: "Please enter a valid phone number",
            })
        }
    }

    const handleSocialLogin = (provider: string) => {
        console.log(`Logging in with ${provider}`)
        notification.info({
            message: "Social Login",
            description: `Redirecting to ${provider} for authentication...`,
        })
    }

    const handleSSOLogin = () => {
        console.log("SSO login initiated")
        notification.info({
            message: "SSO Login",
            description: "Redirecting to SSO provider...",
        })
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "#f5f5f5",
            }}
        >
            <Card
                style={{
                    width: 400,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    borderRadius: "8px",
                    background: "white",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <Title level={2} style={{ marginBottom: 8 }}>
                        Welcome
                    </Title>
                    <Text type="secondary">Sign in to continue to the platform</Text>
                </div>

                <Tabs defaultActiveKey="email" centered>
                    <TabPane
                        tab={
                            <span>
                                <MailOutlined /> Email
                            </span>
                        }
                        key="email"
                    >
                        <Form form={loginForm} layout="vertical" onFinish={handleLoginSubmit}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your email!" },
                                    { type: "email", message: "Please enter a valid email!" },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                            </Form.Item>

                            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: "#1890ff" }}>
                                    Sign In
                                </Button>
                            </Form.Item>

                            <div style={{ textAlign: "center" }}>
                                <a href="#forgot-password">Forgot password?</a>
                            </div>
                        </Form>
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <PhoneOutlined /> Phone
                            </span>
                        }
                        key="phone"
                    >
                        <Form form={phoneForm} layout="vertical" onFinish={handlePhoneSubmit}>
                            <Form.Item name="phoneNumber" rules={[{ required: true, message: "Please input your phone number!" }]}>
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder="Phone Number"
                                    size="large"
                                    addonAfter={
                                        <Button
                                            type="link"
                                            onClick={sendVerificationCode}
                                            disabled={isVerificationSent}
                                            style={{ padding: 0 }}
                                        >
                                            {isVerificationSent ? "Sent" : "Send Code"}
                                        </Button>
                                    }
                                />
                            </Form.Item>

                            {isVerificationSent && (
                                <Form.Item
                                    name="verificationCode"
                                    rules={[{ required: true, message: "Please input verification code!" }]}
                                >
                                    <Input placeholder="Verification Code" size="large" />
                                </Form.Item>
                            )}

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    disabled={!isVerificationSent}
                                    style={{ backgroundColor: "#1890ff" }}
                                >
                                    Verify & Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>

                <Divider plain>Or continue with</Divider>

                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <Button
                        icon={<GoogleOutlined />}
                        size="large"
                        block
                        onClick={() => handleSocialLogin("Google")}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        Google
                    </Button>

                    <Button
                        icon={<AppleOutlined />}
                        size="large"
                        block
                        onClick={() => handleSocialLogin("Apple")}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        Apple
                    </Button>

                    <Button
                        icon={<GlobalOutlined />}
                        size="large"
                        block
                        onClick={handleSSOLogin}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        Enterprise SSO
                    </Button>
                </Space>

                <div style={{ textAlign: "center", marginTop: 24 }}>
                    <Text type="secondary">Don't have an account? </Text>
                    <a href="#register">Register now</a>
                </div>
            </Card>
        </div>
    )
}

export default AuthPage

