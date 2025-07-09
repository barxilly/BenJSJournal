# BenJS Journal

> **Note**: This README was generated with AI assistance to provide comprehensive documentation for the project.

A modern, feature-rich journaling application built with React, TypeScript, and Mantine UI. BenJS Journal is a Progressive Web App (PWA) that offers a clean, intuitive interface for daily journaling with advanced features like speech-to-text, encryption, and mood tracking.

## ✨ Features

- **📝 Daily Journaling**: Create and manage journal entries with title, content, and mood ratings
- **🎤 Speech Recognition**: Voice-to-text functionality for hands-free journaling
- **🌙 Dark/Light Mode**: Responsive theming for comfortable writing in any lighting
- **🔒 Encryption**: Secure your entries with built-in encryption capabilities
- **💾 Local Storage**: All data stored locally in your browser for privacy
- **📱 PWA Support**: Install as a mobile app with offline capabilities
- **⭐ Mood Tracking**: Rate your day with a 5-star system
- **📅 Date Navigation**: Easy browsing through past entries
- **💾 Backup & Export**: Export your journal data in JSON format
- **🔔 Notifications**: Optional notification reminders for journaling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BenJSJournal.git
   cd BenJSJournal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Library**: Mantine Core, Mantine Dates
- **Build Tool**: Vite
- **Styling**: CSS Modules, Mantine Styles
- **Speech Recognition**: react-speech-recognition
- **Icons**: React Icons
- **Date Handling**: Day.js
- **Linting**: ESLint with TypeScript rules

## 📱 PWA Features

BenJS Journal can be installed as a Progressive Web App on your device:

- **Offline Support**: Continue journaling even without internet
- **App-like Experience**: Runs in its own window when installed
- **Mobile Optimized**: Responsive design for all screen sizes
- **Service Worker**: Caches resources for faster loading

## 🔐 Privacy & Security

- **Local Storage**: All journal data is stored locally in your browser
- **No Server**: No data is sent to external servers
- **Encryption**: Built-in encryption for sensitive entries
- **Export Control**: You control your data with export/backup features

## 🗺️ Roadmap

### Completed Features
- ✅ Base layout and UI
- ✅ Core journaling functionality
- ✅ Audio transcriptions
- ✅ Dark theme support
- ✅ Encryption capabilities
- ✅ Backup and export
- ✅ Mood ratings system
- ✅ Notifications
- ✅ PWA functionality

### Planned Features
- ⏳ Markdown support for rich text formatting
- ⏳ Search functionality across entries
- ⏳ Tagging system for organization
- ⏳ File attachments (images, documents)
- ⏳ Auto-locking for security
- ⏳ Custom rating categories
- ⏳ Individual day export as TXT files
- ⏳ Sound/audio attachments

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source. Please check the license file for more details.

## 🙏 Acknowledgments

- [Mantine UI](https://mantine.dev/) for the excellent component library
- [Vite](https://vitejs.dev/) for the fast development experience

---

Made with ❤️ for better journaling experiences