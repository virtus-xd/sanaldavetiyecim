export default function CornerDecorations() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Top Left Corner */}
            <svg
                className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 text-gold-500/30 opacity-60"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 0C50 0 50 0 50 50C50 25 75 0 100 0"
                    stroke="currentColor"
                    strokeWidth="1"
                />
                <path
                    d="M0 10C40 10 40 10 40 50"
                    stroke="currentColor"
                    strokeWidth="0.5"
                />
                <path
                    d="M10 0C10 30 15 35 45 40"
                    stroke="currentColor"
                    strokeWidth="0.5"
                />
                <circle cx="5" cy="5" r="2" fill="currentColor" className="animate-pulse" />
                <circle cx="45" cy="40" r="1.5" fill="currentColor" />
                <path
                    d="M20 20Q35 35 50 20T80 20"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                />
            </svg>

            {/* Top Right Corner (Mirrored) */}
            <svg
                className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 text-gold-500/30 opacity-60 transform scale-x-[-1]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 0C50 0 50 0 50 50C50 25 75 0 100 0"
                    stroke="currentColor"
                    strokeWidth="1"
                />
                <path
                    d="M0 10C40 10 40 10 40 50"
                    stroke="currentColor"
                    strokeWidth="0.5"
                />
                <path
                    d="M10 0C10 30 15 35 45 40"
                    stroke="currentColor"
                    strokeWidth="0.5"
                />
                <circle cx="5" cy="5" r="2" fill="currentColor" className="animate-pulse" />
            </svg>

            {/* Bottom Left Corner (Mirrored Y) */}
            <svg
                className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 text-gold-500/20 opacity-50 transform scale-y-[-1]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 0C50 0 50 0 50 50C50 25 75 0 100 0"
                    stroke="currentColor"
                    strokeWidth="1"
                />
                <path
                    d="M10 0C10 30 15 35 45 40"
                    stroke="currentColor"
                    strokeWidth="0.5"
                />
            </svg>

            {/* Bottom Right Corner (Mirrored XY) */}
            <svg
                className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 text-gold-500/20 opacity-50 transform scale-[-1]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 0C50 0 50 0 50 50C50 25 75 0 100 0"
                    stroke="currentColor"
                    strokeWidth="1"
                />
                <path
                    d="M10 0C10 30 15 35 45 40"
                    stroke="currentColor"
                    strokeWidth="0.5"
                />
                <circle cx="5" cy="5" r="2" fill="currentColor" />
            </svg>
        </div>
    );
}
