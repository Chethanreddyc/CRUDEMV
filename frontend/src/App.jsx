import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarSimple from './components/Navbar';
import StudentList from './components/StudentList';
import Faculty from './components/Faculty';

function App() {
  return (
    <Router>
      <div>
        <NavbarSimple />
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/faculty" element={<Faculty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;