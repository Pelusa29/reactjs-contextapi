import { HomePage, PostForm, NotFound, LoginPage, RegisterPage } from "./pages/index"
import { Routes, Route } from 'react-router-dom'
import { PostContainer } from "./context/postContext"

function App() {
  return (
    <div className="bg-neutral-200 min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <PostContainer>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<PostForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PostContainer>
      </div>
    </div>
  )
}

export default App