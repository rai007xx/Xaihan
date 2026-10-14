import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { BrotherShowcase } from './components/BrotherShowcase';
import { FamilyConnectionSection } from './components/FamilyConnectionSection';
import { FriendsSection } from './components/FriendsSection';
import { AboutSection } from './components/AboutSection';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';
import { BackgroundScene } from './scenes/BackgroundScene';
import { BROTHERS_DATA } from './data/brothers';
import { useSound } from './hooks/useSound';

function App() {
  const [loading, setLoading] = useState(true);
  const { soundEnabled, setSoundEnabled, playHover, playClick } = useSound();

  return (
    <div className="relative w-full min-h-screen bg-[#07090e]">
      {loading && <LoadingScreen onLoaded={() => setLoading(false)} />}

      {!loading && (
        <>
          <BackgroundScene />

          <Navbar
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            playHover={playHover}
            playClick={playClick}
          />

          <main className="relative z-10">
            <HeroSection />

            {/* ORDER: Rabiul (Eldest), Ibrahim (Middle), Raihan (Youngest) */}
            {[BROTHERS_DATA[2], BROTHERS_DATA[1], BROTHERS_DATA[0]].map((brother, index) => (
              <BrotherShowcase
                key={brother.number}
                brother={brother}
                index={index}
                playHover={playHover}
                playClick={playClick}
              />
            ))}

            <FamilyConnectionSection />
            <FriendsSection playHover={playHover} playClick={playClick} />
            <AboutSection />
            <Footer />
          </main>

          <ScrollToTop playClick={playClick} />
        </>
      )}
    </div>
  );
}

export default App;
