export interface ProfileData {
  fullName: string;
  shortName: string;
  title: string;
  subheadline: string;
  academicHighlight: string;
  university: string;
  program: string;
  gpa: number;
  completedCredits: number;
  location: string;
  email: string;
  academicEmail: string;
  phone: string;
  whatsappUrl: string;
  bioIntro: string;
  narrativePoints: string[];
  softSkills: string[];
  socials: {
    linkedin: string;
    github: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
    email: string;
  };
}

export interface SkillCategoryData {
  category: string;
  items: string[];
}

export interface SkillData {
  name: string;
  category: string;
  level: number;
}

export interface ExperienceData {
  year: string;
  role: string;
  company: string;
  location: string;
  type: string;
  desc: string;
  achievements: string[];
  tags: string[];
  color?: string;
}

export interface EducationData {
  year: string;
  degree: string;
  school: string;
  gpa?: string;
  credits?: string;
  honors?: string;
}

export interface OrganizationData {
  year: string;
  role: string;
  organization: string;
  highlights: string[];
}

export interface ProjectData {
  id: number | string;
  title: string;
  slug: string;
  category: string;
  desc: string;
  role: string;
  year: string;
  featured: boolean;
  copyrightNumber?: string;
  tags: string[];
  img?: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  status?: string;
  color?: string;
}

export interface AchievementData {
  year: string;
  title: string;
  issuer: string;
  category: string;
  registrationNumber?: string;
}

export const portfolioData = {
  profile: {
    fullName: "Muhammad Yusuf Riyadi",
    shortName: "M. Yusuf Riyadi",
    title: "Automation & IoT Engineering Student",
    subheadline: "Engineering practical IoT sensor networks, industrial HMI solutions, embedded systems, and real-time monitoring platforms.",
    academicHighlight: "3.95 GPA · 122 completed credits · Universitas Diponegoro",
    university: "Universitas Diponegoro",
    program: "Automation Engineering Technology",
    gpa: 3.95,
    completedCredits: 122,
    location: "Semarang, Indonesia",
    email: "yusufriyadi141004@gmail.com",
    academicEmail: "myusufriyadi@students.undip.ac.id",
    phone: "0895422885344",
    whatsappUrl: "https://wa.me/62895422885344",
    bioIntro: "I am an Automation Engineering Technology student at Universitas Diponegoro with a 3.95 GPA and a strong interest in IoT, embedded systems, industrial HMI, and real-time monitoring platforms. My experience combines software and hardware development with practical exposure to mechanical maintenance and electromechanical systems.",
    narrativePoints: [
      "Pursuing Automation Engineering Technology at Universitas Diponegoro with top academic marks (3.95 GPA, 122 credits).",
      "Developing integrated IoT telemetry platforms, Nextion HMIs, Flutter apps, and web monitoring systems at PT. Reinutech Perbeja.",
      "Executing heavy equipment mechanical maintenance, powertrain, engine, and electrical troubleshooting at PT. BUMA.",
      "Managing facility safety inspections, preventive maintenance, and power stability at Hotel MG Suite.",
      "Building robotic electrical systems, EasyEDA PCB designs, component analysis, and power management at UNDIP Robotics Development Center (URDC).",
    ],
    softSkills: [
      "Analytical problem solving",
      "Cross-functional collaboration",
      "Adaptability",
      "Inclusive and diversity awareness",
      "Strong academic performance",
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/m-yusuf-riyadi-661535386",
      github: "https://github.com/ucupryd",
      instagram: "https://www.instagram.com/ucup_ryd/",
      youtube: "https://www.youtube.com/@MECHUP14",
      whatsapp: "https://wa.me/62895422885344",
      email: "mailto:yusufriyadi141004@gmail.com",
    },
  } as ProfileData,

  skillCategories: [
    {
      category: "PLC & Automation",
      items: ["CX Programmer", "FluidSim", "EcoStruxure"],
    },
    {
      category: "HMI & Control",
      items: ["LabVIEW", "Nextion", "CX Designer"],
    },
    {
      category: "Embedded & Microcontrollers",
      items: ["Arduino", "PlatformIO"],
    },
    {
      category: "PCB & Electronics",
      items: ["EasyEDA", "Proteus", "Eagle"],
    },
    {
      category: "Web & Mobile",
      items: ["React", "Flutter", "Full-stack development"],
    },
    {
      category: "3D & Mechanical",
      items: ["SolidWorks", "Fusion 360"],
    },
    {
      category: "Editing & Design",
      items: ["CapCut", "Affinity", "Adobe Illustrator"],
    },
  ] as SkillCategoryData[],

  skills: [
    { name: "IoT & Embedded Systems", category: "Embedded Systems", level: 3 },
    { name: "HMI Development (Nextion, LabVIEW, CX Designer)", category: "HMI & Control", level: 3 },
    { name: "Web & Mobile Development", category: "Web & Mobile", level: 3 },
    { name: "PLC Programming (CX Programmer, FluidSim, EcoStruxure)", category: "PLC & Automation", level: 2 },
    { name: "PCB Design (EasyEDA, Proteus, Eagle)", category: "PCB & Electronics", level: 3 },
    { name: "Microcontrollers & Embedded Platforms", category: "Embedded Systems", level: 3 },
    { name: "3D & Mechanical CAD", category: "3D & Mechanical", level: 2 },
    { name: "Creative Media & Design", category: "Editing & Design", level: 2 },
  ] as SkillData[],

  education: [
    {
      year: "2023 – Expected 2027",
      degree: "Automation Engineering Technology",
      school: "Universitas Diponegoro",
      gpa: "3.95",
      credits: "122 completed credits",
      honors: "BIRU x KSE Scholarship Awardee",
    },
    {
      year: "2020 – 2023",
      degree: "Electrical Power Installation",
      school: "SMKN Jateng di Semarang",
      honors: "Best Graduate",
    },
  ] as EducationData[],

  experiences: [
    {
      year: "2025 – Present",
      role: "IoT Engineer & Full-Stack Developer",
      company: "PT. Reinutech Perbeja",
      location: "Semarang, Indonesia",
      type: "Internship",
      desc: "Engineering integrated IoT and telemetry solutions: Nextion HMI for climate control systems, Flutter mobile applications for monitoring and reporting, and web platforms for closed-house poultry farms.",
      achievements: [
        "Developed a Nextion-based HMI for a climate control system.",
        "Developed a Flutter-based mobile application for monitoring and reporting.",
        "Engineered a web-based monitoring and control platform for closed-house poultry farms.",
        "Designed IoT sensor integration for real-time environmental data acquisition.",
      ],
      tags: ["LoRa", "IoT", "HMI", "Flutter", "Web Dev"],
      color: "#00804C",
    },
    {
      year: "2023",
      role: "Mechanic",
      company: "PT. BUMA",
      location: "Indonesia",
      type: "Internship",
      desc: "Performed maintenance, troubleshooting, and mechanical repairs on heavy excavator units to ensure equipment uptime and operational reliability.",
      achievements: [
        "Performed maintenance, troubleshooting, and mechanical repairs on heavy excavator units.",
        "Worked with heavy equipment power trains, diesel engines, electrical systems, and pneumatics/hydraulics.",
        "Completed the Basic Mechanic Course.",
      ],
      tags: ["Heavy Equipment", "Mechanical Repairs", "Electrical Systems"],
      color: "#1E488F",
    },
    {
      year: "2022",
      role: "Engineering",
      company: "Hotel MG Suite",
      location: "Semarang, Indonesia",
      type: "Internship",
      desc: "Conducted daily facility safety inspections, executed preventive and corrective maintenance across property facilities, and resolved electrical system issues.",
      achievements: [
        "Conducted daily facility inspections.",
        "Performed preventive and corrective maintenance.",
        "Troubleshot electrical system issues.",
        "Supported reliable facility operation.",
      ],
      tags: ["Facility Maintenance", "Electrical Systems", "HVAC"],
      color: "#748C2E",
    },
  ] as ExperienceData[],

  organizations: [
    {
      year: "2024 – 2026",
      role: "Electrical Staff",
      organization: "UNDIP Robotics Development Center",
      highlights: [
        "PCB design, routing, and assembly using EasyEDA.",
        "Electrical component analysis.",
        "Power management and distribution systems.",
      ],
    },
    {
      year: "2025 – 2026",
      role: "Media & Relation Staff",
      organization: "Paguyuban Karya Salemba Empat",
      highlights: [
        "Social media campaign planning.",
        "Visual content production.",
        "Graphic design and video asset development.",
      ],
    },
    {
      year: "2024 – 2025",
      role: "Community Service Staff",
      organization: "Automation Engineering Technology Student Association",
      highlights: [
        "Planning and delivery of community service programs.",
        "Fundraising initiatives.",
        "Logistics and transportation coordination.",
      ],
    },
    {
      year: "2024",
      role: "Chairman",
      organization: "Vocational School General Election Commission",
      highlights: [
        "Cross-functional coordination.",
        "Election process planning and execution.",
        "Consolidation of student feedback.",
      ],
    },
  ] as OrganizationData[],

  featuredProject: {
    id: 1,
    title: "eBro Smart Poultry Farm Climate Control System",
    slug: "ebro-smart-poultry-farm",
    category: "IoT & Smart Systems",
    desc: "A copyright-registered LoRa and IoT-based climate control and monitoring system for closed-house broiler poultry farms, combining environmental sensing, HMI, and web-based monitoring.",
    role: "IoT Engineer & Full-Stack Developer",
    year: "2025 – 2026",
    featured: true,
    copyrightNumber: "EC002026157949",
    tags: ["LoRa", "IoT", "HMI", "Web Monitoring", "Embedded Systems"],
    img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBkYXRhJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NzcyODc1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#00804C",
  } as ProjectData,

  projects: [
    {
      id: 1,
      title: "eBro — Smart Poultry Farm Climate Control & Monitoring System",
      slug: "ebro-smart-poultry-farm",
      category: "IoT & Smart Systems",
      desc: "A copyright-registered LoRa and IoT-based climate control and monitoring system for closed-house broiler poultry farms, combining environmental sensing, HMI, and web-based monitoring.",
      role: "IoT Engineer & Full-Stack Developer",
      year: "2025 – 2026",
      featured: true,
      copyrightNumber: "EC002026157949",
      tags: ["LoRa", "IoT", "HMI", "Web Monitoring", "Embedded Systems"],
      img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBkYXRhJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NzcyODc1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "#00804C",
    },
    {
      id: 2,
      title: "End-to-End Solar Panel System for Greenhouse Electrification",
      slug: "greenhouse-solar-panel-system",
      category: "IoT & Smart Systems",
      desc: "An automation and renewable energy project focused on end-to-end solar panel system implementation for greenhouse electrification.",
      role: "Developer",
      year: "2026",
      featured: false,
      tags: ["Solar Power", "Electrification", "Greenhouse"],
      img: "https://images.unsplash.com/photo-1509391365360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#748C2E",
    },
    {
      id: 3,
      title: "Automated Greenhouse Monitoring & Control System",
      slug: "automated-greenhouse-monitoring",
      category: "IoT & Smart Systems",
      desc: "An IoT project for automated environmental monitoring and microclimate control in greenhouse operations.",
      role: "Developer",
      year: "2026",
      featured: false,
      tags: ["IoT", "Greenhouse", "Control"],
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#00804C",
    },
    {
      id: 4,
      title: "Full-Stack Smart-Eco Tourism Web Platform",
      slug: "smart-eco-tourism-platform",
      category: "Web & Mobile",
      desc: "A full-stack web platform developed for smart-eco tourism management, information distribution, and interactive visitor services.",
      role: "Developer",
      year: "2026",
      featured: false,
      tags: ["Full-Stack", "Web Dev", "Tourism"],
      img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#1E488F",
    },
    {
      id: 5,
      title: "Smartphone-Based Telemetry & Navigation for Search & Rescue Robots",
      slug: "sar-robot-telemetry-navigation",
      category: "Robotics & Telemetry",
      desc: "A robotics engineering project focused on smartphone-based telemetry, sensor data streaming, and remote navigation systems for search and rescue platforms.",
      role: "Developer",
      year: "2026",
      featured: false,
      tags: ["Robotics", "Telemetry", "Navigation"],
      img: "https://images.unsplash.com/photo-1758873272869-9130397ff7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#7C3AED",
    },
    {
      id: 6,
      title: "Autonomous Surface Vehicle — Undip Robotics Team",
      slug: "autonomous-surface-vehicle-undip",
      category: "Robotics & Telemetry",
      desc: "An autonomous surface vessel developed for the Indonesian Boat Contest (Kontes Kapal Indonesia), focusing on electrical power management, component analysis, and PCB design.",
      role: "Electrical Staff",
      year: "2025",
      featured: true,
      tags: ["Robotics", "ASV", "Electrical"],
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#1E488F",
    },
    {
      id: 7,
      title: "Water Tank Control and Monitoring System",
      slug: "water-tank-control-monitoring",
      category: "Automation & Control",
      desc: "An automation project focused on real-time water level sensing, automated control, and operational status monitoring.",
      role: "Electrical",
      year: "2025",
      featured: false,
      tags: ["Automation", "Control", "Monitoring"],
      img: "https://images.unsplash.com/photo-1760386129108-d17b9cdfc4fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#748C2E",
    },
    {
      id: 8,
      title: "IoT Practicum Module Production",
      slug: "iot-practicum-module-production",
      category: "IoT & Smart Systems",
      desc: "Educational hardware and curriculum module production for hands-on IoT practicum and embedded systems laboratory training.",
      role: "Module Creator / Developer",
      year: "2025",
      featured: false,
      tags: ["IoT", "Embedded", "Education"],
      color: "#00804C",
    },
    {
      id: 9,
      title: "Line Follower Robot Project",
      slug: "line-follower-robot-project",
      category: "Robotics & Telemetry",
      desc: "An autonomous mobile robotics project focused on high-speed line tracking sensor algorithms and motor control hardware.",
      role: "Developer",
      year: "2026",
      featured: false,
      tags: ["Robotics", "Control", "Autonomous"],
      color: "#7C3AED",
    },
    {
      id: 10,
      title: "Automatic Time Scheduling Generator",
      slug: "automatic-time-scheduling-generator",
      category: "Software & Automation",
      desc: "A software application for automatic time scheduling generation, registered under official copyright (HKI).",
      role: "Developer",
      year: "2024",
      featured: false,
      copyrightNumber: "000621177",
      tags: ["Software", "Automation", "Copyright"],
      img: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      color: "#DBE64C",
    },
    {
      id: 11,
      title: "Line Follower Robot Competition",
      slug: "line-follower-robot-competition-judge",
      category: "Robotics & Telemetry",
      desc: "Technical evaluation and officiating role for autonomous line follower robotics competitions.",
      role: "Competition Judge",
      year: "2026",
      featured: false,
      tags: ["Robotics", "Competition", "Judging"],
      color: "#1E488F",
    },
  ] as ProjectData[],

  certificationsSidebar: [
    "Competency Certification by the Ministry of Energy and Mineral Resources (2023)",
    "Basic Mechanic Course certification - PT. BUMA (2023)",
    "BIRU x KSE Scholarship Awardee (2025)",
    "Registered Copyright Co-Creator — eBro System (2026)",
    "Registered Copyright Co-Creator — Scheduling Generator (2024)",
  ],

  achievements: [
    {
      year: "2026",
      title: "Registered Intellectual Property (Copyright) Co-Creator — “Produk Otomasi Kandang Ayam Broiler eBro Berbasis LoRa dan IoT untuk Kemudahan Pemeliharaan dan Penurunan Biaya Operasional”",
      issuer: "Ministry of Law and Human Rights Republic of Indonesia",
      category: "Copyright",
      registrationNumber: "EC002026157949",
    },
    {
      year: "2024",
      title: "Registered Intellectual Property (Copyright) Co-Creator — “Program Automatic Time Scheduling Generator”",
      issuer: "Ministry of Law and Human Rights Republic of Indonesia",
      category: "Copyright",
      registrationNumber: "000621177",
    },
    {
      year: "2025",
      title: "1st Place Winner in Race",
      issuer: "Kontes Kapal Indonesia",
      category: "Competition",
    },
    {
      year: "2025",
      title: "2nd Honorable Mention (Autonomous Surface Vessel Category)",
      issuer: "Kontes Kapal Indonesia",
      category: "Competition",
    },
    {
      year: "2025",
      title: "BIRU x KSE Scholarship Awardee",
      issuer: "Karya Salemba Empat",
      category: "Scholarship",
    },
    {
      year: "2023",
      title: "Best Graduate",
      issuer: "SMKN Jateng di Semarang",
      category: "Academic",
    },
    {
      year: "2023",
      title: "Competency Certification in Electrical Power Installation",
      issuer: "Ministry of Energy and Mineral Resources",
      category: "Certification",
    },
    {
      year: "2023",
      title: "Basic Mechanic Course Certification",
      issuer: "PT. BUMA",
      category: "Certification",
    },
  ] as AchievementData[],
};



