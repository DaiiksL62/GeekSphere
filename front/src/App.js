// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home/Home';
import JeuVideo from '../src/components/Pages/Jeu video/JeuVideo';
import Series from '../src/components/Pages/Series/Series';
import Techo from './components/Pages/Techologies/Techo';
import Films from './components/Pages/Films/Films';
import NotFound from './components/Pages/NotFound/NotFound';
import Inscription from './components/Inscription/Inscription';
import Connexion from './components/Pages/Connexion/Connexion';
import Profil from './components/Pages/Profil/Profil';
import { AuthProvider } from './AuthContext'; // Importer AuthProvider
import ModifierMonProfil from './components/Pages/Profil/Modification/Modification'
import SupprimerMonProfil from './components/Pages/Profil/Supprimer/Supprimer';

const App = () => {
  return (
    <AuthProvider> {/* Enveloppez votre application avec AuthProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jeu-video" element={<JeuVideo />} />
          <Route path="/series" element={<Series />} />
          <Route path="/technologies" element={<Techo />} />
          <Route path="/films" element={<Films />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profil/modification/:id" element={<ModifierMonProfil />} />
          <Route path="/profil/supprimer/:id" element={<SupprimerMonProfil />} />

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;



