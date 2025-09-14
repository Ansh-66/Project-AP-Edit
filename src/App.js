import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsGrid from './components/StatsGrid';
import ChartsSection from './components/ChartsSection';
import CrimeStatsTable from './components/CrimeStatsTable';
import TabsSection from './components/TabsSection';
import ChatbotButton from './components/ChatbotButton';
import Footer from './components/Footer';
import { stats } from './data';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-max pt-6">
        <Hero />
        <StatsGrid items={stats} />
        <ChartsSection />
        <CrimeStatsTable />
        <TabsSection />
        <ChatbotButton />
        <Footer />
      </main>
    </div>
  );
}
