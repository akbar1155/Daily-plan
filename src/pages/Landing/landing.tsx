"use client"
import { Layout } from "antd"


import "./styles.scss"
import FooterLanding from "./components/footer"
import ImpactSection from "./components/impact"
import TestimonialsSection from "./components/testimonials"
import ContactSection from "./components/contact"
import HeaderLanding from "./components/header"
import FeaturesSection from "./components/features"
import HeroSection from "./components/hero"

const { Content } = Layout

export default function LandingPage() {

    return (
        <Layout className="layout">
            <HeaderLanding />
            <Content>
                <HeroSection />
                <FeaturesSection />
                <ImpactSection />
                <TestimonialsSection />
                <ContactSection />
            </Content>
            <FooterLanding />
        </Layout>
    )
}
