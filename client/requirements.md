## Packages
zustand | State management for Cart and Language (lighter and faster than Context)
framer-motion | Smooth animations for page transitions and micro-interactions

## Notes
- Using Zustand with `persist` middleware to save Cart and Language preference in localStorage.
- The app automatically sets `document.documentElement.dir = 'rtl'` or `'ltr'` based on the selected language to leverage Tailwind's logical properties (`ms-`, `pe-`, `text-start`, etc.).
- Using Unsplash images for product placeholders as requested.
