"use client"

import { useEffect, useState, useRef } from "react"
import { Button, Col, Row, Typography, Space } from "antd"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Calendar, CheckCircle, Clock, Brain, Sparkles, Zap, ListTodo } from "lucide-react"
import { Link } from "react-router-dom"

const { Title, Paragraph } = Typography

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false)
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 300], [0, 100])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const containerRef = useRef<HTMLDivElement>(null)
    // Mouse position for interactive elements
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for mouse movement
    const springConfig = { damping: 25, stiffness: 300 }
    const mouseXSpring = useSpring(mouseX, springConfig)
    const mouseYSpring = useSpring(mouseY, springConfig)

    // Pre-calculate transforms based on mouse position
    const dashboardRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5])
    const dashboardRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5])

    const taskCardRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5])
    const taskCardRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5])

    // Task cards for the 3D visualization
    const taskCards = [
        {
            title: "Loyiha taqdimoti",
            time: "Bugun, 14:00",
            priority: "Yuqori",
            color: "from-red-400 to-red-600",
            icon: <Zap size={18} />,
            x: -20,
            y: -15,
            rotate: -5,
            delay: 0.1,
        },
        {
            title: "Haftalik hisobot",
            time: "Ertaga, 10:00",
            priority: "O'rta",
            color: "from-yellow-400 to-yellow-600",
            icon: <Clock size={18} />,
            x: 0,
            y: 0,
            rotate: 0,
            delay: 0.2,
        },
        {
            title: "Dizayn ko'rib chiqish",
            time: "Bugun, 16:30",
            priority: "Past",
            color: "from-green-400 to-green-600",
            icon: <CheckCircle size={18} />,
            x: 20,
            y: -10,
            rotate: 5,
            delay: 0.3,
        },
        {
            title: "Mijoz bilan uchrashuv",
            time: "Juma, 11:00",
            priority: "Yuqori",
            color: "from-blue-400 to-blue-600",
            icon: <Calendar size={18} />,
            x: -10,
            y: 15,
            rotate: -3,
            delay: 0.4,
        },
    ]

    // Pre-calculate task card transforms based on mouse position
    const taskCardTransforms = taskCards.map((card) => ({
        x: useTransform(mouseXSpring, [-0.5, 0.5], [(card.x - 5) * 5, (card.x + 5) * 5]),
        y: useTransform(mouseYSpring, [-0.5, 0.5], [(card.y - 5) * 5, (card.y + 5) * 5]),
    }))

    useEffect(() => {
        setIsVisible(true)

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            }
            const x = (e.clientX - left) / width - 0.5
            const y = (e.clientY - top) / height - 0.5

            mouseX.set(x)
            mouseY.set(y)
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    }

    const paragraphVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
            },
        },
    }

    const buttonVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.4,
                ease: "easeOut",
            },
        },
        hover: (primary: boolean) => ({
            scale: 1.05,
            y: -5,
            boxShadow: primary ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)" : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.2,
                ease: "easeOut",
            },
        }),
        tap: {
            scale: 0.95,
            boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.1 },
        },
    }

    // Background shapes
    const shapes = [
        { top: "10%", left: "5%", size: 60, delay: 0, duration: 20, rotate: 360 },
        { top: "20%", right: "10%", size: 40, delay: 5, duration: 25, rotate: -360 },
        { bottom: "15%", left: "15%", size: 30, delay: 10, duration: 30, rotate: 360 },
        { bottom: "25%", right: "5%", size: 50, delay: 15, duration: 35, rotate: -360 },
    ]

    // AI suggestion bubbles
    const aiBubbles = [
        {
            text: "Bugun 3ta muhim vazifa bor",
            x: -120,
            y: -80,
            delay: 0.5,
            duration: 3,
        },
        {
            text: "Loyiha taqdimotini tayyorlashni boshlang",
            x: 120,
            y: -40,
            delay: 0.7,
            duration: 3.5,
        },
        {
            text: "Kecha 2ta vazifa bajarilmadi",
            x: -80,
            y: 100,
            delay: 0.9,
            duration: 4,
        },
    ]

    // Floating icons
    const floatingIcons = [
        { icon: <Brain size={24} />, color: "bg-purple-500", x: -150, y: -70, delay: 0.2, duration: 5 },
        { icon: <Sparkles size={24} />, color: "bg-yellow-500", x: 150, y: -50, delay: 0.5, duration: 6 },
        { icon: <ListTodo size={24} />, color: "bg-blue-500", x: -100, y: 80, delay: 0.8, duration: 5.5 },
        { icon: <Clock size={24} />, color: "bg-green-500", x: 120, y: 70, delay: 1.1, duration: 4.5 },
    ]

    return (
        <div
            className="hero-section relative pt-32 mt-20 pb-20 overflow-hidden min-h-[90vh] flex items-center"
            id="main"
            ref={containerRef}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-0"></div>

            {/* Animated background grid */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                ></div>
            </div>

            {/* Background shapes */}
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full bg-gradient-to-r from-blue-100 to-blue-200 opacity-40 z-0"
                    style={{
                        top: shape.top,
                        left: shape.left,
                        right: shape.right,
                        bottom: shape.bottom,
                        width: shape.size,
                        height: shape.size,
                    }}
                    animate={{
                        rotate: shape.rotate,
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: shape.delay,
                    }}
                />
            ))}

            <div className="container mx-auto px-4 relative z-10">
                <Row justify="center" align="middle" gutter={[0, 24]}>
                    <Col xs={24} md={12} lg={10}>
                        <motion.div
                            variants={titleVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            className="text-center md:text-left"
                        >
                            <Title
                                level={1}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                            >
                                AI yordamida vazifalaringizni boshqaring
                            </Title>
                        </motion.div>

                        <motion.div
                            variants={paragraphVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            className="text-center md:text-left"
                        >
                            <Paragraph className="hero-paragraph text-lg md:text-xl text-gray-600 mt-4 mb-8">
                                Sun&apos;iy intellekt bilan ishlash samaradorligingizni oshiring va vaqtingizni tejang
                            </Paragraph>
                        </motion.div>

                        <motion.div
                            variants={buttonVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            className="text-center md:text-left"
                        >
                            <Space size="large" className="hero-buttons">
                                <motion.div custom={true} variants={buttonVariants} whileHover="hover" whileTap="tap">
                                    <Link to="/login" className="block w-full">
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="h-12 px-8 text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-md"
                                        >
                                            Boshlash
                                        </Button>
                                    </Link>
                                </motion.div>

                                <motion.div custom={false} variants={buttonVariants} whileHover="hover" whileTap="tap">
                                    <Button size="large" className="h-12 px-8 text-base font-medium border-2 border-gray-200 shadow-sm">
                                        Ko&apos;proq ma&apos;lumot
                                    </Button>
                                </motion.div>
                            </Space>
                        </motion.div>
                    </Col>

                    <Col xs={24} md={12} lg={14}>
                        <motion.div
                            style={{ y, opacity }}
                            className="hero-visual-container mt-12 md:mt-0 relative h-[400px] md:h-[500px]"
                        >
                            {/* Interactive 3D Dashboard Visualization */}
                            <div className="relative w-full h-full perspective-1000">
                                {/* Main dashboard frame */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                                    style={{
                                        rotateX: dashboardRotateX,
                                        rotateY: dashboardRotateY,
                                    }}
                                >
                                    {/* Dashboard header */}
                                    <div className="h-14 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center px-6">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="text-white font-medium ml-4">AI Task Manager</div>
                                    </div>

                                    {/* Dashboard content */}
                                    <div className="p-6 bg-gray-50 h-full">
                                        {/* Stats row */}
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            {[
                                                { label: "Bugungi vazifalar", value: "5", color: "bg-blue-100 text-blue-600" },
                                                { label: "Bajarilgan", value: "12", color: "bg-green-100 text-green-600" },
                                                { label: "Kechiktirilgan", value: "2", color: "bg-red-100 text-red-600" },
                                            ].map((stat, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`flex-1 ${stat.color} rounded-lg p-3 shadow-sm`}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.8 + i * 0.1 }}
                                                >
                                                    <div className="text-2xl font-bold">{stat.value}</div>
                                                    <div className="text-sm">{stat.label}</div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* AI Assistant */}
                                        <motion.div
                                            className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-100 flex items-center"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.1 }}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
                                                <Brain size={20} />
                                            </div>
                                            <div>
                                                <div className="text-sm text-purple-700 font-medium">AI Yordamchi</div>
                                                <div className="text-gray-700">Bugun eng muhim vazifangiz: Loyiha taqdimotini tayyorlash</div>
                                            </div>
                                        </motion.div>

                                        {/* Task list */}
                                        <div className="space-y-3">
                                            {[
                                                { title: "Loyiha taqdimoti", time: "14:00", priority: "Yuqori", color: "border-red-400" },
                                                { title: "Haftalik hisobot", time: "Ertaga", priority: "O'rta", color: "border-yellow-400" },
                                                { title: "Dizayn ko'rib chiqish", time: "16:30", priority: "Past", color: "border-green-400" },
                                            ].map((task, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`bg-white p-3 rounded-lg shadow-sm border-l-4 ${task.color} flex justify-between items-center`}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 1.2 + i * 0.1 }}
                                                >
                                                    <div>
                                                        <div className="font-medium">{task.title}</div>
                                                        <div className="text-xs text-gray-500">{task.time}</div>
                                                    </div>
                                                    <div
                                                        className={`text-xs px-2 py-1 rounded ${task.priority === "Yuqori"
                                                            ? "bg-red-100 text-red-600"
                                                            : task.priority === "O'rta"
                                                                ? "bg-yellow-100 text-yellow-600"
                                                                : "bg-green-100 text-green-600"
                                                            }`}
                                                    >
                                                        {task.priority}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating task cards */}
                                {taskCards.map((card, index) => (
                                    <motion.div
                                        key={index}
                                        className={`absolute top-1/2 left-1/2 bg-white rounded-lg shadow-lg overflow-hidden w-48 border border-gray-100`}
                                        initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                                        animate={{
                                            opacity: 1,
                                            x: card.x * 5,
                                            y: card.y * 5,
                                            rotate: card.rotate,
                                            z: index * 10,
                                        }}
                                        transition={{
                                            delay: card.delay + 0.5,
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                        style={{
                                            x: taskCardTransforms[index].x,
                                            y: taskCardTransforms[index].y,
                                            rotateX: taskCardRotateX,
                                            rotateY: taskCardRotateY,
                                            rotate: card.rotate,
                                            zIndex: 10 + index,
                                        }}
                                    >
                                        <div className={`h-1.5 bg-gradient-to-r ${card.color}`}></div>
                                        <div className="p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="font-medium text-sm">{card.title}</div>
                                                <div
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${card.priority === "Yuqori"
                                                        ? "bg-red-100 text-red-500"
                                                        : card.priority === "O'rta"
                                                            ? "bg-yellow-100 text-yellow-500"
                                                            : "bg-green-100 text-green-500"
                                                        }`}
                                                >
                                                    {card.icon}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500">{card.time}</div>
                                            <div
                                                className={`text-xs mt-2 px-2 py-0.5 rounded w-fit ${card.priority === "Yuqori"
                                                    ? "bg-red-100 text-red-600"
                                                    : card.priority === "O'rta"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {card.priority}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* AI suggestion bubbles */}
                                {aiBubbles.map((bubble, index) => (
                                    <motion.div
                                        key={index}
                                        className="absolute top-1/2 left-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs shadow-lg"
                                        initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                                        animate={{
                                            opacity: [0, 1, 1, 0],
                                            scale: [0.5, 1, 1, 0.8],
                                            x: bubble.x,
                                            y: bubble.y,
                                        }}
                                        transition={{
                                            delay: bubble.delay + 1.5,
                                            duration: bubble.duration,
                                            times: [0, 0.1, 0.9, 1],
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatDelay: 5,
                                        }}
                                    >
                                        {bubble.text}
                                    </motion.div>
                                ))}

                                {/* Floating icons */}
                                {floatingIcons.map((icon, index) => (
                                    <motion.div
                                        key={index}
                                        className={`absolute top-1/2 left-1/2 ${icon.color} text-white p-2 rounded-full shadow-lg`}
                                        initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                                        animate={{
                                            opacity: [0, 1, 1, 0],
                                            scale: [0.5, 1, 1, 0.8],
                                            x: icon.x,
                                            y: icon.y,
                                        }}
                                        transition={{
                                            delay: icon.delay + 2,
                                            duration: icon.duration,
                                            times: [0, 0.1, 0.9, 1],
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatDelay: 3,
                                        }}
                                    >
                                        {icon.icon}
                                    </motion.div>
                                ))}

                                {/* Particles */}
                                {Array.from({ length: 20 }).map((_, index) => (
                                    <motion.div
                                        key={`particle-${index}`}
                                        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-500 opacity-70"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 0.7, 0],
                                            scale: [0, 1, 0],
                                            x: Math.random() * 400 - 200,
                                            y: Math.random() * 400 - 200,
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatDelay: Math.random() * 2,
                                            delay: Math.random() * 5,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
