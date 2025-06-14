import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ReportIssuePage from "./pages/ReportIssuePage"
import IssuesMapPage from "./pages/IssuesMapPage"
import LeaderboardPage from "./pages/LeaderboardPage"
import AdminPanelPage from "./pages/AdminPanelPage"
import EcoNewsPage from "./pages/EcoNewsPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportIssuePage />} />
            <Route path="/map" element={<IssuesMapPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/news" element={<EcoNewsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
