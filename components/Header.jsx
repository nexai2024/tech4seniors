"use client"
import Link from "next/link";
import NavLink from "@/components/NavLink";
import Image from "next/image";
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg py-4 px-6 md:px-12">
      <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
          <Image src="/tech4seniors.png" alt="Tech4Seniors Logo" width={200} height={100} />
        </div>
        <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8 text-lg font-medium">
          <li>
            <Link href="/">
            <button>
              Home
            </button>
          </Link>
          </li>
          <li><Link href="/services">
            <button>
              Services
            </button>
          </Link></li>
          <li><Link href="/about">
            <button>
              About Us
            </button>
          </Link></li>
          <li><Link href="/testimonials">
            <button>
              Testimonials
            </button>
          </Link></li>
          <li><Link href="/faq">
            <button>
              FAQ
            </button>
          </Link></li>
          <li><Link href="/contact">
            <button>
              Contact
            </button>
          </Link></li>
        </ul>
        <div className="text-lg font-bold tracking-tight mb-4 md:mb-0">
          <Link href="/portal">
            <button className="focus:outline-none border:1 border-white focus:ring-2 focus:ring-blue-300 rounded-md p-1">
              Current Clients
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}