import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';

interface SchoolSolutionsDemoProps {
  lang: 'uz' | 'en';
}

interface IssueItem {
  id: string;
  category: string;
  title: string;
  status: 'submitted' | 'reviewing' | 'resolved';
  votes: number;
  time: string;
}

export const SchoolSolutionsDemo: React.FC<SchoolSolutionsDemoProps> = ({ lang }) => {
  const [selectedCat, setSelectedCat] = useState('Dars jadvali');
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const [issues, setIssues] = useState<IssueItem[]>([
    {
      id: '1',
      category: 'Dars jadvali',
      title: lang === 'uz' ? '3-qavat dars jadvalida xona almashinuvi to‘g‘rilandi' : 'Room allocation update on 3rd floor',
      status: 'resolved',
      votes: 14,
      time: '2 kun oldin',
    },
    {
      id: '2',
      category: 'Qulayliklar',
      title: lang === 'uz' ? 'Informatika xonasida qo‘shimcha elektr uzaytirgichlar kerak' : 'Additional power strips needed in Computer Lab',
      status: 'reviewing',
      votes: 28,
      time: 'Bugun, 09:20',
    },
    {
      id: '3',
      category: 'Davomat',
      title: lang === 'uz' ? 'Elektron turniket kartasini tezkor qayta tiklash' : 'Rapid turnstile access badge re-issuance',
      status: 'submitted',
      votes: 9,
      time: 'Bugun, 11:45',
    },
  ]);

  const categories = [
    { id: 'schedule', labelUz: 'Dars jadvali', labelEn: 'Schedule & Bells' },
    { id: 'attendance', labelUz: 'Davomat', labelEn: 'Attendance' },
    { id: 'facility', labelUz: 'Qulayliklar', labelEn: 'Facilities & Labs' },
    { id: 'hygiene', labelUz: 'Sanitariya', labelEn: 'Hygiene & Cleanliness' },
    { id: 'ai-idea', labelUz: 'AI & Innovatsiya', labelEn: 'AI & Innovation' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newIssue: IssueItem = {
      id: Date.now().toString(),
      category: selectedCat,
      title: titleInput,
      status: 'submitted',
      votes: 1,
      time: lang === 'uz' ? 'Hozirgina' : 'Just now',
    };

    setIssues([newIssue, ...issues]);
    setTitleInput('');
    setDescInput('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const handleVote = (id: string) => {
    setIssues(issues.map((it) => (it.id === id ? { ...it, votes: it.votes + 1 } : it)));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h4 className="font-mono text-xs font-semibold text-emerald-400 tracking-wider">
            SCHOOL SOLUTIONS • PROTOTYPE DASHBOARD
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'uz'
              ? 'Ta’lim muassasalaridagi muammolarni tizimli ko‘rib chiqish platformasi (Demo)'
              : 'Interactive campus issue reporting & suggestion flow (Simulation)'}
          </p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Concept Simulation
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* Submission Form */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <h5 className="text-xs font-mono text-slate-300 font-semibold mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {lang === 'uz' ? 'Yangi murojaat yoki taklif yuborish' : 'Submit a Suggestion or Report'}
          </h5>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                {lang === 'uz' ? 'Kategoriya tanlang:' : 'Select Category:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => {
                  const label = lang === 'uz' ? c.labelUz : c.labelEn;
                  const isSel = selectedCat === label;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCat(label)}
                      className={`text-xs px-2.5 py-1 rounded-md font-mono transition-colors ${
                        isSel
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                {lang === 'uz' ? 'Qisqa sarlavha:' : 'Short Title:'}
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder={lang === 'uz' ? 'Masalan: Kutubxonadagi internet tezligini oshirish...' : 'E.g., Increase internet bandwidth in library...'}
                className="w-full text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                {lang === 'uz' ? 'Batafsil izoh (ixtiyoriy):' : 'Detailed Explanation (optional):'}
              </label>
              <textarea
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                rows={2}
                placeholder={lang === 'uz' ? 'Muammo joyi, xona raqami va taklifingiz...' : 'Location, room number, or suggested fix...'}
                className="w-full text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Arizani yuborish (Demo)' : 'Submit Proposal (Demo)'}</span>
            </button>

            {submittedMessage && (
              <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {lang === 'uz'
                    ? 'Murojaatingiz demo ro‘yxatiga qo‘shildi! (Haqiqiy serverga yuborilmaydi)'
                    : 'Submitted to demo feed! (No external server pinged in demo mode)'}
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Live List Feed */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h5 className="text-xs font-mono text-slate-300 font-semibold mb-3 flex items-center justify-between">
              <span>{lang === 'uz' ? 'Mavjud murojaatlar oqimi' : 'Live Campus Feed'}</span>
              <span className="text-slate-500 text-[10px]">{issues.length} {lang === 'uz' ? 'ta murojaat' : 'items'}</span>
            </h5>

            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {issues.map((it) => (
                <div
                  key={it.id}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {it.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {it.time}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-200">{it.title}</div>
                    <div>
                      {it.status === 'resolved' && (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {lang === 'uz' ? 'Yechim topildi' : 'Resolved'}
                        </span>
                      )}
                      {it.status === 'reviewing' && (
                        <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lang === 'uz' ? 'Ko‘rib chiqilmoqda' : 'Under Review'}
                        </span>
                      )}
                      {it.status === 'submitted' && (
                        <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {lang === 'uz' ? 'Qabul qilindi' : 'Submitted'}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleVote(it.id)}
                    className="shrink-0 flex flex-col items-center px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                  >
                    <span className="text-[10px] text-emerald-400">▲</span>
                    <span>{it.votes}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500">
            {lang === 'uz'
              ? 'Eslatma: Bu loyiha haqiqiy maktab ma’lumotlar bazasiga ulanmagan; arxitektura va foydalanuvchi tajribasi namunasi.'
              : 'Notice: This UI sandbox demonstrates the architectural concept and user experience workflow without storing real student records.'}
          </div>
        </div>
      </div>
    </div>
  );
};
