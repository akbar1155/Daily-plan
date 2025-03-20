"use client"

import { useState } from "react"
import {
  Card,
  Button,
  Progress,
  List,
  Checkbox,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Divider,
  Space,
  Tag,
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

export default function Goals() {
  const [goals, setGoals] = useState([
    {
      id: "1",
      title: "Ingliz tilini o'rganish",
      description: "C1 darajasiga chiqish",
      deadline: "2023-12-31",
      progress: 45,
      tasks: [
        { id: "1-1", title: "Har kuni 20 ta yangi so'z o'rganish", completed: true },
        { id: "1-2", title: "Haftada 2 marta ingliz tilida suhbat qilish", completed: true },
        { id: "1-3", title: "Har kuni 30 daqiqa kitob o'qish", completed: false },
        { id: "1-4", title: "Imtihonga tayyorlanish", completed: false },
      ],
      reminder: "weekly",
    },
    {
      id: "2",
      title: "Dasturlash ko'nikmalarini oshirish",
      description: "React va Node.js bo'yicha tajribali dasturchi bo'lish",
      deadline: "2023-09-30",
      progress: 60,
      tasks: [
        { id: "2-1", title: "Har kuni 2 soat kod yozish", completed: true },
        { id: "2-2", title: "Haftada 1 ta yangi loyiha boshlash", completed: true },
        { id: "2-3", title: "Open source loyihalarga hissa qo'shish", completed: false },
      ],
      reminder: "daily",
    },
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false)
  const [editingGoal, setEditingGoal] = useState<{ id: string; title: string; description: string; deadline: string; progress: number; tasks: { id: string; title: string; completed: boolean }[]; reminder: string } | null>(null)
  const [currentGoalId, setCurrentGoalId] = useState(null)
  const [form] = Form.useForm()
  const [taskForm] = Form.useForm()

  const showModal = (goal = null) => {
    setEditingGoal(goal)
    if (goal) {
      // form.setFieldsValue({
      //     ...Object.assign({}, goal),
      //     deadline: goal.deadline ? new Date(goal.deadline) : null,
      // })
    } else {
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingGoal(null)
    form.resetFields()
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formattedDeadline = values.deadline ? values.deadline.format("YYYY-MM-DD") : null

      if (editingGoal) {
        setGoals(
          goals.map((goal) =>
            goal.id === editingGoal.id
              ? {
                ...goal,
                ...values,
                deadline: formattedDeadline,
                tasks: goal.tasks, // Preserve existing tasks
              }
              : goal,
          ),
        )
      } else {
        const newGoal = {
          id: Date.now().toString(),
          ...values,
          deadline: formattedDeadline,
          progress: 0,
          tasks: [],
        }
        setGoals([...goals, newGoal])
      }

      setIsModalVisible(false)
      setEditingGoal(null)
      form.resetFields()
    })
  }

  const showTaskModal = (goalId: any) => {
    setCurrentGoalId(goalId)
    taskForm.resetFields()
    setIsTaskModalVisible(true)
  }

  const handleTaskCancel = () => {
    setIsTaskModalVisible(false)
    setCurrentGoalId(null)
    taskForm.resetFields()
  }

  const handleTaskOk = () => {
    taskForm.validateFields().then((values) => {
      setGoals(
        goals.map((goal) => {
          if (goal.id === currentGoalId) {
            const newTask = {
              id: Date.now().toString(),
              title: values.title,
              completed: false,
            }
            const updatedTasks = [...goal.tasks, newTask]
            return {
              ...goal,
              tasks: updatedTasks,
            }
          }
          return goal
        }),
      )

      setIsTaskModalVisible(false)
      setCurrentGoalId(null)
      taskForm.resetFields()
    })
  }

  const toggleTaskComplete = (goalId: any, taskId: any) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedTasks = goal.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          )

          // Calculate new progress
          const completedCount = updatedTasks.filter((task) => task.completed).length
          const totalCount = updatedTasks.length
          const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

          return {
            ...goal,
            tasks: updatedTasks,
            progress: newProgress,
          }
        }
        return goal
      }),
    )
  }

  const deleteGoal = (goalId: any) => {
    setGoals(goals.filter((goal) => goal.id !== goalId))
  }

  const deleteTask = (goalId: any, taskId: any) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedTasks = goal.tasks.filter((task) => task.id !== taskId)

          // Recalculate progress
          const completedCount = updatedTasks.filter((task) => task.completed).length
          const totalCount = updatedTasks.length
          const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

          return {
            ...goal,
            tasks: updatedTasks,
            progress: newProgress,
          }
        }
        return goal
      }),
    )
  }

  const getReminderText = (reminder: any) => {
    switch (reminder) {
      case "daily":
        return "Kunlik eslatma"
      case "weekly":
        return "Haftalik eslatma"
      case "monthly":
        return "Oylik eslatma"
      default:
        return "Eslatma yo'q"
    }
  }

  return (
    <div className="goals mx-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#838383] ">Maqsadlar</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Yangi maqsad
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            title={
              <div className="flex justify-between items-center">
                <span className="text-[#838383]">{goal.title}</span>
                <Space>
                  <Button type="text" icon={<EditOutlined />}
                  // onClick={() => showModal(goal)} 
                  />
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => deleteGoal(goal.id)} />
                </Space>
              </div>
            }
            className="h-full bg-white border-0"
          >
            <div className="mb-4">
              <p className="text-gray-600">{goal.description}</p>
              <div className="flex items-center mt-2">
                <ClockCircleOutlined className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Deadline: {goal.deadline}</span>
              </div>
              <div className="mt-2">
                <Tag color="blue">{getReminderText(goal.reminder)}</Tag>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Progress</span>
                {/* <span>{goal.progress}%</span> */}
              </div>
              <Progress percent={goal.progress} status={goal.progress === 100 ? "success" : "active"} />
            </div>

            <Divider orientation="left" className="text-[#838383]" style={{ color: "#838383" }}>Vazifalar</Divider>

            <List
              size="small"
              dataSource={goal.tasks}
              renderItem={(task) => (
                <List.Item
                  key={task.id}
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => deleteTask(goal.id, task.id)}
                      key="delete-button"
                    />,
                  ]}
                >
                  <div className="flex items-center">
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleTaskComplete(goal.id, task.id)}
                      className="mr-2"
                    />
                    <span className={task.completed ? "line-through text-gray-400" : "text-[#838383]"}>{task.title}</span>
                  </div>
                </List.Item>
              )}
              footer={
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => showTaskModal(goal.id)}>
                  Vazifa qo'shish
                </Button>
              }
            />
          </Card>
        ))}
      </div>

      {/* Goal Modal */}
      <Modal
        title={editingGoal ? "Maqsadni tahrirlash" : "Yangi maqsad qo'shish"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingGoal ? "Saqlash" : "Qo'shish"}
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Maqsad nomi"
            rules={[{ required: true, message: "Iltimos, maqsad nomini kiriting!" }]}
          >
            <Input placeholder="Maqsad nomi" />
          </Form.Item>

          <Form.Item name="description" label="Tavsif">
            <TextArea rows={3} placeholder="Maqsad tavsifi" />
          </Form.Item>

          <Form.Item
            name="deadline"
            label="Deadline"
            rules={[{ required: true, message: "Iltimos, deadline ni tanlang!" }]}
          >
            <DatePicker className="w-full" placeholder="Deadline vaqtini tanlang" />
          </Form.Item>

          <Form.Item
            name="reminder"
            label="Eslatma"
            rules={[{ required: true, message: "Iltimos, eslatma turini tanlang!" }]}
          >
            <Select placeholder="Eslatma turini tanlang">
              <Option value="daily">Kunlik</Option>
              <Option value="weekly">Haftalik</Option>
              <Option value="monthly">Oylik</Option>
              <Option value="none">Eslatma yo'q</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Task Modal */}
      <Modal
        title="Vazifa qo'shish"
        open={isTaskModalVisible}
        onOk={handleTaskOk}
        onCancel={handleTaskCancel}
        okText="Qo'shish"
        cancelText="Bekor qilish"
      >
        <Form form={taskForm} layout="vertical">
          <Form.Item
            name="title"
            label="Vazifa nomi"
            rules={[{ required: true, message: "Iltimos, vazifa nomini kiriting!" }]}
          >
            <Input placeholder="Vazifa nomi" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

