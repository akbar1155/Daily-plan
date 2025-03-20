"use client"

import { useState } from "react"
import { Card, List, Button, Modal, Form, Input, DatePicker, Select, Badge, Checkbox, Dropdown } from "antd"
import { EditOutlined, DeleteOutlined, MoreOutlined, ClockCircleOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import dayjs from "dayjs"
import { ArrowDownIcon, ArrowUp, PlusIcon } from "lucide-react"


const { Option } = Select
const { TextArea } = Input

export default function DailyPlan() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Loyiha taqdimoti",
      description: "Mijoz uchun loyiha taqdimotini tayyorlash",
      completed: false,
      priority: "high",
      category: "ish",
      deadline: "2023-06-15 14:00",
    },
    {
      id: "2",
      title: "Jismoniy mashq",
      description: "30 daqiqa yugurish",
      completed: true,
      priority: "medium",
      category: "sport",
      deadline: "2023-06-15 07:00",
    },
    {
      id: "3",
      title: "Kitob o'qish",
      description: "Atomic Habits kitobidan 30 bet o'qish",
      completed: false,
      priority: "low",
      category: "shaxsiy",
      deadline: "2023-06-15 20:00",
    },
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    category: string;
    deadline: string | null;
  }

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [form] = Form.useForm()

  const showModal = (task: Task | null = null) => {
    setEditingTask(task)
    if (task) {
      form.setFieldsValue({
        ...task,
        deadline: task.deadline ? dayjs(task.deadline, "YYYY-MM-DD HH:mm") : null,
      })
    } else {
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingTask(null)
    form.resetFields()
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formattedDeadline = values.deadline ? values.deadline.format("YYYY-MM-DD HH:mm") : null

      if (editingTask) {
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id ? { ...task, ...values, deadline: formattedDeadline } : task,
          ),
        )
      } else {
        const newTask = {
          id: Date.now().toString(),
          ...values,
          completed: false,
          deadline: formattedDeadline,
        }
        setTasks([...tasks, newTask])
      }

      setIsModalVisible(false)
      setEditingTask(null)
      form.resetFields()
    })
  }

  const handleDelete = (id: any) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: any) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case "high":
        return "error"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  const getDropdownItems = (task: any): MenuProps["items"] => [
    {
      key: "1",
      label: "Tahrirlash",
      icon: <EditOutlined />,
      onClick: () => showModal(task),
    },
    {
      key: "2",
      label: "O'chirish",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(task.id),
    },
  ]

  const moveTaskUp = (index: any) => {
    if (index === 0) return
    const newTasks = [...tasks]
    const temp = newTasks[index]
    newTasks[index] = newTasks[index - 1]
    newTasks[index - 1] = temp
    setTasks(newTasks)
  }

  const moveTaskDown = (index: any) => {
    if (index === tasks.length - 1) return
    const newTasks = [...tasks]
    const temp = newTasks[index]
    newTasks[index] = newTasks[index + 1]
    newTasks[index + 1] = temp
    setTasks(newTasks)
  }

  return (
    <div className="  w-full px-6  pt-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#838383] ">Kundalik Reja</h1>
        <Button
          type="primary"
          icon={<PlusIcon />}
          onClick={() => showModal()}
        >
          Yangi vazifa
        </Button>
      </div>

      <Card className="bg-white border-0 ">
        <List
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(task, index) => (
            <List.Item
              key={task.id}
              className={`mb-2 p-4 border  rounded-lg bg-[#EDF1F7] ${task.completed ? "bg-gray-50" : ""}`}
              actions={[
                <div key="actions" className="flex ">
                  {index > 0 && (
                    <Button type="text" onClick={() => moveTaskUp(index)} className="">
                      <ArrowUp stroke="green" />
                    </Button>
                  )}
                  {index < tasks.length - 1 && (
                    <Button type="text" onClick={() => moveTaskDown(index)} className="">
                      <ArrowDownIcon stroke="green" />
                    </Button>
                  )}
                  <Dropdown className="bg-slate-400" menu={{ items: getDropdownItems(task) }} trigger={["click"]}>
                    <Button type="text" icon={<MoreOutlined />} />
                  </Dropdown>
                </div>,
              ]}
            >
              <div className="flex items-center w-full px-2">
                <Checkbox checked={task.completed} onChange={() => toggleComplete(task.id)} className="mr-3" />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className={`font-medium text-[#838383] ${task.completed ? "line-through text-gray-400" : ""}`}>
                      {task.title}
                    </span>
                    <Badge className="ml-2" status={getPriorityColor(task.priority)} />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{task.description}</div>
                  {task.deadline && (
                    <div className="text-xs text-gray-400 mt-1 flex items-center">
                      <ClockCircleOutlined className="mr-1" />
                      {task.deadline}
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white">{task.category}</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={editingTask ? "Vazifani tahrirlash" : "Yangi vazifa qo'shish"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingTask ? "Saqlash" : "Qo'shish"}
        cancelText="Bekor qilish"
        className="custom-modal"
      >
        <Form form={form} layout="vertical" style={{ backgroundColor: "white" }}>
          <Form.Item
            name="title"
            label="Sarlavha"
            rules={[{ required: true, message: "Iltimos, vazifa sarlavhasini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Tavsif">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item name="priority" label="Muhimlik darajasi" initialValue="medium">
            <Select>
              <Option value="high">Yuqori</Option>
              <Option value="medium">O'rta</Option>
              <Option value="low">Past</Option>
            </Select>
          </Form.Item>
          <Form.Item name="category" label="Kategoriya" initialValue="ish">
            <Select>
              <Option value="ish">Ish</Option>
              <Option value="biznes">Biznes</Option>
              <Option value="ta'lim">Ta’lim</Option>
              <Option value="oila">Oila</Option>
              <Option value="do‘stlar">Do‘stlar</Option>
              <Option value="sport">Sport</Option>
              <Option value="salomatlik">Salomatlik</Option>
              <Option value="dam olish">Dam olish</Option>
              <Option value="sayohat">Sayohat</Option>
              <Option value="moliyaviy">Moliyaviy</Option>
              <Option value="hobbi">Hobbi</Option>
              <Option value="shaxsiy">Shaxsiy</Option>
              <Option value="boshqa">Boshqa</Option>
            </Select>
          </Form.Item>

          <Form.Item name="deadline" label="Muddat">
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

