/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Cake, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const WISHES = [
  "Пусть твой день будет таким же ярким, как твоя улыбка! ✨",
  "Tug'ilgan kuning bilan, Nara! 🌸",
  "Желаю года, полного приключений и радости! 🌈",
  "Senga baxt va omad tilayman! ✨",
  "Ты — звезда, которая сияет так ярко! 🌟",
  "Har doim shunday go'zal bo'lib qol! 💖",
  "Пусть все твои мечты сбудутся сегодня и всегда! 🎂",
  "Barcha orzularing ushalsin! 🌟",
];

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [currentWish, setCurrentWish] = useState(0);

  const fireConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  const handleOpenGift = () => {
    setIsOpened(true);
    fireConfetti();
  };

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      fireConfetti();
    }
  };

  useEffect(() => {
    if (isOpened) {
      const timer = setInterval(() => {
        setCurrentWish((prev) => (prev + 1) % WISHES.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isOpened]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 opacity-50"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              rotate: 0
            }}
            animate={{ 
              y: [null, "-20%", "120%"],
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {i % 3 === 0 ? <Heart size={24} fill="currentColor" /> : i % 3 === 1 ? <Star size={20} fill="currentColor" /> : <Sparkles size={18} />}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="gift-screen"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8 flex justify-center"
            >
              <div className="relative cursor-pointer group" onClick={handleOpenGift}>
                <div className="absolute -inset-4 bg-pink-300 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <Gift size={120} className="text-pink-500 relative z-10" strokeWidth={1.5} />
              </div>
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-pink-600 mb-4">
              Сюрприз для Нары!
            </h1>
            <p className="text-pink-400 font-medium text-lg">Нажми на подарок, чтобы открыть ✨</p>
          </motion.div>
        ) : (
          <motion.div
            key="celebration-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl flex flex-col items-center z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="text-center mb-12"
            >
              <h2 className="font-script text-6xl md:text-8xl text-pink-500 mb-2 drop-shadow-sm">
                С Днем Рождения, Нара!
              </h2>
              <div className="flex items-center justify-center gap-2 text-pink-400">
                <Sparkles size={20} />
                <span className="font-display font-semibold tracking-widest uppercase text-sm">Tug'ilgan kuning muborak!</span>
                <Sparkles size={20} />
              </div>
            </motion.div>

            {/* Interactive Cake */}
            <div className="relative mb-16 cursor-pointer" onClick={handleBlowCandles}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Cake size={160} className="text-pink-400" strokeWidth={1} />
                
                {/* Candles */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-8 bg-yellow-200 rounded-full relative"
                    >
                      <AnimatePresence>
                        {!candlesBlown && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            exit={{ opacity: 0, scale: 0, y: -10 }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-400 rounded-full blur-[2px]"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-pink-300 text-sm font-medium italic">
                {candlesBlown ? "Желания уже в пути! ✨" : "Загадай желание и задуй свечи!"}
              </p>
            </div>

            {/* Rotating Wishes */}
            <div className="h-24 flex items-center justify-center text-center px-4 w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentWish}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl md:text-2xl text-pink-700 font-medium max-w-md"
                >
                  {WISHES[currentWish]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Footer Buttons */}
            <div className="mt-12 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={fireConfetti}
                className="p-4 bg-white rounded-full shadow-lg text-pink-500 hover:text-pink-600 transition-colors cursor-pointer"
              >
                <Sparkles size={24} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

