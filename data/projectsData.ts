interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  tag?: string
}

const projectsData: Project[] = [
  {
    title: 'RAG using Ollama',
    description: `A Retrieval-Augmented Generation (RAG) project that leverages the Ollama API to enhance language model responses with relevant information from a custom knowledge base.`,
    imgSrc: '/static/images/google.png',
    href: 'https://github.com/zacky-dzacky/rag-ollama',
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
    tag: 'Android',
  }
]

export default projectsData
