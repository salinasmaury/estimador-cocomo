
import './App.css';
import ProjectForm from './components/ProjectForm';
import ProjectFormIntermedio from './components/ProjectFormIntermedio.jsx';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/basico" replace />} />
        <Route path="/basico" element={<ProjectForm />} />
        <Route path="/intermedio" element={<ProjectFormIntermedio />} />
      </Routes>
    </Layout>
  );
}

export default App
