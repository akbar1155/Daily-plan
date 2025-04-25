"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CircleUserRound, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    })

    const testimonials = [
        {
            name: "Aziza Karimova",
            role: "Talaba",
            // image: "/?height=128&width=128",
            text: "AI Task Manager menga o'qishimni va shaxsiy vazifalarimni samarali boshqarishda juda yordam berdi. Ayniqsa ovozli task yaratish xususiyati juda qulay!",
            rating: 5,
        },
        {
            name: "Bobur Aliyev",
            role: "Dasturchi",
            // image: "/placeholder.svg?height=128&width=128",
            text: "Pomodoro + AI xususiyati mening ish unumdorligimni sezilarli darajada oshirdi. Endi qaysi vaqtda qanday vazifalarni bajarishim kerakligini aniq bilaman.",
            rating: 5,
        },
        {
            name: "Malika Rahimova",
            role: "Tadbirkor",
            // image: "/placeholder.svg?height=128&width=128",
            text: "Integratsiya xususiyati juda foydali - endi barcha rejalarim bir joyda va Telegram orqali ham boshqara olaman. Bu mening biznesimni yanada samarali boshqarishimga yordam bermoqda.",
            rating: 5,
        },
        {
            name: "Jahongir Toshmatov",
            role: "O'qituvchi",
            // image: "/placeholder.svg?height=128&width=128",
            text: "O'quvchilarim uchun vazifalarni tashkil qilishda bu dastur menga juda qo'l kelmoqda. Vaqtni tejash va samaradorlikni oshirish uchun ajoyib yechim.",
            rating: 4,
        },
        {
            name: "Nilufar Sobirova",
            role: "Marketolog",
            // image: "/placeholder.svg?height=128&width=128",
            text: "Loyihalarni boshqarish va marketing kampaniyalarini rejalashtirish uchun eng yaxshi dastur. Interfeysi sodda va tushunarli, hamda AI tavsiyalari juda foydali.",
            rating: 5,
        },
    ]

    // Auto-rotate testimonials
    useEffect(() => {
        if (!inView) return

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [inView, testimonials.length])

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    }

    const quoteVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.3,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
            },
        },
    }

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50 overflow-hidden" ref={ref} id="feedback">
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-cyan-100/30 blur-3xl -z-10"></div>
            <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-slate-800 mb-4 relative inline-block">
                        Foydalanuvchilar fikrlari
                        <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: "100%" } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"
                        ></motion.div>
                    </h2>
                </motion.div>

                {/* Desktop view - 3 cards side by side */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.slice(0, 3).map((testimonial, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                            >
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Quote icon */}
                                <motion.div
                                    variants={quoteVariants}
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    className="absolute -top-2 -right-2 text-cyan-100"
                                >
                                    <Quote size={80} strokeWidth={1} />
                                </motion.div>

                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">

                                                <CircleUserRound className="w-10 h-10 text-white" strokeWidth={1.5} />

                                            </div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={inView ? { scale: 1 } : {}}
                                                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                                                className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md"
                                            >
                                                <div className="bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center">
                                                    <Star className="w-4 h-4 text-white fill-white" />
                                                </div>
                                            </motion.div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-lg text-slate-800">{testimonial.name}</h3>
                                            <p className="text-slate-500 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                                                    } mr-1`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-slate-700 relative">
                                        <span className="text-cyan-500 text-2xl font-serif absolute -left-2 -top-2">"</span>
                                        {testimonial.text}
                                        <span className="text-cyan-500 text-2xl font-serif">"</span>
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile view - carousel */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden">
                        <motion.div
                            animate={{ x: `-${activeIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex"
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                                        <div className="absolute -top-2 -right-2 text-cyan-100">
                                            <Quote size={60} strokeWidth={1} />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center mb-4">
                                                <div className="relative">
                                                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">

                                                        <CircleUserRound className="w-8 h-8 text-white" strokeWidth={1.5} />

                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                                                        <div className="bg-cyan-500 rounded-full w-5 h-5 flex items-center justify-center">
                                                            <Star className="w-3 h-3 text-white fill-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="font-semibold text-base text-slate-800">{testimonial.name}</h3>
                                                    <p className="text-slate-500 text-xs">{testimonial.role}</p>
                                                </div>
                                            </div>

                                            <div className="mb-3 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                                                            } mr-1`}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-slate-700 text-sm">
                                                <span className="text-cyan-500 text-xl font-serif">"</span>
                                                {testimonial.text}
                                                <span className="text-cyan-500 text-xl font-serif">"</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={prevTestimonial}
                            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-cyan-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex gap-2 items-center">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? "w-6 bg-cyan-500" : "bg-slate-300"
                                        }`}
                                ></button>
                            ))}
                        </div>
                        <button
                            onClick={nextTestimonial}
                            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-cyan-50 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
