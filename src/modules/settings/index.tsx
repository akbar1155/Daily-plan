"use client"
import { Card, Form, Switch, Select, Button, Divider, Radio, Tabs, Upload, message } from "antd"
import {
    BulbOutlined,
    BellOutlined,
    GlobalOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    UploadOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { TabPane } = Tabs

export default function Settings() {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log("Settings saved:", values)
        message.success("Sozlamalar saqlandi")
    }


    const handleBackup = () => {
        message.success("Ma'lumotlar saqlandi")
    }

    const handleRestore = () => {
        message.info("Ma'lumotlar tiklandi")
    }

    return (
        <div className="settings m-6">
            <h1 className="text-2xl font-bold mb-6">Sozlamalar</h1>

            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span className="gap-2 flex items-center">
                            <BulbOutlined />
                            Ko'rinish
                        </span>
                    }
                    key="1"
                >
                    <Card title="Mavzu sozlamalari" className="mb-6">
                        <Form form={form} layout="vertical" onFinish={onFinish}>
                            <Form.Item name="theme" label="Mavzu">
                                <Radio.Group >
                                    <Radio.Button value="light">Yorqin</Radio.Button>
                                    <Radio.Button value="dark">Qorong'i</Radio.Button>
                                    <Radio.Button value="system">Tizim</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="fontSize" label="Shrift o'lchami">
                                <Select defaultValue="medium">
                                    <Option value="small">Kichik</Option>
                                    <Option value="medium">O'rta</Option>
                                    <Option value="large">Katta</Option>
                                </Select>
                            </Form.Item>

                            <Button type="primary" htmlType="submit">
                                Saqlash
                            </Button>
                        </Form>
                    </Card>
                </TabPane>

                <TabPane
                    tab={
                        <span className="gap-2 flex items-center">
                            <BellOutlined />
                            Bildirishnomalar
                        </span>
                    }
                    key="2"
                >
                    <Card title="Bildirishnoma sozlamalari" className="mb-6">
                        <Form
                            layout="vertical"
                            initialValues={{
                                enableNotifications: true,
                                taskReminders: true,
                                goalReminders: true,
                                soundEnabled: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item name="enableNotifications" label="Bildirishnomalarni yoqish" valuePropName="checked">
                                <Switch />
                            </Form.Item>

                            <Form.Item name="taskReminders" label="Vazifa eslatmalari" valuePropName="checked">
                                <Switch />
                            </Form.Item>

                            <Form.Item name="goalReminders" label="Maqsad eslatmalari" valuePropName="checked">
                                <Switch />
                            </Form.Item>

                            <Form.Item name="soundEnabled" label="Ovozli bildirishnomalar" valuePropName="checked">
                                <Switch />
                            </Form.Item>

                            <Button type="primary" htmlType="submit">
                                Saqlash
                            </Button>
                        </Form>
                    </Card>
                </TabPane>

                <TabPane
                    tab={
                        <span className="gap-2 flex items-center">
                            <GlobalOutlined />
                            Til
                        </span>
                    }
                    key="3"
                >
                    <Card title="Til sozlamalari" className="mb-6">
                        <Form layout="vertical" initialValues={{ language: "uz" }} onFinish={onFinish}>
                            <Form.Item name="language" label="Dastur tili">
                                <Select>
                                    <Option value="uz">O'zbek</Option>
                                    <Option value="ru">Русский</Option>
                                    <Option value="en">English</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="dateFormat" label="Sana formati">
                                <Select defaultValue="dd/mm/yyyy">
                                    <Option value="dd/mm/yyyy">DD/MM/YYYY</Option>
                                    <Option value="mm/dd/yyyy">MM/DD/YYYY</Option>
                                    <Option value="yyyy/mm/dd">YYYY/MM/DD</Option>
                                </Select>
                            </Form.Item>

                            <Button type="primary" htmlType="submit">
                                Saqlash
                            </Button>
                        </Form>
                    </Card>
                </TabPane>

                <TabPane
                    tab={
                        <span className="gap-2 flex items-center">
                            <CloudUploadOutlined />
                            Xotiraga olish
                        </span>
                    }
                    key="4"
                >
                    <Card title="Ma'lumotlarni saqlash va tiklash" className="mb-6">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <h3 className="text-lg font-medium mb-2">Ma'lumotlarni saqlash</h3>
                                <p className="text-gray-500 mb-4">Barcha ma'lumotlaringizni saqlang va kerak bo'lganda tiklang</p>
                                <Button type="primary" icon={<CloudDownloadOutlined />} onClick={handleBackup}>
                                    Ma'lumotlarni saqlash
                                </Button>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-lg font-medium mb-2">Ma'lumotlarni tiklash</h3>
                                <p className="text-gray-500 mb-4">Oldin saqlangan ma'lumotlarni tiklang</p>
                                <Upload
                                    name="file"
                                    action="/api/upload"
                                    showUploadList={false}
                                    beforeUpload={() => {
                                        handleRestore()
                                        return false
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Ma'lumotlarni tanlash</Button>
                                </Upload>
                            </div>

                            <Divider />

                            <div>
                                <h3 className="text-lg font-medium mb-2">Avtomatik saqlash</h3>
                                <Form
                                    layout="vertical"
                                    initialValues={{ autoBackup: true, backupFrequency: "weekly" }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item name="autoBackup" label="Avtomatik saqlash" valuePropName="checked">
                                        <Switch />
                                    </Form.Item>

                                    <Form.Item name="backupFrequency" label="Saqlash chastotasi">
                                        <Select>
                                            <Option value="daily">Har kuni</Option>
                                            <Option value="weekly">Har hafta</Option>
                                            <Option value="monthly">Har oy</Option>
                                        </Select>
                                    </Form.Item>

                                    <Button type="primary" htmlType="submit">
                                        Saqlash
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    )
}

