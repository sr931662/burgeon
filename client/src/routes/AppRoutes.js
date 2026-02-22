import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ServicesPage from '../pages/ServicesPage';
import ProjectsPage from '../pages/ProjectsPage';
import ProductsPage from '../pages/ProductsPage';
import PaintShopPage from '../pages/Services/PaintShopPage'
import AboutPage from '../pages/AboutPage';
import BakeOvenPage from '../pages/Services/BakeOvenPage'; // Add this import
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Factory from '../pages/Factory';
import CEDPlantPage from '../pages/Services/CEDPlantPage';
import CompactPaintBoothPage from '../pages/Services/CompactPaintBoothPage';
import ComponentWashingPage from '../pages/Services/ComponentWashingPage';
import DryOffOvenPage from '../pages/Services/DryOffOvenPage';
import EDEquipmentPage from '../pages/Services/EDEquipmentPage';
import LiquidPaintBoothPage from '../pages/Services/LiquidPaintBoothPage';
import PowderCoatingBoothPage from '../pages/Services/PowderCoatingBoothPage';
import PowderCoatingPlantPage from '../pages/Services/PowderCoatingPlantPage';
import PretreatmentSystemPage from '../pages/Services/PretreatmentSystemPage';
import Turnover from '../pages/Turnover';
import UtilityPipingPage from '../pages/Services/UtilityPipingPage';
import WetDryBoothPage from '../pages/Services/WetDryBoothPage';

const Services = () => <ServicesPage />;
const Projects = () => <ProjectsPage />;
const Products = () => <ProductsPage />;
const About = () => <AboutPage />;
// const Contact = () => <ContactPage />;
const NotFound = () => <div>404 - Page Not Found</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} /> {/* Add this route */}
      <Route path="/about" element={<About />} />
      <Route path="/services/bake-oven" element={<BakeOvenPage />} />
      <Route path="/services/paint-shop" element={<PaintShopPage />} />
      <Route path="/services/ced-plant" element={<CEDPlantPage />} /> 
      <Route path="/services/compact-paint-booth" element={<CompactPaintBoothPage />} /> 
      <Route path="/services/component-washing-machine" element={<ComponentWashingPage />} /> 
      <Route path="/services/dry-off-oven" element={<DryOffOvenPage />} /> 
      <Route path="/services/ed-equipment" element={<EDEquipmentPage />} /> 
      <Route path="/services/liquid-paint-booth" element={<LiquidPaintBoothPage />} /> 
      <Route path="/services/powder-coating-booth" element={<PowderCoatingBoothPage />} /> 
      <Route path="/services/powder-coating-plant" element={<PowderCoatingPlantPage />} /> 
      <Route path="/services/pretreatment-system" element={<PretreatmentSystemPage />} /> 
      <Route path="/services/utility-process-piping" element={<UtilityPipingPage />} /> 
      <Route path="/services/wet-dry-booth" element={<WetDryBoothPage />} /> 
      <Route path="/factory" element={<Factory />} />
      <Route path="/turnover" element={<Turnover />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;