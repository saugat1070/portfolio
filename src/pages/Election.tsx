import { useEffect, useRef, useState } from 'react';

type Candidate = {
  id: number;
  name: string;
  party: string;
  partyImageUrl: string;
  candidateImage?: string;
  partyImageFallbackUrl: string;
  votes: number;
  barClass: string;
  accentClass: string;
};

const candidates: Candidate[] = [
  {
    id: 3,
    name: 'Ganesh Poudel',
    party: 'घण्टी',
    candidateImage: '/image-3.png',
    partyImageUrl: 'https://rspnepal.org/_next/static/media/white-logo.6762f420.svg',
    partyImageFallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg',
    votes: 34700,
    barClass: 'bg-blue-500',
    accentClass: 'text-blue-300'
  },
  {
    id: 2,
    name: 'BainBahadur Adhikari Chetri',
    party: 'एमाले',
    candidateImage: '/image-2.png',
    partyImageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_CPN_(UML).svg',
    partyImageFallbackUrl: 'https://logo.clearbit.com/cpnuml.org',
    votes: 63200,
    barClass: 'bg-red-500',
    accentClass: 'text-red-300'
  },
  {
    id: 1,
    name: 'Tilak Ranabhat',
    party: 'नेपाली कांग्रेस',
    candidateImage: '/image-1.png',
    partyImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Nepali_Congress_flag_edited.svg',
    partyImageFallbackUrl: 'https://nepalicongress.org/logo.svg',
    votes: 82900,
    barClass: 'bg-green-500',
    accentClass: 'text-green-300'
  },
  {
    id: 4,
    name: 'Othes',
    party: 'अन्य',
    partyImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
    partyImageFallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg',
    votes: 8000,
    barClass: 'bg-amber-500',
    accentClass: 'text-amber-300'
  }
];

function Election() {
  const [countProgress, setCountProgress] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isWinnerDialogClosed, setIsWinnerDialogClosed] = useState(false);
  const animationRef = useRef<number | null>(null);

  const displayedVotes = candidates.map((candidate) => Math.floor(candidate.votes * countProgress));
  const displayedTotalVotes = displayedVotes.reduce((sum, votes) => sum + votes, 0);
  const maxVotes = Math.max(...candidates.map((candidate) => candidate.votes));
  const winnerIndex = displayedVotes.reduce((bestIndex, votes, index) => {
    if (votes > displayedVotes[bestIndex]) {
      return index;
    }

    return bestIndex;
  }, 0);
  const winnerCandidate = candidates[winnerIndex];
  const winnerVotes = displayedVotes[winnerIndex] ?? 0;
  const winnerVoteShare = displayedTotalVotes === 0 ? '0.0' : ((winnerVotes / displayedTotalVotes) * 100).toFixed(1);
  const runnerUpVotes = [...displayedVotes].sort((a, b) => b - a)[1] ?? 0;
  const winnerLead = Math.max(0, winnerVotes - runnerUpVotes);
  const showWinner = hasStarted && !isCounting && countProgress >= 1 && !isWinnerDialogClosed;

  const getBarHeight = (votes: number) => {
    const ratio = (votes / maxVotes) * 100;
    return `${ratio.toFixed(2)}%`;
  };

  const getAnimatedBarHeight = (votes: number) => {
    const ratio = (votes / maxVotes) * countProgress * 100;
    return `${ratio.toFixed(2)}%`;
  };

  const startCount = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    setHasStarted(true);
    setIsCounting(true);
    setIsWinnerDialogClosed(false);
    setCountProgress(0);

    const duration = 6000;
    const startTime = performance.now();

    const easeInOutCubic = (progress: number) => {
      if (progress < 0.5) {
        return 4 * progress * progress * progress;
      }

      return 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      setCountProgress(easedProgress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCountProgress(1);
        setIsCounting(false);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white">
      <style>
        {`@keyframes nepalFlagWave {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            25% { transform: rotate(2deg) translateY(-1px); }
            75% { transform: rotate(-2deg) translateY(1px); }
          }

          @keyframes winnerDialogPop {
            0% { transform: translateY(12px) scale(0.96); opacity: 0; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }

          @keyframes winnerConfetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
          }`}
      </style>
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl">
          <div className="mb-2 flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg"
              alt="Nepal Flag"
              className="h-20 w-auto"
              style={{ animation: 'nepalFlagWave 2.6s ease-in-out infinite', transformOrigin: 'left center' }}
            />
          </div>
          <p className="text-center text-xs font-semibold tracking-[0.3em] text-slate-300">LIVE BATTLE</p>
          <h1 className="mt-2 text-center text-3xl font-bold">NEPAL ELECTION 2026</h1>
          <p className="mt-1 text-center text-sm font-medium text-cyan-300">Kasi-1</p>

          <div className="mt-4 rounded-xl bg-slate-950/70 p-3">
            <p className="text-center text-xs text-slate-300">Total Votes Counted</p>
            <p className="text-center text-2xl font-bold">{displayedTotalVotes.toLocaleString()}</p>
          </div>

          <div className="relative mt-5 h-[430px] rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="pointer-events-none absolute inset-x-4 bottom-24 top-4">
              {[1, 0.75, 0.5, 0.25].map((ratio) => (
                <div
                  key={ratio}
                  className="absolute left-0 right-0 border-t border-dashed border-slate-700/60"
                  style={{ bottom: `${ratio * 100}%` }}
                >
                  <span className="absolute -top-3 left-0 bg-slate-950 px-1 text-[10px] text-slate-400">
                    {Math.round(maxVotes * ratio).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative z-10 flex h-full items-end gap-3 pb-24 pt-8">
              {candidates.map((candidate, index) => {
                const currentVotes = displayedVotes[index] ?? 0;
                const currentBarHeight = getAnimatedBarHeight(candidate.votes);
                const targetBarHeight = getBarHeight(candidate.votes);

                return (
                  <div key={candidate.id} className="flex h-full flex-1 flex-col">
                    <div className="relative flex-1">
                      <div
                        className="absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
                        style={{ bottom: currentBarHeight }}
                      >
                        <p className="whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-center text-[11px] font-semibold text-slate-200">
                          {candidate.name}
                        </p>
                        <div className="mt-1 h-14 w-14 overflow-hidden rounded-full border-2 border-slate-700 bg-slate-900">
                          <img
                            src={candidate.candidateImage ?? candidate.partyImageUrl}
                            alt={`${candidate.name} photo`}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = candidate.partyImageFallbackUrl;
                            }}
                          />
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0" style={{ height: targetBarHeight }}>
                        <div
                          className={`absolute inset-0 origin-bottom rounded-t-md ${candidate.barClass} will-change-transform`}
                          style={{ transform: `scaleY(${countProgress})` }}
                        >
                          <div className="absolute inset-0 bg-black/10" />
                        </div>
                        <p className="absolute bottom-2 left-0 right-0 text-center text-xl font-bold tracking-wide text-white">
                          {currentVotes.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20">
              <div className="flex items-end gap-3">
                {candidates.map((candidate) => (
                  <div key={`${candidate.id}-flag`} className="flex flex-1 justify-center">
                    <div className="h-14 w-14 overflow-hidden rounded-md border border-slate-700 bg-slate-900/90 p-1">
                      <img
                        src={candidate.partyImageUrl}
                        alt={`${candidate.party} flag`}
                        className="h-full w-full object-contain"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = candidate.partyImageFallbackUrl;
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showWinner && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            >
              <div
                className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-emerald-500/40 bg-slate-900 p-5 shadow-2xl"
                style={{ animation: 'winnerDialogPop 0.35s ease-out' }}
              >
                <button
                  type="button"
                  onClick={() => setIsWinnerDialogClosed(true)}
                  className="absolute right-3 top-3 z-20 rounded-md border border-slate-600 bg-slate-800/90 px-2 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  Cancel
                </button>

                <div className="pointer-events-none absolute inset-0">
                  {Array.from({ length: 14 }).map((_, index) => (
                    <span
                      key={index}
                      className="absolute h-2 w-2 rounded-full"
                      style={{
                        left: `${6 + index * 7}%`,
                        bottom: '-6px',
                        backgroundColor: ['#22c55e', '#ef4444', '#3b82f6', '#f59e0b'][index % 4],
                        animation: `winnerConfetti 1.8s ease-out ${index * 0.06}s infinite`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <p className="text-center text-xs font-semibold tracking-[0.2em] text-emerald-300">🏆 WINNER</p>

                  <div className="mt-4 rounded-xl border border-slate-700/70 bg-slate-800/50 p-3">
                    <p className="text-center text-lg font-bold text-white">{winnerCandidate.name}</p>
                    <p className="mt-1 text-center text-sm text-emerald-200">{winnerCandidate.party}</p>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="mb-1 text-center text-[11px] text-slate-300">Candidate</p>
                        <div className="h-32 w-full overflow-hidden rounded-lg border border-emerald-400/50 bg-slate-950/80 p-1">
                          <img
                            src={winnerCandidate.candidateImage ?? winnerCandidate.partyImageUrl}
                            alt={`${winnerCandidate.name} winner`}
                            className="h-full w-full object-contain"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = winnerCandidate.partyImageFallbackUrl;
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="mb-1 text-center text-[11px] text-slate-300">Party</p>
                        <div className="h-32 w-full overflow-hidden rounded-lg border border-emerald-400/50 bg-slate-950/80 p-1">
                          <img
                            src={winnerCandidate.partyImageUrl}
                            alt={`${winnerCandidate.party} party`}
                            className="h-full w-full object-contain"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = winnerCandidate.partyImageFallbackUrl;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-emerald-500/30 bg-slate-950/70 p-3 text-sm text-slate-100">
                    <p>Votes: <span className="font-semibold text-emerald-300">{winnerVotes.toLocaleString()}</span></p>
                    <p>Share: <span className="font-semibold text-emerald-300">{winnerVoteShare}%</span></p>
                    <p>Lead: <span className="font-semibold text-emerald-300">{winnerLead.toLocaleString()}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}


          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={startCount}
              disabled={isCounting}
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCounting ? 'Counting...' : hasStarted ? 'Restart Count' : 'Start Count'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Election;