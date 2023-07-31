import Link from 'next/link';

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return (
    <Link href={`/tags/${text}`}>
      <span className="mr-3 px-1 py-0.5 text-xs font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-400 rounded">
        {text.split(' ').join('-')}
      </span>
    </Link>
  );
};

export default Tag;
