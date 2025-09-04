import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/Scroll";
import PageTransition from "./components/PageTransition";

export default function App({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content with top padding */}
      <main className="flex-1 container mx-auto px-4 h-16">
        {children}
      </main>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
      <PageTransition />
    </div>
  );
}
