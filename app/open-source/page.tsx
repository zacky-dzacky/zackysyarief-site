import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import HeaderSnippet from '@/components/HeaderSnippet'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <HeaderSnippet />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Open Source
          </h1>
        </div>
        <div className="container py-12">
           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projectsData.map((d) => (
              <Card
                path={null}
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                tag={d.tag}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
