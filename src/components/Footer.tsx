import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const vendorLinks = [
  { href: "/register", label: "Become a Vendor" },
  { href: "/login", label: "Vendor Login" },
  { href: "/services", label: "Browse Services" },
];

export default function Footer() {
  return (
    <footer className="bg-espresso text-sand">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-full bg-ivory text-espresso">
              <Heart className="size-5 fill-current" />
            </span>
            <span className="font-(family-name:--font-playfair) text-2xl font-semibold italic text-ivory">
              WedPlan
            </span>
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed text-sand/80">
            From the first idea to the last dance, we help couples find trusted
            vendors and plan a day worth remembering.
          </p>
        </div>

        <div>
          <h4 className="text-xl text-ivory">Quick Links</h4>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl text-ivory">For Vendors</h4>
          <ul className="mt-5 space-y-3">
            {vendorLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl text-ivory">Get in Touch</h4>
          <ul className="mt-5 space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-caramel" />
              <span>Cumilla, Bangladesh</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-caramel" />
              <span>hello@wedplan.com</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-caramel" />
              <span>+880 1700 000000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-sand/70">
        © 2026 WedPlan. All rights reserved.
      </div>
    </footer>
  );
}