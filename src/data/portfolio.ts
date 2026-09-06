export type NavSection = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact'
export interface Project {
  title: string
  category: string
  description: string

  overview: string
  problem: string
  approach: string
  role: string

  technologies: string[]
  date?: string
  associatedWith?: string
  image?: string
  images?: string[]
  links?: {
    github?: string
    live?: string
  }
}

export interface StackItem {
  name: string;
  icon: string;
}

export const profile = {
  name: 'Nina Dwi Ariani',
  headline: 'Computer Science Education Graduate',
  subheadline: '& Web Developer',
  roles: ['Software Engineer', 'Web Developer', 'Frontend Developer', 'IT Teacher / Coding Teacher'],
  education: {
    institution: 'Universitas Negeri Padang',
    program: 'Computer Science Education',
  },
}

export const navigation: Array<{ id: NavSection; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const stackHighlights: StackItem[] = [    { name: 'PHP', icon: 'php' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css' },
  { name: 'Bootstrap', icon: 'bootstrap' },
  { name: "Figma", icon: "figma" },
  { name: "GitHub", icon: "github" },
  { name: "Unity", icon: "unity" },
  { name: "Android Studio", icon: "androidstudio" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Next.js", icon: "nextdotjs" },
];

export const skillGroups = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Blade'],
  },
  {
    title: 'Backend',
    items: ['PHP', 'Laravel'],
  },
  {
    title: 'Database',
    items: ['MySQL'],
  },
  {
    title: 'Tools / Other',
    items: ['Git', 'GitHub', 'Figma', 'Android Studio', 'Unity'],
  },
]

export const featuredProject = {
  title: 'Web-Based Cemetery Management and Public Service Information System',

  category: 'Web Development',

  description:
    'A responsive, database-driven web application for managing cemetery information, burial records, and public service requests.',

  overview:
    'A web-based cemetery management and public service information system developed to centralize cemetery data, burial records, and public service requests while supporting different user roles.',

  problem:
    'Cemetery information and public service requests needed a structured system that could support multiple user roles and reliable records.',

  approach:
    'Implemented role-based access control for administrators, TPU staff, government officials, and heirs, alongside CRUD workflows and rule-based request prioritization.',

  role: 'Developer',

  technologies: [
    'Laravel',
    'PHP',
    'MySQL',
    'JavaScript',
    'HTML',
    'CSS',
    'Bootstrap',
  ],

  features: [
    'Role-based access control',
    'Cemetery and burial records',
    'Service request prioritization',
    'Responsive interface',
  ],

  result:
    'Delivered a user-friendly web solution designed to work across screen sizes and support consistent cemetery service administration.',

  date: 'Feb 2026 - May 2026',

  associatedWith: 'Universitas Negeri Padang',
}

export const otherProjects = [
  {
    title: 'Cemetery Management Mobile App - Android',
    category: 'Mobile Development',

    description:
      'A mobile application designed to provide structured and accessible cemetery information through an Android-based interface. The application allows users to view cemetery information, burial data, deceased records, and administrative information in an organized and user-friendly mobile experience.',

    overview:
      'An Android-based mobile application developed to make cemetery information, burial records, deceased data, and administrative information more accessible through a structured mobile interface.',

    problem:
      'Cemetery information and administrative data can be difficult to access when they are only available through conventional or manually managed systems. Users need a more accessible way to view cemetery information, burial records, and deceased data without relying on complicated information sources.',

    approach:
      'Developed the application using Kotlin and Android Studio by translating Figma UI/UX designs into functional Android interfaces. The application was organized into multiple screens with interactive navigation to provide a clear and user-friendly experience.',

    role:
      'Android Developer responsible for implementing the mobile interfaces, developing screen navigation, translating Figma designs into Android layouts, and organizing application features into a structured mobile experience.',

    technologies: ['Kotlin', 'Android Studio', 'Figma'],
    date: 'Mar 2025 - May 2025',
    associatedWith: 'Universitas Negeri Padang',
    image: '/images/geprek.jpeg',
  },

  {
    title: 'EcoQuest - Biology Educational Quiz Game',
    category: 'Educational Technology',

    description:
      'A 2D educational game built to support biology learning through interactive quizzes and game-based activities.',

    overview:
      'A 2D educational quiz game designed to support biology learning by combining interactive questions, visual elements, and game-based activities in an engaging learning environment.',

    problem:
      'Traditional learning activities can sometimes make students less engaged when reviewing biology concepts. The project was developed to explore how interactive game mechanics can make learning and knowledge assessment more engaging for students.',

    approach:
      'Developed the game using Unity and C#, combining quiz mechanics, interactive interfaces, navigation, visual elements, and feedback to create a structured educational gameplay experience.',

    role:
      'Game Developer responsible for implementing the game interface, quiz interactions, navigation, gameplay flow, and integration of visual elements into the educational game.',

    technologies: ['Unity', 'C#'],
    date: 'Sep 2025 - Nov 2025',
    associatedWith: 'Universitas Negeri Padang',
    images: ['/images/ayam1.jpeg', '/images/ayam2.jpeg'],
  },
]

export const experienceItems = [
  {
    title: 'Informatics Teacher',
    organization: 'Ekasakti Senior High School, Padang',
    type: 'Teaching / Education',
    date: 'Jul 2025 - Dec 2025',
    description:
      'Taught Informatics, computer practices, and basic programming to high school students through engaging, hands-on learning activities. Developed instructional materials, guided students in understanding technical concepts, and assessed their learning outcomes while creating a supportive and student-centered classroom environment.',
    responsibilities: ['Computer skills', 'Basic programming', 'Practical instruction', 'Communication'],
  },
  {
    title: 'Intern - Library Data Management Assistant',
    organization: 'Universitas Negeri Padang Library',
    type: 'Administration / Service',
    date: 'Jan 2026 - Mar 2026',
    description:
      'Managed and accurately maintained library collection and member data using Excel and Word, ensuring information remained organized, accessible, and error-free. Supported daily administrative operations through data verification, document filing, and systematic record management, demonstrating strong attention to detail and data accuracy.',
    responsibilities: ['1,000+ book records', 'Data validation', 'Data verification', 'Microsoft Excel'],
  },
]

export const education = {
  institution: 'Universitas Negeri Padang',
  program: "Bachelor's degree, Computer Science Education",
  date: '2022 - 2026',
}

export const certifications: Array<{ title: string; issuer: string; note?: string }> = []

export const contactDetails = {
  email: 'ninadwiar@gmail.com',
  phone: '+62 822-6854-8829',
  whatsapp: '6282268548829',
  location: 'Padang, Sumatera Barat',
  linkedin: 'linkedin.com/in/ninadwiariani',
  github: 'https://github.com/ninadwiariani',
}