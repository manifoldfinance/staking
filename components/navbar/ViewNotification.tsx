import { BellIcon } from '@heroicons/react/outline'
export default function ViewNotification() {
  return (
    <button
      type="button"
      className="bg-gray-200 p-1 rounded-full text-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}
