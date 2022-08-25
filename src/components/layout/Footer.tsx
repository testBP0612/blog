import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-300">
          <div>author Bloop</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">title</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-300">
          <Link href="">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}