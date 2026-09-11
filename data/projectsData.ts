interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  tag?: string
}

const projectsData: Project[] = [
  {
    title: 'Caridata',
    description: `Ask questions about your own PDFs, with the models running on your own machine. Hybrid dense + SPLADE retrieval over Qdrant finds the relevant passages, a local Ollama model writes the answer, and every document stays scoped to the account that uploaded it.`,
    imgSrc: '/static/images/google.png',
    href: 'https://caridata.zackysyarief.com',
    tag: 'RAG',
  },
  {
    title: 'MCP with Google ADK',
    description: `A project that utilizes Google's ADK (AI Development Kit) to enhance the capabilities of the MCP (Model Context Protocol) server, combined with Open model as the orchestration layer.`,
    imgSrc: '/static/images/google.png',
    href: 'https://github.com/zacky-dzacky/mcp-in-practice',
    tag: 'MCP',
  },
  {
    title: 'Kalee Harness',
    description: `A model-agnostic agent harness built around a single capability: code review. Findings come out of a multi-pass scan-then-verify loop over read-only tools, each one labelled by severity and whether it was confirmed or is merely plausible, with token and cost accounting printed per run. TypeScript on Bun, installable as a standalone binary.`,
    imgSrc: '/static/images/google.png',
    href: 'https://github.com/zacky-dzacky/kalee-harness',
    tag: 'Agents',
  },
]

export default projectsData
