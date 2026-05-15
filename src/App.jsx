import { useState, useEffect } from 'react';
import { 
  ShieldCheck, Database, Users, AlertTriangle, Search, Bell, 
  Settings, LayoutDashboard, DatabaseZap, FileText, CheckCircle, 
  Clock, Play, Activity, Server, FileSearch, X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './App.css';

// --- SUB-COMPONENTS FOR DIFFERENT SCREENS ---

function Dashboard({ setActiveTab }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fade-in">
      {/* Top Metrics Grid */}
      <div className="dashboard-grid">
        <div className="glass-card metric-card hover-glow">
          {loading ? <SkeletonMetric /> : (
            <>
              <div className="flex-between mb-1">
                <h3 className="text-muted">Compliance Score</h3>
                <ShieldCheck size={24} color="var(--success)" />
              </div>
              <div className="metric-value text-success">94%</div>
              <div className="text-muted mt-1">+2% since last AI scan</div>
            </>
          )}
        </div>

        <div className="glass-card metric-card hover-glow cursor-pointer" onClick={() => setActiveTab('dsar')}>
          {loading ? <SkeletonMetric /> : (
            <>
              <div className="flex-between mb-1">
                <h3 className="text-muted">Pending DSARs</h3>
                <Users size={24} color="var(--warning)" />
              </div>
              <div className="metric-value">12</div>
              <div className="text-muted mt-1 text-accent">8 ready for review →</div>
            </>
          )}
        </div>

        <div className="glass-card metric-card hover-glow cursor-pointer" onClick={() => setActiveTab('mapping')}>
          {loading ? <SkeletonMetric /> : (
            <>
              <div className="flex-between mb-1">
                <h3 className="text-muted">Unmapped PII</h3>
                <Database size={24} color="var(--danger)" />
              </div>
              <div className="metric-value text-danger">3</div>
              <div className="text-muted mt-1">AI detected new S3 buckets →</div>
            </>
          )}
        </div>
      </div>

      <div className="two-col-grid">
        <div className="glass-card">
          <div className="flex-between mb-2">
            <h2>Recent Activity</h2>
            <Activity size={18} className="text-muted" />
          </div>
          {loading ? <SkeletonList count={4} /> : (
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-icon bg-success"><CheckCircle size={14} color="#fff" /></div>
                <div>
                  <div><strong>AI Agent</strong> completed weekly DPIA scan.</div>
                  <div className="text-muted text-sm">10 mins ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon bg-warning"><Clock size={14} color="#fff" /></div>
                <div>
                  <div><strong>New DSAR received</strong> from alex@example.com. AI gathering initiated.</div>
                  <div className="text-muted text-sm">1 hour ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon bg-danger"><AlertTriangle size={14} color="#fff" /></div>
                <div>
                  <div><strong>Anomaly Detected:</strong> Unencrypted PII in us-east-1 log bucket.</div>
                  <div className="text-muted text-sm">3 hours ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-card">
           <div className="flex-between mb-2">
              <h2>Quick Actions</h2>
              <Play size={18} className="text-muted" />
            </div>
            {loading ? <SkeletonList count={3} /> : (
              <div className="flex-col gap-1">
                <button className="btn btn-block flex-between" onClick={() => setActiveTab('mapping')}>
                  <span className="flex-center"><DatabaseZap size={16}/> Run Deep Infrastructure Scan</span>
                  <span>→</span>
                </button>
                <button className="btn btn-block flex-between" onClick={() => setActiveTab('dsar')}>
                  <span className="flex-center"><Users size={16}/> Process Pending Requests</span>
                  <span>→</span>
                </button>
                <button className="btn btn-block flex-between" onClick={() => setActiveTab('policies')}>
                  <span className="flex-center"><FileText size={16}/> Generate Audit Report</span>
                  <span>→</span>
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

function DSARAutomation() {
  const [requests, setRequests] = useState([
    { id: 1, email: 'john.doe@example.com', type: 'Data Erasure (RTBF)', status: 'gathering', progress: 45 },
    { id: 2, email: 'sarah.m@company.co.uk', type: 'Data Access', status: 'review', progress: 100 },
    { id: 3, email: 'alex.smith@gmail.com', type: 'Rectification', status: 'gathering', progress: 80 },
    { id: 4, email: 'emma.wilson@test.com', type: 'Data Access', status: 'review', progress: 100 },
  ]);

  // Simulate AI progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRequests(current => current.map(req => {
        if (req.status === 'gathering') {
          const newProg = req.progress + Math.floor(Math.random() * 15);
          if (newProg >= 100) return { ...req, progress: 100, status: 'review' };
          return { ...req, progress: newProg };
        }
        return req;
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = (id) => {
    setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'completed' } : r));
  };

  return (
    <div className="fade-in glass-card" style={{ minHeight: '60vh' }}>
      <div className="flex-between mb-2">
        <div>
          <h2>Data Subject Access Requests</h2>
          <p className="text-muted mt-05">AI is automatically tracking and aggregating data across 14 connected systems.</p>
        </div>
        <button className="btn btn-primary flex-center"><Play size={16}/> Sync New Requests</button>
      </div>

      <table className="interactive-table">
        <thead>
          <tr>
            <th>Data Subject</th>
            <th>Request Type</th>
            <th>AI Progress</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id} className={req.status === 'completed' ? 'row-completed' : ''}>
              <td><strong>{req.email}</strong></td>
              <td>{req.type}</td>
              <td style={{ width: '200px' }}>
                <div className="progress-bar-bg">
                  <div className={`progress-bar-fill ${req.status === 'completed' ? 'bg-success' : 'bg-accent'}`} style={{ width: `${req.progress}%` }}></div>
                </div>
                <div className="text-xs text-muted mt-05">{req.progress}% gathered</div>
              </td>
              <td>
                {req.status === 'gathering' && <span className="badge pending pulse-animation">AI Gathering...</span>}
                {req.status === 'review' && <span className="badge review">Ready for Review</span>}
                {req.status === 'completed' && <span className="badge completed">Completed</span>}
              </td>
              <td>
                {req.status === 'gathering' && <button className="btn" disabled>Waiting...</button>}
                {req.status === 'review' && <button className="btn btn-primary" onClick={() => handleApprove(req.id)}>Approve & Send</button>}
                {req.status === 'completed' && <button className="btn">View Receipt</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DataMapping() {
  const [scanning, setScanning] = useState(false);
  const [sources, setSources] = useState([
    { id: 1, name: 'PostgreSQL (Main App)', type: 'Database', risk: 'high', details: '450k records · Passwords, Names' },
    { id: 2, name: 'Stripe API', type: '3rd Party', risk: 'medium', details: 'Billing Info, Addresses' },
    { id: 3, name: 'Zendesk', type: '3rd Party', risk: 'low', details: 'Support Tickets' },
    { id: 4, name: 'us-east-1-app-logs (S3)', type: 'Storage', risk: 'critical', details: 'Unmapped source containing unencrypted emails' },
  ]);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setSources(prev => [
        { id: Date.now(), name: 'HubSpot Marketing', type: '3rd Party', risk: 'medium', details: 'Newly detected marketing sync · Emails, Phones' },
        ...prev
      ]);
      setScanning(false);
    }, 3000);
  };

  const resolveRisk = (id) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, risk: 'low', details: s.details + ' (Resolved)' } : s));
  };

  return (
    <div className="fade-in glass-card" style={{ minHeight: '60vh' }}>
      <div className="flex-between mb-2">
        <div>
          <h2>Infrastructure Data Map</h2>
          <p className="text-muted mt-05">Live topology of PII across your cloud architecture.</p>
        </div>
        <button className="btn btn-primary flex-center" onClick={runScan} disabled={scanning}>
          {scanning ? <span className="pulse-animation">AI Scanning Network...</span> : <><Search size={16}/> Run AI Deep Scan</>}
        </button>
      </div>

      <div className="mapping-grid mt-2">
        {sources.map(source => (
          <div key={source.id} className={`mapping-card risk-${source.risk} fade-in`}>
            <div className="flex-between mb-1">
              <div className="flex-center">
                {source.type === 'Database' ? <Database size={18}/> : source.type === 'Storage' ? <Server size={18}/> : <Activity size={18}/>}
                <strong>{source.name}</strong>
              </div>
              <span className={`badge ${source.risk === 'critical' ? 'bg-danger text-white' : source.risk === 'high' ? 'pending' : source.risk === 'medium' ? 'review' : 'completed'}`}>
                {source.risk.toUpperCase()} RISK
              </span>
            </div>
            <div className="text-muted text-sm mb-1">{source.details}</div>
            {source.risk === 'critical' && (
               <button className="btn btn-sm text-danger border-danger mt-1" onClick={() => resolveRisk(source.id)}>
                 Quarantine & Encrypt
               </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PoliciesDPIA() {
  const [generating, setGenerating] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [documents, setDocuments] = useState([
    { id: 1, title: 'GDPR Privacy Policy v2.1', date: 'May 10, 2026', status: 'Active', content: '# GDPR Privacy Policy v2.1\n\n## 1. Introduction\nThis policy outlines how we collect, use, and protect your personal data in compliance with the General Data Protection Regulation (GDPR).\n\n## 2. Data Collection\nWe collect minimal data required for operations, including email addresses and usage metrics.' },
    { id: 2, title: 'DPIA - User Authentication Service', date: 'Apr 22, 2026', status: 'Approved', content: '# Data Protection Impact Assessment\n**System:** User Authentication Service\n\n## Assessment\nNo high-risk processing detected. All user passwords are hashed and salted using bcrypt. Authentication tokens are encrypted in transit via TLS 1.3.' }
  ]);

  const generateDocument = async () => {
    setGenerating(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      let generatedContent = "⚠️ **API Key not found.**\\n\\nPlease create a `.env` file in the `grc-demo` folder and add:\\n`VITE_GEMINI_API_KEY=your_key_here`";

      if (apiKey) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Write a short, professional Data Protection Impact Assessment (DPIA) for a new HubSpot Marketing Integration. Use Markdown formatting. Include sections for Data Types, Risks, and Mitigation. Keep it under 200 words." }] }]
          })
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
          generatedContent = data.candidates[0].content.parts[0].text;
        }
      }

      setDocuments(prev => [
        { 
          id: Date.now(), 
          title: 'DPIA - New HubSpot Integration', 
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
          status: 'Review Required',
          content: generatedContent
        },
        ...prev
      ]);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to Gemini API.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fade-in glass-card" style={{ minHeight: '60vh', position: 'relative' }}>
      <div className="flex-between mb-2">
        <div>
          <h2>Policies & Automated DPIAs</h2>
          <p className="text-muted mt-05">AI is continuously analyzing your codebase for data risks.</p>
        </div>
        <button className="btn btn-primary flex-center" onClick={generateDocument} disabled={generating}>
          {generating ? <span className="pulse-animation">AI Drafting DPIA...</span> : <><FileText size={16}/> Generate New DPIA</>}
        </button>
      </div>

      <div className="flex-col gap-1 mt-2">
        {documents.map(doc => (
          <div key={doc.id} className="fade-in flex-between" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex-center gap-1">
              <FileSearch size={24} color="var(--accent)" />
              <div>
                <div style={{ fontWeight: 500 }}>{doc.title}</div>
                <div className="text-muted text-sm mt-05">Generated: {doc.date}</div>
              </div>
            </div>
            <div className="flex-center gap-1">
              <span className={`badge ${doc.status === 'Active' || doc.status === 'Approved' ? 'completed' : 'pending'}`}>
                {doc.status}
              </span>
              <button className="btn btn-sm" onClick={() => setViewingDoc(doc)}>View Document</button>
            </div>
          </div>
        ))}
      </div>
      
      {documents.length === 0 && !generating && (
        <div className="flex-center justify-center flex-col mt-2" style={{ opacity: 0.5 }}>
          <FileSearch size={48} />
          <p className="mt-1">No automated policies generated yet.</p>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <div className="modal-overlay fade-in" style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(8px)',
          borderRadius: '16px', padding: '2rem', zIndex: 10,
          display: 'flex', flexDirection: 'column'
        }}>
          <div className="flex-between mb-2">
            <h2>{viewingDoc.title}</h2>
            <button className="icon-btn" onClick={() => setViewingDoc(null)}><X size={24}/></button>
          </div>
          <div className="markdown-content" style={{ overflowY: 'auto', flex: 1, paddingRight: '1rem', lineHeight: '1.6' }}>
            <ReactMarkdown>{viewingDoc.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

// --- UTILS & APP WRAPPER ---

const SkeletonMetric = () => (
  <div className="fade-in">
    <div className="flex-between mb-1">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-circle" style={{ width: '24px', height: '24px' }}></div>
    </div>
    <div className="skeleton" style={{ height: '3rem', width: '50%', marginBottom: '0.5rem' }}></div>
    <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
  </div>
);

const SkeletonList = ({ count }) => (
  <div className="flex-col gap-1 fade-in">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton" style={{ height: '40px', width: '100%', borderRadius: '8px' }}></div>
    ))}
  </div>
);


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'dsar': return <DSARAutomation />;
      case 'mapping': return <DataMapping />;
      case 'policies': return <PoliciesDPIA />;
      case 'settings': return <div className="fade-in glass-card"><h2>Settings</h2><p className="text-muted mt-1">Configure AI agent permissions and integrations.</p></div>;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="flex-center sidebar-header" style={{ marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
          <ShieldCheck size={28} color="var(--accent)" />
          <h2 style={{ fontSize: '1.25rem' }}>TrustAI GRC</h2>
        </div>
        
        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'dsar' ? 'active' : ''}`} onClick={() => setActiveTab('dsar')}>
            <Users size={20} /> DSAR Automation
          </div>
          <div className={`nav-item ${activeTab === 'mapping' ? 'active' : ''}`} onClick={() => setActiveTab('mapping')}>
            <DatabaseZap size={20} /> Data Mapping
          </div>
          <div className={`nav-item ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')}>
            <FileText size={20} /> Policies & DPIA
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Settings
          </div>
        </nav>

        <div className="glass-card mt-auto sidebar-status">
          <div className="flex-center mb-05">
            <Activity size={16} color="var(--success)" className="pulse-animation" />
            <span className="text-muted text-sm">AI Agent Status</span>
          </div>
          <div className="text-sm">
            Status: <span className="text-success">Monitoring...</span><br/>
            Uptime: 99.99%
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="flex-between mb-2">
          <div>
            <h1>{
              activeTab === 'dashboard' ? 'GDPR Compliance Center' : 
              activeTab === 'dsar' ? 'Subject Access Requests' : 
              activeTab === 'mapping' ? 'Data Intelligence Map' : 
              activeTab === 'policies' ? 'Compliance Policies' : 'Settings'
            }</h1>
            <p className="text-muted mt-05">AI-powered governance and risk management</p>
          </div>
          <div className="flex-center gap-1">
            <div className="search-bar flex-center">
              <Search size={16} className="text-muted" />
              <input type="text" placeholder="Search data points..." />
            </div>
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="avatar"></div>
          </div>
        </header>

        {/* Dynamic Content Mount Point */}
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
