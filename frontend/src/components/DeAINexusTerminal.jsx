import { useState, useMemo, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { subnets, TAO_PRICE } from '../data/subnetData';

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DeAINexusTerminal = () => {
    const [activeTab, setActiveTab] = useState('dash');
    const [theme, setTheme] = useState('dark');
    const [sortBy, setSortBy] = useState('score');
    const [minScore, setMinScore] = useState(0);
    const [expandedSubnet, setExpandedSubnet] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

    // Calculator states
    const [fvInputs, setFvInputs] = useState({ opex: 4200000, emit: 1842, price: 15.58, taoP: 191 });
    const [dcfInputs, setDcfInputs] = useState({ dcfE: 246, dcfT: 191, dcfG: 5, dcfD: 25, dcfM: 340000, dcfY: 5 });
    const [emInputs, setEmInputs] = useState({ emSh: 3.42, emTp: 191, emNt: 3600, emMn: 41 });
    const [csInputs, setCsInputs] = useState({ csRc: 40, csSp: 50, csPf: 70, csEc: 65, csDv: 75, csDc: 50 });

    // Main calculation function
    const calc = (s) => {
        const de = (s.em / 100) * 3600 * 0.41;
        const fv = de > 0 ? (s.opex / 365) / de : 0;
        const sp = fv > 0 ? ((s.p - fv) / fv) * 100 : 0;
        const rc = s.opex > 0 ? (s.rev / s.opex) * 100 : 0;

        const fs = Math.max(0, Math.min(100, 50 - (sp / 4) + (rc / 2)));
        const ps = Math.min(100, (s.val / 72) * 50 + (s.min / 256) * 30 + (s.test / 100) * 20);
        const dt = (s.em / 100) * 3600;
        const eys = s.mc > 0 ? (dt * 365 * TAO_PRICE) / (s.mc * 1e6) : 0;
        const es = Math.min(100, eys * 40 + (s.apy / 60) * 30 + (rc / 100) * 30);
        const ds = Math.min(100, (s.com / 200) * 60 + (s.dev / 12) * 40);
        const cs = Math.min(100, (s.val / 72) * 100);
        const score = Math.round(0.20 * fs + 0.25 * ps + 0.30 * es + 0.20 * ds + 0.05 * cs);

        let risk = 'High';
        if (score >= 70 && s.val >= 50) risk = 'Very Low';
        else if (score >= 55 && s.val >= 30) risk = 'Low';
        else if (score >= 40) risk = 'Medium';

        let rec = 'Monitor';
        if (score >= 70 && eys >= 0.8 && sp < 80) rec = 'Strong Buy';
        else if (score >= 55 && eys >= 0.5) rec = 'Buy';
        else if (score >= 40) rec = 'Hold';

        const badge = sp < 0 ? 'Below FV' : sp < 15 ? 'Near FV' : sp < 60 ? 'Above FV' : 'Overbought';

        return { ...s, fv: fv.toFixed(2), sp: sp.toFixed(0), rc: rc.toFixed(0), dt: dt.toFixed(1), score, risk, rec, badge };
    };

    const data = useMemo(() => subnets.map(calc), []);

    // Filtering and sorting
    const filtered = useMemo(() => {
        let result = data.filter(s => {
            const categoryMatch = selectedCategory === 'All' || s.cat === selectedCategory;
            const searchMatch = s.n.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.cat.toLowerCase().includes(searchQuery.toLowerCase());
            const scoreMatch = s.score >= minScore;
            return categoryMatch && searchMatch && scoreMatch;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'score') return b.score - a.score;
            if (sortBy === 'fv') return parseFloat(a.fv) - parseFloat(b.fv);
            if (sortBy === 'sp') return parseFloat(a.sp) - parseFloat(b.sp);
            if (sortBy === 'mc') return b.mc - a.mc;
            if (sortBy === 'em') return b.em - a.em;
            if (sortBy === 'pc') return b.pc - a.pc;
            if (sortBy === 'f7d') return b.f7d - a.f7d;
            return 0;
        });

        return result;
    }, [data, selectedCategory, searchQuery, minScore, sortBy]);

    // KPI calculations
    const avgScore = Math.round(data.reduce((a, s) => a + s.score, 0) / data.length);
    const strongBuyCount = data.filter(s => s.rec === 'Strong Buy').length;
    const avgPremium = Math.round(data.reduce((a, s) => a + parseFloat(s.sp), 0) / data.length);

    // Get unique categories
    const categories = ['All', ...new Set(data.map(s => s.cat))];

    // Calculator functions
    const calcFV = () => {
        const { opex, emit, price, taoP } = fvInputs;
        const fv = (opex / 365) / emit;
        const sp = ((price - fv) / fv) * 100;
        return {
            fv: fv.toFixed(2),
            dailyOpex: (opex / 365 / 1000).toFixed(1),
            sp: sp.toFixed(0),
            pv: ((fv * emit * 365 * 4) / 1e6).toFixed(1),
            tr: ((emit * 365 * taoP) / 1000).toFixed(1)
        };
    };

    const calcDCF = () => {
        const { dcfE, dcfT, dcfG, dcfD, dcfM, dcfY } = dcfInputs;
        const g = dcfG / 100;
        const d = dcfD / 100;
        const an = dcfE * 365;
        let pv = 0;
        for (let i = 1; i <= dcfY; i++) {
            pv += (an * Math.pow(1 + g, i)) / Math.pow(1 + d, i);
        }
        const te = an * Math.pow(1 + g, dcfY);
        const pt = (te * (1 + g) / (d - g)) / Math.pow(1 + d, dcfY);
        const fv = pv + pt;
        const rt = fv / dcfM;
        const up = (rt - 1) * 100;
        return {
            fv: Math.round(fv).toLocaleString(),
            usd: ((fv * dcfT) / 1e6).toFixed(1),
            rt: rt.toFixed(2),
            up: up.toFixed(0),
            signal: rt > 1.2 ? 'UNDER' : rt > 0.8 ? 'FAIR' : 'OVER'
        };
    };

    const calcEm = () => {
        const { emSh, emTp, emNt, emMn } = emInputs;
        const dt = emNt * (emSh / 100);
        const du = dt * emTp;
        return {
            dt: dt.toFixed(1),
            du: Math.round(du).toLocaleString(),
            mt: (dt * 30).toFixed(0),
            mu: ((du * 30) / 1e6).toFixed(2),
            au: ((du * 365) / 1e6).toFixed(1)
        };
    };

    const calcCS = () => {
        const { csRc, csSp, csPf, csEc, csDv, csDc } = csInputs;
        const fs = Math.max(0, Math.min(100, 50 - (csSp / 4) + (csRc / 2)));
        const cs = (0.20 * fs + 0.25 * csPf + 0.30 * csEc + 0.20 * csDv + 0.05 * csDc).toFixed(0);
        const rating = cs >= 70 ? 'Excellent' : cs >= 55 ? 'Good' : cs >= 40 ? 'Fair' : 'Poor';
        const risk = cs >= 70 ? 'Very Low' : cs >= 55 ? 'Low' : cs >= 40 ? 'Medium' : 'High';
        return { cs, rating, risk };
    };

    const fvResults = calcFV();
    const dcfResults = calcDCF();
    const emResults = calcEm();
    const csResults = calcCS();

    // Chart data
    const mcapChartData = {
        labels: data.slice(0, 8).map(s => s.n),
        datasets: [{
            data: data.slice(0, 8).map(s => s.mc),
            backgroundColor: 'rgba(139,92,246,0.6)',
            borderColor: '#8b5cf6',
            borderWidth: 1,
            borderRadius: 4
        }]
    };

    const catData = {};
    data.forEach(s => {
        catData[s.cat] = (catData[s.cat] || 0) + s.mc;
    });

    const catChartData = {
        labels: Object.keys(catData),
        datasets: [{
            data: Object.values(catData),
            backgroundColor: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#f43f5e', '#3b82f6'],
            borderWidth: 0
        }]
    };

    const riskData = { 'Very Low': 0, 'Low': 0, 'Medium': 0, 'High': 0 };
    data.forEach(s => riskData[s.risk]++);

    const riskChartData = {
        labels: Object.keys(riskData),
        datasets: [{
            data: Object.values(riskData),
            backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#f43f5e'],
            borderWidth: 0
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: { padding: 6, usePointStyle: true, font: { size: 9 }, color: theme === 'dark' ? '#889' : '#556' }
            }
        }
    };

    const barChartOptions = {
        ...chartOptions,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { callback: v => `$${v}M`, font: { size: 9 }, color: theme === 'dark' ? '#889' : '#556' },
                grid: { color: theme === 'dark' ? '#252538' : '#dde' }
            },
            x: {
                ticks: { font: { size: 9 }, color: theme === 'dark' ? '#889' : '#556' },
                grid: { display: false }
            }
        },
        plugins: { legend: { display: false } }
    };

    const doughnutOptions = {
        ...chartOptions,
        cutout: '60%',
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: { padding: 6, usePointStyle: true, font: { size: 9 }, color: theme === 'dark' ? '#889' : '#556' }
            }
        }
    };

    return (
        <div className={theme}>
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-[var(--bg)]' : 'bg-[var(--bg)]'} text-[var(--txt)]`}>
                {/* Header */}
                <header className="hdr">
                    <div className="logo">
                        <div className="logo-i">
                            <svg viewBox="0 0 100 100" fill="none">
                                <circle cx="50" cy="50" r="42" stroke="#fff" strokeWidth="5" />
                                <circle cx="50" cy="50" r="16" fill="#fff" />
                                <line x1="50" y1="8" x2="50" y2="34" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
                                <line x1="50" y1="66" x2="50" y2="92" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
                                <line x1="8" y1="50" x2="34" y2="50" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
                                <line x1="66" y1="50" x2="92" y2="50" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <div className="logo-t">DeAI <span>Nexus</span></div>
                            <div className="logo-s">Bittensor Intelligence • Feb 2026</div>
                        </div>
                    </div>
                    <div className="hdr-r">
                        <div className="hdr-st">
                            <div className="st-i"><div className="st-l">TAO</div><div className="st-v">${TAO_PRICE.toFixed(2)}</div></div>
                            <div className="st-i"><div className="st-l">Subnets</div><div className="st-v">128</div></div>
                            <div className="st-i"><div className="st-l">MCap</div><div className="st-v">$2.03B</div></div>
                            <div className="st-i"><div className="st-l">Emissions</div><div className="st-v">3,600τ</div></div>
                        </div>
                        <button className="theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>🌓</button>
                        <div className="live"><div className="live-d"></div>Live</div>
                    </div>
                </header>

                <div className="cnt">
                    {/* Tabs */}
                    <div className="tabs">
                        <button className={`tab ${activeTab === 'dash' ? 'act' : ''}`} onClick={() => setActiveTab('dash')}>📊 Dashboard</button>
                        <button className={`tab ${activeTab === 'calc' ? 'act' : ''}`} onClick={() => setActiveTab('calc')}>🧮 DeAI Metrics</button>
                    </div>

                    {/* Dashboard Tab */}
                    {activeTab === 'dash' && (
                        <div>
                            {/* KPIs */}
                            <div className="kpi">
                                <div className="kpi-c v"><div className="kpi-l">Subnet MCap</div><div className="kpi-v">$847M</div><div className="kpi-s">24 tracked</div></div>
                                <div className="kpi-c g"><div className="kpi-l">Daily Emissions</div><div className="kpi-v">3,600τ</div><div className="kpi-s">$687K/day</div></div>
                                <div className="kpi-c c"><div className="kpi-l">Avg Score</div><div className="kpi-v">{avgScore}</div><div className="kpi-s">Composite</div></div>
                                <div className="kpi-c a"><div className="kpi-l">Strong Buy</div><div className="kpi-v">{strongBuyCount}</div><div className="kpi-s">Signals</div></div>
                                <div className="kpi-c r"><div className="kpi-l">Avg Premium</div><div className="kpi-v">{avgPremium >= 0 ? '+' : ''}{avgPremium}%</div><div className="kpi-s">vs Fundamental Value</div></div>
                            </div>

                            {/* Charts */}
                            <div className="chr">
                                <div className="chr-c">
                                    <div className="chr-t">Market Cap by Subnet</div>
                                    <div className="chr-b"><Bar data={mcapChartData} options={barChartOptions} /></div>
                                </div>
                                <div className="chr-c">
                                    <div className="chr-t">Categories</div>
                                    <div className="chr-b"><Doughnut data={catChartData} options={doughnutOptions} /></div>
                                </div>
                                <div className="chr-c">
                                    <div className="chr-t">Risk Profile</div>
                                    <div className="chr-b"><Doughnut data={riskChartData} options={doughnutOptions} /></div>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flt">
                                <div className="flt-l">
                                    <div className="pills">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                className={`pill ${selectedCategory === cat ? 'act' : ''}`}
                                                onClick={() => setSelectedCategory(cat)}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flt-r">
                                    <div className="srt" onClick={() => setSortDropdownOpen(!sortDropdownOpen)}>
                                        <button className="srt-b">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 6h18M6 12h12M9 18h6" />
                                            </svg>
                                            <span>{sortBy === 'score' ? 'DeAI Score' : sortBy === 'fv' ? 'Fund. Value' : sortBy === 'sp' ? 'Premium' : sortBy === 'mc' ? 'Market Cap' : sortBy === 'em' ? 'Emission %' : sortBy === 'pc' ? '24H Change' : '7D Flow'}</span>
                                            <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </button>
                                        {sortDropdownOpen && (
                                            <div className="srt-d">
                                                <div className={`srt-o ${sortBy === 'score' ? 'act' : ''}`} onClick={() => { setSortBy('score'); setSortDropdownOpen(false); }}>DeAI Score</div>
                                                <div className={`srt-o ${sortBy === 'fv' ? 'act' : ''}`} onClick={() => { setSortBy('fv'); setSortDropdownOpen(false); }}>Fund. Value</div>
                                                <div className={`srt-o ${sortBy === 'sp' ? 'act' : ''}`} onClick={() => { setSortBy('sp'); setSortDropdownOpen(false); }}>Premium (Low→High)</div>
                                                <div className={`srt-o ${sortBy === 'mc' ? 'act' : ''}`} onClick={() => { setSortBy('mc'); setSortDropdownOpen(false); }}>Market Cap</div>
                                                <div className={`srt-o ${sortBy === 'em' ? 'act' : ''}`} onClick={() => { setSortBy('em'); setSortDropdownOpen(false); }}>Emission %</div>
                                                <div className={`srt-o ${sortBy === 'pc' ? 'act' : ''}`} onClick={() => { setSortBy('pc'); setSortDropdownOpen(false); }}>24H Change</div>
                                                <div className={`srt-o ${sortBy === 'f7d' ? 'act' : ''}`} onClick={() => { setSortBy('f7d'); setSortDropdownOpen(false); }}>7D Flow</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="scf">
                                        <span className="scf-l">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                                            </svg>
                                            Min:
                                        </span>
                                        <input type="range" min="0" max="100" value={minScore} onChange={(e) => setMinScore(parseInt(e.target.value))} />
                                        <span className="scf-v">{minScore}</span>
                                    </div>
                                    <input type="text" className="srch" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                            </div>

                            <div className="info">Showing <span>{filtered.length}</span> subnets • Click to expand</div>

                            {/* Subnet List */}
                            <div className="list">
                                {filtered.map(s => (
                                    <div key={s.id} className={`row ${expandedSubnet === s.id ? 'exp' : ''}`}>
                                        <div className="row-h" onClick={() => setExpandedSubnet(expandedSubnet === s.id ? null : s.id)}>
                                            <div className="row-id">{s.id}</div>
                                            <div className="row-i">
                                                <div className="row-n">{s.n}</div>
                                                <div className="row-m">{s.cat}</div>
                                            </div>
                                            <div className="met">
                                                <div className="met-l">Price</div>
                                                <div className="met-v">${s.p.toFixed(2)}</div>
                                                <div className={`met-s ${s.pc >= 0 ? 'up' : 'dn'}`}>{s.pc >= 0 ? '↑' : '↓'}{Math.abs(s.pc).toFixed(1)}%</div>
                                            </div>
                                            <div className="met">
                                                <div className="met-l">MCap</div>
                                                <div className="met-v">${s.mc.toFixed(1)}M</div>
                                            </div>
                                            <div className="met">
                                                <div className="met-l">7D Flow</div>
                                                <div className={`met-v ${s.f7d >= 0 ? 'up' : 'dn'}`}>{s.f7d >= 0 ? '+' : ''}{s.f7d.toFixed(1)}M</div>
                                            </div>
                                            <div className="met">
                                                <span className={`scr ${s.score >= 70 ? 'scr-e' : s.score >= 55 ? 'scr-g' : s.score >= 40 ? 'scr-f' : 'scr-p'}`}>{s.score}</span>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {expandedSubnet === s.id && (
                                            <div className="row-x">
                                                <div className="exp-g">
                                                    <div className="det">
                                                        <div className="det-h">
                                                            <div className="det-t v">📊 Fundamentals</div>
                                                            <div className={`det-b ${parseFloat(s.sp) < 15 ? 'bg' : parseFloat(s.sp) < 60 ? 'ba' : 'br'}`}>
                                                                {parseFloat(s.sp) < 0 ? '↓' : '↑'} {s.badge}
                                                            </div>
                                                        </div>
                                                        <div className="det-g">
                                                            <div className="det-i"><div className="det-il">Fund. Value</div><div className="det-iv" style={{ color: 'var(--accent)' }}>${s.fv}</div></div>
                                                            <div className="det-i"><div className="det-il">Price</div><div className="det-iv">${s.p.toFixed(2)}</div></div>
                                                            <div className="det-i"><div className="det-il">Premium</div><div className="det-iv" style={{ color: parseFloat(s.sp) < 15 ? 'var(--green)' : 'var(--rose)' }}>{parseFloat(s.sp) >= 0 ? '+' : ''}{s.sp}%</div></div>
                                                            <div className="det-i"><div className="det-il">Rev Coverage</div><div className="det-iv">{s.rc}%</div></div>
                                                        </div>
                                                        <div className="det-n">FV = Daily OpEx (${(s.opex / 365 / 1000).toFixed(1)}K) ÷ Daily Emissions ({s.dt}τ)</div>
                                                    </div>

                                                    <div className="det">
                                                        <div className="det-h"><div className="det-t c">📈 Price & Flow</div></div>
                                                        <div className="det-g3">
                                                            <div className="det-i"><div className="det-il">1H</div><div className={`det-iv ${s.c1h >= 0 ? 'up' : 'dn'}`}>{s.c1h >= 0 ? '+' : ''}{s.c1h}%</div></div>
                                                            <div className="det-i"><div className="det-il">24H</div><div className={`det-iv ${s.pc >= 0 ? 'up' : 'dn'}`}>{s.pc >= 0 ? '+' : ''}{s.pc}%</div></div>
                                                            <div className="det-i"><div className="det-il">1W</div><div className={`det-iv ${s.c1w >= 0 ? 'up' : 'dn'}`}>{s.c1w >= 0 ? '+' : ''}{s.c1w}%</div></div>
                                                            <div className="det-i"><div className="det-il">1M</div><div className={`det-iv ${s.c1m >= 0 ? 'up' : 'dn'}`}>{s.c1m >= 0 ? '+' : ''}{s.c1m}%</div></div>
                                                            <div className="det-i"><div className="det-il">Flow 7D</div><div className={`det-iv ${s.f7d >= 0 ? 'up' : 'dn'}`}>{s.f7d >= 0 ? '+$' : '-$'}{Math.abs(s.f7d).toFixed(2)}M</div></div>
                                                            <div className="det-i"><div className="det-il">Flow 1M</div><div className={`det-iv ${s.f1m >= 0 ? 'up' : 'dn'}`}>{s.f1m >= 0 ? '+$' : '-$'}{Math.abs(s.f1m).toFixed(2)}M</div></div>
                                                        </div>
                                                    </div>

                                                    <div className="det">
                                                        <div className="det-h"><div className="det-t g">🔥 Network & Emission</div></div>
                                                        <div className="det-g3">
                                                            <div className="det-i"><div className="det-il">Validators</div><div className="det-iv">{s.val}</div></div>
                                                            <div className="det-i"><div className="det-il">Miners</div><div className="det-iv">{s.min}</div></div>
                                                            <div className="det-i"><div className="det-il">Stake</div><div className="det-iv">${s.stk}M</div></div>
                                                            <div className="det-i"><div className="det-il">UID Util</div><div className="det-iv">{s.uid}%</div></div>
                                                            <div className="det-i"><div className="det-il">Emission</div><div className="det-iv" style={{ color: 'var(--amber)' }}>{s.em}%</div></div>
                                                            <div className="det-i"><div className="det-il">Daily TAO</div><div className="det-iv">{s.dt}τ</div></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="exp-g2">
                                                    <div className="det">
                                                        <div className="det-h"><div className="det-t a">💧 Subnet Pool</div></div>
                                                        <div className="det-g3">
                                                            <div className="det-i"><div className="det-il">TAO Pool</div><div className="det-iv">${s.taoP}M</div></div>
                                                            <div className="det-i"><div className="det-il">Alpha</div><div className="det-iv">{s.alpP}Mα</div></div>
                                                            <div className="det-i"><div className="det-il">Liquidity</div><div className="det-iv" style={{ color: 'var(--accent)' }}>$ {s.liq}M</div></div>
                                                            <div className="det-i"><div className="det-il">Liq/MCap</div><div className="det-iv">{s.liqM}%</div></div>
                                                            <div className="det-i"><div className="det-il">24H Vol</div><div className="det-iv">${s.vol}M</div></div>
                                                            <div className="det-i"><div className="det-il">APY</div><div className="det-iv" style={{ color: 'var(--green)' }}>{s.apy}%</div></div>
                                                        </div>
                                                    </div>

                                                    <div className="det">
                                                        <div className="det-h"><div className="det-t g">✓ Investment Thesis</div></div>
                                                        <div className="det-th">{s.th}</div>
                                                        <div className="ms-l">MILESTONES</div>
                                                        {s.ms.map((m, i) => <div key={i} className="ms-i">{m}</div>)}
                                                    </div>

                                                    <div className="det">
                                                        <div className="det-h"><div className="det-t rs">⚠ Risks</div></div>
                                                        {s.rsk.map((r, i) => <div key={i} className="rsk-i">{r}</div>)}
                                                        <div className="det-g" style={{ marginTop: '10px' }}>
                                                            <div className="det-i">
                                                                <div className="det-il">Risk Level</div>
                                                                <div className="det-iv" style={{ color: s.risk === 'Very Low' || s.risk === 'Low' ? 'var(--green)' : s.risk === 'Medium' ? 'var(--amber)' : 'var(--rose)' }}>{s.risk}</div>
                                                            </div>
                                                            <div className="det-i">
                                                                <div className="det-il">Signal</div>
                                                                <div className="det-iv" style={{ color: s.rec === 'Strong Buy' ? 'var(--green)' : s.rec === 'Buy' ? 'var(--accent)' : s.rec === 'Hold' ? 'var(--amber)' : 'var(--rose)' }}>{s.rec}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Calculator Tab */}
                    {activeTab === 'calc' && (
                        <div className="calc act">
                            <div className="calc-g">
                                {/* Fundamental Value Calculator */}
                                <div className="calc-c">
                                    <div className="calc-t">📈 Fundamental Value</div>
                                    <div className="calc-d">OpEx replacement methodology</div>
                                    <div className="calc-in">
                                        <div className="inp">
                                            <label>Annual OpEx ($)</label>
                                            <input type="number" value={fvInputs.opex} onChange={(e) => setFvInputs({ ...fvInputs, opex: parseFloat(e.target.value) })} />
                                        </div>
                                        <div className="inp">
                                            <label>Daily Emissions</label>
                                            <input type="number" value={fvInputs.emit} onChange={(e) => setFvInputs({ ...fvInputs, emit: parseFloat(e.target.value) })} />
                                        </div>
                                        <div className="inp">
                                            <label>Token Price ($)</label>
                                            <input type="number" value={fvInputs.price} onChange={(e) => setFvInputs({ ...fvInputs, price: parseFloat(e.target.value) })} />
                                        </div>
                                        <div className="inp">
                                            <label>TAO Price</label>
                                            <input type="number" value={fvInputs.taoP} onChange={(e) => setFvInputs({ ...fvInputs, taoP: parseFloat(e.target.value) })} />
                                        </div>
                                    </div>
                                    <div className="calc-r">
                                        <div className="calc-rl">Fundamental Value</div>
                                        <div className="calc-rv" style={{ color: 'var(--cyan)' }}>${fvResults.fv}</div>
                                        <div className="calc-rs">Daily OpEx: ${fvResults.dailyOpex}K</div>
                                    </div>
                                    <div className="mini">
                                        <div className="mini-i"><div className="mini-v" style={{ color: 'var(--amber)' }}>{fvResults.sp >= 0 ? '+' : ''}{fvResults.sp}%</div><div className="mini-l">Premium</div></div>
                                        <div className="mini-i"><div className="mini-v" style={{ color: 'var(--green)' }}>${fvResults.pv}M</div><div className="mini-l">PV 4Y</div></div>
                                        <div className="mini-i"><div className="mini-v" style={{ color: 'var(--violet)' }}>${fvResults.tr}K</div><div className="mini-l">Return</div></div>
                                    </div>
                                </div>

                                {/* DCF Calculator */}
                                <div className="calc-c">
                                    <div className="calc-t">💰 DCF Fair Value</div>
                                    <div className="calc-d">Discounted cash flow</div>
                                    <div className="calc-in">
                                        <div className="inp"><label>Daily TAO</label><input type="number" value={dcfInputs.dcfE} onChange={(e) => setDcfInputs({ ...dcfInputs, dcfE: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>TAO Price</label><input type="number" value={dcfInputs.dcfT} onChange={(e) => setDcfInputs({ ...dcfInputs, dcfT: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Growth %</label><input type="number" value={dcfInputs.dcfG} onChange={(e) => setDcfInputs({ ...dcfInputs, dcfG: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Discount %</label><input type="number" value={dcfInputs.dcfD} onChange={(e) => setDcfInputs({ ...dcfInputs, dcfD: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>MCap (TAO)</label><input type="number" value={dcfInputs.dcfM} onChange={(e) => setDcfInputs({ ...dcfInputs, dcfM: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Years</label><input type="number" value={dcfInputs.dcfY} onChange={(e) => setDcfInputs({ ...dcfInputs, dcfY: parseInt(e.target.value) })} /></div>
                                    </div>
                                    <div className="calc-r">
                                        <div className="calc-rl">Fair Value</div>
                                        <div className="calc-rv" style={{ color: 'var(--green)' }}>{dcfResults.fv}τ</div>
                                        <div className="calc-rs">≈${dcfResults.usd}M</div>
                                    </div>
                                    <div className="mini">
                                        <div className="mini-i"><div className="mini-v" style={{ color: 'var(--green)' }}>{dcfResults.rt}x</div><div className="mini-l">Ratio</div></div>
                                        <div className="mini-i"><div className="mini-v" style={{ color: 'var(--green)' }}>{dcfResults.up >= 0 ? '+' : ''}{dcfResults.up}%</div><div className="mini-l">Upside</div></div>
                                        <div className="mini-i"><div className="mini-v" style={{ color: 'var(--green)' }}>{dcfResults.signal}</div><div className="mini-l">Signal</div></div>
                                    </div>
                                </div>

                                {/* Emissions Calculator */}
                                <div className="calc-c">
                                    <div className="calc-t">📊 Emissions Revenue</div>
                                    <div className="calc-d">TAO emissions value</div>
                                    <div className="calc-in">
                                        <div className="inp"><label>Emission %</label><input type="number" value={emInputs.emSh} onChange={(e) => setEmInputs({ ...emInputs, emSh: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>TAO Price</label><input type="number" value={emInputs.emTp} onChange={(e) => setEmInputs({ ...emInputs, emTp: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Network/Day</label><input type="number" value={emInputs.emNt} onChange={(e) => setEmInputs({ ...emInputs, emNt: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Miner %</label><input type="number" value={emInputs.emMn} onChange={(e) => setEmInputs({ ...emInputs, emMn: parseFloat(e.target.value) })} /></div>
                                    </div>
                                    <div className="calc-r">
                                        <div className="calc-rl">Daily TAO</div>
                                        <div className="calc-rv" style={{ color: 'var(--cyan)' }}>{emResults.dt}τ</div>
                                        <div className="calc-rs">${emResults.du}/day</div>
                                    </div>
                                    <div className="mini">
                                        <div className="mini-i"><div className="mini-v">{emResults.mt}τ</div><div className="mini-l">Monthly</div></div>
                                        <div className="mini-i"><div className="mini-v">${emResults.mu}M</div><div className="mini-l">Mo. USD</div></div>
                                        <div className="mini-i"><div className="mini-v">${emResults.au}M</div><div className="mini-l">Annual</div></div>
                                    </div>
                                </div>

                                {/* Composite Score Calculator */}
                                <div className="calc-c">
                                    <div className="calc-t">🎯 Composite Score</div>
                                    <div className="calc-d">F(20%) + P(25%) + E(30%) + D(20%) + C(5%)</div>
                                    <div className="calc-in">
                                        <div className="inp"><label>Rev Coverage %</label><input type="number" value={csInputs.csRc} onChange={(e) => setCsInputs({ ...csInputs, csRc: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Spec Premium %</label><input type="number" value={csInputs.csSp} onChange={(e) => setCsInputs({ ...csInputs, csSp: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Performance</label><input type="number" value={csInputs.csPf} onChange={(e) => setCsInputs({ ...csInputs, csPf: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Economics</label><input type="number" value={csInputs.csEc} onChange={(e) => setCsInputs({ ...csInputs, csEc: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Dev Activity</label><input type="number" value={csInputs.csDv} onChange={(e) => setCsInputs({ ...csInputs, csDv: parseFloat(e.target.value) })} /></div>
                                        <div className="inp"><label>Decentralization</label><input type="number" value={csInputs.csDc} onChange={(e) => setCsInputs({ ...csInputs, csDc: parseFloat(e.target.value) })} /></div>
                                    </div>
                                    <div className="calc-r">
                                        <div className="calc-rl">Score</div>
                                        <div className="calc-rv" style={{ color: 'var(--green)' }}>{csResults.cs}</div>
                                        <div className="calc-rs">{csResults.rating} • {csResults.risk} Risk</div>
                                    </div>
                                </div>
                            </div>

                            {/* Methodology */}
                            <div className="meth">
                                <div className="meth-t">📐 Methodology: Fundamental Value</div>
                                <div className="meth-p"><strong>What is Fundamental Value?</strong><br />The Fundamental Value (FV) represents the intrinsic worth of a subnet token based on the operational costs it would take to replace the subnet's services. It answers: "How much would it cost to run this AI service traditionally?"</div>
                                <div className="meth-p"><strong>How it's calculated:</strong><br />FV = (Annual Operating Expenses ÷ 365) ÷ Daily Token Emissions<br /><br />This divides the daily cost to run the subnet by the number of tokens emitted daily, giving a per-token value based on real operational costs.</div>
                                <div className="meth-f">Example: $4.2M OpEx/year ÷ 365 = $11,507/day ÷ 1,842 tokens = $6.25 FV per token</div>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="ftr">
                        <div className="ftr-b"><strong>DeAI Nexus v3</strong> • Taostats • CoinGecko</div>
                        <div className="ftr-m"><span>TAO ${TAO_PRICE}</span><span>{new Date().toLocaleString()}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeAINexusTerminal;
