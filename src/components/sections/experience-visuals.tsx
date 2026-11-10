// Schematic illustrations for each internship card. Decorative only: every label is taken from the experience data.

export function PristynCareVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      {/* Background Court Grid & Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,111,74,0.22)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Futuristic Hospital Information System (HIS) UI Graphic */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#C96F4A] select-none"
      >
        {/* Central Core HIS Hub */}
        <rect x="150" y="30" width="160" height="60" rx="8" fill="#14110E" stroke="#C96F4A" strokeWidth="1.5" />
        <text x="230" y="55" textAnchor="middle" fill="#FFD6A1" fontSize="11" fontFamily="monospace" fontWeight="bold">
          PRISTYN_HIS_CORE
        </text>
        <text x="230" y="73" textAnchor="middle" fill="rgba(255,250,240,0.6)" fontSize="9" fontFamily="monospace">
          AUTH GATEWAY • RBAC
        </text>

        {/* Left Sub-node: All Hospitals Reporting */}
        <rect x="25" y="130" width="125" height="55" rx="6" fill="#100E0C" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="87" y="152" textAnchor="middle" fill="#F6F0E2" fontSize="9.5" fontFamily="monospace" fontWeight="600">
          ALL_HOSPITALS_DB
        </text>
        <text x="87" y="169" textAnchor="middle" fill="#C96F4A" fontSize="8" fontFamily="monospace">
          60-DAY RANGE LOCK
        </text>

        {/* Middle Sub-node: Expense Management */}
        <rect x="168" y="130" width="125" height="55" rx="6" fill="#100E0C" stroke="#C96F4A" strokeWidth="1.2" />
        <text x="230" y="152" textAnchor="middle" fill="#FFD6A1" fontSize="9.5" fontFamily="monospace" fontWeight="600">
          EXPENSE_AUDIT
        </text>
        <text x="230" y="169" textAnchor="middle" fill="#4ADE80" fontSize="8" fontFamily="monospace">
          15/15 SECURITY PASS
        </text>

        {/* Right Sub-node: Org Admin & MRD */}
        <rect x="310" y="130" width="125" height="55" rx="6" fill="#100E0C" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="372" y="152" textAnchor="middle" fill="#F6F0E2" fontSize="9.5" fontFamily="monospace" fontWeight="600">
          MRD & IT ASSETS
        </text>
        <text x="372" y="169" textAnchor="middle" fill="#C96F4A" fontSize="8" fontFamily="monospace">
          3 PRs PRODUCTION
        </text>

        {/* Circuit Interconnectors */}
        <path d="M230 90 L230 110 L87 110 L87 130" stroke="#C96F4A" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M230 90 L230 130" stroke="#C96F4A" strokeWidth="1.5" />
        <path d="M230 90 L230 110 L372 110 L372 130" stroke="#C96F4A" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Glowing Pulsing Status Nodes */}
        <circle cx="230" cy="90" r="3" fill="#FFD6A1" />
        <circle cx="87" cy="130" r="3" fill="#C96F4A" />
        <circle cx="230" cy="130" r="3.5" fill="#4ADE80" />
        <circle cx="372" cy="130" r="3" fill="#C96F4A" />
      </svg>

      {/* Live HUD Badge */}
      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        HIS ENGINE // PRODUCTION
      </div>
    </div>
  );
}

export function OnCareVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,161,0.18)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Clinical Oncology Workflows Schematic */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#FFD6A1] select-none"
      >
        {/* Oncology Care Pipeline Track */}
        <rect x="30" y="35" width="400" height="50" rx="8" fill="#14110E" stroke="rgba(255,250,240,0.15)" strokeWidth="1" />
        <text x="45" y="58" fill="#C96F4A" fontSize="10" fontFamily="monospace" fontWeight="bold">
          AEDOS HEALTH // ONCOLOGY CORE
        </text>
        <text x="45" y="73" fill="rgba(255,250,240,0.6)" fontSize="8.5" fontFamily="monospace">
          CLINICAL SCHEDULING • PO PIPELINE • CMS SYNCHRONIZATION
        </text>

        {/* Active Module Blocks */}
        <rect x="30" y="115" width="120" height="65" rx="6" fill="#110E0C" stroke="#C96F4A" strokeWidth="1.2" />
        <text x="90" y="140" textAnchor="middle" fill="#FFD6A1" fontSize="9" fontFamily="monospace" fontWeight="600">
          RAISE_PO_MODULE
        </text>
        <text x="90" y="158" textAnchor="middle" fill="rgba(255,250,240,0.6)" fontSize="7.5" fontFamily="monospace">
          PURCHASE ORDERS
        </text>

        <rect x="170" y="115" width="120" height="65" rx="6" fill="#110E0C" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="230" y="140" textAnchor="middle" fill="#F6F0E2" fontSize="9" fontFamily="monospace" fontWeight="600">
          APPOINTMENTS
        </text>
        <text x="230" y="158" textAnchor="middle" fill="#4ADE80" fontSize="7.5" fontFamily="monospace">
          DATE SELECTOR
        </text>

        <rect x="310" y="115" width="120" height="65" rx="6" fill="#110E0C" stroke="#C96F4A" strokeWidth="1.2" />
        <text x="370" y="140" textAnchor="middle" fill="#FFD6A1" fontSize="9" fontFamily="monospace" fontWeight="600">
          DYNAMIC_CMS
        </text>
        <text x="370" y="158" textAnchor="middle" fill="#C96F4A" fontSize="7.5" fontFamily="monospace">
          STATIC GEN FLOWS
        </text>

        {/* Pulse Flow Waveform */}
        <path
          d="M90 100 Q160 80 230 100 T370 100"
          stroke="#C96F4A"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 2"
        />
        <circle cx="90" cy="115" r="3" fill="#C96F4A" />
        <circle cx="230" cy="115" r="3" fill="#FFD6A1" />
        <circle cx="370" cy="115" r="3" fill="#4ADE80" />
      </svg>

      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-ping" />
        ACTIVE RESIDENCY // GURGAON
      </div>
    </div>
  );
}

export function InfosysLabVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,111,74,0.2)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* IoT Microcontroller & HuskyLens AI Radar */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#C96F4A] select-none"
      >
        {/* ESP32 Microcontroller Core */}
        <rect x="40" y="40" width="160" height="130" rx="6" fill="#13100D" stroke="#C96F4A" strokeWidth="1.5" />
        <text x="120" y="70" textAnchor="middle" fill="#FFD6A1" fontSize="11" fontFamily="monospace" fontWeight="bold">
          ESP32-WROOM
        </text>
        <text x="120" y="88" textAnchor="middle" fill="rgba(255,250,240,0.6)" fontSize="8.5" fontFamily="monospace">
          2.4GHz WiFi / BLE 4.2
        </text>

        {/* Pinout array */}
        <line x1="40" y1="110" x2="25" y2="110" stroke="#FFD6A1" strokeWidth="1.5" />
        <line x1="40" y1="125" x2="25" y2="125" stroke="#FFD6A1" strokeWidth="1.5" />
        <line x1="40" y1="140" x2="25" y2="140" stroke="#FFD6A1" strokeWidth="1.5" />

        <rect x="70" y="115" width="100" height="35" rx="4" fill="#0C0A08" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="120" y="136" textAnchor="middle" fill="#4ADE80" fontSize="8" fontFamily="monospace">
          STA/AP TELEMETRY
        </text>

        {/* HuskyLens Vision AI Reticle Target */}
        <circle cx="340" cy="105" r="55" stroke="rgba(255,250,240,0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="340" cy="105" r="35" stroke="#C96F4A" strokeWidth="1.2" />
        <circle cx="340" cy="105" r="3" fill="#FFD6A1" />

        {/* Reticle brackets */}
        <path d="M315 80 L315 90 M315 80 L325 80" stroke="#FFD6A1" strokeWidth="1.5" />
        <path d="M365 80 L365 90 M365 80 L355 80" stroke="#FFD6A1" strokeWidth="1.5" />
        <path d="M315 130 L315 120 M315 130 L325 130" stroke="#FFD6A1" strokeWidth="1.5" />
        <path d="M365 130 L365 120 M365 130 L355 130" stroke="#FFD6A1" strokeWidth="1.5" />

        <text x="340" y="180" textAnchor="middle" fill="#FFD6A1" fontSize="9" fontFamily="monospace" fontWeight="bold">
          HUSKYLENS_AI // SERVO LOCK
        </text>
        <text x="340" y="195" textAnchor="middle" fill="#C96F4A" fontSize="7.5" fontFamily="monospace">
          FACE RECOGNITION ACCESS
        </text>

        {/* Bus Connection */}
        <path d="M200 105 L285 105" stroke="#C96F4A" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>

      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        MAKER LAB // HARDWARE IOT
      </div>
    </div>
  );
}

export function DevelopersArenaVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,161,0.18)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Python Data Engineering & Docker Pipelines */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#FFD6A1] select-none"
      >
        {/* Terminal Header */}
        <rect x="30" y="30" width="400" height="150" rx="8" fill="#120F0C" stroke="#C96F4A" strokeWidth="1.2" />
        <rect x="30" y="30" width="400" height="28" rx="8" fill="#191511" />
        <circle cx="48" cy="44" r="4" fill="#EF4444" />
        <circle cx="62" cy="44" r="4" fill="#F59E0B" />
        <circle cx="76" cy="44" r="4" fill="#10B981" />
        <text x="100" y="48" fill="rgba(255,250,240,0.5)" fontSize="9" fontFamily="monospace">
          python3 --evaluate task_suite.py
        </text>

        {/* Terminal Execution Stream */}
        <text x="48" y="82" fill="#FFD6A1" fontSize="9.5" fontFamily="monospace">
          [100% COMPLETE] 12/12 evaluated milestone tasks passed.
        </text>
        <text x="48" y="102" fill="rgba(255,250,240,0.7)" fontSize="9" fontFamily="monospace">
          &gt; Pandas AST Analysis • NumPy Math Kernels • Matplotlib Pipelines
        </text>
        <text x="48" y="122" fill="rgba(255,250,240,0.7)" fontSize="9" fontFamily="monospace">
          &gt; Flask Microservices • Docker Containerization • SQL Schemas
        </text>
        <text x="48" y="145" fill="#4ADE80" fontSize="10" fontFamily="monospace" fontWeight="bold">
          RESULT: GRADE A+ [OUTSTANDING PERFORMANCE // 108+ HRS]
        </text>

        {/* Bottom Status Ticker */}
        <line x1="30" y1="158" x2="430" y2="158" stroke="rgba(255,250,240,0.1)" strokeWidth="1" />
        <text x="48" y="172" fill="#C96F4A" fontSize="8" fontFamily="monospace">
          STATUS: VERIFIED RESIDENCY COMPLETION • ISSUED OCTOBER 2026
        </text>
      </svg>

      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        GRADE A+ // 108+ HRS LOGGED
      </div>
    </div>
  );
}

/** Used for any internship added from the admin panel: a schematic built from its own data. */
export function GenericVisual({ company, role, tags }: { company: string; role: string; tags: string[] }) {
  const nodes = tags.slice(0, 4);
  const slotW = 400 / Math.max(nodes.length, 1);
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0A0907]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,111,74,0.2)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <svg viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-full max-h-[220px] w-full select-none p-4" role="img" aria-label={`${company}: ${role}`}>
        <rect x="30" y="30" width="400" height="64" rx="8" fill="#14110E" stroke="#C96F4A" strokeWidth="1.5" />
        <text x="230" y="58" textAnchor="middle" fill="#FFD6A1" fontSize="13" fontFamily="monospace" fontWeight="bold">
          {company.toUpperCase().slice(0, 28)}
        </text>
        <text x="230" y="78" textAnchor="middle" fill="rgba(255,250,240,0.6)" fontSize="9.5" fontFamily="monospace">
          {role.toUpperCase().slice(0, 44)}
        </text>
        {nodes.map((tag, i) => {
          const cx = 30 + slotW * i + slotW / 2;
          return (
            <g key={tag}>
              <path d={`M230 94 L230 118 L${cx} 118 L${cx} 138`} stroke="#C96F4A" strokeWidth="1.2" strokeDasharray="3 3" />
              <rect x={cx - slotW / 2 + 6} y="138" width={slotW - 12} height="44" rx="6" fill="#100E0C" stroke="rgba(255,250,240,0.2)" />
              <text x={cx} y="165" textAnchor="middle" fill="#F6F0E2" fontSize="9" fontFamily="monospace" fontWeight="600">
                {tag.slice(0, 14)}
              </text>
              <circle cx={cx} cy="138" r="3" fill="#C96F4A" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}