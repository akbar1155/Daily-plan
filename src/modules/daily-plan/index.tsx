"use client"

import { useState } from "react"
import { Button, Modal, Form, Input, DatePicker, Select, } from "antd"
import { PlusIcon } from "lucide-react"

import dayjs from "dayjs"
import DailyPlanCards from "./components/cards"


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
      title: "O'qish",
      description: "Darsni o'qish",
      completed: false,
      priority: "low",
      category: "ta'lim",
      deadline: "2023-06-15 10:00",

    },
    {
      id: "4",
      title: "O'qish",
      description: "Darsni o'qish",
      completed: false,
      priority: "low",
      category: "ta'lim",
      deadline: "2023-06-15 10:00",

    },
    {
      id: "5",
      title: "O'qish",
      description: "Darsni o'qish",
      completed: false,
      priority: "low",
      category: "ta'lim",
      deadline: "2023-06-15 10:00",

    },
    {
      id: "6",
      title: "O'qish",
      description: "Darsni o'qish",
      completed: false,
      priority: "low",
      category: "ta'lim",
      deadline: "2023-06-15 10:00",

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




  return (
    <div className="  w-full px-6  pt-6 ">
      <div className="flex justify-between items-center mb-6">
        <div className="gap-8 flex items-center">
          <h1 className="text-2xl font-bold text-[#838383] ">Kundalik Reja</h1>
          <DatePicker />
        </div>
        <Button
          type="primary"
          icon={<PlusIcon />}
          onClick={() => showModal()}
        >
          Yangi vazifa
        </Button>
      </div>

      <DailyPlanCards />
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

          <Form.Item label="Muddat">
            <DatePicker.RangePicker placeholder={["Dan", "Gacha"]} showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}

