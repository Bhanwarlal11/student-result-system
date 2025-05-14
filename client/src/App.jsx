import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Overview from "./pages/Overvew.jsx";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import NotFound from "./components/NotFound";
import StudentDetails from "./pages/StudentDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
