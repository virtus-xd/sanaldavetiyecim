import { useEffect, useState } from 'react';

interface Sparkle {
    id: string;
    style: {
        top: string;
        left: string;
        width: string;
        height: string;
        animationDuration: string;
        animationDelay: string;
    };
}

export default function Sparkles() {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const generateSparkles = () => {
            // Create 15-20 random sparkles
            const count = 18;
            const newSparkles: Sparkle[] = [];

            for (let i = 0; i < count; i++) {
                const size = Math.random() * 3 + 1; // 1px to 4px
                newSparkles.push({
                    id: `sparkle-${i}`,
                    style: {
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        // Random floating vertical animation
                        animationDuration: `${Math.random() * 5 + 3}s`,
                        animationDelay: `${Math.random() * 2}s`,
                    },
                });
            }
            setSparkles(newSparkles);
        };

        generateSparkles();
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    className="absolute bg-gold-200 rounded-full opacity-60 animate-float-twinkle"
                    style={sparkle.style}
                />
            ))}
            <style>{`
        @keyframes float-twinkle {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.5);
            opacity: 0.8;
          }
        }
        .animate-float-twinkle {
          animation-name: float-twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
        </div>
    );
}
