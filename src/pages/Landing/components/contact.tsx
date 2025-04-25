'use client'

import { useState, useEffect } from 'react'
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography
} from 'antd'
import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled
} from '@ant-design/icons'
import { Mail, MapPin, Phone, SendIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const { Title, Paragraph } = Typography
const { TextArea } = Input

export default function ContactSection() {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const contactSection = document.getElementById('contact')
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect()
                const isInView = rect.top <= window.innerHeight * 0.75
                setIsVisible(isInView)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check on initial load

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSubmit = async (values: any) => {
        setIsLoading(true)
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Form values:', values)
        form.resetFields()
        setIsLoading(false)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    const socialIconVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.15, transition: { duration: 0.2 } }
    }

    return (
        <div className="contact-section py-16 bg-gradient-to-b from-white to-blue-50" id="contact">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <Title level={2} className="section-title text-3xl font-bold mb-4 relative inline-block">
                        Biz bilan bog&apos;laning
                        <div className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-green-500 rounded-full"></div>
                    </Title>
                    <Paragraph className="contact-description text-gray-600 max-w-2xl mx-auto">
                        Savollaringiz bormi? Biz sizga yordam berishdan mamnunmiz. Quyidagi ma&apos;lumotlar orqali biz bilan
                        bog&apos;lanishingiz mumkin
                    </Paragraph>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    <Row gutter={[32, 32]}>
                        <Col xs={24} lg={12}>
                            <motion.div variants={itemVariants}>
                                <Card
                                    className="contact-form-card shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    bordered={false}
                                    style={{ borderRadius: '16px', overflow: 'hidden' }}
                                >
                                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 -mt-5 -mx-6 mb-6"></div>
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <Form.Item
                                            name="name"
                                            label={<span className="text-lg font-medium">Ismingiz</span>}
                                            rules={[{ required: true, message: 'Iltimos, ismingizni kiriting!' }]}
                                        >
                                            <Input
                                                placeholder="To'liq ismingiz"
                                                size="large"
                                                className="rounded-lg border-gray-300 hover:border-green-400 focus:border-green-500 transition-colors"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="email"
                                            label={<span className="text-lg font-medium">Email</span>}
                                            rules={[
                                                { required: true, message: 'Iltimos, emailingizni kiriting!' },
                                                { type: 'email', message: 'Email formatini to\'g\'ri kiriting!' }
                                            ]}
                                        >
                                            <Input
                                                placeholder="email@example.com"
                                                size="large"
                                                className="rounded-lg border-gray-300 hover:border-green-400 focus:border-green-500 transition-colors"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="phone"
                                            label={<span className="text-lg font-medium">Telefon</span>}
                                            rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting!' }]}
                                        >
                                            <Input
                                                placeholder="+998 90 123 45 67"
                                                size="large"
                                                className="rounded-lg border-gray-300 hover:border-green-400 focus:border-green-500 transition-colors"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="message"
                                            label={<span className="text-lg font-medium">Xabar</span>}
                                            rules={[{ required: true, message: 'Iltimos, xabaringizni kiriting!' }]}
                                        >
                                            <TextArea
                                                placeholder="Xabaringizni yozing..."
                                                rows={4}
                                                className="rounded-lg border-gray-300 hover:border-green-400 focus:border-green-500 transition-colors resize-none"
                                            />
                                        </Form.Item>

                                        <Form.Item>

                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                loading={isLoading}
                                                className="h-12 px-8  w-full text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-md"
                                            >
                                                {isLoading ? 'Yuborilmoqda...' : 'Yuborish'}
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </motion.div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <motion.div variants={itemVariants}>
                                <Card
                                    className="contact-info-card shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
                                    bordered={false}
                                    style={{ borderRadius: '16px', overflow: 'hidden' }}
                                >
                                    <div className="bg-gradient-to-r from-blue-500 to-green-400 h-2 -mt-5 -mx-6 mb-6"></div>

                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        <Title level={3} className="font-bold text-xl">Manzil</Title>
                                        <div className="contact-info-item flex items-center mb-6 group">
                                            <div className="flex justify-center items-center h-12 w-12 bg-green-50 rounded-full mr-4 group-hover:bg-green-100 transition-colors duration-300">
                                                <MapPin className="text-green-500" />
                                            </div>
                                            <div>
                                                <a
                                                    href="https://yandex.uz/maps/10335/tashkent/house/YkAYdA5hSE0GQFprfX91cXhgZg==/?ll=69.291047%2C41.340441&z=17.35"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block text-gray-800 no-underline hover:text-green-600 transition-colors duration-300"
                                                >
                                                    <span className="font-medium">Bizning ofis</span>
                                                    <br />
                                                    <span className="text-gray-600">Yunusobod tumani, Toshkent</span>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        <Title level={3} className="font-bold text-xl mt-4">Telefon</Title>
                                        <div className="contact-info-item flex items-center mb-6 group">
                                            <div className="flex justify-center items-center h-12 w-12 bg-green-50 rounded-full mr-4 group-hover:bg-green-100 transition-colors duration-300">
                                                <Phone className="text-green-500" />
                                            </div>
                                            <div>
                                                <a
                                                    href="tel:+998932931155"
                                                    className="block text-gray-800 no-underline hover:text-green-600 transition-colors duration-300"
                                                >
                                                    +998 93 293 11 55
                                                </a>
                                                <a
                                                    href="tel:+998947163666"
                                                    className="block text-gray-800 no-underline hover:text-green-600 transition-colors duration-300"
                                                >
                                                    +998 94 716 36 66
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                    >
                                        <Title level={3} className="font-bold text-xl mt-4">Email</Title>
                                        <div className="contact-info-item flex items-center mb-6 group">
                                            <div className="flex justify-center items-center h-12 w-12 bg-green-50 rounded-full mr-4 group-hover:bg-green-100 transition-colors duration-300">
                                                <Mail className="text-green-500" />
                                            </div>
                                            <div>
                                                <a
                                                    href="mailto:isroilovakbar49@gmail.com"
                                                    className="block text-gray-800 no-underline hover:text-green-600 transition-colors duration-300"
                                                >
                                                    isroilovakbar49@gmail.com
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <Divider className="my-6 border-gray-200" />

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.9, duration: 0.5 }}
                                    >
                                        <Title level={3} className="font-bold text-xl">Ijtimoiy tarmoqlar</Title>
                                        <div className="social-icons flex flex-wrap justify-around gap-4 my-6">
                                            <motion.a
                                                href="https://t.me/akbar_11_55/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                                                variants={socialIconVariants}
                                                initial="initial"
                                                whileHover="hover"
                                            >
                                                <SendIcon className="text-blue-500" width={22} height={22} />
                                                <span className="text-blue-700">Telegram</span>
                                            </motion.a>

                                            <motion.a
                                                href="https://www.linkedin.com/in/akbar-israilov-407295256/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                                                variants={socialIconVariants}
                                                initial="initial"
                                                whileHover="hover"
                                            >
                                                <LinkedinFilled className="text-blue-600 text-xl" />
                                                <span className="text-blue-700">LinkedIn</span>
                                            </motion.a>

                                            <motion.a
                                                href="https://www.instagram.com/akbar_11_55/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors duration-300"
                                                variants={socialIconVariants}
                                                initial="initial"
                                                whileHover="hover"
                                            >
                                                <InstagramFilled className="text-pink-600 text-xl" />
                                                <span className="text-pink-700">Instagram</span>
                                            </motion.a>

                                            <motion.a
                                                href="https://facebook.com/yourprofile"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                                                variants={socialIconVariants}
                                                initial="initial"
                                                whileHover="hover"
                                            >
                                                <FacebookFilled className="text-blue-800 text-xl" />
                                                <span className="text-blue-800">Facebook</span>
                                            </motion.a>
                                        </div>
                                    </motion.div>

                                    <Divider className="my-6 border-gray-200" />

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.1, duration: 0.5 }}
                                    >
                                        <Title level={3} className="font-bold text-xl">Ish vaqti</Title>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <Row className="py-1">
                                                <Col span={12}>
                                                    <Paragraph className="text-gray-700 mb-1">Dushanba - Juma:</Paragraph>
                                                </Col>
                                                <Col span={12} className="text-right">
                                                    <Paragraph className="text-gray-900 font-medium mb-1">09:00 - 18:00</Paragraph>
                                                </Col>
                                            </Row>
                                            <Row className="py-1 bg-gray-100 rounded">
                                                <Col span={12}>
                                                    <Paragraph className="text-gray-700 mb-1">Shanba:</Paragraph>
                                                </Col>
                                                <Col span={12} className="text-right">
                                                    <Paragraph className="text-gray-900 font-medium mb-1">10:00 - 15:00</Paragraph>
                                                </Col>
                                            </Row>
                                            <Row className="py-1">
                                                <Col span={12}>
                                                    <Paragraph className="text-gray-700 mb-1">Yakshanba:</Paragraph>
                                                </Col>
                                                <Col span={12} className="text-right">
                                                    <Paragraph className="text-gray-900 font-medium mb-1">Dam olish kuni</Paragraph>
                                                </Col>
                                            </Row>
                                        </div>
                                    </motion.div>
                                </Card>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </div>
        </div>
    )
}
