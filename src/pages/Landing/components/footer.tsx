"use client"

import { useRef } from "react"
import { Col, Divider, Row, Typography } from "antd"
import { motion, useInView } from "framer-motion"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons"

import Logo from "../../../assets/images/logo_org.png"
const { Title, Text, Paragraph } = Typography

export default function AnimatedFooter() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const socialIconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5 + i * 0.1,
            },
        }),
        hover: {
            scale: 1.2,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    }

    const linkVariants = {
        hover: {
            x: 5,
            color: "#3b82f6",
            transition: {
                duration: 0.2,
            },
        },
    }

    const contactItemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                ease: "easeOut",
            },
        }),
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.2,
            },
        },
    }

    const socialIcons = [
        { icon: <Send size={20} />, href: "#", color: "bg-blue-100 text-blue-500" },
        { icon: <FacebookOutlined />, href: "#", color: "bg-blue-100 text-blue-700" },
        { icon: <InstagramOutlined />, href: "#", color: "bg-pink-100 text-pink-600" },
        { icon: <LinkedinOutlined />, href: "#", color: "bg-blue-100 text-blue-600" },
    ]

    const services = [
        { name: "Asosiy xususiyatlar", href: "#" },
        { name: "Narxlar", href: "#" },
        { name: "Biznes uchun", href: "#" },
        { name: "Talabalar uchun", href: "#" },
    ]

    const contactLinks = [
        { name: "Yordam markazi", href: "#" },
        { name: "Bizga yozing", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Hamkorlik", href: "#" },
    ]

    const contactInfo = [
        {
            icon: <Phone className="text-blue-500" size={20} />,
            text: "+998 93 293 11 55",
            href: "tel:+998932931155",
        },
        {
            icon: <Mail className="text-blue-500" size={20} />,
            text: "isroilovakbar49@gmail.com",
            href: "mailto:isroilovakbar49@gmail.com",
        },
        {
            icon: <MapPin className="text-blue-500" size={20} />,
            text: "Yunusobod tumani, Toshkent",
            href: "#",
        },
    ]

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 px-0 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-500 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-purple-500 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                    <Row gutter={[32, 32]}>
                        {/* Logo and Description */}
                        <Col xs={24} md={12} lg={8}>
                            <motion.div variants={itemVariants}>
                                <div className="flex items-center h-24 w-44">
                                    <img src={Logo} alt="AI Task Manager" width={180} className=" w-auto" />
                                </div>
                                <Paragraph className="text-gray-400 max-w-md">
                                    Sun&apos;iy intellekt yordamida vazifalaringizni samarali boshqaring va vaqtingizni tejang.
                                </Paragraph>
                                <div className="flex space-x-6 mt-6">
                                    {socialIcons.map((item, i) => (
                                        <motion.a
                                            key={i}
                                            href={item.href}
                                            custom={i}
                                            variants={socialIconVariants}
                                            whileHover="hover"
                                            className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300`}
                                        >
                                            {item.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </Col>

                        {/* Xizmatlar (Services) */}
                        <Col xs={24} sm={12} md={6} lg={5}>
                            <motion.div variants={itemVariants}>
                                <Title level={4} className="text-white mb-6 font-medium">
                                    Xizmatlar
                                </Title>
                                <ul className="space-y-3 list-none p-0 m-0">
                                    {services.map((item, i) => (
                                        <motion.li key={i} whileHover="hover">
                                            <motion.a
                                                href={item.href}
                                                variants={linkVariants}
                                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
                                            >
                                                <motion.span
                                                    initial={{ width: 0 }}
                                                    whileHover={{ width: 15 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="h-0.5 bg-blue-500 mr-2"
                                                />
                                                {item.name}
                                            </motion.a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </Col>

                        {/* Bog'lanish (Contact) */}
                        <Col xs={24} sm={12} md={6} lg={5}>
                            <motion.div variants={itemVariants}>
                                <Title level={4} className="text-white mb-6 font-medium">
                                    Bog&apos;lanish
                                </Title>
                                <ul className="space-y-3 list-none p-0 m-0">
                                    {contactLinks.map((item, i) => (
                                        <motion.li key={i} whileHover="hover">
                                            <motion.a
                                                href={item.href}
                                                variants={linkVariants}
                                                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center"
                                            >
                                                <motion.span
                                                    initial={{ width: 0 }}
                                                    whileHover={{ width: 15 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="h-0.5 bg-blue-500 mr-2"
                                                />
                                                {item.name}
                                            </motion.a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </Col>

                        {/* Contact Information */}
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <motion.div variants={itemVariants}>
                                <Title level={4} className="text-white mb-6 font-medium">
                                    Aloqa
                                </Title>
                                <ul className="space-y-4 list-none p-0 m-0">
                                    {contactInfo.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            custom={i}
                                            variants={contactItemVariants}
                                            whileHover="hover"
                                            className="flex items-center text-gray-400"
                                        >
                                            <div className="flex justify-center items-center h-10 w-10 bg-gray-800 rounded-full mr-3">
                                                {item.icon}
                                            </div>
                                            <a href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                                                {item.text}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* Copyright */}
                    <motion.div variants={itemVariants}>
                        <Divider className="bg-gray-800 mt-12 mb-8" />
                        <div className="text-center">
                            <Text className="text-gray-500">
                                © {new Date().getFullYear()} AI Task Manager. Barcha huquqlar himoyalangan.
                            </Text>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    )
}
