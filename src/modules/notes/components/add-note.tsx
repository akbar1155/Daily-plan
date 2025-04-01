"use client"
import { Card, Input, Button, Space, Form, Radio } from "antd"
import { Note } from ".."

const { TextArea } = Input

interface AddNoteFormProps {
    onSubmit: (note: Omit<Note, "id" | "date">) => void
    onCancel: () => void
}

export function AddNoteForm({ onSubmit, onCancel }: AddNoteFormProps) {
    const [form] = Form.useForm()

    const colorOptions = [
        { name: "Blue", value: "#e6f7ff" },
        { name: "Green", value: "#f6ffed" },
        { name: "Yellow", value: "#fffbe6" },
        { name: "Red", value: "#fff1f0" },
        { name: "Purple", value: "#f9f0ff" },
    ]

    const handleSubmit = (values: { title: string; content: string; color: string }) => {
        if (!values.title.trim()) return

        onSubmit({
            title: values.title,
            content: values.content || "",
            color: values.color,
        })

        form.resetFields()
    }

    return (
        <Card style={{ marginBottom: "16px" }}>
            <Form form={form} layout="vertical" initialValues={{ color: "#e6f7ff" }} onFinish={handleSubmit}>
                <Form.Item name="title" rules={[{ required: true, message: "Please enter a title" }]}>
                    <Input placeholder="Note title" />
                </Form.Item>

                <Form.Item name="content">
                    <TextArea placeholder="Note content" style={{ minHeight: "100px" }} />
                </Form.Item>

                <Form.Item name="color" label="Choose color:">
                    <Radio.Group>
                        {colorOptions.map((option) => (
                            <Radio.Button
                                key={option.value}
                                value={option.value}
                                style={{
                                    background: option.value,
                                    marginRight: "8px",
                                    marginBottom: "8px",
                                    height: "30px",
                                    width: "30px",
                                    borderRadius: "50%",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <span style={{ display: "none" }}>{option.name}</span>
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                    <Space>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            Add Note
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}

