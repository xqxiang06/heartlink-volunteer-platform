# 🫶 HeartLink - Volunteer Matching Platform

A modern web platform that connects elders who need help with compassionate volunteers in their local community.

![HeartLink Banner](https://img.shields.io/badge/Status-Active-success) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Overview

HeartLink bridges the gap between seniors requiring assistance and volunteers eager to help. Our platform makes it easy for elders to request help with daily tasks while enabling volunteers to find meaningful opportunities to give back to their community.

## ✨ Features

### For Elders 🙋
- **Easy Request Creation**: Post help requests with just a few clicks
- **Multiple Categories**: Choose from grocery shopping, health check-ups, transportation, tech assistance, companionship, and more
- **Real-time Updates**: Track the status of your requests
- **Location-based Matching**: Connect with volunteers in your area

### For Volunteers ❤️
- **Browse Opportunities**: View all available help requests on an interactive map
- **Accept Tasks**: Choose tasks that match your availability and skills
- **Achievement System**: Earn badges and track your volunteer hours
- **Gamified Experience**: 🏆 Unlock achievements as you help more people
  - 🌟 First Timer (1 hour)
  - 🤝 Helpful Hand (5 hours)
  - 🦸 Community Hero (10 hours)
  - 👑 Living Legend (20 hours)
  - ⏰ Time Champion (50 hours)

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: Google Maps API
- **State Management**: React Hooks (useState, useEffect)

## 🚀 Live Demo

[View Live Demo](#) *(Add your Vercel URL here after deployment)*

## 📸 Screenshots

### Login Screen
*Beautiful gradient interface welcoming users*

### Elder Dashboard
*Simple interface for posting help requests*

### Volunteer Dashboard
*Interactive map showing nearby requests and achievement tracking*

## 💻 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Maps API key

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/xqxiang06/heartlink-volunteer-platform.git
cd heartlink-volunteer-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Add your Google Maps API key**
   - Open `src/App.tsx`
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 🌍 How It Works

1. **Sign Up**: Users register as either an Elder or a Volunteer
2. **Elders Post Requests**: Select a category, add details, time, and location
3. **Volunteers Browse**: View requests on an interactive map
4. **Accept & Complete**: Volunteers accept tasks and mark them complete
5. **Earn Rewards**: Volunteers earn badges and track their impact

## 🎯 Use Cases

- **Grocery Shopping**: Volunteers help elders with weekly shopping
- **Medical Appointments**: Provide transportation to health check-ups
- **Technology Support**: Help with smartphone setup and troubleshooting
- **Social Companionship**: Spend quality time chatting and keeping elders company
- **General Assistance**: Any other needs elders might have

## 🏗️ Project Structure
```
heartlink-volunteer-platform/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Entry point
│   └── styles.css       # Global styles
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Add user authentication (Firebase/Auth0)
- [ ] Implement real-time notifications
- [ ] Add messaging between elders and volunteers
- [ ] Create mobile app version
- [ ] Add rating and review system
- [ ] Integrate calendar scheduling
- [ ] Multi-language support

## 🐛 Known Issues

- Map markers are currently demonstration overlays
- No persistent data storage (currently in-memory only)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Created for [Your Hackathon Name Here]

- **Developer**: xqxiang06
- **Project Type**: Hackathon Project
- **Date**: November 2024

## 🙏 Acknowledgments

- Inspired by the need to bridge generational gaps in communities
- Built with ❤️ for elders and volunteers everywhere
- Thanks to all contributors and supporters

## 📧 Contact

- Project Link: [https://github.com/xqxiang06/heartlink-volunteer-platform](https://github.com/xqxiang06/heartlink-volunteer-platform)

---
