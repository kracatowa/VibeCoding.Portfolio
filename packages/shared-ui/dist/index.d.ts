import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type LinkItem = {
    href: string;
    label: string;
};
declare function DemoHeader({ navLinks }: {
    navLinks?: LinkItem[];
}): react_jsx_runtime.JSX.Element;

declare function DemoLayout({ children, headerLinks, footerLinks }: {
    children: React.ReactNode;
    headerLinks?: LinkItem[];
    footerLinks?: LinkItem[];
}): react_jsx_runtime.JSX.Element;

declare function DemoFooter({ links }: {
    links?: LinkItem[];
}): react_jsx_runtime.JSX.Element;

declare function Logo({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;

export { DemoFooter, DemoHeader, DemoLayout, LinkItem, Logo };
