# Quizzical 🧠

A responsive React quiz application that tests your knowledge on a wide range of topics using the Open Trivia Database API.

## Features

- **Dynamic Questions**: Fetches 5 random multiple-choice questions from the Open Trivia Database
- **Interactive UI**: Clean, modern interface with smooth transitions
- **Real-time Feedback**: Visual indicators for correct/incorrect answers after checking
- **Score Tracking**: Displays your score out of total questions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Smart loading indicators that appear only when needed

## Demo

[https://quizzical-tanzir.netlify.app/](https://quizzical-tanzir.netlify.app/)

## Screenshots
<img width="600" alt="1" src="https://github.com/user-attachments/assets/dfb3299d-c64c-4568-aaea-4dcad5c377a6" />
<img width="600" alt="2" src="https://github.com/user-attachments/assets/82640c8e-785e-4ac3-bdd0-40ca08b1f530" />
<img width="600" alt="3" src="https://github.com/user-attachments/assets/8b397a28-63e1-4a30-b01c-2936dd3605f5" />

## Main Features:

- **Intro Screen**: Welcome page with quiz introduction
- **Question Interface**: Multiple choice questions with single selection
- **Results Display**: Color-coded feedback showing correct (green) and incorrect (red) answers
- **Play Again**: Start a new quiz with fresh questions

## Tech Stack

- **Frontend**: React 19 with Hooks (useState, useEffect)
- **Styling**: CSS3 with responsive design and media queries
- **API**: Open Trivia Database API
- **Build Tool**: Vite
- **Package Manager**: npm

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TanzirR/Quizzical.git
   cd Quizzical
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app

## Project Structure

```
Quizzical/
├── public/
│   └── vite.svg
├── src/
│   ├── Quiz.jsx              # Individual quiz question component
│   ├── App.jsx               # Main application component
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Key Components

### App.jsx

- Main application state management
- Handles quiz flow and navigation
- Manages API calls and error handling
- Score calculation and results display

### Quiz.jsx

- Individual question rendering
- Answer selection logic
- Visual feedback for results
- Responsive button styling

## API Integration

Uses the [Open Trivia Database API](https://opentdb.com/):

- **Endpoint**: `https://opentdb.com/api.php?amount=5&type=multiple`
- **Response**: 5 multiple choice questions with categories, difficulty, and answers
- **Data Processing**: HTML entity decoding for proper text display

## Responsive Design

- **Desktop**: Full-width layout with horizontal answer options
- **Tablet**: Adjusted spacing and button sizes
- **Mobile**: Vertical answer layout with touch-friendly buttons
- **Breakpoints**: 1024px, 768px, 480px, 320px

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Future Enhancements

- [ ] Category selection
- [ ] Question count customization
- [ ] Dark mode toggle

## Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz questions
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

## Contact

- **GitHub:** [TanzirR](https://github.com/TanzirR)
- **Email:** [tanzir.razzaque@northsouth.edu](mailto:tanzir.razzaque@northsouth.edu)


