import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Header from '@/components/Header'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <Header />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-4xl leading-9 font-extrabold tracking-tight text-gray-900 sm:leading-10 md:leading-14 dark:text-gray-100">
            Thanks for coming{' '}
            <span className="wave" role="img" aria-label="Hello">
              👋🏾
            </span>
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I love to write about Android Native especially Kotlin Multiplatform,{' '}
            <b>Android Security</b>, and <b>Java/Kotlin</b>. As well as design and archicture in
            mobile development.{' '}
          </p>
        </div>
      </div>
      {/* <div className="container mx-auto mt-8">
        <h2 className="text-4xl leading-9 font-extrabold tracking-tight text-gray-900 sm:leading-10 md:leading-14 dark:text-gray-100">
          Work Experience
        </h2>
        <div className="ml-[22px]">
          <div className="pl-4 flex flex-col place-items-start border-l border-b border-gray-300 dark:border-gray-700">
            <span className="bg-white relative inline-block py-1 px-2 mt-4 ml-[-40px] rounded border border-gray-700 hover:border-accent bg-day dark:bg-night text-xs font-medium">Feb 2021 - Current</span>
            <div className="flex flex-col place-content-between py-4">
              <div className="relative font-bold whitespace-pre flex flex-row place-items-center">
                <a className="text-2xl" href="https://www.linkedin.com/company/maybank" target="_blank" rel="noreferrer nofollow">Maybank</a>
              </div>
              <span className="mx-4 font-bold text-sm text-gray-700 dark:text-gray-300">› Tech Lead</span>
              <div className="mt-4 prose dark:prose-dark">
                <ul className="block text-base space-y-2">
                  <li>Collaborating on building consumer experience products, working closely with Product Managers, Engineering Managers and various other stakeholders across Condé Nast.</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
      </div> */}
      <div className="container mx-auto mt-8">
        <h2 className="text-4xl leading-9 font-extrabold tracking-tight text-gray-900 sm:leading-10 md:leading-14 dark:text-gray-100">
          Recent Articles
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {/* {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))} */}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base leading-6 font-medium">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter?.provider && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )}
      </div>
    </>
  )
}
