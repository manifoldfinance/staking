import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { classNames } from 'kindelia/react/classNames'

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      id="toggleTheme"
      className="self-center flex pr-2"
    >
      {mounted && (
        <div className="w-9 h-5 flex items-center bg-gray-300 rounded-full relative">
          <div
            className={classNames(
              'w-4 h-4 bg-white rounded-full shadow absolute transition-all',
              theme === 'light' ? 'right-5' : 'right-0'
            )}
          />
        </div>
      )}
    </button>
  )
}
