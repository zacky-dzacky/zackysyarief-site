import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from '@/components/Image'
import SearchButton from './SearchButton'

const HeaderSnippet = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="mt-8 flex items-center justify-between">
          <div className="mr-3">
            <Image
              src="/static/images/avatar.png"
              alt="avatar"
              width={192}
              height={192}
              className="h-20 w-20 rounded-full"
            />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="px-2 sm:px-0">
              <h1 className="text-2xl text-slate-800 sm:text-3xl dark:text-slate-300">
                zacky syarief
              </h1>
              <h2 className="text-xl font-light text-slate-700 sm:text-2xl dark:text-slate-300">
                Mobile Engineer
              </h2>
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
    </header>
  )
}

export default HeaderSnippet
