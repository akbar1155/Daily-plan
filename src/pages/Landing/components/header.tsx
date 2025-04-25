"use client"

import { useState, useEffect } from "react"
import { Button, Image, Layout, Space } from "antd"
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import Logo from "../../../assets/images/logo_org.png"

const { Header } = Layout

export default function HeaderLanding() {
    const [menuVisible, setMenuVisible] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("main")

    const toggleMenu = () => {
        setMenuVisible(!menuVisible)
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setScrolled(scrollPosition > 50)

            // Update active section based on scroll position
            const sections = ["main", "feature", "contact", "result", "feedback"]
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close menu when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (menuVisible && !target.closest(".nav-menu") && !target.closest(".menu-toggle")) {
                setMenuVisible(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [menuVisible])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (menuVisible) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [menuVisible])

    const headerVariants = {
        initial: { backgroundColor: "rgba(255, 255, 255, 0)", boxShadow: "none" },
        scrolled: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            backdropFilter: "blur(8px)"
        },
    }

    const navItemVariants = {
        initial: { y: -20, opacity: 0 },
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.05 * i,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
        hover: {
            scale: 1.05,
            color: "#3b82f6",
            transition: { duration: 0.2 }
        },
    }

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        },
        open: {
            opacity: 1,
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.07,
                delayChildren: 0.1,
            }
        },
    }

    const mobileNavItemVariants = {
        closed: { x: 50, opacity: 0 },
        open: { x: 0, opacity: 1 },
    }

    const logoVariants = {
        initial: { opacity: 0, x: -20 },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
    }

    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    }

    const navItems = [
        { name: "Asosiy", href: "#main" },
        { name: "Xususiyatlar", href: "#feature" },
        { name: "Natija", href: "#result" },
        { name: "Fikrlar", href: "#feedback" },
        { name: "Bog'lanish", href: "#contact" },
    ]

    return (
        <motion.div
            variants={headerVariants}
            initial="initial"
            animate={scrolled ? "scrolled" : "initial"}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <Header className="header bg-transparent border-0 h-20 px-0 flex items-center">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <motion.div
                        variants={logoVariants}
                        initial="initial"
                        animate="animate"
                        className="flex items-center"
                    >
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={180}
                            // height={160}
                            className="h-10 w-auto"
                        />
                    </motion.div>

                    <div className="menu-toggle block md:hidden" onClick={toggleMenu}>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-blue-50 text-blue-500"
                        >
                            {menuVisible ? <CloseOutlined /> : <MenuOutlined />}
                        </motion.div>
                    </div>

                    {/* Desktop Navigation */}
                    <Space className="nav-menu hidden md:flex items-center">
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.name}
                                custom={i}
                                variants={navItemVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                <Button
                                    type="text"
                                    href={item.href}
                                    className={`text-base font-medium px-4 ${activeSection === item.href.replace('#', '') ? 'text-blue-500' : 'text-gray-700'}`}
                                >
                                    {item.name}
                                    {activeSection === item.href.replace('#', '') && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 mx-4"
                                            layoutId="activeSection"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Button>
                            </motion.div>
                        ))}
                        <motion.div
                            variants={navItemVariants}
                            custom={navItems.length}
                            initial="initial"
                            animate="animate"
                        >
                            <Link to="/login">
                                <motion.div
                                    variants={buttonVariants}
                                    initial="initial"
                                    // whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="h-12 px-8 text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-md"
                                    >
                                        Boshlash
                                    </Button>
                                </motion.div>
                            </Link>

                        </motion.div>
                    </Space>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {menuVisible && (
                            <motion.div
                                variants={mobileMenuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="nav-menu visible md:hidden fixed top-20 right-0 bottom-0 left-0 bg-white flex flex-col items-center justify-center space-y-6 p-4"
                            >
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        variants={mobileNavItemVariants}
                                        className="w-full"
                                    >
                                        <Button
                                            type="text"
                                            href={item.href}
                                            className={`text-lg font-medium w-full h-14 flex items-center justify-center ${activeSection === item.href.replace('#', '') ? 'text-blue-500 bg-blue-50' : 'text-gray-700'}`}
                                            onClick={() => setMenuVisible(false)}
                                        >
                                            {item.name}
                                        </Button>
                                    </motion.div>
                                ))}
                                <motion.div variants={mobileNavItemVariants} className="w-full pt-4">
                                    <Link to="/login" className="block w-full">
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-blue-600 border-none shadow-md"
                                            onClick={() => setMenuVisible(false)}
                                        >
                                            Boshlash
                                        </Button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Header>
        </motion.div>
    )
}
