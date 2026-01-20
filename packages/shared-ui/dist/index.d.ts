import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';

type LinkItem = {
    href: string;
    label: string;
};
declare function DemoHeader({ navLinks, rightContent }: {
    navLinks?: LinkItem[];
    rightContent?: ReactNode;
}): react_jsx_runtime.JSX.Element;

declare function DemoLayout({ children, headerLinks, footerLinks, headerRightContent }: {
    children: React.ReactNode;
    headerLinks?: LinkItem[];
    footerLinks?: LinkItem[];
    headerRightContent?: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

declare function DemoFooter({ links }: {
    links?: LinkItem[];
}): react_jsx_runtime.JSX.Element;

declare function Logo({ className }: {
    className?: string;
}): react_jsx_runtime.JSX.Element;

export { DemoFooter, DemoHeader, DemoLayout, LinkItem, Logo };
