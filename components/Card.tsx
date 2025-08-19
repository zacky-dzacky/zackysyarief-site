import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, tag }) => (
  <a
    href={href}
    className="bg-day dark:bg-night bg-opacity-50 dark:bg-opacity-50 group relative flex transform cursor-pointer flex-wrap rounded border border-gray-200 p-px transition duration-500 hover:scale-105 dark:border-gray-700"
  >
    <div className="bg-day dark:bg-night relative space-y-2">
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}></Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h3 className="mt-2 mb-2 font-bold md:text-xl">{title}</h3>
        <span className="inline-flex w-full items-center justify-between">
          <span className="inline-block rounded border border-gray-700 px-2 py-1 text-xs font-medium">
            {tag}
          </span>
          {/* <p className="text-sm font-semibold text-gray-500">
            { date }
          </p> */}
        </span>
        <p className="prose mt-2 mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </a>
)

export default Card
