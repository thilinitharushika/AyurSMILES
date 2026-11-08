# 🌿 AyurSMILES

> **A 100% Offline-Capable, Bilingual (Sinhala/Tamil) React Native Mobile Application for Traditional Medicinal Compound & Cheminformatics Analysis.**

---

## 📱 About the Project

**AyurSMILES** is developed as an advanced university software project designed to bridge traditional Ayurvedic botanical knowledge with modern cheminformatics. By indexing active phytochemical constituents alongside molecular descriptors, Lipinski's Rule of Five compliance, and traditional uses, the application empowers researchers, students, and practitioners to analyze plant-derived medicinal compounds entirely offline.

---

## ✨ Key Features

- **🔬 Cheminformatics & Molecular Data:** View detailed physicochemical parameters including molecular weight, hydrogen bond donors/acceptors, and Lipinski's Rule of Five screening.
- **🌐 100% Offline Capability:** Fully functional local JSON database (`compounds.json`) requiring no active internet connection or remote server backend.
- **🔍 Advanced Search & Dynamic Filtering:** Real-time search across English, Sinhala, and Tamil plant sources with horizontal category pills.
- **🌙 Light & Dark Mode:** Persistent theme preferences managed via custom `ThemeContext` and `AsyncStorage`.
- **⭐ Favorites Management:** Bookmark critical compounds for quick reference and study.
- **🛡️ Clean Architecture & Navigation:** Built with Expo, React Navigation (Bottom Tabs & Native Stack), and safe area layout structures.

---

## 🛠️ Tech Stack

- **Framework:** React Native / Expo
- **Navigation:** React Navigation (`@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`)
- **Persistence:** `@react-native-async-storage/async-storage`
- **UI & Icons:** `@expo/vector-icons`, React Native Safe Area Context
- **Data Storage:** Local structured JSON (`compounds.json`)

---

## 📂 Project Structure

```text
AyurSMILES/
│
├── assets/             # App icons, splash screens, and images
├── context/            # React Context (ThemeContext.js for Dark/Light mode)
├── data/               # Local dataset (compounds.json)
├── screens/            # Screen components (HomeScreen, ExploreScreen, SearchScreen, FavoritesScreen, DetailScreen)
├── theme/              # Color palettes and global theme variables (colors.js)
├── App.js              # Root navigation and providers setup
├── app.json            # Expo configuration
└── package.json        # Project dependencies

🚀 Getting Started & Installation
Follow these steps to run the project locally on your machine:

Prerequisites
Node.js installed on your system

Expo Go app installed on your mobile device (or Android Studio / Xcode simulator configured)

Installation Steps
1. Clone the repository:
git clone [https://github.com/your-username/AyurSMILES.git](https://github.com/your-username/AyurSMILES.git)
cd AyurSMILES

2.Install dependencies:
npm install

(Or if using Expo specific installations):
npx expo install @react-navigation/bottom-tabs @react-navigation/native-stack @react-navigation/native @react-native-async-storage/async-storage react-native-safe-area-context @expo/vector-icons

3.Run the application:
npx expo start

4.Launch on Device:
Scan the QR code displayed in your terminal using the Expo Go app (Android) or Camera app (iOS).

##📜 License
This project is developed as part of academic coursework for institutional evaluation. All rights reserved.

---

Create a new file named `README.md` in your project folder, paste this code inside, and you're all set! Let me know what part of the code or presentation preparation you'd like to dive into next! 🚀🌿
