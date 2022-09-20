import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
}

export const containerClassName = 'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0';

const SectionContainer = ({ children }: SectionContainerProps) => {
  return <div className={containerClassName}>{children}</div>;
};

export default SectionContainer;
