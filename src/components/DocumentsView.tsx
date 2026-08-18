import React, { useState } from 'react';
import { FileText, Download, Upload, CheckCircle2, AlertCircle, Clock, Inbox, Smile } from 'lucide-react';
import { DocumentRecord } from '../types';

interface DocumentsViewProps {
  documents: DocumentRecord[];
  onUploadDocument: (newDoc: Omit<DocumentRecord, 'id' | 'uploadedAt'>) => void;
}

export default function DocumentsView({ documents, onUploadDocument }: DocumentsViewProps) {
  const [docType, setDocType] = useState<'Medical' | 'Duty' | 'Clearance'>('Medical');
  const [customName, setCustomName] = useState('');
  const [desc, setDesc] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [simulatedFileName, setSimulatedFileName] = useState('');
  const [success, setSuccess] = useState('');

  const templateDownloads = [
    { name: 'Institutional Physical Medical Diagnostic Form.pdf', size: '1.4 MB', type: 'Medical' },
    { name: 'Hepatitis B Titer Dose Record Card.pdf', size: '480 KB', type: 'Medical' },
    { name: 'Clinical Ward Duty Shift Case Logbook.docx', size: '2.1 MB', type: 'Duty' },
    { name: 'Pre-Rotational Hospital Clearance Template.pdf', size: '920 KB', type: 'Clearance' }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSimulatedFileName(file.name);
      if (!customName) {
        setCustomName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSimulatedFileName(file.name);
      if (!customName) {
        setCustomName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName) return;

    onUploadDocument({
      name: customName,
      type: docType,
      description: desc || `Simulated submission file ${simulatedFileName || 'upload.pdf'}`,
      status: 'Pending Review',
      downloadUrl: '#'
    });

    setSuccess(`Successfully uploaded "${customName}"! Our Clinical Coordinators are reviewing your details.`);
    setCustomName('');
    setDesc('');
    setSimulatedFileName('');
    
    setTimeout(() => {
      setSuccess('');
    }, 4500);
  };

  const triggerDownloadSimulation = (filename: string) => {
    alert(`[Simulation] Downloading template asset: "${filename}" to local machine.`);
  };

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Alert banner summarizing requirements */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-605 text-slate-650 leading-relaxed font-light">
          <strong className="text-[#084C35] font-extrabold uppercase block mb-1">Clearance Protocol Directive</strong>
          All pre-duty hospital clearances must be scanned and certified in PDF standard format before being submitted. The maximum individual file payload is 20MB. Review clinical rotation timelines to avoid delays in badge approvals.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DOWNLOAD OFFICIAL TEMPLATES (Left Columns) */}
        <div className="lg:col-span-5 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-extrabold text-[#084C35] text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-4.5 h-4.5 text-[#0E7A57]" /> Campus Form Templates
            </h3>
            <p className="text-xs text-slate-400 mt-1">Get authorized blanks to carry into hospitals</p>
          </div>

          <div className="space-y-4">
            {templateDownloads.map((tpl, i) => (
              <div 
                key={i} 
                className="p-3.5 border hover:border-emerald-500 rounded-xl flex items-center justify-between transition-all bg-slate-50/20"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate" title={tpl.name}>{tpl.name}</h5>
                    <span className="text-[10px] text-slate-405 text-slate-400 font-bold uppercase mt-0.5 block">{tpl.type} File • {tpl.size}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerDownloadSimulation(tpl.name)}
                  className="p-2 rounded-lg bg-white border text-slate-500 hover:text-[#0E7A57] hover:border-[#0E7A57] shadow-xs cursor-pointer transition-colors"
                  title="Download File"
                >
                  <Download className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}
          </div>

          {/* DRAG AND DROP PORTAL LOADER (Interactive uplinks simulator) */}
          <form onSubmit={handleUploadSubmit} className="pt-4 border-t border-slate-100 space-y-4">
            <div className="border-b pb-1.5">
              <h4 className="font-extrabold text-slate-750 text-slate-700 text-xs uppercase tracking-wide">Upload Clearance Credentials</h4>
            </div>

            {success && (
              <div className="text-xs p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {success}
              </div>
            )}

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative overflow-hidden
                ${isDragging 
                  ? 'border-emerald-555 border-emerald-400 bg-emerald-50/30' 
                  : simulatedFileName 
                  ? 'border-emerald-300 bg-emerald-50/10' 
                  : 'border-slate-200 hover:bg-slate-50/50'
                }
              `}
            >
              <input
                type="file"
                id="file-element"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Inbox className={`w-8 h-8 mx-auto mb-2 ${simulatedFileName ? 'text-emerald-500' : 'text-slate-400'}`} />
              <p className="text-xs font-bold text-slate-700">
                {simulatedFileName ? `Captured File: ${simulatedFileName}` : 'Drag & Drop forms here, or click to browse'}
              </p>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mt-1">PDF, DOC, DOCX up to 20MB</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Requirement Category</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full text-xs font-bold p-2.5 border rounded-lg bg-white"
                >
                  <option value="Medical">Medical Records</option>
                  <option value="Duty">Duty Logs</option>
                  <option value="Clearance">Clearances Forms</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Custom Document Label</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g., Clearance Scan"
                  className="w-full text-xs font-medium p-2.5 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-extrabold text-white bg-[#084C35] hover:bg-[#0E7A57] transition-all cursor-pointer uppercase shadow text-center"
            >
              Simulate Credentials Upload
            </button>
          </form>

        </div>

        {/* SUBMITTED REQUIREMENTS LISTER LEDGER (Right Columns) */}
        <div className="lg:col-span-7 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-extrabold text-[#084C35] text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Inbox className="w-5 h-5 text-emerald-500" /> Uploaded Clearance Ledgers
            </h3>
            <p className="text-xs text-slate-400 mt-1">Track physical reviews of credentials</p>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="p-4 border hover:border-slate-200 rounded-xl bg-slate-50/25 flex flex-col justify-between space-y-3"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-left space-y-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-[#0E7A57] border border-emerald-100 font-mono font-bold uppercase">
                      {doc.type} Form
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-800 leading-snug">{doc.name}</h5>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">{doc.description}</p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                    doc.status === 'Approved' 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                      : doc.status === 'Pending Review' 
                      ? 'bg-emerald-50 text-[#0E7A57] border border-emerald-150' 
                      : doc.status === 'Rejected' 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                {doc.feedback && (
                  <div className="bg-[#F4F9F6]/60 p-2.5 rounded-lg text-[11px] text-slate-650 leading-relaxed border-l-2 border-[#084C35] font-medium italic">
                    Coordinators Note: {doc.feedback}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100/50 flex justify-between text-[10px] font-mono text-slate-400 font-semibold uppercase">
                  <span>LOG-CODE: CSJR-FILE-{doc.id.toUpperCase()}</span>
                  <span>UPLOAD STAMPED: {doc.uploadedAt || 'NOT YET SUBMITTED'}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
