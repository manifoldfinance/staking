import classNames from 'classnames';

export const tabPanelClassNames = 'focus:outline-none focus:ring-opacity-20';

export const tabClassNames = ({ selected }: { selected: boolean }) =>
  classNames(
    'w-full py-2.5 text-sm leading-5 font-medium rounded-lg',
    'focus:outline-none focus:ring-4',
    selected
      ? 'bg-white shadow text-primary'
      : 'text-gray-300 hover:bg-primary-300 hover:text-white',
  );
