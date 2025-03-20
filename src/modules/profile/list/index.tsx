"use client"

import { useState } from "react"
import { Card, Avatar, Button, Tabs, Form, Input, Divider, List, Tag, Progress, Upload, message } from "antd"
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"

const { TabPane } = Tabs

export default function Profile() {
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()

  // Mock user data
  const [user, setUser] = useState({
    name: "Alisher Navoi",
    email: "alisher@example.com",
    phone: "+998 90 123 45 67",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Administrator",
    joinDate: "2023-01-15",
  })

  // Mock statistics
  const statistics = {
    totalTasks: 120,
    completedTasks: 85,
    pendingTasks: 35,
    completionRate: 71,
  }

  // Mock recent activities
  const recentActivities = [
    { id: 1, action: "Vazifa yaratildi", target: "Loyiha taqdimoti", time: "2 soat oldin" },
    { id: 2, action: "Vazifa bajarildi", target: "Jismoniy mashq", time: "5 soat oldin" },
    { id: 3, action: "Maqsad qo'shildi", target: "Ingliz tilini o'rganish", time: "1 kun oldin" },
    { id: 4, action: "Vazifa tahrirlandi", target: "Dasturlash o'rganish", time: "2 kun oldin" },
    { id: 5, action: "Loyiha yaratildi", target: "Veb-sayt yaratish", time: "1 hafta oldin" },
  ]

  const onFinish = (values: any) => {
    setUser({ ...user, ...values })
    message.success("Profil ma'lumotlari yangilandi")
  }

  const onPasswordFinish = (values: any) => {
    console.log("Password changed:", values)
    message.success("Parol muvaffaqiyatli o'zgartirildi")
    passwordForm.resetFields()
  }

  const handleAvatarChange = (info: any) => {
    if (info.file.status === "done") {
      // In a real app, you would get the URL from the server response
      setUser({ ...user, avatar: info.file.response.url || user.avatar })
      message.success("Profil rasmi muvaffaqiyatli yuklandi")
    }
  }

  return (
    <div className="profile m-6">
      <h1 className="text-2xl font-bold my-4">Profil</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Card className="text-center">
            <div className="mb-4">
              <Upload name="avatar" showUploadList={false} action="/api/upload" onChange={handleAvatarChange}>
                <div className="relative inline-block">
                  <Avatar size={100} src={user.avatar} icon={<UserOutlined />} />
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    size="small"
                    className="absolute bottom-0 right-0"
                  />
                </div>
              </Upload>
            </div>

            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>

            <Divider />

            <div className="text-left">
              <p className="flex items-center mb-2">
                <MailOutlined className="mr-2" /> {user.email}
              </p>
              <p className="flex items-center mb-2">
                <PhoneOutlined className="mr-2" /> {user.phone}
              </p>
              <p className="flex items-center">
                <UserOutlined className="mr-2" /> A'zo bo'lgan sana: {user.joinDate}
              </p>
            </div>
          </Card>

          <Card title="Statistika" className="mt-6">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Bajarilgan vazifalar</span>
                <span>
                  {statistics.completedTasks}/{statistics.totalTasks}
                </span>
              </div>
              <Progress percent={statistics.completionRate} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold">{statistics.completedTasks}</h3>
                <p className="text-gray-500">Bajarilgan</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold">{statistics.pendingTasks}</h3>
                <p className="text-gray-500">Bajarilmagan</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Profil ma'lumotlari" key="1">
                <Form form={form} layout="vertical" initialValues={user} onFinish={onFinish}>
                  <Form.Item
                    name="name"
                    label="To'liq ism"
                    rules={[{ required: true, message: "Iltimos, to'liq ismni kiriting!" }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="To'liq ism" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Iltimos, emailni kiriting!" },
                      { type: "email", message: "Noto'g'ri email format!" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>

                  <Form.Item name="phone" label="Telefon">
                    <Input prefix={<PhoneOutlined />} placeholder="Telefon" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Saqlash
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Parolni o'zgartirish" key="2">
                <Form form={passwordForm} layout="vertical" onFinish={onPasswordFinish}>
                  <Form.Item
                    name="currentPassword"
                    label="Joriy parol"
                    rules={[{ required: true, message: "Iltimos, joriy parolni kiriting!" }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Joriy parol" />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="Yangi parol"
                    rules={[
                      { required: true, message: "Iltimos, yangi parolni kiriting!" },
                      { min: 8, message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak!" },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Yangi parol" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Yangi parolni tasdiqlang"
                    dependencies={["newPassword"]}
                    rules={[
                      { required: true, message: "Iltimos, yangi parolni tasdiqlang!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("newPassword") === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error("Ikki parol bir-biriga mos kelmayapti!"))
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Yangi parolni tasdiqlang" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Parolni o'zgartirish
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Faoliyat tarixi" key="3">
                <List
                  itemLayout="horizontal"
                  dataSource={recentActivities}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <div className="flex justify-between">
                            <span>
                              {item.action}: <Tag color="blue">{item.target}</Tag>
                            </span>
                            <span className="text-gray-400 text-sm">{item.time}</span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}

