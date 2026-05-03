/* ─────────────────────────────────────────────────────────────────────────
   Nawakamol Rojanabenjakun · Career Atlas · script.js
   Powers the Leaflet map, layer toggles, city detail panel, and the
   project / skills / timeline sections rendered from data below.
   ───────────────────────────────────────────────────────────────────────── */
 
// ─────────────────────────────────────────────────────────────────────────
// LOCATIONS — city pins + the entries that surface in the side panel
// ─────────────────────────────────────────────────────────────────────────
const LOCATIONS = {
  bangkok: {
    name: 'Bangkok, Thailand',
    coord: [13.92, 100.55],
    color: '#c44343',
    label: 'BKK',
    period: '2015 – 2025',
    entries: [
      {
        role: 'Logistics & Supply Chain Analyst',
        org: 'Cisco · Sep 2022 – Jul 2025',
        desc: 'Optimized order fulfillment using logistics and shipment data, supporting <strong>$16K/week in product shipments</strong> while improving delivery reliability through cross-team coordination with IT and operations.',
      },
      {
        role: 'Production Planner (assigned dual role)',
        org: 'Fabrinet · Sep 2022 – Jul 2025',
        desc: 'Redesigned shipment consolidation workflows; reduced partial shipments by <strong>40%</strong> and improved distribution efficiency for the U.S. market.',
      },
      {
        role: 'Process & Test Engineer',
        org: 'Fabrinet · Aug 2019 – Aug 2022',
        desc: 'Built Excel-based automation tools and analyzed capacity, demand, and process constraints using <strong>1K+ units/month production data</strong> to identify bottlenecks and improve operational efficiency.',
      },
      {
        role: 'B.Eng, Electrical Communication & Electronic Engineering',
        org: "King Mongkut's University of Technology Thonburi · 2015 – 2019",
        desc: 'Foundation in signal processing, communication systems, and electronics — the engineering grounding that informs every analytics project I build today.',
      },
    ],
  },
  london: {
    name: 'London, UK',
    coord: [51.5074, -0.1278],
    color: '#2e5a87',
    label: 'LON',
    period: '2026 – Present',
    entries: [
      {
        role: 'Machine Learning Project — Fintech & Scenario Analytics',
        org: 'Zanista · Jan 2026 – Present',
        desc: 'Built a news-driven analytics pipeline using <strong>10K+ headlines and 6+ engineered NLP features</strong>, integrating market signals and evolving through <strong>4 model stages</strong> (linear → nonlinear → Student-t) to shift from prediction to risk-aware modeling — improving robustness under extreme conditions.',
      },
    ],
  },
  nyc: {
    name: 'New York, NY',
    coord: [40.7128, -74.0060],
    color: '#5d7a4f',
    label: 'NYC',
    period: '2025 – Present',
    entries: [
      {
        role: 'MS, Applied Analytics',
        org: 'Columbia University · Sep 2025 – Dec 2026',
        desc: 'Coursework in <strong>Machine Learning, Business Analytics, Product Analytics, Digital Marketing, and Optimization.</strong>',
      },
      {
        role: 'AIoT Project — M5Stack Core2 + AWS IoT Core',
        org: 'Columbia · Jan 2026 – Present',
        desc: 'End-to-end AIoT analytics system with real-time inference, processing <strong>~432K messages/month at under 2s latency</strong>, visualized through interactive dashboards (live/replay) and alerts that transform raw signals into daily insights and engaging user narratives.',
      },
      {
        role: 'ML Project — YouTube Micro-Creators',
        org: 'Columbia · Jan 2026 – Present',
        desc: 'Engineered a YouTube dataset of <strong>1,200+ videos</strong> using API data and <strong>15+ features</strong>, applying log transformations and normalization to analyze engagement drivers.',
      },
      {
        role: 'Storytelling of Data & AI — Nike Case Study',
        org: 'Columbia · Sep – Dec 2025',
        desc: 'Tableau dashboards on Nike’s revenue decline, quantifying <strong>3+ drivers</strong> (pricing, demand shifts, competitor growth) and a 10-slide executive presentation.',
      },
      {
        role: 'Data Engineering — Content & Trend Analytics Platform',
        org: 'Columbia · Sep – Dec 2025',
        desc: 'ETL pipeline (Python + APIs + MongoDB) integrating <strong>100K+ records</strong>, with a 3–5 feature trend-scoring model.',
      },
      {
        role: 'Top 5 Finalist — Google Innovation Lab',
        org: 'New York · Nov 2025',
        desc: 'Designed an AI product by defining <strong>3 personas, 3–5 success metrics, and key value drivers</strong>; <strong>top 5</strong> placement.',
      },
      {
        role: 'Consultant',
        org: 'NYPACE · Sep – Dec 2025',
        desc: 'Competitive analysis across <strong>25+ companies</strong>; designed <strong>tiered service models ($1.2K–$6K)</strong> for revenue growth and client acquisition.',
      },
    ],
  },
};
 
// ─────────────────────────────────────────────────────────────────────────
// PROJECT CARDS
// ─────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { title: 'AIoT Real-Time Mood Analytics System', location: 'New York · Columbia', date: 'Jan 2026 – Present',
    desc: 'End-to-end <strong>M5Stack Core2 → AWS IoT Core</strong> pipeline with real-time inference. Processes ~432K messages/month at <strong>under 2s latency</strong>, with hysteresis-based alerting and shareable mood cards.',
    tags: ['AWS IoT Core', 'MQTT', 'Python', 'JavaScript', 'XGBoost'] },
  { title: 'Fintech & Scenario Analytics — News-Driven NLP', location: 'London · Zanista', date: 'Jan 2026 – Present',
    desc: '<strong>10K+ headlines</strong> + 6 engineered NLP features feeding 4 model stages (linear → nonlinear → Student-t) for risk-aware market modeling.',
    tags: ['NLP', 'Python', 'Risk Modeling', 'Student-t'] },
  { title: 'YouTube Micro-Creator Success Patterns', location: 'New York · Columbia', date: 'Jan 2026 – Present',
    desc: '<strong>1,200+ video</strong> dataset engineered via API with 15+ features, log-transformed and normalized to surface engagement drivers for sub-10K-subscriber channels.',
    tags: ['Python', 'Pandas', 'Feature Engineering', 'YouTube API'] },
  { title: 'Nike Revenue Decline — Tableau Storytelling', location: 'New York · Columbia', date: 'Sep – Dec 2025',
    desc: 'Quantified <strong>3+ drivers</strong> of Nike’s revenue decline into 3 Tableau dashboards and a 10-slide executive presentation with actionable recommendations.',
    tags: ['Tableau', 'Storytelling', 'Pricing', 'Strategy'] },
  { title: 'Content & Trend Analytics Platform', location: 'New York · Columbia', date: 'Sep – Dec 2025',
    desc: 'ETL pipeline (Python + APIs + MongoDB) integrating <strong>100K+ records</strong>; trend-scoring model with 3–5 features supporting demand forecasting.',
    tags: ['ETL', 'MongoDB', 'Python', 'API'] },
  { title: 'Google Innovation Lab — Top 5 Finalist', location: 'New York', date: 'Nov 2025',
    desc: 'Designed an AI-driven product solution by defining <strong>3 personas, 3–5 success metrics, key value drivers</strong>. Earned <strong>top 5</strong> placement.',
    tags: ['Product Strategy', 'User Research', 'AI'] },
  { title: 'NYPACE Consulting — Tiered Service Model', location: 'New York', date: 'Sep – Dec 2025',
    desc: 'Competitive analysis across <strong>25+ companies</strong>; designed tiered models from $1.2K to $6K for revenue growth and client acquisition.',
    tags: ['Competitive Analysis', 'Pricing', 'Consulting'] },
  { title: 'Cisco Logistics Analytics', location: 'Bangkok · Cisco', date: 'Sep 2022 – Jul 2025',
    desc: 'Logistics + shipment analytics supporting <strong>$16K/week</strong> in product shipments. Improved delivery reliability via cross-team coordination.',
    tags: ['Supply Chain', 'Operations', 'Cisco Tools'] },
  { title: 'Fabrinet Shipment Consolidation Redesign', location: 'Bangkok · Fabrinet', date: 'Sep 2022 – Jul 2025',
    desc: 'Redesigned shipment consolidation workflows; reduced partial shipments by <strong>40%</strong> while improving U.S. market distribution.',
    tags: ['Lean Six Sigma', 'Process Optimization', 'Oracle ERP'] },
];
 
// ─────────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────────
const SKILLS = [
  { cat: 'Programming',          items: ['Python', 'SQL', 'PySpark', 'NoSQL', 'Pandas', 'NumPy', 'Flask'] },
  { cat: 'Data & ML',            items: ['Machine Learning', 'Predictive Modeling', 'A/B Testing', 'Customer Segmentation', 'Demand Forecasting'] },
  { cat: 'Analytics & Viz',      items: ['Tableau', 'Power BI', 'Excel', 'MongoDB', 'Neo4j'] },
  { cat: 'Product & Business',   items: ['Product Strategy', 'MVP Definition', 'User Research', 'Market Analysis', 'Roadmapping', 'KPI Design', 'Pricing Analytics', 'Data Storytelling'] },
  { cat: 'Systems & Methods',    items: ['Agile', 'SDLC', 'Lean Six Sigma', 'Kaizen', 'Process Optimization', 'Oracle ERP', 'Cisco Business Tools'] },
];
 
// ─────────────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { date: 'Jan 2026 – Present', role: 'ML Project — Fintech & Scenario Analytics', org: 'Zanista · London',  desc: 'NLP-driven risk-aware market modeling — 10K+ headlines, 4 model stages.' },
  { date: 'Jan 2026 – Present', role: 'AIoT Project — Core2 + AWS IoT Core',        org: 'Columbia · New York', desc: 'Real-time inference at 432K msgs/month, under 2s latency.' },
  { date: 'Jan 2026 – Present', role: 'ML Project — YouTube Micro-Creators',        org: 'Columbia · New York', desc: '1,200+ video engagement-pattern analysis.' },
  { date: 'Nov 2025',           role: 'Google Innovation Lab — Top 5 Finalist',     org: 'New York', desc: 'AI-product design with structured scoring framework.' },
  { date: 'Sep – Dec 2025',     role: 'NYPACE Consultant',                          org: 'New York', desc: 'Competitive analysis + tiered service-model design.' },
  { date: 'Sep – Dec 2025',     role: 'Storytelling of Data & AI — Nike',           org: 'Columbia · New York', desc: 'Tableau executive dashboards on revenue decline.' },
  { date: 'Sep – Dec 2025',     role: 'Data Engineering — Content & Trend Platform',org: 'Columbia · New York', desc: 'ETL pipeline integrating 100K+ records.' },
  { date: 'Sep 2025 – Dec 2026',role: 'MS, Applied Analytics',                       org: 'Columbia University', desc: 'Graduate program in applied analytics.' },
  { date: 'Sep 2022 – Jul 2025',role: 'Logistics & Supply Chain Analyst',            org: 'Cisco · Bangkok', desc: '$16K/week shipment optimization.' },
  { date: 'Sep 2022 – Jul 2025',role: 'Production Planner (dual role)',              org: 'Fabrinet · Bangkok', desc: '40% reduction in partial shipments.' },
  { date: 'Aug 2019 – Aug 2022',role: 'Process & Test Engineer',                     org: 'Fabrinet · Bangkok', desc: 'Excel automation + capacity analysis on 1K+ units/month.' },
  { date: 'Aug 2015 – Jun 2019',role: 'B.Eng, Electrical Communication & Electronic Engineering', org: "King Mongkut's University of Technology Thonburi", desc: 'Engineering foundation.' },
];
 
// ─────────────────────────────────────────────────────────────────────────
// LinkedIn (replace if your URL is different)
const linkedinUrl = 'https://www.linkedin.com/in/nawakamol-rojanabenjakun/';
document.getElementById('linkedin-link').href = linkedinUrl;
document.getElementById('footer-linkedin').href = linkedinUrl;
 
// ─────────────────────────────────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────────────────────────────────
const map = L.map('map-canvas', {
  center: [25, 30], zoom: 2.4,
  scrollWheelZoom: false, zoomControl: true, attributionControl: true,
  worldCopyJump: true,
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap × CARTO', maxZoom: 18, subdomains: 'abcd',
}).addTo(map);
 
const markers = {};
for (const [key, loc] of Object.entries(LOCATIONS)) {
  const el = `<div class="map-pin" style="background:${loc.color}">${loc.label}</div>`;
  const icon = L.divIcon({ html: el, className: '', iconSize: [36, 36], iconAnchor: [18, 18] });
  const marker = L.marker(loc.coord, { icon }).addTo(map);
  marker.bindPopup(`<strong>${loc.name}</strong><br><span style="font-family:var(--mono);font-size:11px;color:var(--muted)">${loc.entries.length} ${loc.entries.length === 1 ? 'role' : 'roles'} · ${loc.period}</span>`);
  marker.on('click', () => openDetail(key));
  markers[key] = marker;
}
 
// Layer toggles
document.querySelectorAll('.legend-row input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    const key = cb.dataset.layer;
    if (cb.checked) markers[key].addTo(map);
    else map.removeLayer(markers[key]);
  });
});
 
// Selected city detail
const detail = document.getElementById('city-detail');
function openDetail(key) {
  const loc = LOCATIONS[key];
  document.getElementById('cd-name').textContent = loc.name;
  document.getElementById('cd-meta').textContent = `${loc.period} · ${loc.entries.length} ${loc.entries.length === 1 ? 'role' : 'roles'}`;
  const html = loc.entries.map(e => `
    <div class="cd-entry">
      <div class="role">${e.role}</div>
      <div class="org">${e.org}</div>
      <div class="desc">${e.desc}</div>
    </div>`).join('');
  document.getElementById('cd-entries').innerHTML = html;
  detail.classList.add('active');
  // Hide the prompt and about panels temporarily so the detail card has room
  document.querySelector('.panel-prompt').style.opacity = '0.3';
  document.querySelector('.panel-about').style.opacity  = '0.3';
}
function closeDetail() {
  detail.classList.remove('active');
  document.querySelector('.panel-prompt').style.opacity = '1';
  document.querySelector('.panel-about').style.opacity  = '1';
}
window.closeDetail = closeDetail;
 
// PROJECTS
document.getElementById('proj-grid').innerHTML = PROJECTS.map(p => `
  <div class="proj-card">
    <div class="pc-meta">
      <span class="pc-loc">${p.location}</span>
      <span class="pc-date">${p.date}</span>
    </div>
    <h3>${p.title}</h3>
    <p class="pc-desc">${p.desc}</p>
    <div class="pc-tags">${p.tags.map(t => `<span class="pc-tag">${t}</span>`).join('')}</div>
  </div>
`).join('');
 
// SKILLS
document.getElementById('skills-grid').innerHTML = SKILLS.map(s => `
  <div class="skill-card">
    <h3>${s.cat}</h3>
    <div class="skill-list">${s.items.map(i => `<span>${i}</span>`).join('')}</div>
  </div>
`).join('');
 
// TIMELINE
document.getElementById('timeline').innerHTML = TIMELINE.map(t => `
  <li>
    <div class="timeline-date">${t.date}</div>
    <div class="timeline-role">${t.role}</div>
    <div class="timeline-org">${t.org}</div>
    <div class="timeline-desc">${t.desc}</div>
  </li>
`).join('');
