'use client'

import dynamic from 'next/dynamic'
import { SearchConfig } from 'pliny/search'

const SearchProvider = dynamic(
  () => import('pliny/search').then((mod) => mod.SearchProvider),
  { ssr: false }
)

export function SearchProviderWrapper({
  searchConfig,
  children,
}: {
  searchConfig: SearchConfig
  children: React.ReactNode
}) {
  return <SearchProvider searchConfig={searchConfig}>{children}</SearchProvider>
}
