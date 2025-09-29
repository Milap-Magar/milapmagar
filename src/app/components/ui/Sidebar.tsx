import { navLinks } from "@/app/utils/utils";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    // Added 'fixed' and 'left-0' to keep the sidebar in place
    // Added 'z-50' to ensure it stays above all other content
    <div className="max-w-24 w-full h-screen bg-white fixed left-0 top-0 z-50">
      <div className="h-full flex flex-col justify-between items-center">
        {/* Logo section */}
        <figure className="py-4 px-2">
          <Image src={"/mm.png"} alt="Logo" width={100} height={100} />
        </figure>

        {/* Navigation icons */}
        <nav className="py-4 px-2">
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>
                  <Image
                    src={item.icons}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="object-contain cursor-pointer"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
