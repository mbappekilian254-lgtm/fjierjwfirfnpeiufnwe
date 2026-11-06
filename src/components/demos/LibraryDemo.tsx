import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Bookmark, Star, Sparkles } from 'lucide-react';

interface LibraryDemoProps {
  lang: 'uz' | 'en';
}

interface BookDemo {
  id: string;
  titleUz: string;
  titleEn: string;
  author: string;
  category: string;
  pages: number;
  readPages: number;
  status: 'reading' | 'completed' | 'saved';
  xpReward: number;
}

export const LibraryDemo: React.FC<LibraryDemoProps> = ({ lang }) => {
  const [userXp, setUserXp] = useState(380);
  const [filter, setFilter] = useState<'all' | 'reading' | 'completed' | 'saved'>('all');

  const [books, setBooks] = useState<BookDemo[]>([
    {
      id: '1',
      titleUz: 'O‘tkan Kunlar',
      titleEn: 'Days Gone By (Abdulla Qodiriy)',
      author: 'Abdulla Qodiriy',
      category: 'Klassika',
      pages: 320,
      readPages: 210,
      status: 'reading',
      xpReward: 150,
    },
    {
      id: '2',
      titleUz: 'Yulduzli Tunlar',
      titleEn: 'Starry Nights (Pirimqul Qodirov)',
      author: 'Pirimqul Qodirov',
      category: 'Tarixiy roman',
      pages: 450,
      readPages: 450,
      status: 'completed',
      xpReward: 200,
    },
    {
      id: '3',
      titleUz: 'Kichik Shahzoda',
      titleEn: 'The Little Prince',
      author: 'Antoine de Saint-Exupéry',
      category: 'Falsafiy ertak',
      pages: 110,
      readPages: 0,
      status: 'saved',
      xpReward: 80,
    },
  ]);

  const handleReadMore = (id: string) => {
    setBooks(
      books.map((b) => {
        if (b.id === id) {
          const nextPages = Math.min(b.pages, b.readPages + 30);
          const isNowCompleted = nextPages >= b.pages;
          if (nextPages > b.readPages) {
            setUserXp((prev) => prev + 25);
          }
          return {
            ...b,
            readPages: nextPages,
            status: isNowCompleted ? 'completed' : b.status,
          };
        }
        return b;
      })
    );
  };

  const filteredBooks = books.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const silverTierTarget = 500;
  const progressPercent = Math.min(100, Math.round((userXp / silverTierTarget) * 100));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-mono text-xs font-semibold text-purple-400 tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            E-LIBRARY • GAMIFIED READING SIMULATOR
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'uz'
              ? 'XP mukofotlari va kitob mutolaasi monitoringi konsepsiyasi'
              : 'Interactive gamified digital reading progression concept'}
          </p>
        </div>

        {/* XP & Silver Tier Indicator */}
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Award className="w-4 h-4 text-purple-400" />
          <div className="text-right font-mono text-xs">
            <span className="text-purple-300 font-bold">{userXp} XP</span>
            <span className="text-slate-500 text-[10px] ml-1.5">/ {silverTierTarget} XP (Kumush daraja)</span>
          </div>
        </div>
      </div>

      {/* Tier Progress Bar */}
      <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="flex justify-between items-center text-xs font-mono mb-1.5">
          <span className="text-slate-300 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {lang === 'uz' ? 'O‘quvchi Darajasi: Bronza → Kumush' : 'Reader Tier: Bronze → Silver'}
          </span>
          <span className="text-purple-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Books Showcase */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            {lang === 'uz' ? 'Kitoblar Tokchasi' : 'Bookshelf catalog'}
          </span>
          <div className="flex gap-1 text-[11px] font-mono">
            {(['all', 'reading', 'completed', 'saved'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  filter === st
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'all'
                  ? (lang === 'uz' ? 'Barchasi' : 'All')
                  : st === 'reading'
                  ? (lang === 'uz' ? 'O‘qilmoqda' : 'Reading')
                  : st === 'completed'
                  ? (lang === 'uz' ? 'Tugallangan' : 'Done')
                  : (lang === 'uz' ? 'Saqlangan' : 'Saved')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {filteredBooks.map((book) => {
            const pct = Math.round((book.readPages / book.pages) * 100);
            return (
              <div
                key={book.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {book.category}
                    </span>
                    <span className="text-purple-400">+{book.xpReward} XP</span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-100 line-clamp-1">
                    {lang === 'uz' ? book.titleUz : book.titleEn}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">{book.author}</p>

                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>{book.readPages} / {book.pages} bet</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    {book.status === 'completed'
                      ? (lang === 'uz' ? 'O‘qib bo‘lindi' : 'Completed')
                      : book.status === 'reading'
                      ? (lang === 'uz' ? 'Jarayonda' : 'In Progress')
                      : (lang === 'uz' ? 'Kutubxonada' : 'Saved')}
                  </span>

                  {book.readPages < book.pages && (
                    <button
                      type="button"
                      onClick={() => handleReadMore(book.id)}
                      className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-mono transition-colors"
                    >
                      +{lang === 'uz' ? '30 bet o‘qish' : '30 pages'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
