import React, { useState, useEffect } from 'react';
import { Award, Calculator, HelpCircle, GraduationCap, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Grade } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';

interface GradesViewProps {
  grades: Grade[];
  onUpdateGrades: (updated: Grade[]) => void;
}

export default function GradesView({ grades, onUpdateGrades }: GradesViewProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempFinal, setTempFinal] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Predictor state
  const [predictGrades, setPredictGrades] = useState<{ [code: string]: number }>(
    grades.reduce((acc, g) => {
      acc[g.subjectCode] = g.final || g.midterm || 2.0;
      return acc;
    }, {} as { [code: string]: number })
  );

  // Sync predictions if grades update
  useEffect(() => {
    setPredictGrades(prev => {
      const next = { ...prev };
      grades.forEach(g => {
        if (g.final !== null) {
          next[g.subjectCode] = g.final;
        } else if (g.midterm !== null && next[g.subjectCode] === undefined) {
          next[g.subjectCode] = g.midterm;
        }
      });
      return next;
    });
  }, [grades]);

  // PH GPA calculation (Weighted GWA): (Grade * Units) / Total Units
  const calculateGWA = (usePredictions: boolean = false) => {
    let totalPoints = 0;
    let totalUnitsCount = 0;

    grades.forEach((g) => {
      const actualGrade = usePredictions ? predictGrades[g.subjectCode] : (g.final || g.midterm);
      if (actualGrade) {
        totalPoints += actualGrade * g.units;
        totalUnitsCount += g.units;
      }
    });

    return totalUnitsCount > 0 ? (totalPoints / totalUnitsCount).toFixed(2) : 'N/A';
  };

  const getPHRemarks = (gwaStr: string) => {
    const val = parseFloat(gwaStr);
    if (isNaN(val)) return 'N/A';
    if (val <= 1.25) return 'Presidents Lister / Summa Cum Laude Status';
    if (val <= 1.5) return 'Deans Lister / Magna Cum Laude Status';
    if (val <= 1.75) return 'Deans Lister / Cum Laude Status';
    if (val <= 2.25) return 'Very Good Standing';
    if (val <= 2.75) return 'Good Academic Standing';
    if (val <= 3.0) return 'Passing Academic Standing';
    return 'Conditional Academic Warning';
  };

  const handlePredictorChange = (code: string, val: number) => {
    setPredictGrades(prev => ({
      ...prev,
      [code]: val
    }));
  };

  const handleUpdateFinalGrade = (code: string, newFinal: number) => {
    const nextGrades = grades.map(g => {
      if (g.subjectCode === code) {
        return { ...g, final: newFinal };
      }
      return g;
    });
    onUpdateGrades(nextGrades);
    setEditingIndex(null);
  };

  // Target honors average calculators
  const calculateRequiredGrade = (targetGWA: number) => {
    let completedPoints = 0;
    let completedUnits = 0;
    let ongoingUnits = 0;

    grades.forEach((g) => {
      if (g.final !== null) {
        completedPoints += g.final * g.units;
        completedUnits += g.units;
      } else {
        ongoingUnits += g.units;
      }
    });

    const totalUnits = completedUnits + ongoingUnits;
    if (ongoingUnits === 0) return 'All Completed';

    const requiredPoints = (targetGWA * totalUnits) - completedPoints;
    const requiredGrade = requiredPoints / ongoingUnits;

    if (requiredGrade < 1.0) {
      return 'Unattainable';
    } else if (requiredGrade > 3.0) {
      return '3.00 (Passing)';
    } else {
      return requiredGrade.toFixed(2);
    }
  };

  // Build sequential data of GPA trend
  const chartData = grades.map((g, index) => {
    // Actual GWA up to this subject
    let actualPointsSum = 0;
    let actualUnitsSum = 0;
    let hasActual = false;

    // Predicted GWA up to this subject
    let predPointsSum = 0;
    let predUnitsSum = 0;

    for (let i = 0; i <= index; i++) {
      const sub = grades[i];
      // Actual calculation
      const actualGrade = sub.final || sub.midterm;
      if (actualGrade !== null) {
        actualPointsSum += actualGrade * sub.units;
        actualUnitsSum += sub.units;
        hasActual = true;
      }

      // Predicted calculation
      const predGrade = predictGrades[sub.subjectCode] !== undefined ? predictGrades[sub.subjectCode] : (sub.final || sub.midterm || 2.0);
      predPointsSum += predGrade * sub.units;
      predUnitsSum += sub.units;
    }

    const subActualGrade = g.final || g.midterm;

    return {
      name: g.subjectCode,
      subjectCode: g.subjectCode,
      subjectName: g.subjectName,
      units: g.units,
      "Actual GWA": hasActual && actualUnitsSum > 0 ? parseFloat((actualPointsSum / actualUnitsSum).toFixed(2)) : null,
      "Predicted GWA": predUnitsSum > 0 ? parseFloat((predPointsSum / predUnitsSum).toFixed(2)) : null,
      "Subject Grade": subActualGrade !== null ? subActualGrade : null,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#084C35] text-white p-4 rounded-xl border border-emerald-600 shadow-xl space-y-2 max-w-xs text-xs">
          <div className="border-b border-emerald-600/50 pb-1.5 font-bold flex justify-between gap-4">
            <span className="font-mono text-emerald-100">{data.subjectCode}</span>
            <span className="text-[10px] text-emerald-200">{data.units} Units</span>
          </div>
          <p className="text-[10px] text-emerald-100 font-light truncate leading-normal" title={data.subjectName}>
            {data.subjectName}
          </p>
          <div className="space-y-1 pt-1.5 font-mono text-left">
            <div className="flex justify-between gap-6">
              <span className="text-emerald-200">Subject Grade:</span>
              <strong className="text-white">
                {data["Subject Grade"] !== null ? data["Subject Grade"].toFixed(2) : "In Progress"}
              </strong>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-emerald-200">Cumulative GWA:</span>
              <strong className="text-emerald-300">
                {data["Actual GWA"] !== null ? data["Actual GWA"].toFixed(2) : "N/A"}
              </strong>
            </div>
            <div className="flex justify-between gap-6 border-t border-emerald-600/40 pt-1 mt-1">
              <span className="text-emerald-100 font-sans">Predicted GWA:</span>
              <strong className="text-white">
                {data["Predicted GWA"] !== null ? data["Predicted GWA"].toFixed(2) : "N/A"}
              </strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Current real Academic standings banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Actual Calculated Cumulative GWA */}
        <div className="bg-gradient-to-tr from-[#084C35] to-[#0E7A57] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between space-y-4">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4">
            <GraduationCap className="w-48 h-48" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest block">Current Semester GWA (Weighted)</span>
            <h4 className="text-4xl font-black text-white font-mono">{calculateGWA(false)}</h4>
          </div>

          <div className="space-y-1.5 border-t border-white/10 pt-3">
            <span className="text-[11px] font-mono text-emerald-200 font-bold uppercase block">Classification Standings</span>
            <p className="text-xs text-slate-100 font-medium">
              {getPHRemarks(calculateGWA(false))}
            </p>
          </div>
        </div>

        {/* PH grading scales table explanation */}
        <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 text-left rounded-2xl p-5 shadow-sm space-y-3.5 md:col-span-2">
          <div className="border-b pb-2 flex justify-between dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Philippine Grading Scale Indicator</span>
            <span className="text-[10px] font-mono text-[#0E7A57] dark:text-emerald-400 font-bold uppercase">1.0 is highest, 3.0 passing</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[10px] font-bold text-slate-500 font-mono">
            <div className="p-2 border rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-850 dark:text-emerald-250 border-emerald-100 dark:border-emerald-900/30">
              <span className="block text-xs font-black">1.00 - 1.25</span>
              <span>Outstanding</span>
            </div>
            <div className="p-2 border rounded-lg bg-teal-50 dark:bg-teal-950/30 text-teal-850 dark:text-teal-250 border-teal-100 dark:border-teal-900/30">
              <span className="block text-xs font-black">1.50 - 1.75</span>
              <span>Very Good</span>
            </div>
            <div className="p-2 border rounded-lg bg-emerald-50/40 dark:bg-gray-800/40 text-emerald-900 dark:text-emerald-100 border-emerald-100/45 dark:border-slate-700">
              <span className="block text-xs font-black">2.00 - 2.25</span>
              <span>Good</span>
            </div>
            <div className="p-2 border rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-805 dark:text-amber-250 border-amber-100 dark:border-amber-900/30">
              <span className="block text-xs font-black">2.50 - 3.00</span>
              <span>Satisfactory</span>
            </div>
            <div className="p-2 border rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-805 dark:text-rose-250 border-rose-100 dark:border-rose-900/30">
              <span className="block text-xs font-black">5.00</span>
              <span>Failed</span>
            </div>
          </div>
        </div>

      </div>

      {/* GPA Trend & Honors Calculator Row */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white dark:bg-slate-900/90 border border-emerald-50 dark:border-slate-800/60 rounded-3xl p-6 shadow-sm space-y-6"
      >
        <div className="border-b dark:border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="font-extrabold text-[#084C35] dark:text-emerald-400 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Cumulative GWA Trend & Honors Plan
            </h3>
            <p className="text-xs text-slate-400 mt-1">Sequential weight progression analysis matching actual grades and future predictor marks</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#0E7A57] shrink-0"></span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Actual GWA Progression</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981] border border-dashed border-[#10B981] shrink-0"></span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-medium">Predictive Path</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* THE CHART PANEL (Left Column - lg:col-span-8) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-8 min-h-[300px] flex flex-col justify-between"
          >
            {mounted ? (
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="opacity-60 dark:opacity-5" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      domain={[3.0, 1.0]} 
                      reversed={true} 
                      tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      ticks={[1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0]}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Line 
                      name="Actual Cumulative GWA"
                      type="monotone" 
                      dataKey="Actual GWA" 
                      stroke="#0E7A57" 
                      strokeWidth={3} 
                      isAnimationActive={true}
                      animationDuration={1300}
                      animationEasing="ease-out"
                      animationBegin={180}
                      dot={{ r: 5, strokeWidth: 2, fill: '#0E7A57', stroke: '#ffffff' }}
                      activeDot={{ r: 8, strokeWidth: 3, fill: '#084C35', stroke: '#ffffff' }} 
                      connectNulls={true}
                    />
                    <Line 
                      name="Predicted Cumulative GWA"
                      type="monotone" 
                      dataKey="Predicted GWA" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      animationBegin={350}
                      dot={{ r: 4, strokeWidth: 1.5, fill: '#10B981', stroke: '#ffffff' }}
                      activeDot={{ r: 7, strokeWidth: 2.5, fill: '#059669', stroke: '#ffffff' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 w-full flex items-center justify-center text-slate-400 text-xs">
                Analyzing GPA matrices...
              </div>
            )}
            
            <p className="text-[10px] text-slate-400 leading-relaxed italic text-center select-none pt-2">
              ⚠️ GWA scale is inverted (1.00 at the top) to align with standard Philippine Academic Rankings where lower scores represent higher grades.
            </p>
          </motion.div>

          {/* THE HONORS TARGET CARD (Right Column - lg:col-span-4) */}
          <motion.div 
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/40 border dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4 text-left"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-[#084C35] dark:text-emerald-400 uppercase tracking-widest block">
                Honors Target Calculator
              </span>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed dark:text-slate-400">
                Based on your completed courses (13 units total), here is the average grade you need in your remaining 11 ongoing credits (NCM 113 & NUPR 301) to achieve these semestral rankings:
              </p>
            </div>

            <div className="space-y-3">
              {/* President List Card */}
              <div className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800/80 rounded-xl flex items-center justify-between gap-2 shadow-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block leading-none">President's Lister</span>
                  <span className="text-[9px] text-slate-400 block font-light leading-none">Overall GWA ≤ 1.25</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black font-mono text-[#084C35] dark:text-emerald-400 block">
                    {calculateRequiredGrade(1.25)}
                  </span>
                  <span className="text-[8px] text-slate-400 block font-mono leading-none">Required Avg</span>
                </div>
              </div>

              {/* Dean List Magna Card */}
              <div className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800/80 rounded-xl flex items-center justify-between gap-2 shadow-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block leading-none">Dean's Lister (1.50)</span>
                  <span className="text-[9px] text-slate-400 block font-light leading-none">Overall GWA ≤ 1.50</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400 block">
                    {calculateRequiredGrade(1.50)}
                  </span>
                  <span className="text-[8px] text-slate-400 block font-mono leading-none">Required Avg</span>
                </div>
              </div>

              {/* Dean List Cum Laude Card */}
              <div className="p-3 bg-white dark:bg-slate-900 border dark:border-slate-800/80 rounded-xl flex items-center justify-between gap-2 shadow-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block leading-none">Dean's Lister (1.75)</span>
                  <span className="text-[9px] text-slate-400 block font-light leading-none">Overall GWA ≤ 1.75</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black font-mono text-teal-600 dark:text-teal-400 block">
                    {calculateRequiredGrade(1.75)}
                  </span>
                  <span className="text-[8px] text-slate-400 block font-mono leading-none">Required Avg</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 italic leading-snug dark:text-slate-500">
              * Recalibrates instantly upon entering official finals or adjusting sliders.
            </div>
          </motion.div>

        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* GRADES TABLE DIRECTORY (Left Panel) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-emerald-50 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b dark:border-slate-800 pb-4">
            <h3 className="font-extrabold text-[#084C35] dark:text-emerald-400 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-5 h-5 text-emerald-600" /> Active Semestral Grades Sheet
            </h3>
            <p className="text-xs text-slate-400 mt-1">Direct registrars records for BSN Junior rotations</p>
          </div>

          {/* Table list */}
          <div className="space-y-4">
            {grades.map((grade, idx) => (
              <div key={idx} className="p-4 border dark:border-slate-800 hover:border-emerald-100 dark:hover:border-slate-700 rounded-xl space-y-3.5 bg-slate-50/20 dark:bg-slate-900/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-1 text-left">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-[#0E7A57] dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-100 dark:border-emerald-900/25 animate-fadeIn">
                      {grade.subjectCode}
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-800 dark:text-slate-205 leading-snug truncate max-w-sm" title={grade.subjectName}>
                      {grade.subjectName}
                    </h5>
                  </div>

                  <div className="flex gap-4 font-mono text-center text-xs pt-1 sm:pt-0">
                    <div className="p-1.5 rounded-lg border dark:border-slate-800 bg-white dark:bg-slate-900 min-w-[64px]">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase leading-none mb-1 font-sans">Midterm</span>
                      <strong className="text-slate-800 dark:text-slate-100">{grade.midterm ? grade.midterm.toFixed(2) : 'N/A'}</strong>
                    </div>

                    <div className="p-1.5 rounded-lg border dark:border-slate-800 bg-white dark:bg-slate-900 min-w-[64px] relative">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase leading-none mb-1 font-sans">Final</span>
                      {editingIndex === idx ? (
                        <select
                          value={tempFinal || 2.0}
                          onChange={(e) => setTempFinal(Number(e.target.value))}
                          onBlur={() => handleUpdateFinalGrade(grade.subjectCode, tempFinal || 2.0)}
                          className="w-full text-[11px] font-bold bg-slate-50 dark:bg-slate-800 p-0.5 border dark:border-slate-700 text-[#084C35] dark:text-emerald-400 focus:outline-none"
                          autoFocus
                        >
                          {[1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 5.0].map((v) => (
                            <option key={v} value={v}>{v.toFixed(2)}</option>
                          ))}
                        </select>
                      ) : (
                        <div 
                          onClick={() => {
                            setEditingIndex(idx);
                            setTempFinal(grade.final || 2.0);
                          }}
                          className="cursor-pointer text-[#0E7A57] dark:text-emerald-400 font-bold underline hover:text-[#10B981]"
                          title="Click to input final grade"
                        >
                          {grade.final ? grade.final.toFixed(2) : '+ Input'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t dark:border-slate-800/60 flex justify-between items-center text-[11px] text-slate-400 font-semibold">
                  <span>Instructor: {grade.instructor.split(',')[0]}</span>
                  <span className={`inline-flex items-center gap-1 ${
                    (grade.final || grade.midterm || 5.0) <= 3.0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'
                  }`}>
                    {(grade.final || grade.midterm || 5.0) <= 3.0 ? '✓ Creditable units' : '● Conditional fail'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE GWA PREDICTION DIAL (Right Panel) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-emerald-50 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b dark:border-slate-800 pb-4">
            <h3 className="font-extrabold text-[#084C35] dark:text-emerald-400 text-sm uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Calculator className="w-5 h-5 text-[#0E7A57]" /> Interactive Honors Predictor
            </h3>
            <p className="text-xs text-slate-400 mt-1">Estimate weights and check theoretical lister credits</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-805 dark:text-emerald-250 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase block text-emerald-600 dark:text-emerald-400">Simulated Target GWA</span>
                <span className="text-2xl font-black font-mono mt-1 block">{calculateGWA(true)}</span>
              </div>
              <Sparkles className="w-6 h-6 text-emerald-500 animate-spin-slow shrink-0" />
            </div>

            <div className="space-y-3.5 pt-2 max-h-72 overflow-y-auto pr-1">
              {grades.map((grade, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-semibold py-1">
                  <div className="text-left min-w-0 flex-1 pr-2">
                    <span className="font-mono text-slate-400 block">{grade.subjectCode}</span>
                    <span className="text-slate-800 dark:text-slate-205 font-bold block truncate" title={grade.subjectName}>{grade.subjectName}</span>
                  </div>

                  <select
                    value={predictGrades[grade.subjectCode]}
                    onChange={(e) => handlePredictorChange(grade.subjectCode, Number(e.target.value))}
                    className="p-1.5 border border-slate-200 dark:border-slate-850 rounded bg-white dark:bg-slate-900 text-xs font-mono font-bold dark:text-slate-100"
                  >
                    {[1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0].map((v) => (
                      <option key={v} value={v}>{v.toFixed(2)}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t dark:border-slate-800 text-[11px] text-slate-400 italic">
              *Adjusting estimators above computes weighted averages inside client-state instantly.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
