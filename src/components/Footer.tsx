import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt=""
                width={26}
                height={44}
                className="h-[26px] w-auto"
              />
              <span className="font-display text-xl font-bold tracking-[0.08em] text-fg">
                SAUCED
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-dim">
              We build the sauce behind your brand. AI-powered restaurant
              growth, out of Los Angeles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-fg-faint uppercase">
                Company
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-fg-dim transition-colors hover:text-fg">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-fg-dim transition-colors hover:text-fg">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/case-study" className="text-fg-dim transition-colors hover:text-fg">
                    Case study
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-fg-faint uppercase">
                Get started
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/pricing" className="text-fg-dim transition-colors hover:text-fg">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="text-fg-dim transition-colors hover:text-fg">
                    Apply now
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-fg-dim transition-colors hover:text-fg">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-fg-faint uppercase">
                Contact
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:saucedaimarketing@gmail.com"
                    className="text-fg-dim transition-colors hover:text-fg"
                  >
                    saucedaimarketing@gmail.com
                  </a>
                </li>
                <li className="text-fg-dim">Los Angeles, CA</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-edge pt-8 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Sauced. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
