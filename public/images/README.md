# Public Images Folder

All static image files placed in this directory can be accessed directly from your code via absolute paths.

## Usage

If you place an image named `hero-bg.jpg` in this directory:
- Path: `/public/images/hero-bg.jpg`
- Access it in your React/JSX code or data files as: `/images/hero-bg.jpg`

### Example inside `src/data.ts` or component:
```typescript
const imageUrl = "/images/hero-bg.jpg";
```

This is the recommended approach for dynamic lists, databases, or configuration files (such as `src/data.ts`) where you store image paths as strings.
