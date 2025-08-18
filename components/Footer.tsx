import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <div className="mx-auto w-full px-6 antialiased sm:max-w-3xl sm:px-0">
      <footer className="py-4 tracking-wider">
        <div className="flex flex-col justify-between space-y-4 py-6 sm:flex-row sm:space-y-0">
          <div className="flex flex-col gap-5 text-sm sm:flex-row">
            <div>
              <a
                className="inline-block cursor-pointer hover:underline"
                href="https://github.com/zacky-dzacky"
              >
                <p className="text-md text-slate-800 dark:text-slate-400">Github</p>
              </a>
            </div>
            <div>
              <a
                className="inline-block cursor-pointer hover:underline"
                href="https://linkedin.com/in/zacky-dzacky"
              >
                <p className="text-md text-slate-800 dark:text-slate-400">LinkedIn</p>
              </a>
            </div>
            <div>
              <a
                className="inline-block cursor-pointer hover:underline"
                href="https://x.com/b34utyisis"
              >
                <p className="text-md text-slate-800 dark:text-slate-400">Twitter</p>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-sm sm:flex-row">
            <div>
              <a className="inline-block cursor-pointer hover:underline" href="/cheatsheet">
                <p className="text-md text-slate-800 dark:text-slate-400">{} Snippets</p>
              </a>
            </div>
            {/* <div>
              <a className="hover:underline cursor-pointer inline-block" href="/portfolio">
                <p className="text-slate-800 dark:text-slate-400 text-md">Portfolio</p>
              </a>
            </div> */}
            <div>
              <a className="inline-block cursor-pointer hover:underline" href="/wiki">
                <p className="text-md text-slate-800 dark:text-slate-400">Wiki</p>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:space-y-0">
          <p className="text-sm text-slate-400">Built with Next.js, Tailwind and Vercel</p>
          <p className="text-sm text-slate-400">©2025 Zacky Syarief. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
