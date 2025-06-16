import project1 from "@/public/project3.webp";
import project2 from "@/public/project7.webp";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

// constants/navigation.js
export const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const BRAND_NAME = "Swayam";

export const PROJECTS = [
  {
    name: "ZentroLab",
    image: project1,
    href: "https://zentrolab.vercel.app/",
  },
  {
    name: "Creativerse",
    image: project2,
    href: "https://creativerse-ten.vercel.app/",
  },
  {
    name: "FlowPilot",
    image: project1,
    href: "https://flowpilot-chi.vercel.app/",
  },
  {
    name: "Pet-Friendly City",
    image: project2,
    href: "https://petfriendlycity.netlify.app/",
  },
  {
    name: "Task Manager",
    image: project1,
    href: "#",
  },
];

export const SOCIAL_LINKS = [
  {
    id: 1,
    label: "GitHub",
    href: "https://github.com/swayamDev",
    icon: <FaGithub className="text-2xl text-white" />,
  },
  {
    id: 2,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/swayam-webdev/",
    icon: <FaLinkedinIn className="text-2xl text-white" />,
  },
  {
    id: 3,
    label: "Twitter",
    href: "https://x.com/Swayam_Dev",
    icon: <FaXTwitter className="text-2xl text-white" />,
  },
  {
    id: 4,
    label: "Email",
    href: "mailto:swayamcoder@gmail.com",
    icon: <MdEmail className="text-2xl text-white" />,
  },
];
