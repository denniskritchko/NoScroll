# NoScroll

A Chrome extension that reminds users to complete their highest priority tasks on a todo list to prevent doomscrolling.

## Features

- **Modern UI**: Built with React and Tailwind CSS for a sleek, minimal design
- **Dark Mode Support**: Automatically follows your system's light/dark theme preference
- **Priority System**: Tasks can be assigned Low, Medium, or High priority
- **Smart Reminders**: Customizable notifications every 15 minutes to 2 hours
- **Task Management**: Add, complete, delete, and reorder tasks by priority
- **Persistent Storage**: Tasks sync across browser sessions
- **Responsive Design**: Beautiful animations and hover effects
- **Settings Panel**: Customize notification intervals and toggle notifications on/off

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Webpack 5
- **Chrome APIs**: Storage Sync API, Alarms API, System Display API
- **Styling**: Custom animations, gradients, and modern design patterns
- **Theme**: Automatic light/dark mode detection

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd NoScroll
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the project folder

### Development Commands

- `npm run build` - Build for production
- `npm run dev` - Build in development mode with watch
- `npm start` - Start development server

## Usage

1. **Adding Tasks**: Click the extension icon and add tasks with priority levels
2. **Managing Tasks**: 
   - Click the checkbox to mark tasks as complete
   - Hover over tasks to see priority controls and delete button
   - Use the "Show/Hide Completed" toggle to filter tasks
3. **Customizing Reminders**: 
   - Click the settings gear icon in the header
   - Choose from 15 minutes to 2 hours for notification intervals
   - Toggle notifications on/off
4. **Clearing**: Use the "Clear All" button to remove all tasks

## Dark Mode

The extension automatically detects and follows your system's theme preference:

- **Light Mode**: Clean, bright interface with subtle shadows
- **Dark Mode**: Easy on the eyes with dark backgrounds and proper contrast
- **Automatic Switching**: Changes instantly when you switch your system theme
- **Consistent Experience**: All components adapt seamlessly to both themes

### Dark Mode Features:
- Dark backgrounds with proper contrast ratios
- Adjusted text colors for readability
- Modified borders and shadows
- Updated hover states and focus rings
- Consistent color scheme across all components

## Settings

### Notification Intervals
- **15 minutes** - For high-frequency reminders
- **30 minutes** - Default setting (recommended)
- **45 minutes** - Moderate frequency
- **1 hour** - Less frequent reminders
- **1.5 hours** - Extended intervals
- **2 hours** - Minimal reminders

### Notification Toggle
- Enable/disable all notifications
- When disabled, no popup reminders will appear
- Settings are saved and persist across browser sessions

## Project Structure

```
src/
├── components/          # React components
│   ├── Popup.tsx       # Main popup interface
│   ├── TaskForm.tsx    # Task creation form
│   ├── TaskItem.tsx    # Individual task display
│   ├── Notification.tsx # Reminder notification
│   └── Settings.tsx    # Settings modal
├── utils/              # Utility functions
│   └── storage.ts      # Chrome storage operations
├── types/              # TypeScript type definitions
├── styles.css          # Global styles and Tailwind imports
├── popup.tsx           # Popup entry point
├── notification.tsx    # Notification entry point
└── background.ts       # Background script
```

## Design Features

- **Gradient Backgrounds**: Subtle gradients for visual depth
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Priority Color Coding**: Green (Low), Yellow (Medium), Red (High)
- **Modern Typography**: Inter font family for clean readability
- **Responsive Layout**: Optimized for the extension popup format
- **Accessibility**: Focus states and keyboard navigation support
- **Settings Modal**: Clean, intuitive settings interface
- **Theme Adaptation**: Seamless light/dark mode switching

## Future Enhancements

- [ ] Task categories/tags
- [ ] Task due dates
- [ ] Progress tracking
- [ ] Task templates
- [ ] Export/import functionality
- [ ] Custom notification sounds
- [ ] Do not disturb hours
- [ ] Manual theme toggle (override system preference)

## Sample

![NoScroll Extension](https://github.com/user-attachments/assets/dfb9b9a7-49a7-45dc-89a8-0ed8c85f9aa4)

## License

MIT License

