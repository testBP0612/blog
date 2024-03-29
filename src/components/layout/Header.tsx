import Link from 'next/link';

import ThemeSwitch from './ThemeSwitch';
import { containerClassName } from './SectionContainer';
import headerNavLinks from '@constants/headerNavLinks';

const Header = () => {
  return (
    <header className={`flex items-center justify-between py-10 ${containerClassName}`}>
      <div>
        <Link href="/">
          <span className="flex items-center justify-between">
            <div className="mr-3">A</div>
          </span>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {headerNavLinks.map(link => (
            <Link key={link.title} href={link.href}>
              <span className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">{link.title}</span>
            </Link>
          ))}
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
