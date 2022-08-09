/* eslint-disable jsx-a11y/alt-text */
import { AnchorHTMLAttributes, FC, ReactNode } from 'react'
import { explorer_url } from 'sale/lib/config'

const Nav: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => (
  <a className="text-lg" {...props}>
    {children}
  </a>
)

export const Header: FC = () => {
  return (
    <header className="h-16 bg-primary-light text-tertiary-light flex flex-row shadow-md sticky top-0 z-10 font-semibold">
      <div className="mx-auto max-w-full flex flex-1 lg:max-w-6xl p-2 sm:p-5 self-center">
        <img src="/images/logo.png" alt="logo" className="h-8 mr-14" />
        <div className="flex items-center space-x-10 flex-1">
          <Nav href={explorer_url} target="_blank">
            Explore
          </Nav>
          <Nav href="#details">Details</Nav>
          <Nav href="#roadmap">Roadmap</Nav>
          <a
            href="/#"
            className="bg-success-light text-bg-light px-2 py-1 rounded-lg shadow-md"
          >
            Support Us
          </a>
        </div>
        <div className="flex self-center">
          <input
            placeholder="Search"
            className="flex self-end px-3 py-1 rounded-lg"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
