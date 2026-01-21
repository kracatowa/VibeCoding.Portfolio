// src/Logo.tsx
import { useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Logo({ className }) {
  const svgRef = useRef(null);
  const handleLoad = () => {
    if (svgRef.current)
      svgRef.current.style.display = "none";
  };
  const handleError = (e) => {
    e.currentTarget.style.display = "none";
    if (svgRef.current)
      svgRef.current.style.display = "inline-block";
  };
  const basePath = typeof window !== "undefined" && window.__NEXT_DATA__?.props?.pageProps?.basePath ? window.__NEXT_DATA__.props.pageProps.basePath : process.env.NEXT_PUBLIC_BASE_PATH || "";
  return /* @__PURE__ */ jsxs("a", { href: "/", "aria-label": "Oc\xE9an Barras", className: `flex items-center gap-3 no-underline text-slate-100 ${className ?? ""}`, children: [
    /* @__PURE__ */ jsx("img", { src: `${basePath}/wave-logo.png`, alt: "Oc\xE9an Barras", className: "w-10 h-10 shrink-0 rounded-lg object-cover", onLoad: handleLoad, onError: handleError }),
    /* @__PURE__ */ jsx("span", { className: "font-bold text-base text-slate-100 md:hidden", children: "OB" }),
    /* @__PURE__ */ jsx("span", { className: "font-bold text-base text-slate-100 hidden md:inline", children: "Oc\xE9an Barras" })
  ] });
}

// src/DemoHeader.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DemoHeader({
  navLinks,
  rightContent
}) {
  const defaultLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" }
  ];
  const links = navLinks ?? defaultLinks;
  return /* @__PURE__ */ jsxs2("header", { className: "flex items-center justify-between px-6 py-4 border-b-2 border-stone-200 bg-white backdrop-blur-md sticky top-0 z-50 w-full shadow-vintage", children: [
    /* @__PURE__ */ jsx2("div", { className: "shrink-0", children: /* @__PURE__ */ jsx2(Logo, {}) }),
    /* @__PURE__ */ jsx2("nav", { "aria-label": "Demo navigation", className: "flex-1 flex gap-3 items-center justify-center", children: /* @__PURE__ */ jsx2("ul", { className: "flex gap-8 list-none m-0 p-0 items-center flex-nowrap whitespace-nowrap", children: links.map((l) => /* @__PURE__ */ jsx2("li", { children: /* @__PURE__ */ jsx2("a", { href: l.href, className: "text-stone-600 no-underline text-sm font-medium px-3 py-2 rounded transition-colors duration-200 hover:text-terracotta-600 hover:bg-terracotta-50", children: l.label }) }, l.href)) }) }),
    rightContent && /* @__PURE__ */ jsx2("div", { className: "shrink-0 ml-4", children: rightContent })
  ] });
}

// src/DemoFooter.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function DemoFooter({ links }) {
  return /* @__PURE__ */ jsxs3("footer", { className: "border-t-2 border-stone-200 py-8 px-6 text-center bg-warm-50", children: [
    /* @__PURE__ */ jsxs3("p", { className: "m-0 text-sm text-stone-600 font-light", children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Oc\xE9an Barras \u2014 Demo"
    ] }),
    links && links.length > 0 && /* @__PURE__ */ jsx3("div", { className: "flex gap-4 justify-center mt-3", children: links.map((l) => /* @__PURE__ */ jsx3("a", { href: l.href, className: "text-stone-500 no-underline text-sm hover:text-terracotta-600 transition-colors", children: l.label }, l.href)) })
  ] });
}

// src/DemoLayout.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function DemoLayout({
  children,
  headerLinks,
  footerLinks,
  headerRightContent
}) {
  return /* @__PURE__ */ jsxs4("div", { className: "min-h-screen flex flex-col bg-ivory-50", children: [
    /* @__PURE__ */ jsx4(DemoHeader, { navLinks: headerLinks, rightContent: headerRightContent }),
    /* @__PURE__ */ jsx4("main", { className: "flex-1 py-12 px-6 max-w-7xl mx-auto w-full", children }),
    /* @__PURE__ */ jsx4(DemoFooter, { links: footerLinks })
  ] });
}
var DemoLayout_default = DemoLayout;
export {
  DemoFooter,
  DemoHeader,
  DemoLayout_default as DemoLayout,
  Logo
};
