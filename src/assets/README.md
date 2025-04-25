# Assets Directory

This directory is used to store static assets for the application, such as images, icons, and other media files.

## Usage Guidelines

1. Place all medicine images in the `medicines` subdirectory
2. Use relative paths when referencing these assets in your components
3. Keep file sizes optimized for web usage

Example usage in components:

```jsx
import medicineImage from '@/assets/medicines/amoxicillin.jpg';

// Then in your component
<img src={medicineImage} alt="Amoxicillin" />
```

For dynamic assets that are uploaded by users, consider using Supabase Storage instead of storing them directly in this directory.
