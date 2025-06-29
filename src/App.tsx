import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Server, 
  Mail, 
  Github, 
  Linkedin, 
  ArrowRight,
  Terminal,
  Cloud,
  Shield,
  Zap,
  ExternalLink,
  Moon,
  Sun,
  GraduationCap,
  ShoppingCart,
  Stethoscope,
  Users,
  Calendar,
  Star
} from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const services = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Design",
      description: "Designing efficient database schemas and optimizing queries for better performance."
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "API Development",
      description: "Building RESTful APIs with proper authentication and comprehensive documentation."
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Deployment",
      description: "Deploying applications on cloud platforms with scalable architecture."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security Implementation",
      description: "Implementing secure authentication systems and data protection measures."
    }
  ];

  const projects = [
    {
      title: "Hamro Dokan",
      description: "A comprehensive e-commerce platform for local businesses with inventory management, order processing, and payment integration.",
      tech: ["Node.js", "Express", "MongoDB", "JWT"],
      status: "Live",
      icon: <ShoppingCart className="w-8 h-8" />,
      features: ["User Authentication", "Product Management", "Order Tracking", "Payment Gateway"]
    },
    {
      title: "Mero Doctor",
      description: "Healthcare management system connecting patients with doctors, featuring appointment booking and medical record management.",
      tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
      status: "Completed",
      icon: <Stethoscope className="w-8 h-8" />,
      features: ["Appointment Booking", "Medical Records", "Doctor Profiles", "Patient Dashboard"]
    },
    {
      title: "Student Portal",
      description: "University student management system with course enrollment, grade tracking, and academic calendar integration.",
      tech: ["Python", "Django", "Postgresql", "React"],
      status: "Completed",
      icon: <GraduationCap className="w-8 h-8" />,
      features: ["Course Management", "Grade Tracking", "Academic Calendar", "Student Dashboard"]
    }
  ];

  const themeClasses = {
    bg: isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50',
    text: isDarkMode ? 'text-white' : 'text-gray-800',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    cardBg: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80',
    cardHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-white',
    navBg: isDarkMode ? 'bg-gray-900/90' : 'bg-white/90',
    sectionBg: isDarkMode ? 'bg-gray-800/50' : 'bg-white/50',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    input: isDarkMode ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400' : 'bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500',
    footerBg: isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.bg}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? `${themeClasses.navBg} backdrop-blur-md shadow-lg` : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className={`text-2xl font-bold ${themeClasses.text}`}>
              <Terminal className="inline w-8 h-8 mr-2 text-orange-600" />
              Backend Dev
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                {[
                  { name: 'About me', id: 'about' },
                  { name: 'Services', id: 'services' },
                  { name: 'Projects', id: 'portfolio' },
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'text-orange-600'
                        : `${themeClasses.textSecondary} hover:${themeClasses.text}`
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${themeClasses.cardBg} hover:${themeClasses.cardHover} shadow-lg`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-orange-600" />
                ) : (
                  <Moon className="w-5 h-5 text-orange-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-20 w-64 h-64 bg-gradient-to-br from-red-400/25 to-pink-400/25 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-32 right-32 w-4 h-4 bg-orange-500/60 rotate-45 animate-bounce delay-300"></div>
          <div className="absolute bottom-32 left-32 w-6 h-6 bg-red-500/60 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-amber-500/60 rotate-45 animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-orange-600/60 rounded-full animate-bounce delay-500"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="lg:col-span-1 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className={`text-6xl lg:text-7xl font-bold ${themeClasses.text} leading-tight`}>
                Hello.
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-red-600"></div>
              <div className="space-y-2">
                <p className={`text-xl ${themeClasses.textSecondary} font-medium`}>I'm Saugat Giri</p>
                <h2 className={`text-2xl lg:text-3xl font-bold ${themeClasses.text}`}>
                   Backend Developer
                </h2>
              </div>
            </div>
            
            <div className={`${themeClasses.cardBg} backdrop-blur-sm rounded-2xl p-6 shadow-xl border ${themeClasses.border}`}>
              <div className="flex items-center space-x-3 mb-3">
                <GraduationCap className="w-6 h-6 text-orange-600" />
                <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Currently Studying</h3>
              </div>
              <p className={`${themeClasses.textSecondary} text-sm`}>
                Electronic and Communication Engineering Student passionate about backend development and building scalable applications.
              </p>
            </div>

            {/* Rotating Badge - Positioned below student info */}
            <div className="flex justify-start">
              <div className="rotating-badge relative">
                <svg className="w-32 h-32" viewBox="0 0 120 120">
                  <defs>
                    <path
                      id="circle"
                      d="M 60, 60 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    />
                  </defs>
                  <text className={`text-xs font-medium ${isDarkMode ? 'fill-white' : 'fill-gray-800'}`}>
                    <textPath href="#circle" startOffset="0%">
                      BACKEND DEVELOPER • BACKEND DEVELOPER • 
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Content - Profile Image with Fantastic Background */}
          <div className="lg:col-span-1 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Multi-layered Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 via-red-400/20 to-amber-400/30 rounded-3xl blur-3xl transform rotate-6 scale-110"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-red-400/25 via-orange-400/15 to-yellow-400/25 rounded-3xl blur-2xl transform -rotate-3 scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-400/10 to-red-400/20 rounded-3xl blur-xl transform rotate-12 scale-95"></div>
              
              {/* Animated Ring Effects */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-400/30 animate-ping scale-110"></div>
              <div className="absolute inset-0 rounded-full border border-red-400/20 animate-pulse scale-125 delay-500"></div>
              
              {/* Main Image Container */}
              <div className="relative transform hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl blur-lg"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/20">
                  <img
                    src="/Adobe Express - file.png"
                    alt="Backend Developer - Saugat Giri"
                    className="w-full h-auto object-cover rounded-2xl shadow-xl"
                  />
                  
                  {/* Floating Status Badge */}
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>Student Dev</span>
                    </div>
                  </div>
                  
                  {/* Tech Stack Floating Elements */}
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse">
                    Node.js
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse delay-300">
                    MongoDB
                  </div>
                  <div className="absolute top-1/2 -left-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg animate-pulse delay-700">
                    Python
                  </div>
                </div>
              </div>
              
              {/* Additional Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-orange-400/40 to-red-400/40 rounded-full blur-xl animate-bounce delay-1000"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full blur-xl animate-bounce delay-500"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-1 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <p className={`text-lg ${themeClasses.textSecondary} leading-relaxed`}>
                I am a Electronic and Communication Engineering student with a passion for backend development. 
                Currently working on various projects while pursuing my degree, focusing on building 
                robust server-side applications and learning new technologies.
              </p>
              
              <div className={`${themeClasses.cardBg} backdrop-blur-sm rounded-2xl p-6 shadow-xl border ${themeClasses.border}`}>
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Current Focus</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-orange-600" />
                    <span className={themeClasses.textSecondary}>Database Design & Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Server className="w-5 h-5 text-orange-600" />
                    <span className={themeClasses.textSecondary}>RESTful API Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-5 h-5 text-orange-600" />
                    <span className={themeClasses.textSecondary}>Cloud Technologies</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className={`${isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 hover:bg-gray-900 text-white'} px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center group shadow-xl hover:shadow-2xl transform hover:scale-105`}
            >
              Let's Connect
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${themeClasses.sectionBg}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold ${themeClasses.text} mb-4`}>About Me</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className={`text-lg ${themeClasses.textSecondary} leading-relaxed`}>
                I'm a dedicated Electronic and Communication Engineering student with a strong passion for backend development. 
                While pursuing my degree, I actively work on real-world projects that solve practical problems 
                and help me apply theoretical knowledge in meaningful ways.
              </p>
              <p className={`text-lg ${themeClasses.textSecondary} leading-relaxed`}>
                My journey in backend development started with curiosity about how applications work behind 
                the scenes. Now, I focus on building scalable systems, designing efficient databases, and 
                creating APIs that power modern applications.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className={`text-center p-6 ${themeClasses.cardBg} rounded-xl shadow-lg`}>
                  <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
                  <div className={themeClasses.textSecondary}>Projects Built</div>
                </div>
                <div className={`text-center p-6 ${themeClasses.cardBg} rounded-xl shadow-lg`}>
                  <div className="text-3xl font-bold text-orange-600 mb-2">1+</div>
                  <div className={themeClasses.textSecondary}>Years Learning</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>Technical Skills</h3>
              {[
                { skill: 'Node.js & Express', level: 70 },
                { skill: 'Python & Django', level: 60 },
                { skill: 'Database Design', level: 55 },
                { skill: 'API Development', level: 60 },
                { skill: 'Cloud Platforms', level: 30 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className={`flex justify-between ${themeClasses.textSecondary}`}>
                    <span className="font-medium">{item.skill}</span>
                    <span>{item.level}%</span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold ${themeClasses.text} mb-4`}>What I Do</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Backend development services I offer as a student developer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`${themeClasses.cardBg} p-8 rounded-xl ${themeClasses.cardHover} transition-all duration-300 group hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <div className="text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold ${themeClasses.text} mb-4`}>{service.title}</h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className={`py-20 ${themeClasses.sectionBg}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold ${themeClasses.text} mb-4`}>My Projects</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Real-world projects I've built while learning and growing as a developer
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`${themeClasses.cardBg} rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl`}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-orange-600 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Live' ? 'bg-green-100 text-green-700' :
                      project.status === 'Development' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-bold ${themeClasses.text} mb-3`}>{project.title}</h3>
                  <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>{project.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className={`text-sm font-semibold ${themeClasses.text} mb-2`}>Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <Star className="w-3 h-3 text-orange-600" />
                            <span className={`text-xs ${themeClasses.textSecondary}`}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-semibold ${themeClasses.text} mb-2`}>Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold ${themeClasses.text} mb-4`}>Let's Connect</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Interested in collaborating or have a project idea? Let's discuss!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-600 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Email</h3>
                    <p className={themeClasses.textSecondary}>saugatgiri1070@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-600 p-3 rounded-lg">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>GitHub</h3>
                    <p className={themeClasses.textSecondary}>https://github.com/saugat1070</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-600 p-3 rounded-lg">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>LinkedIn</h3>
                    <p className={themeClasses.textSecondary}>linkedin.com/in/saugat1070</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full ${themeClasses.input} rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200`}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full ${themeClasses.input} rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200`}
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className={`w-full ${themeClasses.input} rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition-colors duration-200 resize-none`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${themeClasses.footerBg} border-t ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className={themeClasses.textSecondary}>
            © 2025 Saugat Giri -  Backend Developer. Always Ready for great Ideas
          </p>
        </div>
      </footer>

      {/* Professional Badge */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className={`${themeClasses.cardBg} backdrop-blur-sm rounded-full p-4 shadow-lg border ${themeClasses.border}`}>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>Open to opportunities</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;