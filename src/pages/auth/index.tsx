// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Card, Tabs, Form, Input, Button, Divider, Typography, Space, notification } from "antd"
// import {
//     GoogleOutlined,
//     AppleOutlined,
//     MailOutlined,
//     PhoneOutlined,
//     LockOutlined,
//     UserOutlined,
//     GlobalOutlined,
// } from "@ant-design/icons"

// const { Title, Text } = Typography
// const { TabPane } = Tabs

// interface LoginFormValues {
//     email: string
//     password: string
// }

// interface PhoneFormValues {
//     phoneNumber: string
//     verificationCode: string
// }

// const AuthPage: React.FC = () => {
//     const [loginForm] = Form.useForm()
//     const [phoneForm] = Form.useForm()
//     const [isVerificationSent, setIsVerificationSent] = useState(false)

//     const handleLoginSubmit = (values: LoginFormValues) => {
//         console.log("Login form submitted:", values)
//         notification.success({
//             message: "Login Attempted",
//             description: `Attempting to log in with email: ${values.email}`,
//         })
//     }

//     const handlePhoneSubmit = (values: PhoneFormValues) => {
//         console.log("Phone verification submitted:", values)
//         notification.success({
//             message: "Phone Verification",
//             description: `Verification code submitted for: ${values.phoneNumber}`,
//         })
//     }

//     const sendVerificationCode = () => {
//         const phoneNumber = phoneForm.getFieldValue("phoneNumber")
//         if (phoneNumber && phoneNumber.length >= 9) {
//             setIsVerificationSent(true)
//             notification.info({
//                 message: "Verification Code Sent",
//                 description: `A verification code has been sent to ${phoneNumber}`,
//             })
//         } else {
//             notification.error({
//                 message: "Invalid Phone Number",
//                 description: "Please enter a valid phone number",
//             })
//         }
//     }

//     const handleSocialLogin = (provider: string) => {
//         console.log(`Logging in with ${provider}`)
//         notification.info({
//             message: "Social Login",
//             description: `Redirecting to ${provider} for authentication...`,
//         })
//     }

//     const handleSSOLogin = () => {
//         console.log("SSO login initiated")
//         notification.info({
//             message: "SSO Login",
//             description: "Redirecting to SSO provider...",
//         })
//     }

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "100vh",
//                 background: "#f5f5f5",
//             }}
//         >
//             <Card
//                 style={{
//                     width: 400,
//                     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
//                     borderRadius: "8px",
//                     background: "white",
//                 }}
//             >
//                 <div style={{ textAlign: "center", marginBottom: 24 }}>
//                     <Title level={2} style={{ marginBottom: 8 }}>
//                         Welcome
//                     </Title>
//                     <Text type="secondary">Sign in to continue to the platform</Text>
//                 </div>


//                 <Form form={loginForm} layout="vertical" onFinish={handleLoginSubmit}>
//                     <Form.Item
//                         name="Username"
//                         rules={[
//                             { required: true, message: "Please input your email!" },
//                             { type: "email", message: "Please enter a valid email!" },
//                         ]}
//                     >
//                         <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
//                     </Form.Item>

//                     <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
//                         <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
//                     </Form.Item>

//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" size="large" block style={{ backgroundColor: "#1890ff" }}>
//                             Sign In
//                         </Button>
//                     </Form.Item>

//                     <div style={{ textAlign: "center" }}>
//                         <a href="#forgot-password">Forgot password?</a>
//                     </div>
//                 </Form>



//                 {/* <Divider plain>Or continue with</Divider>

//                 <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//                     <Button
//                         icon={<GoogleOutlined />}
//                         size="large"
//                         block
//                         onClick={() => handleSocialLogin("Google")}
//                         style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//                     >
//                         Google
//                     </Button>

//                     <Button
//                         icon={<AppleOutlined />}
//                         size="large"
//                         block
//                         onClick={() => handleSocialLogin("Apple")}
//                         style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//                     >
//                         Apple
//                     </Button>

//                     <Button
//                         icon={<GlobalOutlined />}
//                         size="large"
//                         block
//                         onClick={handleSSOLogin}
//                         style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//                     >
//                         Enterprise SSO
//                     </Button>
//                 </Space> */}

//                 <div style={{ textAlign: "center", marginTop: 24 }}>
//                     <Text type="secondary">Don't have an account? </Text>
//                     <a href="#register">Register now</a>
//                 </div>
//             </Card>
//         </div>
//     )
// }

// export default AuthPage

// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { User, Lock, LogIn } from "lucide-react"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// const formSchema = z.object({
//     username: z.string().min(3, {
//         message: "Username must be at least 3 characters.",
//     }),
//     password: z.string().min(6, {
//         message: "Password must be at least 6 characters.",
//     }),
// })

// export default function LoginForm() {
//     const router = useRouter()
//     const [isLoading, setIsLoading] = useState(false)

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             username: "",
//             password: "",
//         },
//     })

//     function onSubmit(values: z.infer<typeof formSchema>) {
//         setIsLoading(true)

//         // Simulate API call
//         setTimeout(() => {
//             console.log(values)
//             setIsLoading(false)
//             // In a real app, you would validate credentials and redirect on success
//             // router.push("/dashboard")
//         }, 1000)
//     }

//     return (
//         <Card className="w-full max-w-md">
//             <CardHeader className="space-y-1">
//                 <div className="flex justify-center">
//                     <LogIn className="h-10 w-10 text-primary" />
//                 </div>
//                 <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//                 <CardDescription className="text-center">Enter your username and password to login</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                         <FormField
//                             control={form.control}
//                             name="username"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <User className="h-4 w-4" /> Username
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input placeholder="Enter your username" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <Lock className="h-4 w-4" /> Password
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit" className="w-full" disabled={isLoading}>
//                             {isLoading ? (
//                                 "Logging in..."
//                             ) : (
//                                 <span className="flex items-center gap-2">
//                                     <LogIn className="h-4 w-4" /> Login
//                                 </span>
//                             )}
//                         </Button>
//                     </form>
//                 </Form>
//             </CardContent>
//             <CardFooter className="flex flex-col">
//                 <p className="text-center text-sm text-muted-foreground">
//                     Don&apos;t have an account?{" "}
//                     <Link href="/register" className="text-primary underline">
//                         Register
//                     </Link>
//                 </p>
//             </CardFooter>
//         </Card>
//     )
// }

// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { User, Lock, Mail, Phone, UserPlus, UserCircle } from "lucide-react"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// const formSchema = z
//     .object({
//         fullName: z.string().min(2, {
//             message: "Full name must be at least 2 characters.",
//         }),
//         username: z.string().min(3, {
//             message: "Username must be at least 3 characters.",
//         }),
//         password: z.string().min(6, {
//             message: "Password must be at least 6 characters.",
//         }),
//         confirmPassword: z.string().min(6, {
//             message: "Password must be at least 6 characters.",
//         }),
//         email: z.string().email({
//             message: "Please enter a valid email address.",
//         }),
//         phone: z.string().min(9, {
//             message: "Phone number must be at least 9 digits.",
//         }),
//     })
//     .refine((data) => data.password === data.confirmPassword, {
//         message: "Passwords do not match",
//         path: ["confirmPassword"],
//     })

// export default function RegisterForm() {
//     const router = useRouter()
//     const [isLoading, setIsLoading] = useState(false)

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             fullName: "",
//             username: "",
//             password: "",
//             confirmPassword: "",
//             email: "",
//             phone: "",
//         },
//     })

//     function onSubmit(values: z.infer<typeof formSchema>) {
//         setIsLoading(true)

//         // Simulate API call
//         setTimeout(() => {
//             console.log(values)
//             setIsLoading(false)
//             // In a real app, you would create the user and redirect
//             // router.push("/login")
//         }, 1000)
//     }

//     return (
//         <Card className="w-full max-w-md">
//             <CardHeader className="space-y-1">
//                 <div className="flex justify-center">
//                     <UserPlus className="h-10 w-10 text-primary" />
//                 </div>
//                 <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
//                 <CardDescription className="text-center">Create a new account</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                         <FormField
//                             control={form.control}
//                             name="fullName"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <UserCircle className="h-4 w-4" /> Full Name (F.I.O)
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input placeholder="Enter your full name" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="username"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <User className="h-4 w-4" /> Username
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input placeholder="Enter your username" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <Lock className="h-4 w-4" /> Password
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="confirmPassword"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <Lock className="h-4 w-4" /> Confirm Password
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <Mail className="h-4 w-4" /> Email
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input type="email" placeholder="example@mail.com" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="phone"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="flex items-center gap-2">
//                                         <Phone className="h-4 w-4" /> Phone Number
//                                     </FormLabel>
//                                     <FormControl>
//                                         <div className="relative">
//                                             <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input placeholder="+998 XX XXX XX XX" className="pl-10" {...field} />
//                                         </div>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button type="submit" className="w-full" disabled={isLoading}>
//                             {isLoading ? (
//                                 "Creating account..."
//                             ) : (
//                                 <span className="flex items-center gap-2">
//                                     <UserPlus className="h-4 w-4" /> Register
//                                 </span>
//                             )}
//                         </Button>
//                     </form>
//                 </Form>
//             </CardContent>
//             <CardFooter className="flex flex-col">
//                 <p className="text-center text-sm text-muted-foreground">
//                     Already have an account?{" "}
//                     <Link href="/" className="text-primary underline">
//                         Login
//                     </Link>
//                 </p>
//             </CardFooter>
//         </Card>
//     )
// }

