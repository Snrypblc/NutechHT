import { Route, Router, Routes } from "react-router-dom"
import ListProduct from "./components/ListProduct"
import MyNavbar from "./components/MyNavbar"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
