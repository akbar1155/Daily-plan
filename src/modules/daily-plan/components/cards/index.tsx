import { useState } from "react";
import { Card, List, Badge, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Check, Pencil, Trash, X } from "lucide-react";

const initialTasks = [
    { id: 1, title: "Dastur yozish", description: "React komponentlarini yaratish", completed: false, priority: "high", date: "2025-03-25", time: "10:00 - 11:30", duration: "1 soat 30 daqiqa", category: "Ish" },
    { id: 2, title: "Kitob o‘qish", description: "JavaScript bo‘yicha maqolalar", completed: true, priority: "medium", date: "2025-03-26", time: "12:00 - 13:30", duration: "1 soat 30 daqiqa", category: "O'qish" },
    { id: 3, title: "Sport bilan shug‘ullanish", description: "Ertalab 30 daqiqa yugurish", completed: false, priority: "high", date: "2025-03-27", time: "06:30 - 07:00", duration: "30 daqiqa", category: "Salomatlik" },
    { id: 4, title: "Oilaviy vaqt", description: "Oilam bilan kechki ovqat", completed: false, priority: "low", date: "2025-03-28", time: "19:00 - 20:30", duration: "1 soat 30 daqiqa", category: "Shaxsiy" },
    { id: 5, title: "Yangi texnologiyalarni o‘rganish", description: "AI va ML bo‘yicha maqolalarni o‘qish", completed: false, priority: "medium", date: "2025-03-29", time: "14:00 - 15:30", duration: "1 soat 30 daqiqa", category: "O'qish" },
    { id: 6, title: "Online kurslarni ko‘rish", description: "Udemy-dagi Next.js kursini tugatish", completed: false, priority: "high", date: "2025-03-30", time: "16:00 - 17:30", duration: "1 soat 30 daqiqa", category: "Ta’lim" },
    { id: 7, title: "Do‘stlar bilan uchrashish", description: "Choyxonada uchrashuv", completed: false, priority: "low", date: "2025-04-01", time: "18:00 - 19:30", duration: "1 soat 30 daqiqa", category: "Ijtimoiy" },
    { id: 8, title: "Portfolio yangilash", description: "Yangi loyihalarni qo‘shish va dizaynni yaxshilash", completed: false, priority: "medium", date: "2025-04-02", time: "09:00 - 10:30", duration: "1 soat 30 daqiqa", category: "Ish" },
    { id: 9, title: "Uy tozalash", description: "Xonalarni tartibga keltirish va chang artish", completed: false, priority: "low", date: "2025-04-03", time: "08:00 - 09:30", duration: "1 soat 30 daqiqa", category: "Shaxsiy" },
    { id: 10, title: "Sayohat rejalashtirish", description: "Kelasi oy uchun safar rejalari", completed: false, priority: "medium", date: "2025-04-05", time: "15:00 - 16:30", duration: "1 soat 30 daqiqa", category: "Dam olish" }
];

export default function DailyPlanCards() {
    const [tasks, setTasks] = useState(initialTasks);

    const toggleComplete = (id: any) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const getPriorityColor = (priority: any) => {
        switch (priority) {
            case "high": return "error";
            case "medium": return "warning";
            case "low": return "success";
            default: return "default";
        }
    };
    const getPriorityText = (priority: string) => {
        switch (priority) {
            case "high":
                return "Yuqori"
            case "medium":
                return "O'rta"
            case "low":
                return "Past"
            default:
                return priority
        }
    }
    return (
        <Card className="bg-white border-0 shadow-lg p-4 rounded-xl">
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item key={task.id} className={`mb-4 p-6 border rounded-lg transition-all duration-300 ${task.completed ? "bg-gray-100" : "bg-white shadow-md hover:shadow-lg"}`}>
                        <div className="flex items-center w-full px-4">
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <span className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>{task.title}</span>
                                    {/* <Badge className="ml-2" status={getPriorityColor(task.priority)} /> */}
                                    <Badge className="ml-2" status={getPriorityColor(task.priority) as any} text={getPriorityText(task.priority)} />
                                </div>
                                <div className="text-sm text-gray-500 mb-1">{task.description}</div>
                                <div className="flex items-center text-xs text-gray-400">
                                    <ClockCircleOutlined className="mr-1" /> {task.date} | {task.time} ({task.duration})
                                </div>
                            </div>
                            <Tag color="blue">{task.category}</Tag>
                            <div className="flex items-center space-x-2 ml-4">
                                <Check style={{ width: "25px", height: "25px" }} stroke="green" onClick={() => toggleComplete(task.id)} className="cursor-pointer" />
                                <X style={{ width: "25px", height: "25px" }} stroke="red" onClick={() => toggleComplete(task.id)} className="cursor-pointer" />
                                <Pencil style={{ width: "25px", height: "25px", padding: "2px" }} stroke="grey" className="cursor-pointer" />
                                <Trash style={{ width: "25px", height: "25px" }} stroke="red" className="cursor-pointer" />
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );
}