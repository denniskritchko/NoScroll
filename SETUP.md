# NoScroll Extension Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Extension**
   ```bash
   npm run build
   ```

3. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the project folder (the one containing `manifest.json`)

4. **Start Using**
   - Click the NoScroll extension icon in your browser toolbar
   - Add tasks with priority levels
   - Get reminded every 30 minutes!

## Development

For development with auto-rebuild:
```bash
npm run dev
```

This will watch for file changes and automatically rebuild the extension.

## What's New in the React Version

### ✨ Modern UI Features
- **Sleek Design**: Clean, minimal interface with subtle gradients
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Priority System**: Visual priority indicators (Low/Medium/High)
- **Responsive Layout**: Optimized for extension popup format

### 🎯 Enhanced Functionality
- **Task Priorities**: Assign Low, Medium, or High priority to tasks
- **Smart Sorting**: Tasks automatically sorted by priority and creation time
- **Completion Tracking**: Mark tasks as complete with visual feedback
- **Filter Options**: Show/hide completed tasks
- **Better Notifications**: Modern notification design with task preview

### 🛠 Technical Improvements
- **TypeScript**: Full type safety and better development experience
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Webpack 5**: Modern build system with optimization
- **Chrome APIs**: Proper TypeScript definitions for Chrome extension APIs

## File Structure

```
NoScroll/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript definitions
│   └── styles.css         # Global styles
├── dist/                  # Built files (generated)
├── images/                # Extension icons
├── sounds/                # Audio files
├── manifest.json          # Extension manifest
└── package.json           # Dependencies and scripts
```

## Troubleshooting

### Extension Not Loading
- Make sure you've run `npm run build` first
- Check that the `dist/` folder contains the built files
- Verify the manifest.json points to the correct files

### Build Errors
- Ensure Node.js 16+ is installed
- Delete `node_modules/` and run `npm install` again
- Check for TypeScript errors in the console

### Chrome Issues
- Try reloading the extension in `chrome://extensions/`
- Check the browser console for any JavaScript errors
- Ensure all permissions are granted

## Migration from Old Version

If you're upgrading from the vanilla JavaScript version:

1. **Backup your tasks**: The new version uses the same storage format, so your tasks should be preserved
2. **Remove old extension**: Uninstall the old version from Chrome
3. **Install new version**: Follow the setup steps above
4. **Verify data**: Your tasks should appear in the new interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run build` to ensure everything compiles
5. Submit a pull request

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure the build completed successfully
4. Try reloading the extension 