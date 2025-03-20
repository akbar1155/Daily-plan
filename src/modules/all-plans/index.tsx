"use client"

import { useState, useEffect } from "react"
import { format, isToday, isTomorrow, isYesterday, addDays, isBefore, isAfter, startOfDay, isSameDay } from "date-fns"
import {
    ClockCircleOutlined,
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    RightOutlined,
    CopyOutlined,
    ReloadOutlined,
} from "@ant-design/icons"
import {
    Card,
    List,
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    Badge,
    Checkbox,
    Tabs,
    Tag,
    Space,
    Typography,
    Tooltip,
    Empty,
} from "antd"

const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs

// Define task type
type Task = {
    id: string
    title: string
    description: string
    completed: boolean
    priority: "high" | "medium" | "low"
    category: string
    deadline: Date | null
    recurrence: "none" | "daily" | "weekly" | "monthly" | null
    lastCompleted: Date | null
}

export default function TaskList() {
    // Initial tasks with dates relative to current date
    const today = new Date()
    const yesterday = addDays(today, -1)
    const tomorrow = addDays(today, 1)

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "Loyiha taqdimoti",
            description: "Mijoz uchun loyiha taqdimotini tayyorlash",
            completed: false,
            priority: "high",
            category: "ish",
            deadline: today,
            recurrence: null,
            lastCompleted: null,
        },
        {
            id: "2",
            title: "Jismoniy mashq",
            description: "30 daqiqa yugurish",
            completed: true,
            priority: "medium",
            category: "sport",
            deadline: yesterday,
            recurrence: "daily",
            lastCompleted: yesterday,
        },
        {
            id: "3",
            title: "Kitob o'qish",
            description: "Atomic Habits kitobidan 30 bet o'qish",
            completed: false,
            priority: "low",
            category: "shaxsiy",
            deadline: tomorrow,
            recurrence: "daily",
            lastCompleted: null,
        },
        {
            id: "4",
            title: "Haftalik hisobot",
            description: "Haftalik hisobotni tayyorlash va yuborish",
            completed: false,
            priority: "high",
            category: "ish",
            deadline: addDays(today, 2),
            recurrence: "weekly",
            lastCompleted: null,
        },
    ])

    // State for modal, filters, search, and editing
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [priorityFilter, setPriorityFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<string>("deadline")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    const [activeTab, setActiveTab] = useState<string>("all")
    const [form] = Form.useForm()

    // Reset form when editing task changes
    useEffect(() => {
        if (editingTask) {
            form.setFieldsValue({
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                category: editingTask.category,
                deadline: editingTask.deadline ? editingTask.deadline : null,
                completed: editingTask.completed,
                recurrence: editingTask.recurrence || "none",
            })
        } else {
            form.resetFields()
            form.setFieldsValue({
                priority: "medium",
                category: "ish",
                recurrence: "none",
            })
        }
    }, [editingTask, form])

    // Check for recurring tasks that need to be created
    useEffect(() => {
        const createRecurringTasks = () => {
            const newTasks: Task[] = []
            const updatedTasks = [...tasks]

            tasks.forEach((task) => {
                if (!task.recurrence || task.recurrence === "none") return

                // Skip if the task is for today or future
                if (!task.deadline || isToday(task.deadline) || isAfter(task.deadline, today)) return

                // If the task was completed and has a recurrence pattern
                if (task.completed && task.lastCompleted) {
                    let nextDeadline: Date | null = null

                    // Calculate next occurrence based on recurrence pattern
                    if (task.recurrence === "daily") {
                        // If the last completed date is yesterday or before, create for today
                        if (isBefore(task.lastCompleted, startOfDay(today))) {
                            nextDeadline = today
                        }
                    } else if (task.recurrence === "weekly") {
                        // Create a task for 7 days after the last completion
                        nextDeadline = addDays(task.lastCompleted, 7)
                    } else if (task.recurrence === "monthly") {
                        // Create a task for next month (simplified)
                        const nextMonth = new Date(task.lastCompleted)
                        nextMonth.setMonth(nextMonth.getMonth() + 1)
                        nextDeadline = nextMonth
                    }

                    // Create new recurring task if needed
                    if (
                        nextDeadline &&
                        !tasks.some(
                            (t) =>
                                t.title === task.title &&
                                t.recurrence === task.recurrence &&
                                t.deadline &&
                                isSameDay(t.deadline, nextDeadline as Date),
                        )
                    ) {
                        newTasks.push({
                            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                            title: task.title,
                            description: task.description,
                            completed: false,
                            priority: task.priority,
                            category: task.category,
                            deadline: nextDeadline,
                            recurrence: task.recurrence,
                            lastCompleted: null,
                        })
                    }
                }
            })

            if (newTasks.length > 0) {
                setTasks([...updatedTasks, ...newTasks])
            }
        }

        createRecurringTasks()
    }, [tasks])

    // Open modal for adding new task
    const handleAddTask = () => {
        setEditingTask(null)
        setIsModalOpen(true)
    }

    // Open modal for editing task
    const handleEditTask = (task: Task) => {
        setEditingTask(task)
        setIsModalOpen(true)
    }

    // Delete task
    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle task completion
    const toggleTaskCompletion = (id: string) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    const completed = !task.completed
                    return {
                        ...task,
                        completed,
                        lastCompleted: completed ? new Date() : task.lastCompleted,
                    }
                }
                return task
            }),
        )
    }

    // Reschedule task for tomorrow
    const rescheduleForTomorrow = (task: Task) => {
        setTasks(
            tasks.map((t) => {
                if (t.id === task.id) {
                    return {
                        ...t,
                        deadline: tomorrow,
                    }
                }
                return t
            }),
        )
    }

    // Duplicate task for tomorrow
    const duplicateForTomorrow = (task: Task) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString(),
            deadline: tomorrow,
            completed: false,
            lastCompleted: null,
        }
        setTasks([...tasks, newTask])
    }

    // Form submission
    const handleFormSubmit = () => {
        form.validateFields().then((values) => {
            if (editingTask) {
                // Update existing task
                setTasks(
                    tasks.map((task) =>
                        task.id === editingTask.id
                            ? {
                                ...task,
                                ...values,
                            }
                            : task,
                    ),
                )
            } else {
                // Add new task
                const newTask: Task = {
                    id: Date.now().toString(),
                    title: values.title,
                    description: values.description || "",
                    completed: false,
                    priority: values.priority,
                    category: values.category,
                    deadline: values.deadline,
                    recurrence: values.recurrence,
                    lastCompleted: null,
                }
                setTasks([...tasks, newTask])
            }
            setIsModalOpen(false)
        })
    }

    // Group tasks by date
    const groupTasksByDate = (filteredTasks: Task[]) => {
        const yesterday: Task[] = []
        const today: Task[] = []
        const tomorrow: Task[] = []
        const future: Task[] = []

        filteredTasks.forEach((task) => {
            if (!task.deadline) {
                future.push(task)
            } else if (isYesterday(task.deadline)) {
                yesterday.push(task)
            } else if (isToday(task.deadline)) {
                today.push(task)
            } else if (isTomorrow(task.deadline)) {
                tomorrow.push(task)
                // } else if (isAfter(task.deadline, startOfDay(today))) {
                //     future.push(task)
            } else {
                yesterday.push(task)
            }
        })

        return { yesterday, today, tomorrow, future }
    }

    // Filter and sort tasks
    const filteredTasks = tasks
        .filter((task) => {
            const matchesCategory = categoryFilter === "all" || task.category === categoryFilter
            const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "completed" && task.completed) ||
                (statusFilter === "pending" && !task.completed)
            const matchesSearch =
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase())

            // Filter by tab (date)
            const matchesTab =
                activeTab === "all" ||
                (activeTab === "yesterday" && task.deadline && isYesterday(task.deadline)) ||
                (activeTab === "today" && task.deadline && isToday(task.deadline)) ||
                (activeTab === "tomorrow" && task.deadline && isTomorrow(task.deadline)) ||
                (activeTab === "future" && task.deadline && isAfter(task.deadline, tomorrow))

            return matchesCategory && matchesPriority && matchesStatus && matchesSearch && matchesTab
        })
        .sort((a, b) => {
            if (sortBy === "priority") {
                const priorityOrder = { high: 3, medium: 2, low: 1 }
                const valueA = priorityOrder[a.priority] || 0
                const valueB = priorityOrder[b.priority] || 0
                return sortOrder === "asc" ? valueA - valueB : valueB - valueA
            } else if (sortBy === "deadline") {
                const dateA = a.deadline ? a.deadline.getTime() : Number.POSITIVE_INFINITY
                const dateB = b.deadline ? b.deadline.getTime() : Number.POSITIVE_INFINITY
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA
            } else {
                // Default sort by title
                return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
            }
        })

    // Group tasks by date
    const groupedTasks = groupTasksByDate(filteredTasks)

    // Get unique categories for filter dropdown
    const categories = Array.from(new Set(tasks.map((task) => task.category)))

    // Get priority color
    const getPriorityColor = (priority: string) => {
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

    // Get priority text
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

    // Get recurrence text
    const getRecurrenceText = (recurrence: string | null) => {
        switch (recurrence) {
            case "daily":
                return "Kunlik"
            case "weekly":
                return "Haftalik"
            case "monthly":
                return "Oylik"
            default:
                return null
        }
    }

    // Render task item
    const renderTaskItem = (task: Task) => (
        <List.Item
            key={task.id}
            style={{ opacity: task.completed ? 0.7 : 1 }}
            actions={[
                <Space key="actions">
                    {task.deadline && (isYesterday(task.deadline) || isBefore(task.deadline, yesterday)) && !task.completed && (
                        <Tooltip title="Ertaga ko'chirish">
                            <Button type="text" icon={<RightOutlined />} onClick={() => rescheduleForTomorrow(task)}>
                                Ertaga
                            </Button>
                        </Tooltip>
                    )}

                    {task.deadline && isToday(task.deadline) && (
                        <Tooltip title="Ertaga nusxalash">
                            <Button type="text" icon={<CopyOutlined />} onClick={() => duplicateForTomorrow(task)}>
                                Nusxalash
                            </Button>
                        </Tooltip>
                    )}

                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEditTask(task)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTask(task.id)} />
                </Space>,
            ]}
        >
            <List.Item.Meta
                avatar={<Checkbox checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} />}
                title={
                    <Space>
                        <Text
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                                opacity: task.completed ? 0.7 : 1,
                            }}
                        >
                            {task.title}
                        </Text>
                        <Badge status={getPriorityColor(task.priority) as any} text={getPriorityText(task.priority)} />
                        <Tag color="blue">{task.category}</Tag>
                        {task.recurrence && task.recurrence !== "none" && (
                            <Tag icon={<ReloadOutlined />} color="purple">
                                {getRecurrenceText(task.recurrence)}
                            </Tag>
                        )}
                    </Space>
                }
                description={
                    <Space direction="vertical">
                        <Text type="secondary">{task.description}</Text>
                        {task.deadline && (
                            <Text type="secondary">
                                <ClockCircleOutlined style={{ marginRight: 8 }} />
                                {format(task.deadline, "dd.MM.yyyy")}
                            </Text>
                        )}
                    </Space>
                }
            />
        </List.Item>
    )

    // Render task section
    const renderTaskSection = (title: string, tasks: Task[], tagColor: string) => (
        <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                <Tag color={tagColor} style={{ marginRight: 8 }}>
                    {title}
                </Tag>
                {title === "Kecha" && <Text type="secondary">{format(yesterday, "dd.MM.yyyy")}</Text>}
                {title === "Bugun" && <Text type="secondary">{format(today, "dd.MM.yyyy")}</Text>}
                {title === "Ertaga" && <Text type="secondary">{format(tomorrow, "dd.MM.yyyy")}</Text>}
            </div>
            <Card>
                <List
                    dataSource={tasks}
                    renderItem={renderTaskItem}
                    locale={{ emptyText: <Empty description={`${title} uchun vazifalar yo'q`} /> }}
                />
            </Card>
        </div>
    )

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <Title level={2}>Barcha Rejalar</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask}>
                    Yangi vazifa
                </Button>
            </div>

            {/* Tabs for date filtering */}
            <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 16 }}>
                <TabPane tab="Barchasi" key="all" />
                <TabPane tab="Kecha" key="yesterday" />
                <TabPane tab="Bugun" key="today" />
                <TabPane tab="Ertaga" key="tomorrow" />
                <TabPane tab="Keyingi" key="future" />
            </Tabs>

            {/* Search and filters */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                <Input
                    placeholder="Qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    prefix={<SearchOutlined />}
                    style={{ width: 200 }}
                />

                <Select placeholder="Toifa bo'yicha" value={categoryFilter} onChange={setCategoryFilter} style={{ width: 150 }}>
                    <Option value="all">Barcha toifalar</Option>
                    {categories.map((category) => (
                        <Option key={category} value={category}>
                            {category}
                        </Option>
                    ))}
                </Select>

                <Select
                    placeholder="Muhimlik darajasi"
                    value={priorityFilter}
                    onChange={setPriorityFilter}
                    style={{ width: 150 }}
                >
                    <Option value="all">Barcha darajalar</Option>
                    <Option value="high">Yuqori</Option>
                    <Option value="medium">O'rta</Option>
                    <Option value="low">Past</Option>
                </Select>

                <Select placeholder="Holat bo'yicha" value={statusFilter} onChange={setStatusFilter} style={{ width: 150 }}>
                    <Option value="all">Barcha holatlar</Option>
                    <Option value="completed">Bajarilgan</Option>
                    <Option value="pending">Bajarilmagan</Option>
                </Select>

                <Space>
                    <Text type="secondary">Saralash:</Text>
                    <Select value={sortBy} onChange={setSortBy} style={{ width: 180 }}>
                        <Option value="deadline">Muddat bo'yicha</Option>
                        <Option value="priority">Muhimlik darajasi bo'yicha</Option>
                        <Option value="title">Sarlavha bo'yicha</Option>
                    </Select>
                    <Button
                        icon={sortOrder === "asc" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    />
                </Space>
            </div>

            {/* Task list grouped by date */}
            {activeTab === "all" && (
                <>
                    {groupedTasks.yesterday.length > 0 && renderTaskSection("Kecha", groupedTasks.yesterday, "orange")}
                    {groupedTasks.today.length > 0 && renderTaskSection("Bugun", groupedTasks.today, "green")}
                    {groupedTasks.tomorrow.length > 0 && renderTaskSection("Ertaga", groupedTasks.tomorrow, "blue")}
                    {groupedTasks.future.length > 0 && renderTaskSection("Keyingi", groupedTasks.future, "purple")}

                    {filteredTasks.length === 0 && <Empty description="Vazifalar topilmadi" />}
                </>
            )}

            {activeTab === "yesterday" && renderTaskSection("Kecha", groupedTasks.yesterday, "orange")}
            {activeTab === "today" && renderTaskSection("Bugun", groupedTasks.today, "green")}
            {activeTab === "tomorrow" && renderTaskSection("Ertaga", groupedTasks.tomorrow, "blue")}
            {activeTab === "future" && renderTaskSection("Keyingi", groupedTasks.future, "purple")}

            {/* Add/Edit Task Modal */}
            <Modal
                title={editingTask ? "Vazifani tahrirlash" : "Yangi vazifa qo'shish"}
                open={isModalOpen}
                onOk={handleFormSubmit}
                onCancel={() => setIsModalOpen(false)}
                okText={editingTask ? "Saqlash" : "Qo'shish"}
                cancelText="Bekor qilish"
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item name="title" label="Sarlavha" rules={[{ required: true, message: "Sarlavha kiritilishi shart" }]}>
                        <Input placeholder="Vazifa sarlavhasi" />
                    </Form.Item>

                    <Form.Item name="description" label="Tavsif">
                        <TextArea rows={3} placeholder="Vazifa tavsifi" />
                    </Form.Item>

                    <div style={{ display: "flex", gap: 16 }}>
                        <Form.Item name="priority" label="Muhimlik darajasi" style={{ width: "50%" }}>
                            <Select placeholder="Tanlang">
                                <Option value="high">Yuqori</Option>
                                <Option value="medium">O'rta</Option>
                                <Option value="low">Past</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="category" label="Toifa" style={{ width: "50%" }}>
                            <Select placeholder="Tanlang">
                                <Option value="ish">Ish</Option>
                                <Option value="ta'lim">Ta'lim</Option>
                                <Option value="sport">Sport</Option>
                                <Option value="shaxsiy">Shaxsiy</Option>
                                <Option value="boshqa">Boshqa</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item name="deadline" label="Muddat">
                        <DatePicker style={{ width: "100%" }} format="DD.MM.YYYY" placeholder="Muddatni tanlang" />
                    </Form.Item>

                    <Form.Item
                        name="recurrence"
                        label="Takrorlanish"
                        help="Vazifa belgilangan vaqtda avtomatik ravishda takrorlanadi"
                    >
                        <Select placeholder="Tanlang">
                            <Option value="none">Takrorlanmaydi</Option>
                            <Option value="daily">Har kuni</Option>
                            <Option value="weekly">Har hafta</Option>
                            <Option value="monthly">Har oy</Option>
                        </Select>
                    </Form.Item>

                    {editingTask && (
                        <Form.Item name="completed" valuePropName="checked">
                            <Checkbox>Bajarilgan</Checkbox>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>
    )
}

