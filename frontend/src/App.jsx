import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route>{/* User Layout */}</Route>
                <Route>{/* Admin Lauout */}</Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
