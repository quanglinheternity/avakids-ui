// HeaderIconButton.tsx
import React from 'react';

interface HeaderIconButtonProps {
    iconClass?: string;
    text?: string;
    badge?: string | number;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    showBadge?: boolean;
    badgeCount?: number;
    className?: string;
    textClassName?: string;
    showDivider?: boolean;
    href?: string;
}

const HeaderIconButton: React.FC<HeaderIconButtonProps> = ({
    iconClass,
    text,
    // badge,
    onClick,
    showBadge = false,
    badgeCount = 0,
    className = '',
    textClassName = '',
    // showDivider,
    href,
}) => {
    const content = (
        <div
            className={`flex max-w-32.5 cursor-pointer items-center rounded-md p-2 transition-all active:scale-[0.98] ${className} `}
            onClick={onClick}
            style={
                {
                    '--hover-bg': 'rgba(92,77,82,.25)',
                } as React.CSSProperties
            }
        >
            {iconClass && <i className={`${iconClass} shrink-0`}></i>}
            {text && (
                <span
                    className={`w-[calc(100%-21px)] truncate pl-2 ${textClassName} `}
                >
                    {text}
                </span>
            )}
            {showBadge && badgeCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-sm">
                    {badgeCount > 99 ? '99+' : badgeCount}
                </span>
            )}
        </div>
    );

    if (href) {
        return (
            <a href={href} className="decoration-none text-inherit no-underline" aria-label={text}>
                {content}
            </a>
        );
    }

    return content;
};

export default HeaderIconButton;
