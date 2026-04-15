# MotoCVT Pro Analyzer

A professional-grade CVT (Continuously Variable Transmission) simulation and tuning intelligence system for motorcycles. Built with Next.js, this application provides real-time analysis of CVT performance, physics-based behavior simulation, and intelligent tuning recommendations.

![MotoCVT Pro Analyzer](https://img.shields.io/badge/Next.js-15.0.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-blue) ![Recharts](https://img.shields.io/badge/Recharts-2.12.0-orange)

## 🚀 Features

### Core Functionality
- **Real-Time CVT Simulation**: Physics-based engine that mimics actual motorcycle CVT behavior
- **Live Performance Metrics**: Calculate ELI (Engine Load Index), CER (CVT Efficiency Ratio), AR (Acceleration Response), and Slip Index
- **CVT Health Scoring**: Comprehensive scoring system (40% Efficiency + 30% Slip + 30% Stability)
- **Intelligent Tuning Advisor**: Smart recommendations based on performance analysis

### Advanced Features
- **CVT Profiles**: Choose from Stock, Light Rollers, Heavy Rollers, and Racing Setup configurations
- **Terrain Simulation**: Flat, Uphill, and Downhill modes with realistic load effects
- **Session Tracking**: Record and analyze ride sessions with performance statistics
- **Professional Dashboard**: Engineering-style UI with analog gauges and live graphs
- **Local Data Persistence**: Session history stored in browser localStorage

### Visual Components
- **RPM Tachometer**: Analog-style gauge with real-time needle movement
- **Speed Meter**: Professional speedometer display
- **CVT Score Meter**: Color-coded performance indicator
- **Live Performance Graph**: Real-time RPM vs Speed trend visualization
- **Session History Table**: Track past ride sessions and metrics

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Hooks
- **Data Storage**: Browser localStorage
- **Build Tool**: Next.js CLI

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/motocvt-analyzer.git
   cd motocvt-analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Getting Started
1. **Select CVT Profile**: Choose from Stock, Light Rollers, Heavy Rollers, or Racing Setup
2. **Set Terrain Mode**: Select Flat, Uphill, or Downhill conditions
3. **Start Simulation**: Click "Start Simulation" to begin the physics engine
4. **Adjust Throttle**: Use the slider to control engine throttle (0-100%)

### Advanced Controls
- **Session Recording**: Start a session to track performance metrics
- **Real-Time Analysis**: Monitor live CVT metrics and health scoring
- **Tuning Recommendations**: Follow intelligent suggestions for optimization

### Understanding Metrics
- **ELI (Engine Load Index)**: RPM / (Speed + 1) - Indicates engine loading
- **CER (CVT Efficiency Ratio)**: (Speed / RPM) * 1000 - Measures transmission efficiency
- **AR (Acceleration Response)**: ΔSpeed / ΔRPM - Shows responsiveness
- **Slip Index**: ΔRPM / (ΔSpeed + 1) - Indicates belt slippage
- **CVT Score**: Weighted performance score (0-100)

## 🏗️ Project Structure

```
motocvt-analyzer/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── RpmGauge.tsx        # RPM tachometer
│   │   ├── SpeedMeter.tsx      # Speed gauge
│   │   ├── CvtScoreCard.tsx    # CVT score meter
│   │   ├── ProfileSelector.tsx # Profile and terrain selection
│   │   ├── SimulationControls.tsx # Throttle and session controls
│   │   ├── RecommendationPanel.tsx # Tuning recommendations
│   │   ├── LiveGraph.tsx       # Performance chart
│   │   └── MetricsCard.tsx     # Metric display cards
│   ├── hooks/
│   │   └── useCvtSimulation.ts # Core simulation logic
│   └── lib/
│       └── cvtEngine.ts        # CVT calculations and profiles
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind configuration
├── next.config.ts              # Next.js configuration
└── README.md                   # This file
```

## 🔧 CVT Profiles Explained

### Stock
- Standard CVT configuration
- Balanced performance and efficiency
- Max RPM: 8,000

### Light Rollers
- Faster RPM response
- Reduced top-speed stability
- Good for quick acceleration
- Max RPM: 9,000

### Heavy Rollers
- Slower RPM response
- Better cruising efficiency
- Improved stability at high speeds
- Max RPM: 7,000

### Racing Setup
- Maximum performance
- High slip risk
- Requires experienced tuning
- Max RPM: 10,000

## 📊 Session Tracking

Sessions automatically track:
- Average CVT Score
- Maximum RPM achieved
- Efficiency rating
- Profile and terrain used
- Session duration

Data is stored locally in your browser and persists between visits.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Self-hosted with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Heroicons](https://heroicons.com/)

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Experience professional-grade CVT analysis and tuning intelligence.** 🏍️⚙️
