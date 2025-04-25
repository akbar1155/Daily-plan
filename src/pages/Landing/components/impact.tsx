"use client"

import { Clock, Zap, ThumbsUp, TrendingUp, Award, Users, Sparkles } from "lucide-react"
import { motion, useAnimation, useMotionValue, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState, useRef } from "react"

export default function ImpactSection() {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    })

    const controls = useAnimation()
    const [animate, setAnimate] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Mouse position for interactive elements
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        if (inView) {
            setAnimate(true)
            controls.start("visible")
        } else {
            controls.start("hidden")
        }

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
    }, [inView, controls, mouseX, mouseY])

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                duration: 0.6,
            },
        },
    }

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    }

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse" as const,
            ease: "easeInOut",
        },
    }

    const impactData = [
        {
            icon: <Clock className="w-10 h-10 text-cyan-500" />,
            title: "Vaqt tejash",
            value: "+40%",
            progress: 40,
            gradient: "from-cyan-500 to-blue-500",
            particles: ["⏱️", "⌛", "🕒"],
        },
        {
            icon: <Zap className="w-10 h-10 text-green-500" />,
            title: "Natijaga erishish tezligi",
            value: "+3X",
            progress: 80,
            gradient: "from-green-500 to-green-600",
            particles: ["⚡", "🚀", "💨"],
        },
        {
            icon: <ThumbsUp className="w-10 h-10 text-yellow-500" />,
            title: "Ijobiy fikrlar",
            value: "95%",
            progress: 95,
            gradient: "from-yellow-400 to-yellow-500",
            particles: ["👍", "🌟", "😊"],
        },
        {
            icon: <TrendingUp className="w-10 h-10 text-purple-500" />,
            title: "Samaradorlik o'sishi",
            value: "+65%",
            progress: 65,
            gradient: "from-purple-500 to-indigo-600",
            particles: ["📈", "🔝", "💹"],
        },
        {
            icon: <Award className="w-10 h-10 text-rose-500" />,
            title: "Sifat ko'rsatkichi",
            value: "9.2/10",
            progress: 92,
            gradient: "from-rose-500 to-pink-600",
            particles: ["🏆", "🥇", "🎖️"],
        },
        {
            icon: <Users className="w-10 h-10 text-amber-500" />,
            title: "Mijozlar soni o'sishi",
            value: "+120%",
            progress: 100,
            gradient: "from-amber-400 to-orange-500",
            particles: ["👥", "🧑‍🤝‍🧑", "🌐"],
        },
    ]

    // Function to animate number counting
    const Counter = ({ value }: { value: string }) => {
        const numericValue = Number.parseInt(value.replace(/[^0-9]/g, "")) || 0
        const [count, setCount] = useState(0)

        useEffect(() => {
            if (animate && numericValue > 0) {
                let start = 0
                const end = Math.min(numericValue, 100)
                const duration = 2000
                const increment = end / (duration / 16) // 60fps

                const timer = setInterval(() => {
                    start += increment
                    if (start >= end) {
                        setCount(end)
                        clearInterval(timer)
                    } else {
                        setCount(Math.floor(start))
                    }
                }, 16)

                return () => clearInterval(timer)
            }
        }, [animate, numericValue])

        // Format the value to match the original format
        const formattedValue = value.includes("+")
            ? `+${count}${value.includes("%") ? "%" : value.includes("X") ? "X" : ""}`
            : value.includes("/")
                ? `${(count / 10).toFixed(1)}/10`
                : `${count}${value.includes("%") ? "%" : ""}`

        return <>{formattedValue}</>
    }

    return (
        <div
            className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 py-20 px-4 sm:px-6 lg:px-8"
            id="result"
            ref={containerRef}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                ></div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-200/30 to-cyan-400/30 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
                <motion.div
                    className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-200/30 to-blue-400/30 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                ></motion.div>
                <motion.div
                    className="absolute top-1/2 left-1/2 transform  w-96 h-96 rounded-full bg-gradient-to-tr from-purple-200/10 to-purple-400/10 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, delay: 4 }}
                ></motion.div>

                {/* Floating shapes */}
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <motion.div
                        key={`shape-${i}`}
                        className="absolute rounded-full bg-gradient-to-r from-blue-300/10 to-purple-300/10"
                        style={{
                            width: 40 + Math.random() * 60,
                            height: 40 + Math.random() * 60,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 15, 0],
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

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.div className="inline-block relative" animate={floatingAnimation}>
                        <h2 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                            <motion.span
                                className="mr-3 text-5xl relative"
                                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                            >
                                📊
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1.2, 0.5],
                                    }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                                >
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
                                </motion.div>
                            </motion.span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                                Foydalanuvchilarning natijalari
                            </span>
                        </h2>
                    </motion.div>
                    <motion.p
                        className="text-xl text-slate-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={animate ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Mahsulotimiz foydalanuvchilarga qanday real foyda berganini ko'ring
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {impactData.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white rounded-2xl shadow-lg transition-all duration-500 p-8 relative overflow-hidden group"
                            whileHover={{
                                scale: 1.03,
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                transition: { duration: 0.3 },
                            }}
                            onHoverStart={() => setHoveredCard(index)}
                            onHoverEnd={() => setHoveredCard(null)}
                        >
                            {/* Background gradient that animates on hover */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at center, ${item.gradient.includes("cyan")
                                        ? "rgba(6, 182, 212, 0.1)"
                                        : item.gradient.includes("green")
                                            ? "rgba(34, 197, 94, 0.1)"
                                            : item.gradient.includes("yellow")
                                                ? "rgba(250, 204, 21, 0.1)"
                                                : item.gradient.includes("purple")
                                                    ? "rgba(168, 85, 247, 0.1)"
                                                    : item.gradient.includes("rose")
                                                        ? "rgba(244, 63, 94, 0.1)"
                                                        : "rgba(251, 146, 60, 0.1)"
                                        }, transparent 70%)`,
                                }}
                            />

                            {/* Animated particles that appear on hover */}
                            <AnimatePresence>
                                {hoveredCard === index &&
                                    item.particles.map((emoji, i) => (
                                        <motion.div
                                            key={`particle-${index}-${i}`}
                                            className="absolute text-xl pointer-events-none"
                                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0.5, 1.2, 0.5],
                                                x: [0, (i - 1) * 30 - 15],
                                                y: [0, -40 - i * 10],
                                            }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            style={{ left: "50%", top: "40%" }}
                                        >
                                            {emoji}
                                        </motion.div>
                                    ))}
                            </AnimatePresence>

                            <div className="relative z-10">
                                {/* Icon with 3D rotation effect */}
                                <motion.div
                                    className="flex justify-center items-center w-20 h-20 rounded-2xl bg-slate-50 mb-6 mx-auto relative overflow-hidden"
                                    whileHover={{
                                        rotateY: [0, 10, -10, 0],
                                        rotateX: [0, -10, 10, 0],
                                        transition: { duration: 1, ease: "easeInOut" },
                                    }}
                                >
                                    {/* Animated background for icon */}
                                    <motion.div
                                        className="absolute inset-0 opacity-30"
                                        animate={{
                                            background: [
                                                `radial-gradient(circle at 30% 30%, ${item.gradient.includes("cyan")
                                                    ? "rgb(6, 182, 212)"
                                                    : item.gradient.includes("green")
                                                        ? "rgb(34, 197, 94)"
                                                        : item.gradient.includes("yellow")
                                                            ? "rgb(250, 204, 21)"
                                                            : item.gradient.includes("purple")
                                                                ? "rgb(168, 85, 247)"
                                                                : item.gradient.includes("rose")
                                                                    ? "rgb(244, 63, 94)"
                                                                    : "rgb(251, 146, 60)"
                                                }, transparent 70%)`,
                                                `radial-gradient(circle at 70% 70%, ${item.gradient.includes("cyan")
                                                    ? "rgb(6, 182, 212)"
                                                    : item.gradient.includes("green")
                                                        ? "rgb(34, 197, 94)"
                                                        : item.gradient.includes("yellow")
                                                            ? "rgb(250, 204, 21)"
                                                            : item.gradient.includes("purple")
                                                                ? "rgb(168, 85, 247)"
                                                                : item.gradient.includes("rose")
                                                                    ? "rgb(244, 63, 94)"
                                                                    : "rgb(251, 146, 60)"
                                                }, transparent 70%)`,
                                            ],
                                        }}
                                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                                    />
                                    {item.icon}

                                    {/* Sparkle effect */}
                                    <motion.div
                                        className="absolute top-1 right-1"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 15, 0] }}
                                        transition={{
                                            duration: 2,
                                            delay: index * 0.3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatDelay: 5,
                                        }}
                                    >
                                        <Sparkles size={10} className="text-yellow-400" />
                                    </motion.div>
                                </motion.div>

                                <motion.h3
                                    className="text-lg font-medium text-slate-800 mb-3 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={animate ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                >
                                    {item.title}
                                </motion.h3>

                                <motion.p
                                    className="text-4xl font-bold text-center mb-4 bg-gradient-to-r bg-clip-text text-transparent from-blue-600 to-cyan-600"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={animate ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                >
                                    {animate ? <Counter value={item.value} /> : item.value}
                                </motion.p>

                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={animate ? { width: `${item.progress}%` } : {}}
                                        transition={{
                                            duration: 1.5,
                                            delay: 0.4 + index * 0.1,
                                            ease: "easeOut",
                                        }}
                                        className={`h-full bg-gradient-to-r ${item.gradient} rounded-full relative`}
                                    >
                                        {/* Animated glow effect on progress bar */}
                                        <motion.div
                                            className="absolute top-0 bottom-0 w-10 bg-white/30 skew-x-12"
                                            animate={{ left: ["-10%", "100%"] }}
                                            transition={{
                                                duration: 2,
                                                delay: 1 + index * 0.2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatDelay: 5,
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Pulsing circle behind the progress bar */}
                                <motion.div
                                    className={`absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-r ${item.gradient}`}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.7, 1, 0.7],
                                    }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom decorative element */}
                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={animate ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <motion.div
                        className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        animate={{
                            width: ["5rem", "15rem", "5rem"],
                        }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                </motion.div>
            </div>
        </div>
    )
}
