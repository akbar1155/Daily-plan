"use client"

import { useState } from "react"
import { Modal, Card, Tag, List, Typography, Button, Divider } from "antd"
import { ClockCircleOutlined, BulbOutlined, OrderedListOutlined, FireOutlined } from "@ant-design/icons"

const { Text } = Typography

// Sample data structure for recommendations
const tips = [
  {
    id: 1,
    title: "Loyiha taqdimoti",
    deadline: "Bugun",
    advice: "Avval shuni bajaring",
    priority: "Yuqori",
    type: "task",
  },
  {
    id: 2,
    title: "Dasturlash o'rganish",
    priority: "O'rta",
    type: "task",
  },
  {
    id: 3,
    title: "Vaqtni 25 daqiqalik bo'laklarga bo'lib ishlang",
    advice: "Pomodoro texnikasidan foydalaning",
    type: "advice",
  },
  {
    id: 4,
    title: "Haftalik rejani tuzish",
    deadline: "Shanba",
    priority: "O'rta",
    type: "task",
  },
  {
    id: 5,
    title: "Kunlik vazifalarni ertalab belgilang",
    advice: "Eng muhim 3 vazifani ajratib oling",
    type: "advice",
  },
]

export default function AIRecommendations() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const importantTasks = tips.filter((tip) => tip.type === "task" && tip.priority === "Yuqori")
  const nextTasks = tips.filter((tip) => tip.type === "task" && tip.priority === "O'rta")
  const advices = tips.filter((tip) => tip.type === "advice")

  return (
    <div className="w-full ">
      <Card
        className="shadow-md hover:shadow-lg transition-shadow duration-300"
        title={
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">🤖 AI Tavsiyalar</span>
          </div>
        }
        bordered={true}
      >
        {/* Muhim vazifa */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FireOutlined className="text-red-500" />
            <Text strong>Muhim vazifa:</Text>
          </div>
          <div className="ml-6 space-y-1">
            {importantTasks.map((task) => (
              <div key={task.id} className="bg-red-50 p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <Text>- {task.title}</Text>
                  {task.deadline && (
                    <Tag color="red" className="ml-2">
                      <ClockCircleOutlined /> {task.deadline}
                    </Tag>
                  )}
                </div>
                {task.advice && (
                  <Text type="secondary" className="text-xs block ml-2">
                    Tavsiya: {task.advice}
                  </Text>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Keyingi navbat */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <OrderedListOutlined className="text-blue-500" />
            <Text strong>Keyingi navbat:</Text>
          </div>
          <div className="ml-6 space-y-1">
            {nextTasks.slice(0, 1).map((task) => (
              <div key={task.id} className="bg-blue-50 p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <Text>- {task.title}</Text>
                  {task.deadline && (
                    <Tag color="blue" className="ml-2">
                      <ClockCircleOutlined /> {task.deadline}
                    </Tag>
                  )}
                </div>
                <Text type="secondary" className="text-xs block ml-2">
                  Ustuvorlik: {task.priority}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Maslahat */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BulbOutlined className="text-yellow-500" />
            <Text strong>Foydali maslahat:</Text>
          </div>
          <div className="ml-6 space-y-1">
            {advices.slice(0, 1).map((advice) => (
              <div key={advice.id} className="bg-yellow-50 p-2 rounded-md">
                <Text>- {advice.title}</Text>
                {advice.advice && (
                  <Text type="secondary" className="text-xs block ml-2">
                    {advice.advice}
                  </Text>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <Button type="primary" onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600">
            Batafsil
          </Button>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <span>📋 Barcha AI Tavsiyalar</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Divider className="my-3" />

        <List
          itemLayout="vertical"
          dataSource={tips}
          renderItem={(tip) => (
            <List.Item
              className="border-b last:border-b-0"
              extra={
                tip.deadline ? (
                  <Tag color={tip.priority === "Yuqori" ? "red" : "blue"}>
                    <ClockCircleOutlined /> {tip.deadline}
                  </Tag>
                ) : null
              }
            >
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  {tip.type === "task" ? (
                    <span className="text-blue-500">✅</span>
                  ) : (
                    <span className="text-yellow-500">💡</span>
                  )}
                </div>
                <div>
                  <Text strong>{tip.title}</Text>

                  {tip.priority && <div className="text-xs text-gray-500 mt-1">🔰 Ustuvorlik: {tip.priority}</div>}

                  {tip.advice && <div className="text-xs text-gray-500 mt-1">💡 {tip.advice}</div>}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  )
}
