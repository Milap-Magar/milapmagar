// Navlink types
export interface navLinkTypes {
  id: number;
  name: string;
  icons: string;
  href: string;
}

// Dynamic datasets
export const navLinks: navLinkTypes[] = [
  {
    id: 0,
    name: "Facebook",
    icons: "/Icons/facebook 1.svg",
    href: "",
  },
  {
    id: 1,
    name: "Instagram",
    icons: "/Icons/instagram 1.svg",
    href: "",
  },
  {
    id: 2,
    name: "Github",
    icons: "/Icons/github 1.svg",
    href: "",
  },
  {
    id: 3,
    name: "LinkedIn",
    icons: "/Icons/linkedin 1.svg",
    href: "",
  },
];
