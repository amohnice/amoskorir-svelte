export const certificates = [
    {
        title: "AI Career Essentials",
        issuer: "ALX",
        date: "July 2024",
        location: "Nairobi",
        href: "/certificates/alx_aice_ai_career_essentials_certificate.pdf",
        icon: "fas fa-brain"
    },
    {
        title: "Web Development",
        issuer: "eMobilis",
        date: "Oct 2024 - Dec 2024",
        location: "Nairobi",
        href: "/certificates/",
        icon: "fas fa-code"
    },
    {
        title: "Software Development",
        issuer: "PLP x Safaricom Hook",
        date: "Dec 2024 - Mar 2025",
        location: "Nairobi",
        href: "/certificates/amos_PLP_certificate.pdf",
        icon: "fas fa-code-branch"
    },
    {
        title: "Genkit, ADK & Vertex AI",
        issuer: "Build with AI (Unstacked Labs)",
        date: "Sept 2025 - Dec 2025",
        location: "Nairobi",
        href: "/certificates/amos_Unstacked_Labs_BwAI_Certificate.pdf",
        icon: "fas fa-robot"
    }
];

export const skills = [
    { title: "HTML", icon: "devicon-html5-plain" },
    { title: "CSS", icon: "devicon-css3-plain" },
    { title: "Bootstrap", icon: "devicon-bootstrap-plain" },
    { title: "TailwindCSS", icon: "devicon-tailwindcss-plain" },
    { title: "JavaScript", icon: "devicon-javascript-plain" },
    { title: "TypeScript", icon: "devicon-typescript-plain" },
    { title: "Python", icon: "devicon-python-plain" },
    { title: "React", icon: "devicon-react-plain" },
    { title: "Svelte", icon: "devicon-svelte-plain" },
    { title: "Next.js", icon: "devicon-nextjs-original-wordmark" },
    { title: "Node.js", icon: "devicon-nodejs-plain" },
    { title: "Express", icon: "devicon-express-original" },
    { title: "Django", icon: "devicon-django-plain" },
    { title: "MySQL", icon: "devicon-mysql-plain" },
    { title: "PostgreSQL", icon: "devicon-postgresql-plain" },
    { title: "MongoDB", icon: "devicon-mongodb-plain" },
    { title: "SQLite", icon: "devicon-sqlite-plain" },
    { title: "Docker", icon: "devicon-docker-plain" }
];

export const projects = [
    {
        id: "smartfarm",
        title: "SmartFarm Advisor",
        emoji: "🌾",
        heroImage: "/projects/smartfarm.png",
        liveDemo: "https://smartfarm-advisor.vercel.app/",
        sourceCode: "https://github.com/amohnice/smartfarm",
        about: "SmartFarm Advisor is an intelligent farming assistant designed for African smallholder farmers. It leverages AI to detect plant diseases, provide agricultural advice, and offer localized weather insights, helping farmers make data-driven decisions to improve crop yields.",
        description: "AI-powered agricultural assistant for African farmers to detect plant diseases and receive advice.",
        features: [
            { icon: "fas fa-leaf", title: "Disease Detection", desc: "Instant identification of plant diseases from leaf scans using computer vision." },
            { icon: "fas fa-brain", title: "AI Advisory", desc: "Personalized agricultural advice based on local crop conditions." },
            { icon: "fas fa-cloud-sun", title: "Weather Insights", desc: "Localized weather forecasts and farming alerts." },
            { icon: "fas fa-mobile-alt", title: "Mobile-First", desc: "Optimized for low-bandwidth environments common in rural areas." }
        ],
        techStack: ["Next.js", "Node.js", "Express", "Python (AI)", "TensorFlow", "Tailwind CSS", "MongoDB"]
    },
    {
        id: "wappstore",
        title: "WappStore",
        emoji: "🚀",
        heroImage: "/projects/commerce-os.png",
        liveDemo: "https://wappstore.vercel.app/",
        sourceCode: "https://github.com/amohnice/wappstore",
        about: "WappStore is a multi-tenant conversational commerce platform built for WhatsApp, leveraging the power of Genkit AI and seamless M-Pesa integration. It's designed to empower modern African merchants by scaling their businesses through AI-driven conversational commerce.",
        description: "A multi-tenant conversational commerce platform built for WhatsApp, leveraging Genkit AI and M-Pesa.",
        features: [
            { icon: "fas fa-check-circle", title: "AI Sales Agent", desc: "Natural language product search and personalized recommendations." },
            { icon: "fas fa-check-circle", title: "Interactive Cart", desc: "Multi-item cart management via WhatsApp interactive buttons." },
            { icon: "fas fa-check-circle", title: "Payment Flexibility", desc: "Support for M-Pesa STK Push and Cash on Delivery (COD)." },
            { icon: "fas fa-check-circle", title: "Merchant Pro Tools", desc: "Dedicated AI agent for merchant onboarding and store management." }
        ],
        techStack: ["Genkit AI", "Node.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "M-Pesa API", "WhatsApp API", "Redis"]
    },
    {
        id: "acute-spa-and-salon",
        title: "Acute Spa and Salon",
        emoji: "💆‍♀️",
        heroImage: "/projects/acute-spa.png",
        liveDemo: "https://acute-spa-and-salon.vercel.app/",
        sourceCode: "https://github.com/amohnice/acute-spa-and-salon",
        about: "Acute Spa and Salon is a modern, responsive web application designed for a premier beauty and wellness business. Built with Vite and React, it offers a seamless and luxurious user experience, reflecting the high-quality services provided by the salon.",
        description: "A modern, responsive web application for a spa and salon business built with Vite and React.",
        features: [
            { icon: "fas fa-spa", title: "Modern UI", desc: "Elegant and calming design built with shadcn/ui components." },
            { icon: "fas fa-mobile", title: "Fully Responsive", desc: "Optimized for all devices, from mobile to desktop." },
            { icon: "fab fa-whatsapp", title: "Booking Integration", desc: "Easy appointment scheduling via WhatsApp." },
            { icon: "fas fa-bolt", title: "Fast Performance", desc: "Leveraging Vite's build system for lightning-fast load times." }
        ],
        techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "Lucide React"]
    },
    {
        id: "akitech-solutions",
        title: "AkiTech Solutions",
        emoji: "👨‍💻",
        heroImage: "/projects/akitech.png",
        liveDemo: "https://akitech-solutions.vercel.app/",
        sourceCode: "https://github.com/amohnice/akitech-solutions",
        about: "AkiTech Solutions is a startup brand offering custom software solutions. This project showcases a modern, professional, and SEO-optimized website built with Next.js and Tailwind CSS. It serves as a digital storefront for the brand's services and portfolio.",
        description: "Software solutions start-up brand website built with Next.js, Tailwind CSS, and React.",
        features: [
            { icon: "fas fa-check", title: "Professional Design", desc: "Modern and responsive layout focused on corporate branding." },
            { icon: "fas fa-moon", title: "Dynamic Themes", desc: "Support for dark and light mode for better user preference." },
            { icon: "fas fa-search", title: "SEO Optimized", desc: "Built with best practices to ensure high visibility on search engines." },
            { icon: "fas fa-rocket", title: "Next.js Power", desc: "Fast performance and server-side rendering for optimal speed." }
        ],
        techStack: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Vercel"]
    },
    {
        id: "autoparts-hub",
        title: "AutoParts Hub",
        emoji: "🏎️",
        heroImage: "/projects/autoparts.png",
        liveDemo: "https://autoparts-hub.vercel.app/",
        sourceCode: "https://github.com/amohnice/autoparts-hub",
        about: "AutoParts Hub is a comprehensive inventory management system for automobile parts. It provides business owners with a powerful dashboard to track stock levels, manage orders, and organize products by categories, ensuring an efficient and streamlined supply chain.",
        description: "Automobile parts inventory and management system hub.",
        features: [
            { icon: "fas fa-boxes", title: "Inventory Tracking", desc: "Real-time monitoring of stock levels and low-stock alerts." },
            { icon: "fas fa-tags", title: "Category Management", desc: "Organized product categorization for easy navigation and search." },
            { icon: "fas fa-file-invoice", title: "Order Management", desc: "Streamlined process for handling incoming and outgoing parts orders." },
            { icon: "fas fa-chart-line", title: "Smart Analytics", desc: "Data-driven insights into sales performance and inventory turnover." }
        ],
        techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Material UI"]
    }
];

export const services = [
    {
        title: "Web Design & Branding",
        description: "Crafting visually stunning, user-centric designs and cohesive branding assets.",
        icon: "fas fa-palette",
        label: "Creative"
    },
		{
				title: "E-Commerce Solutions",
				description: "Developing robust online stores with secure gateways and inventory management.",
				icon: "fas fa-lock",
				label: "Secure"
		},
    {
        title: "Business Websites",
        description: "Building professional portfolios and business websites tailored to your unique value.",
        icon: "fas fa-laptop-code",
        label: "Professional"
    },
    {
        title: "Payment Integration",
        description: "Integrating secure gateways like M-Pesa, Stripe, and PayPal for smooth transactions.",
        icon: "fas fa-bolt",
        label: "Fast"
    },
    {
        title: "POS & Inventory",
        description: "Custom Point of Sale and inventory systems to streamline operations in real-time.",
        icon: "fas fa-cash-register",
        label: "Efficient"
    },
    {
        title: "AI Integration",
        description: "Leveraging Artificial Intelligence to automate tasks and enhance user interactions.",
        icon: "fas fa-brain",
        label: "Smart"
    },
    {
        title: "PWA Support",
        description: "Building Progressive Web Apps that offer a native app-like experience on the web.",
        icon: "fas fa-rocket",
        label: "Modern"
    },
    {
        title: "Custom Solutions",
        description: "Tailor-made software solutions designed to address specific business challenges.",
        icon: "fas fa-cogs",
        label: "Tailored"
    }
];

export const contacts = [
    { icon: "fas fa-phone", platform: "Phone Number", identifier: "+254 719 388 139", href: "tel:+254719388139" },
    { icon: "fab fa-whatsapp", platform: "WhatsApp", identifier: "+254 719 388 139", href: "https://wa.me/254719388139" },
    { icon: "fas fa-envelope", platform: "Email Address", identifier: "amoskorir631@gmail.com", href: "mailto:amoskorir631@gmail.com" },
    { icon: "fab fa-github", platform: "GitHub", identifier: "amohnice", href: "https://github.com/amohnice" },
    { icon: "fab fa-linkedin", platform: "LinkedIn", identifier: "amos-korir", href: "https://linkedin.com/in/amos-korir" },
    { icon: "fas fa-map-marker-alt", platform: "Location", identifier: "Nairobi, Kenya", href: "#", isLocation: true }
];
