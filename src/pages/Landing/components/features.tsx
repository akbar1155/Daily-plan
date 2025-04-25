"use client"

import { useEffect, useState, useRef } from "react"
import { Card, Col, Row, Typography } from "antd"
import { motion, useInView, useAnimation } from "framer-motion"
import { CalendarCheck, Clock, LinkIcon, Mic, RefreshCw, Bell, Sparkles } from "lucide-react"

const { Title, Paragraph } = Typography

export default function FeaturesSection() {
    const ref = useRef(null)
    const controls = useAnimation()
    const isInView = useInView(ref, { once: false, amount: 0.1 })
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
            if (!hasAnimated) {
                setHasAnimated(true)
            }
        } else {
            controls.start("hidden")
        }
    }, [isInView, controls, hasAnimated])

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                delay: 0.15 * i,
                ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for smoother animation
            },
        }),
    }

    const iconContainerVariants = {
        hidden: { scale: 0.8, opacity: 0, rotate: -10 },
        visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6,
            },
        },
        hover: {
            scale: 1.15,
            rotate: 5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    }

    // Particle animation for cards
    const particleVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
            },
        },
    }

    const features = [
        {
            title: "AI yordamida task yaratish",
            description: [
                '• Foydalanuvchi shunchaki "bugun nima qilishim kerak?" deb so\'raydi.',
                "• AI foydalanuvchining odatlarini o'rganib, reja tavsiyalarini beradi.",
            ],
            icon: <CalendarCheck size={32} />,
            color: "blue",
        },
        {
            title: "Vaqtni boshqarish – Pomodoro + AI",
            description: [
                "• Pomodoro texnikasi bilan ishlashni taklif qiladi.",
                "• AI qaysi vaqtda ko'proq unumdor ishlash mumkinligini o'rganib, vaqtni o'zi taqsimlaydi.",
            ],
            icon: <Clock size={32} />,
            color: "green",
        },
        {
            title: "Tasklar orasidagi bog'liqlik",
            description: [
                "• Vazifalar ketma-ket bajarilishini avtomatik tushunadi.",
                '• Masalan: "Material o\'qish" → "Test yechish" → "Imtihonga tayyorlanish"',
            ],
            icon: <LinkIcon size={32} />,
            color: "purple",
        },
        {
            title: "Ovozli task yaratish",
            description: [
                "• Foydalanuvchi gapirib vazifalarni kiritishi mumkin.",
                "• AI nutqni matnga aylantirib, rejalarga qo'shadi.",
            ],
            icon: <Mic size={32} />,
            color: "red",
        },
        {
            title: "Tasklarni avtomatik qayta tuzish",
            description: [
                "• Agar foydalanuvchi vazifani bajarmasa, AI uni yangi jadvalga moslashtirib qo'yadi.",
                '• Masalan: "Bugun bajarmading, ertaga soat 10:00 ga qo\'ydim."',
            ],
            icon: <RefreshCw size={32} />,
            color: "orange",
        },
        {
            title: '"Smart Reminder" – aqlli eslatmalar',
            description: [
                "• AI qachon va qanday eslatish kerakligini tushunadi.",
                '• Masalan, "Kecha kechiktirgan ishing bor edi" yoki "Erta tongda eng samarali ishlaysiz, hoziroq boshlang."',
            ],
            icon: <Bell size={32} />,
            color: "cyan",
        },
    ]


    const getGradient = (color: string) => {
        const gradients: Record<string, string> = {
            blue: "from-blue-400 to-blue-600",
            green: "from-green-400 to-green-600",
            purple: "from-purple-400 to-purple-600",
            red: "from-red-400 to-red-600",
            orange: "from-orange-400 to-orange-600",
            cyan: "from-cyan-400 to-cyan-600",
            yellow: "from-yellow-400 to-yellow-600",
        }
        return gradients[color] || "from-gray-400 to-gray-600"
    }

    const getIconBg = (color: string) => {
        const backgrounds: Record<string, string> = {
            blue: "bg-blue-50",
            green: "bg-green-50",
            purple: "bg-purple-50",
            red: "bg-red-50",
            orange: "bg-orange-50",
            cyan: "bg-cyan-50",
            yellow: "bg-yellow-50",
        }
        return backgrounds[color] || "bg-gray-50"
    }

    const getIconColor = (color: string) => {
        const colors: Record<string, string> = {
            blue: "text-blue-500",
            green: "text-green-500",
            purple: "text-purple-500",
            red: "text-red-500",
            orange: "text-orange-500",
            cyan: "text-cyan-500",
            yellow: "text-yellow-500",
        }
        return colors[color] || "text-gray-500"
    }

    return (
        <div
            className="features-section py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
            id="feature"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                            backgroundSize: "30px 30px",
                        }}
                    ></div>

                    {/* Floating shapes */}
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <motion.div
                            key={`shape-${i}`}
                            className="absolute rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20"
                            style={{
                                width: 100 + Math.random() * 100,
                                height: 100 + Math.random() * 100,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, 10, 0],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 15 + Math.random() * 15,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    ref={ref}
                    variants={sectionVariants}
                    initial="hidden"
                    animate={controls}
                    className="text-center mb-16"
                >
                    <motion.div variants={titleVariants}>
                        <Title level={2} className="section-title text-3xl md:text-4xl font-bold mb-4 relative inline-block">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                AI bilan kuchaytirilgan xususiyatlar
                            </span>
                            <motion.div
                                className="absolute -bottom-2 left-1/4 w-1/2 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                initial={{ width: 0, left: "50%" }}
                                animate={{ width: "50%", left: "25%" }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                            ></motion.div>
                        </Title>
                        <Paragraph className="text-gray-600 max-w-2xl mx-auto mt-4">
                            Zamonaviy AI texnologiyalari bilan vazifalaringizni yanada samarali boshqaring
                        </Paragraph>
                    </motion.div>
                </motion.div>

                <Row gutter={[32, 32]}>
                    {features.map((feature, index) => (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <motion.div
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate={controls}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="h-full"
                            >
                                <Card
                                    hoverable
                                    className="feature-card h-full rounded-xl overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 relative"
                                    bodyStyle={{ padding: "24px" }}
                                >
                                    {/* Animated gradient border */}
                                    <div
                                        className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${getGradient(feature.color)}`}
                                    ></div>

                                    {/* Animated particles */}
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={`particle-${index}-${i}`}
                                            className={`absolute w-2 h-2 rounded-full bg-${feature.color}-400`}
                                            style={{
                                                top: `${20 + Math.random() * 60}%`,
                                                left: `${20 + Math.random() * 60}%`,
                                                opacity: 0,
                                            }}
                                            variants={particleVariants}
                                            animate="visible"
                                            transition={{
                                                delay: index * 0.2 + i * 1,
                                            }}
                                        />
                                    ))}

                                    <div className="mb-6 relative">
                                        <motion.div
                                            variants={iconContainerVariants}
                                            whileHover="hover"
                                            className={`feature-icon-container ${getIconBg(feature.color)} w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden`}
                                        >
                                            {/* Animated background for icon */}
                                            <motion.div
                                                className="absolute inset-0 opacity-30"
                                                animate={{
                                                    background: [
                                                        `radial-gradient(circle at 30% 30%, ${getIconColor(feature.color).replace("text", "rgb")}, transparent 70%)`,
                                                        `radial-gradient(circle at 70% 70%, ${getIconColor(feature.color).replace("text", "rgb")}, transparent 70%)`,
                                                    ],
                                                }}
                                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                                            />

                                            <div className={`feature-icon ${getIconColor(feature.color)} relative z-10`}>{feature.icon}</div>

                                            {/* Sparkle effect */}
                                            <motion.div
                                                className="absolute top-0 right-0"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 15, 0] }}
                                                transition={{
                                                    duration: 2,
                                                    delay: index * 0.3,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    repeatDelay: 5,
                                                }}
                                            >
                                                <Sparkles size={12} className="text-yellow-400" />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                    >
                                        <Title level={4} className="mb-4 font-bold">
                                            {feature.title}
                                        </Title>
                                        {feature.description.map((paragraph, i) => (
                                            <Paragraph key={i} className="text-gray-600">
                                                {paragraph}
                                            </Paragraph>
                                        ))}
                                    </motion.div>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}


                </Row>
            </div>
        </div>
    )
}
