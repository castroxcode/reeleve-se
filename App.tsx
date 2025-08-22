
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import { Logo } from './components/Logo';
import { CalendarIcon, ClockIcon, LocationIcon } from './components/icons';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center font-sans bg-brand-bg text-brand-text p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: "url('https://picsum.photos/seed/yoga/1920/1080')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 via-brand-bg to-brand-bg/80"></div>

      <main className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-block px-4 py-1 text-sm font-medium tracking-widest text-brand-primary bg-brand-accent/50 rounded-full mb-4">
            MOVIMENTO
          </div>
          <h1 className="font-serif text-6xl md:text-8xl text-brand-primary">Reeleve-se</h1>
          <p className="mt-2 text-lg text-brand-text/80">
            Um momento para nutrir corpo, mente e espírito
          </p>
        </header>

        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16">
          <div className="w-full max-w-md lg:w-1/2 lg:max-w-none">
             <RegistrationForm />
          </div>

          <div className="text-center lg:text-left w-full max-w-md lg:w-1/2 lg:max-w-none lg:pt-16">
            <div className="space-y-3 text-brand-text/90 text-lg mb-8">
              <p>✓ Coffee break saudável</p>
              <p>✓ Brindes e sorteios exclusivos</p>
              <p>✓ Aula funcional com personal</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-brand-text">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-brand-primary" />
                    <span>14 de Setembro</span>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-brand-primary" />
                    <span>06h30 da Manhã</span>
                </div>
                <div className="flex items-center gap-2">
                    <LocationIcon className="w-5 h-5 text-brand-primary" />
                    <span>Beira Rio</span>
                </div>
            </div>
          </div>
        </div>

        <footer className="mt-12">
            <Logo className="h-12 text-brand-accent" />
        </footer>
      </main>
    </div>
  );
};

export default App;
