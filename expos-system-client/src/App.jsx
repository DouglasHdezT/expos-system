import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import LogoutPage from "./pages/LogoutPage"
import CriteriaPage from "./pages/CriteriaPage"
import StatsPage from "./pages/StatsPage"

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/logout" element={ <LogoutPage/> }/>
        <Route path="/own" element={ <MainPage own/> }/>
        <Route path="/evaluation" element={ <CriteriaPage /> }/>
        <Route path="/stats" element={ <StatsPage /> }/>
        <Route path="/" element={ <MainPage/> }/>
      </Routes>
    </Router>
  )
}

export default App
