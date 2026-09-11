import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import cvFile from './assets/CV.pdf'
import { ExternalLink } from "lucide-react"

import { 
  type Project, 
  featuredProject, 
  otherProjects,
  certifications,
  contactDetails,
  education,
  experienceItems,
  navigation,
  profile,
  skillGroups,
  stackHighlights,
  type StackItem,
  type NavSection,
} from './data/portfolio'

export function FlippableImage({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <img
          src={images[0]}
          alt={title}
          className="max-h-96 w-full object-cover"
        />
      </div>
    )
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)

    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div
      className="relative h-72 w-full cursor-pointer select-none sm:h-96 [perspective:1200px]"
      onClick={handleNext}
    >
      <div
        className="
          absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg
          scale-90 -translate-y-4 opacity-40 transition-all duration-700
        "
      >
        <img
          src={images[(currentIndex + 1) % images.length]}
          alt={`${title} - Preview`}
          className="h-full w-full object-cover filter blur-[1px]"
        />
      </div>

      <AnimatePresence mode="popLayout" onExitComplete={() => setIsAnimating(false)}>
        <motion.div
          key={`card-${currentIndex}`}
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"

          initial={{
            scale: 0.9,
            y: -20,
            rotateX: -10,
            opacity: 0.4,
          }}
          animate={{
            scale: 1,
            y: 0,
            rotateX: 0,
            opacity: 1,
            transition: {
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            },
          }}

          exit={{
            y: [0, -25, 110, 130],
            z: [0, 50, -60, -120],
            rotateX: [0, 10, -12, -18],
            scale: [1, 1.02, 0.95, 0.88],
            opacity: [1, 1, 0.9, 0],
            transition: {
              duration: 1.2,
              times: [0, 0.3, 0.8, 1],
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />

          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/70 px-3.5 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-lg">
            <span>{currentIndex + 1}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{images.length}</span>
          </div>

          <div className="absolute bottom-4 left-4 z-10 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-slate-300 backdrop-blur-md">
            Tap to shuffle
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
import {
  ArrowRight,
  Atom,
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Code2,
  Diamond,
  GraduationCap,
  Github,
  Mail,
  Menu,
  MapPin,
  ZoomIn,
  MessageCircle,
  MonitorSmartphone,
  MoonStar,
  Phone,
  Sparkles,
  SquareTerminal,
  X,
} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import type { ReactNode } from 'react'
import profilePhoto from './profile-pict.jpg'

type SectionId = NavSection | 'achievements' | 'beyond'

const sectionIds: SectionId[] = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'beyond', 'contact']

export function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })

  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const isProgrammaticScroll = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section)
    isProgrammaticScroll.current = true

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)

    scrollToSection(section)
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 900)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return

      if (window.scrollY < 80) {
        setActiveSection('home')
        return
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50

      if (isAtBottom) {
        setActiveSection('contact')
        return
      }

      const allSectionIds = ['home', ...sectionIds] as SectionId[]
      const viewportCenter = window.innerHeight / 3 

      let currentActive: SectionId = 'home'
      let minDistance = Infinity

      allSectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top - viewportCenter)

        if (rect.top <= viewportCenter + 100 && distance < minDistance) {
          minDistance = distance
          currentActive = id
        }
      })

      setActiveSection(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="relative min-h-screen bg-ink text-slate-100">
      <Background />

      <motion.div
        className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
        style={{ scaleX }}
      />

      <Navbar
        activeSection={activeSection}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((value) => !value)}
        onNavigate={(section) => {
          handleNavigate(section)
          setMobileOpen(false)
        }}
      />

      <main className="relative z-10">
        <div id="home">
          <Hero onViewWork={() => handleNavigate('projects')} />
        </div>

        <SectionShell id="about" eyebrow="About">
          <AboutSection />
        </SectionShell>

        <SectionShell id="skills" eyebrow="Skills">
          <SkillsSection />
        </SectionShell>

        <SectionShell id="projects" eyebrow="Projects">
          <ProjectsSection onSelectProject={setSelectedProject} />
        </SectionShell>

        <SectionShell id="experience" eyebrow="Experience">
          <ExperienceSection />
        </SectionShell>

        <SectionShell id="education" eyebrow="Education">
          <EducationSection />
        </SectionShell>

        <SectionShell id="achievements" eyebrow="Achievements / Certifications">
          <AchievementsSection />
        </SectionShell>

        <SectionShell id="contact" eyebrow="Contact">
          <ContactSection />
        </SectionShell>
      </main>

      <Footer />

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="absolute right-4 top-20 w-[min(90vw,22rem)] rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-glow"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-2">
                {navigation.map((item) => (
                  <NavButton
                    key={item.id}
                    label={item.label}
                    active={activeSection === item.id}
                    mobile
                    onClick={() => {
                      handleNavigate(item.id)
                      setMobileOpen(false)
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            featured={selectedProject.title === featuredProject.title}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function Navbar({
  activeSection,
  mobileOpen,
  onMobileToggle,
  onNavigate,
}: {
  activeSection: SectionId
  mobileOpen: boolean
  onMobileToggle: () => void
  onNavigate: (section: SectionId) => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-semibold text-white shadow-glow transition duration-300 group-hover:-translate-y-0.5 group-hover:border-violet-400/30">
            N
          </span>
          <div>
            <div className="font-display text-sm font-semibold tracking-[0.35em] text-white">
              NINA
            </div>
            <div className="text-xs text-slate-400">Personal Portfolio</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navigation.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={cvFile}
            download="CV.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            Download CV
          </a>
        </div>

        <button
          type="button"
          onClick={onMobileToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </header>
  )
}

function NavButton({
  label,
  active,
  mobile = false,
  onClick,
}: {
  label: string
  active: boolean
  mobile?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full text-sm transition',
        mobile ? 'flex w-full items-center justify-between px-4 py-3 text-left' : 'px-4 py-2',
        active ? 'bg-white/10 text-white shadow-glow' : 'text-slate-400 hover:bg-white/5 hover:text-white',
      ].join(' ')}
    >
      <span>{label}</span>
      {mobile && active ? <Sparkles className="h-4 w-4 text-violet-300" /> : null}
    </button>
  )
}

function Hero({ onViewWork }: { onViewWork: () => void }) {
  return (
    <section id="home" className="relative">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md"
          >
            <MoonStar className="h-4 w-4 text-violet-300" />
            Open to relevant opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >

            <span className="mt-4 block bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              {profile.headline}
            </span>
            <span className="mt-4 block text-slate-300">{profile.subheadline}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300"
          >
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={onViewWork}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              View My Work
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-white/10"
            >
              Contact Me
              <Code2 className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {profile.roles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm"
              >
                {role}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-10 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="w-full max-w-[20rem]">
            <ProfilePhoto />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProfilePhoto() {
  const [imageVisible, setImageVisible] = useState(true)

  return (
    <div className="group relative min-h-[40rem] overflow-hidden rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-500/20 via-slate-950 to-cyan-400/10 shadow-glow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(34,211,238,0.22),transparent_35%)]" />
      <div className="absolute inset-4 rounded-[1.5rem] border border-white/10" />
      {!imageVisible ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-100 w-40 items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-5xl font-semibold text-white shadow-glow">
          </div>
        </div>
      ) : null}
      <img
        src={profilePhoto}
        alt="Portrait of Nina Dwi Ariani"
        className={['absolute inset-0 h-full w-full object-cover object-[50%_58%] transition duration-700 group-hover:scale-105', imageVisible ? 'opacity-100' : 'opacity-0'].join(' ')}
        onError={() => setImageVisible(false)}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent px-5 pb-5 pt-20">
        <div className="text-xs uppercase tracking-[0.28em] text-cyan-200">Web developer</div>
        <div className="mt-2 font-display text-xl font-semibold text-white">Nina Dwi Ariani</div>
      </div>
    </div>
  )
}

function TerminalCard() {
  const lines = [
    '$ whoami',
    'Computer Science Education Graduate',
    '',
    '$ stack',
    'PHP · Laravel · JS · MySQL',
    'HTML · CSS · Bootstrap',
    '',
    '$ status',
    'OPEN TO OPPORTUNITIES',
  ]

  return (
    <div className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-glow backdrop-blur-2xl">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-400/10" />
      <div className="relative rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-300/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
          <span className="ml-2 text-xs text-slate-400">nina@portfolio:~$</span>
        </div>

        <div className="grid gap-4 rounded-[1.35rem] border border-violet-400/20 bg-[linear-gradient(180deg,rgba(139,92,246,0.08),rgba(2,6,23,0.08))] p-5 font-mono text-sm leading-7 text-slate-200">
          {lines.map((line, index) => (
            <div key={`${line}-${index}`} className="flex gap-3">
              <span className="w-4 text-violet-300">{line.startsWith('$') ? '>' : ' '}</span>
              <span className={line === 'OPEN TO OPPORTUNITIES' ? 'font-semibold text-cyan-300' : ''}>
                {line || '\u00A0'}
                {index === lines.length - 1 ? <span className="ml-1 inline-block h-4 w-[0.6ch] bg-violet-400 align-middle animate-cursor" /> : null}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400 sm:grid-cols-3">
          {['Responsive UI', 'Database Driven', 'Teaching Mindset', 'Clean Code', 'Problem Solving', 'Futuristic UI'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StackMarquee() {
  const topRow = stackHighlights.filter((_: StackItem, index: number) => index % 2 === 0);
  const bottomRow = stackHighlights.filter((_: StackItem, index: number) => index % 2 !== 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 30, opacity: 0, scale: 0.95 },
    show: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col gap-3 py-3"
    >
      {/* Baris Atas */}
      <div className="flex flex-wrap justify-center gap-3">
        {topRow.map((item: StackItem) => (
          <motion.div
            key={item.name}
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.03 }}
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 shadow-md backdrop-blur-md transition-all duration-200 hover:border-violet-500/40 hover:bg-white/10 hover:text-white hover:shadow-violet-500/15"
          >
            <img
              src={`https://cdn.simpleicons.org/${item.icon}/ffffff`}
              alt={item.name}
              className="h-5 w-5 opacity-80 transition-all duration-200 group-hover:scale-110 group-hover:opacity-100"
            />
            <span className="whitespace-nowrap tracking-wide">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Baris Bawah */}
      <div className="flex flex-wrap justify-center gap-3">
        {bottomRow.map((item: StackItem) => (
          <motion.div
            key={item.name}
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.03 }}
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 shadow-md backdrop-blur-md transition-all duration-200 hover:border-cyan-500/40 hover:bg-white/10 hover:text-white hover:shadow-cyan-500/15"
          >
            <img
              src={`https://cdn.simpleicons.org/${item.icon}/ffffff`}
              alt={item.name}
              className="h-5 w-5 opacity-80 transition-all duration-200 group-hover:scale-110 group-hover:opacity-100"
            />
            <span className="whitespace-nowrap tracking-wide">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SectionShell({
  id,
  eyebrow,
  children,
}: {
  id: SectionId
  eyebrow: string
  children: ReactNode
}) {
  return (
    <section id={id} className="relative scroll-mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-violet-200">
            <Atom className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"></h2>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

function AboutSection() {
  const cards = [
    {
      label: 'Education',
      value: profile.education.institution,
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      label: 'Focus',
      value: profile.education.program,
      icon: <Brain className="h-5 w-5" />,
    },
    {
      label: 'Primary Technologies',
      value: 'PHP, Laravel, MySQL, JavaScript, HTML, CSS, Bootstrap',
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      label: 'Career Goal',
      value: 'Web Developer and Coding Education Roles',
      icon: <BriefcaseBusiness className="h-5 w-5" />,
    },
  ]

  return (
    <div className="grid items-end gap-6 lg:grid-cols-[1.05fr_0.95fr]">

      {/* Kartu Deskripsi Utama */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <p className="text-lg leading-8 text-slate-300">
          I’m Nina Dwi Ariani, a Computer Science Education graduate and aspiring
          Web Developer with hands-on experience in PHP, Laravel, MySQL,
          JavaScript, HTML, CSS, and Bootstrap. I enjoy building responsive,
          user-friendly web applications and turning ideas into practical
          digital solutions. I’m eager to contribute, keep learning, and grow
          through real-world projects.
        </p>
      </motion.div>

      {/* Grid Kartu Kecil */}
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-slate-950/80"
          >
            <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-violet-200">
              {card.icon}
            </div>

            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
              {card.label}
            </div>

            <div className="mt-2 text-base leading-7 text-slate-100">
              {card.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SkillsSection() {
  return (
    <div className="flex flex-col gap-10">
      <StackMarquee />
    </div>
  )
}

export function ProjectsSection({
  onSelectProject,
}: {
  onSelectProject: (project: Project) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <button
        type="button"
        onClick={() => onSelectProject(featuredProject)}
        className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl transition duration-300 hover:border-violet-400/30 hover:bg-white/10 lg:col-span-7"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/10 opacity-70 transition duration-500 group-hover:opacity-100" />

        <div className="relative grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">
              Featured Project
            </span>

            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white">
              {featuredProject.title}
            </h3>

            <p className="mt-4 text-base leading-7 text-slate-300">
              {featuredProject.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                <SquareTerminal className="h-4 w-4 text-cyan-300" />
                Open case study
              </span>

              {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                <MoonStar className="h-4 w-4 text-violet-300" />
                Abstract UI showcase
              </span> */}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
            <div className="grid gap-3">
              {[
                ["Problem", featuredProject.problem],
                ["Approach", featuredProject.approach],
                ["Role", featuredProject.role],
                ["Result", featuredProject.result],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {label}
                  </div>

                  <div className="mt-2 text-sm leading-6 text-slate-200">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </button>

      <div className="grid gap-4 lg:col-span-5">
        {otherProjects.map((project, index) => (
          <motion.button
            key={project.title}
            type="button"
            onClick={() => onSelectProject(project)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
            }}
            className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/10"
          >

            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">
                {project.category}
              </span>

              <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-violet-300" />
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold text-white">
              {project.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-violet-400/0 via-violet-400/40 to-cyan-400/0 md:left-7" />
      <div className="grid gap-4">
        {experienceItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="relative pl-14 md:pl-20"
          >
            <div className="absolute left-3 top-6 h-6 w-6 rounded-full border border-violet-400/40 bg-slate-950 shadow-[0_0_0_6px_rgba(139,92,246,0.1)] md:left-5" />
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
                <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">
                  {item.type}
                </span>
              </div>
              <div className="mt-2 text-sm text-slate-400">{item.organization}</div>
              <div className="mt-2 text-sm text-violet-200">{item.date}</div>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.responsibilities.map((value) => (
                  <span key={value} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function EducationSection() {
  const detailCards = [
    {
      label: 'Degree',
      value: 'Computer Science Education',
      grade: 'GPA: 3.55 / 4.00',
    },
    {
      label: 'Institution',
      value: 'Universitas Negeri Padang',
    },
    {
      label: 'Focus',
      value: 'Education and technology',
    },
    {
      label: 'Style',
      value: 'Practical and adaptable',
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-4 text-violet-200">
          <BookOpen className="h-6 w-6" />
        </div>

        <h3 className="mt-5 font-display text-3xl font-semibold text-white">
          {education.institution}
        </h3>

        <p className="mt-3 text-lg text-slate-300">
          {education.program}
        </p>

        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-500">
          {education.date}
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {detailCards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-slate-950/80"
        >
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
            {card.label}
          </div>

          <div className="mt-2 text-lg text-white">
            {card.value}
          </div>

          {card.grade && (
            <p className="mt-1 text-xs font-medium text-violet-300">
              {card.grade}
            </p>
          )}
        </motion.div>
      ))}
      </div>
    </div>
  )
}


export function AchievementsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const certifications = [
    {
      title: "English Speaking Level Test",
      issuer: "SmallTalk2Me",
      image: "/images/englishcertif.png",
      note: "Issued Sept 7, 2026",
    },
    {
      title: "Essential Skills: Emotional Intelligence",
      issuer: "CAMY",
      image: "/images/sertiffor.jpeg",
      note: "Issued Sept 3, 2026",
    },
    {
      title: "Essential Skills: Self Efficacy",
      issuer: "CAMY",
      image: "/images/sertiftri.jpeg",
      note: "Issued Sept 3, 2026",
    },
    {
      title: "Website Development Fundamental",
      issuer: "MySkill",
      image: "/images/sertifwahid.jpg",
      note: "Issued Sept 3, 2026",
    },
    {
      title: "Frontend CSS",
      issuer: "MySkill",
      image: "/images/sertiftriz.jpg",
      note: "Issued Aug 28, 2026",
    },
    {
      title: "CSS Mini Project",
      issuer: "MySkill",
      image: "/images/sertifcss.jpg",
      note: "Issued Aug 28, 2026",
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 transition hover:border-violet-400/20"
      >
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-3 text-violet-200">
            <BadgeCheck className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
              Achievement
            </p>

            <h3 className="mt-1 font-display text-2xl font-semibold text-white">
              Journal Publication
            </h3>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-200">
              SINTA 5 Accredited Journal
            </span>

            <span className="text-xs text-slate-500">
              Published · 20 June 2026
            </span>
          </div>

          <h4 className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-white">
            Perancangan Website Tempat Pemakaman Umum Terintegrasi di Kota
            Padang
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Studi Kasus: TPU Tunggul Hitam, TPU Air Dingin, dan TPU Bungus
            Teluk Kabung
          </p>

          <p className="mt-4 text-sm font-medium text-slate-300">
            JOECY: Journal of Innovative and Creativity
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Published research on the design and development of an integrated
            web-based public cemetery information and management system.
          </p>

          <a
            href="https://joecy.org/index.php/joecy/article/view/12082"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            View Publication
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 transition hover:border-violet-400/20 sm:p-5"
      >
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-2.5 text-violet-200">
            <Award className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-violet-300">
              Credentials
            </p>

            <h3 className="mt-0.5 font-display text-lg font-semibold text-white sm:text-xl">
              Certifications
            </h3>
          </div>
        </div>

        <div className="relative mt-4">
          <div className="max-h-[300px] overflow-y-auto divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.02] pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
            {certifications.map((item, index) => (
              <div
                key={item.title}
                className="group relative flex items-center justify-between gap-3 p-3 transition hover:bg-white/[0.04]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-medium text-white">
                    {item.title}
                  </h4>

                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{item.issuer}</span>

                    {item.note ? (
                      <>
                        <span>•</span>
                        <span className="text-slate-500">{item.note}</span>
                      </>
                    ) : null}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      url: item.image,
                      title: item.title,
                    })
                  }
                  className="relative flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-slate-900 transition hover:border-violet-400/40"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <ZoomIn className="h-3.5 w-3.5 text-white" />
                  </div>
                </button>
              </div>
            ))}
          </div>

          {hoveredIndex !== null && (
            <div className="pointer-events-none absolute right-16 top-1/2 z-50 hidden w-64 -translate-y-1/2 rounded-xl border border-white/20 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md md:block">
              <img
                src={certifications[hoveredIndex].image}
                alt={`${certifications[hoveredIndex].title} preview`}
                className="h-auto w-full rounded-lg object-contain"
              />
              <p className="mt-1.5 text-center text-[11px] font-medium text-white">
                {certifications[hoveredIndex].title}
              </p>
            </div>
          )}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 rounded-full bg-white/10 p-2 text-slate-300 hover:bg-white/20 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="pr-8 text-sm font-semibold text-white sm:text-base">
                {selectedImage.title}
              </h3>

              <div className="mt-4 overflow-hidden rounded-lg">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="h-auto max-h-[75vh] w-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ContactSection() {
  const hasContact = Boolean(contactDetails.email || contactDetails.linkedin);

  const cleanPhone = contactDetails.phone?.replace(/[^0.9]/g, "") || "";
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone}`
    : "#";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/15 via-white/5 to-cyan-400/10 p-8 backdrop-blur-xl"
      >
        {/* <span className="inline-flex rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-100">
          Let&apos;s Build Something
        </span> */}

        <h3 className="mt-5 font-display text-4xl font-semibold text-white">
          LET&apos;S BUILD SOMETHING
        </h3>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
          If you are looking for a software engineer, web developer, frontend
          developer, or an IT/coding teacher who can communicate clearly and
          learn quickly, this portfolio is positioned to support that next
          step.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5"
          >
            Back to top
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-950/60"
          >
            View case studies
            <SquareTerminal className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6"
      >
        <div className="grid gap-4">
          {[
          {
  icon: <MonitorSmartphone className="h-5 w-5" />,
  label: "Email",
  value: contactDetails.email || "Not listed on the CV",
  href: contactDetails.email
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${contactDetails.email}`
    : undefined,
  disabled: !contactDetails.email,
},
            {
              icon: <Phone className="h-5 w-5" />,
              label: "Phone / WhatsApp",
              value: contactDetails.phone || "Not listed on the CV",
              href: contactDetails.phone ? whatsappUrl : undefined,
              disabled: !contactDetails.phone,
            },
            {
              icon: <MapPin className="h-5 w-5" />,
              label: "Location",
              value: contactDetails.location || "Not listed on the CV",
              href: contactDetails.location
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactDetails.location)}`
                : undefined,
              disabled: !contactDetails.location,
            },
            {
              icon: <Sparkles className="h-5 w-5" />,
              label: "LinkedIn",
              value: contactDetails.linkedin || "Not listed on the CV",
              href: contactDetails.linkedin?.startsWith("http")
                ? contactDetails.linkedin
                : contactDetails.linkedin
                ? `https://${contactDetails.linkedin}`
                : undefined,
              disabled: !contactDetails.linkedin,
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {item.href && !item.disabled ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform duration-200 hover:scale-[1.01]"
                >
                  <ContactItem
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    disabled={false}
                  />
                </a>
              ) : (
                <ContactItem
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  disabled={item.disabled}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
        >
          <div className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Status
          </div>

          <div className="mt-2 flex items-center gap-2 text-slate-100">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                hasContact ? "bg-emerald-300" : "bg-amber-300"
              }`}
            />

            {hasContact
              ? "Ready to connect"
              : "Contact links can be added when available"}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  disabled?: boolean;
}

function ContactItem({ icon, label, value, href, disabled }: ContactItemProps) {
  const isClickable = !disabled && Boolean(href);

  const content = (
    <div
      className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : isClickable
          ? "hover:border-violet-400/40 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-500/10"
          : ""
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Box Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-violet-300 transition-colors duration-300 group-hover:border-violet-400/40 group-hover:bg-violet-500/10 group-hover:text-violet-200">
          {icon}
        </div>

        {/* Content Text */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold text-white">
            {value}
          </p>
        </div>
      </div>

      {isClickable && (
        <div className="mt-2 sm:mt-0 flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 shadow-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/15 group-hover:text-white">
          <span>View</span>
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      )}
    </div>
  );

  if (isClickable && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}

function ProjectModal({
  project,
  featured,
  onClose,
}: {
  project: Project
  featured: boolean
  onClose: () => void
}) {
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null)

  const projectImages = project.images && project.images.length > 0 
    ? project.images 
    : project.image 
    ? [project.image] 
    : []

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-glow sm:p-8"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.24 }}
          onClick={(event) => event.stopPropagation()}
        >
          {/* Header Modal */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">
                {project.category}
              </span>
              <h3 className="mt-4 font-display text-3xl font-semibold text-white">{project.title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <InfoCard
              title="Overview"
              text={project.overview}
            />

            <InfoCard
              title="Approach"
              text={project.approach}
            />

            <InfoCard
              title="Problem"
              text={project.problem}
            />

            <InfoCard
              title="Role"
              text={project.role}
            />
          </div>

          <div className="mt-8">
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Technologies</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {featured && (
            <div className="mt-8">
              <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Key Features</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {featuredProject.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {featured && (
            <div className="mt-8 flex justify-center">
              <a
                href="https://github.com/lemierus/TPUPROJECT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
              >
                GitHub Link
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* 📸 DUA GAMBAR TERLETAK PALING BAWAH (BERDAMPINGAN KIRI & KANAN DENGAN ANIMASI & ZOOM) */}
          {projectImages.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              {projectImages.slice(0, 2).map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 * idx }}
                  onClick={() => setSelectedPreviewImage(imgUrl)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl transition hover:border-violet-400/40"
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/80 px-4 py-2 text-xs font-medium text-white shadow-lg">
                      <ZoomIn className="h-4 w-4 text-cyan-300" />
                      <span>Zoom</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Modal Zoom Gambar */}
      <AnimatePresence>
        {selectedPreviewImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPreviewImage(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-slate-950 p-2 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPreviewImage(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/80 p-2 text-slate-300 hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedPreviewImage}
                alt="Enlarged Preview"
                className="max-h-[85vh] w-full rounded-xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
      <div className="text-sm uppercase tracking-[0.25em] text-slate-500">{title}</div>
      <div className="mt-3 text-sm leading-7 text-slate-200">{text}</div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>© {new Date().getFullYear()} Nina Dwi Ariani Portfolio</div>
        <div>Built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.</div>
      </div>
    </footer>
  )
}

function Background() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_20%),linear-gradient(180deg,rgba(5,5,9,0.95),rgba(5,5,9,1))]" />
      <div className="absolute inset-0 bg-grid-fine bg-[size:32px_32px] opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]" />
      <motion.div
        className="absolute left-[8%] top-[10%] h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
        style={{ y }}
      />
      <div className="absolute bottom-[10%] right-[8%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}

function scrollToSection(section: SectionId) {
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default App
