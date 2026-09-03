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
    title: '[Draft] Kalee',
    description: `Kalee is an android tool to make device binding process on android smooth and easy to manage.`,
    imgSrc: '/static/images/google.png',
    href: 'https://github.com/zacky-dzacky/kalee',
    tag: 'Android'
  }
]

export default projectsData