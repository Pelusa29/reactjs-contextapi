import {
  HomePage,
  PostForm,
  NotFound,
  LoginPage,
  RegisterPage,
  PageBooks,
  BookList

} from "./pages/index"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { PostContainer } from "./context/postContext"
import { AuthProvider } from './context/AuthContext'

import { ProtectedRoute } from './ProtectedRoute'

import { Header } from "./components/Header/Header"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <div className="bg-indigo-500 w-full h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/mybooks" element={<PageBooks />} />
              <Route path="/book" element={<BookList />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  )
}

export default App