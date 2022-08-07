import classNames from 'classnames';
import { forwardRef } from 'react';

type PanelProps = {
  light?: boolean;
  padding?: false | 'p-1' | 'p-2' | 'p-3' | 'p-4';
} & JSX.IntrinsicElements['div'];

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ light = false, className = '', padding = 'p-4', ...rest }, ref) => {
    const cachedClassNames = classNames(
      className,
      'rounded-xl ring-1 ring-inset ring-white',
      light
        ? 'bg-primary-300 ring-opacity-20'
        : 'bg-primary-400 ring-opacity-10',
      padding,
    );

    return <div ref={ref} className={cachedClassNames} {...rest} />;
  },
);

Panel.displayName = 'Panel';

export default Panel;
