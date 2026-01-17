var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DemoFooter: () => DemoFooter,
  DemoHeader: () => DemoHeader,
  DemoLayout: () => DemoLayout_default,
  Logo: () => Logo
});
module.exports = __toCommonJS(src_exports);

// src/Logo.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function Logo({ className }) {
  const svgRef = (0, import_react.useRef)(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: "/", "aria-label": "Oc\xE9an Barras", className: `flex items-center gap-3 no-underline text-slate-100 ${className ?? ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: `${basePath}/wave-logo.png`, alt: "Oc\xE9an Barras", className: "w-10 h-10 flex-shrink-0 rounded-lg object-cover", onLoad: handleLoad, onError: handleError }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold text-base text-slate-100", children: "Oc\xE9an Barras" })
  ] });
}

// src/DemoHeader.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function DemoHeader({ navLinks }) {
  const defaultLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" }
  ];
  const links = navLinks ?? defaultLinks;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("header", { className: "flex items-center justify-between px-5 py-3 border-b border-white/5 bg-gradient-to-b from-slate-900/90 to-slate-900/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-lg", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between gap-8 w-[1400px] mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Logo, {}),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { "aria-label": "Demo navigation", className: "flex gap-3 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { className: "flex gap-6 list-none m-0 p-0 items-center flex-nowrap whitespace-nowrap", children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: l.href, className: "text-slate-100 no-underline text-base font-semibold px-3 py-1.5 rounded transition-colors duration-150 opacity-90 hover:text-sky-500 hover:opacity-100", children: l.label }) }, l.href)) }) })
  ] }) });
}

// src/DemoFooter.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function DemoFooter({ links }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("footer", { className: "border-t border-slate-800/30 py-5 px-5 text-center bg-gradient-to-t from-teal-500/5 to-transparent", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "m-0 text-sm text-slate-100", children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Oc\xE9an Barras \u2014 Demo site"
    ] }),
    links && links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex gap-3 justify-center mt-2", children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: l.href, className: "text-slate-100 no-underline text-sm opacity-85 hover:opacity-100 hover:text-sky-500 transition-colors", children: l.label }, l.href)) })
  ] });
}

// src/DemoLayout.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function DemoLayout({ children, headerLinks, footerLinks }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DemoHeader, { navLinks: headerLinks }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("main", { className: "flex-1 py-7 px-5 max-w-6xl mx-auto w-full", children }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DemoFooter, { links: footerLinks })
  ] });
}
var DemoLayout_default = DemoLayout;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DemoFooter,
  DemoHeader,
  DemoLayout,
  Logo
});
