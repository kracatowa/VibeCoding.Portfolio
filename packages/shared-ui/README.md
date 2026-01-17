# @portfolio/shared-ui

Simple shared UI package providing `DemoLayout`, `DemoHeader`, `DemoFooter`, and `Logo` for demo apps in the monorepo.

Usage:

```tsx
import { DemoLayout } from '@portfolio/shared-ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DemoLayout>{children}</DemoLayout>
      </body>
    </html>
  )
}
```
