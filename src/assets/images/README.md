# Src Assets Images Folder

Images in this directory can be imported as ES Modules in your React components. Vite will automatically bundle, hash, and optimize these images during the build phase.

## Usage

If you place an image named `avatar.png` in this directory:
- Path: `/src/assets/images/avatar.png`

### Example inside a React component:
```tsx
import avatarImg from '../assets/images/avatar.png';

function MyComponent() {
  return <img src={avatarImg} alt="User Avatar" />;
}
```

This is the recommended approach for static UI assets (such as logos, design accents, or static illustrations) that are hardcoded directly into your components.
