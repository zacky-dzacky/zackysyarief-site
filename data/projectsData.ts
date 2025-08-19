interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  tag?: string
}

const projectsData: Project[] = [
  {
    title: 'Gradle to Kotlin DSL',
    description: `Convert your Gradle build scripts to Kotlin DSL for better type safety and IDE support.`,
    imgSrc: '/static/images/google.png',
    href: 'snippet/gradle-to-kotlin-dsl',
    tag: 'Gradle',
  },
  {
    title: 'Fastlane on Android Studio',
    description: `Initialize Fastlane in Android Studio for automating builds and deployments.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/snippet/fastlane-android-studio',
    tag: 'Fastlane',
  },
  {
    title: 'Firebase CLI on Terminal',
    description: `This is a simple example of a Firebase CLI command that can be run in the terminal.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/snippet/firebase-cli-terminal',
    tag: 'Firebase',
  },
  {
    title: 'Custom Run Configuration',
    description: `Add a custom run configuration in Android Studio to run a specific task or command.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/snippet/custom-run-configuration-android-studio',
    tag: 'Android Studio',
  },
  {
    title: 'Build Library Module',
    description: `Build a library module in Android Studio to share code across multiple projects.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/snippet/firebase-cli-terminal',
    tag: 'Gradle',
  },
  {
    title: 'Setup KMP Project',
    description: `Set up a Kotlin Multiplatform project to share code between Android and iOS.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/snippet/firebase-cli-terminal',
    tag: 'Gradle',
  },
]

export default projectsData
