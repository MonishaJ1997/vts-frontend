import { useRef, useEffect, useState } from "react";
import axios from "axios";
  const BASE_URL = "http://127.0.0.1:8000";

 
  
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

@keyframes lineFlow {
  0%   { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.hiw-wrap {
  font-family: 'Nunito', sans-serif;
  background: #fff;
  padding: 52px 28px 68px;
  min-height: 100vh;
}
.hiw-title {
  text-align: center;
  font-weight: 900;
  font-size: 26px;
  color: #1a1a1a;
  margin-bottom: 5px;
}
.hiw-subtitle {
  text-align: center;
  font-size: 14.5px;
  color: #777;
  margin-bottom: 44px;
}
.hiw-outer {
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
}
.hiw-student {
  position: absolute;
  top: -56px;
  right: -8px;
  width: 170px;
  object-fit: contain;
  object-position: bottom;
  z-index: 30;
  pointer-events: none;
}
.hiw-box {
  position: relative;
  margin-right: 152px;
}

/* ── TOP LINE ── gap below = 20px before cards start */
.hiw-line-top {
  height: 7px;
  border-radius: 10px;
  background: linear-gradient(90deg, #7c3aed 0%, #c4aee8 50%, #c8c8c8 100%);
  position: relative;
  z-index: 2;
  margin-bottom: 20px;   /* ← GAP between top line and cards */
}

/* ── BOTTOM LINE ── gap above = 20px after cards end */
.hiw-line-bot {
  height: 7px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    #7c3aed 0%, #b87ef5 18%, #d4895a 36%,
    #e8b870 54%, #f0d048 72%, #7c3aed 100%
  );
  background-size: 250% 100%;
  animation: lineFlow 3s linear infinite;
  position: relative;
  z-index: 2;
  margin-top: 20px;      /* ← GAP between cards and bottom line */
}

/* SVG — only draws inside the bottom gap zone */
.hiw-svg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow: visible;
  pointer-events: none;
  z-index: 6;
}

/* Cards row */
.hiw-cards {
  display: flex;
  flex-wrap: nowrap;
  gap: 14px;
  position: relative;
  z-index: 4;
}
.hiw-card-col {
  flex: 1 1 0;
  min-width: 0;
}

/* All cards same warm peach */
.step-card {
  border-radius: 14px;
  min-height: 252px;
  padding: 20px 16px 22px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: #F5C98A;
  box-shadow: 0 4px 18px rgba(0,0,0,0.07);
  transition: transform .28s ease, box-shadow .28s ease;
}
.step-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 18px 42px rgba(0,0,0,0.12);
}
.card-patch {
  position: absolute;
  bottom: 0; right: 0;
  width: 48%; height: 30%;
  border-radius: 0 0 14px 0;
  pointer-events: none;
  z-index: 0;
}
.patch-1 { background: #E8913A; }
.patch-2 { background: #C8956A; }
.patch-3 { background: #B8A890; }
.patch-4 { background: #E8A820; }

.step-icon {
  font-size: 46px; line-height: 1;
  display: block; margin-bottom: 2px;
  position: relative; z-index: 1;
}
.step-num {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: #5b21b6;
  color: #fff;
  font-weight: 800; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  margin: 10px 0 14px;
  flex-shrink: 0;
  box-shadow: 0 3px 14px rgba(91,33,182,0.42);
  position: relative; z-index: 1;
}
.step-card h5 {
  font-weight: 900; font-size: 16px; color: #1a1a1a;
  margin-bottom: 6px;
  position: relative; z-index: 1;
}
.step-card p {
  font-size: 13px; color: #444; line-height: 1.55;
  position: relative; z-index: 1;
}
`;

const STEPS = [
  { id:1, num:1, icon:"📋", title:"Register",    desc:"Choose course and sign up",     patch:"patch-1" },
  { id:2, num:2, icon:"🎓", title:"Attend",      desc:"Join live training sessions",    patch:"patch-2" },
  { id:3, num:3, icon:"💻", title:"Practice",    desc:"Complete tasks and projects",    patch:"patch-3" },
  { id:4, num:4, icon:"🏆", title:"Certificate", desc:"Get certified after completion", patch:"patch-4" },
];

export default function HowVTSWorks() {
  const boxRef  = useRef(null);
  const topRef  = useRef(null);
  const botRef  = useRef(null);
  const colRefs = useRef([]);
  const [d, setD]   = useState(null);

const [whyChoose, setWhyChoose] = useState({});
  useEffect(() => {
  axios.get(`${BASE_URL}/why-choose-us/`)
    .then(res => setWhyChoose(res.data))
    .catch(err => console.log(err));
}, []);
  useEffect(() => {
    function measure() {
      const box   = boxRef.current;
      const topEl = topRef.current;
      const botEl = botRef.current;
      const cols  = colRefs.current.filter(Boolean);
      if (!box || !topEl || !botEl || !cols.length) return;

      const bR  = box.getBoundingClientRect();
      const tR  = topEl.getBoundingClientRect();
      const boR = botEl.getBoundingClientRect();
      const c0  = cols[0].getBoundingClientRect();

      const topLineY   = tR.top  + tR.height  / 2 - bR.top;  // centre of top line
      const botLineY   = boR.top + boR.height / 2 - bR.top;  // centre of bot line
      const cardTop    = c0.top    - bR.top;                  // top edge of cards
      const cardBottom = c0.bottom - bR.top;                  // bottom edge of cards
      const W          = bR.width;

      /*
        bracketTopY    = cardBottom + 30% of the bottom gap
                       = starts 30% into the gap BELOW the card
        bracketBottomY = botLineY   (touches the bottom line)

        So the bracket floats entirely in the bottom gap,
        starting 30% down from where card ends.
      */
      const bottomGap    = botLineY - cardBottom;             // total gap below card
      const bracketTopY  = cardBottom + bottomGap * 0.10;    // 10% into gap = near card bottom
      // We want bracket to span 30% of total card height visible in the gap
      // So bracket height = 30% of card height, anchored to botLineY
      const bracketStartY = botLineY - (c0.height * 0.30);   // 30% of card height up from bot line

      const gaps = [];
      for (let i = 0; i < cols.length - 1; i++) {
        const a = cols[i].getBoundingClientRect();
        const b = cols[i+1].getBoundingClientRect();
        gaps.push({
          x1: a.right - bR.left,
          x2: b.left  - bR.left,
        });
      }

      setD({ W, topLineY, botLineY, cardBottom, bracketStartY, gaps });
    }

    const t = setTimeout(measure, 150);
    const ro = new ResizeObserver(measure);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, []);

  const ARM  = 56;
  const SIDE = -10; // px gap from card edge so L-brackets don't touch cards

  return (
    <>
      <style>{CSS}</style>
      <div className="hiw-wrap">
        <h2 className="hiw-title">How VTS Works</h2>
        <p className="hiw-subtitle">Your Journey from Student to Tech Professional</p>

        <div className="hiw-outer">
          {whyChoose.left_image && (
                <img src={whyChoose.left_image} alt="Why Choose Us" className="img-fluid rounded" />
              )}

          <div className="hiw-box" ref={boxRef}>

            {/* TOP LINE — 20px gap below before cards */}
            <div className="hiw-line-top" ref={topRef} />

            {/* CARDS */}
            <div className="hiw-cards">
              {STEPS.map((s, i) => (
                <div key={s.id} className="hiw-card-col" ref={el => (colRefs.current[i] = el)}>
                  <div className="step-card">
                    <div className={`card-patch ${s.patch}`} />
                    <span className="step-icon">{s.icon}</span>
                    <div className="step-num">{s.num}</div>
                    <h5>{s.title}</h5>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM LINE — 20px gap above after cards */}
            <div className="hiw-line-bot" ref={botRef} />

            {/* SVG — all connectors drawn ONLY inside the bottom gap */}
            {d && (
              <svg className="hiw-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="gPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                  <linearGradient id="gGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>

                {/*
                  BETWEEN-CARD  |‾‾|  BRACKETS
                  ────────────────────────────────────────────
                  Live entirely inside the bottom gap zone:
                    top of bracket  = bracketStartY
                                      (= botLineY - 30% of cardHeight)
                                      floats in the gap, does NOT touch card
                    bottom          = botLineY (merges into bottom line)

                  Shape:
                       |‾‾‾|
                       |   |
                  ─────┘   └─────  ← bottom line
                ────────────────────────────────────────────
                */}
                {d.gaps.map((g, i) => {
                  const lx = g.x1 + 2;
                  const rx = g.x2 - 2;
                  return (
                    <g key={i}>
                      {/* top cap */}
                      <line
                        x1={lx} y1={d.bracketStartY}
                        x2={rx} y2={d.bracketStartY}
                        stroke="#c8bedd" strokeWidth={1.8} strokeLinecap="round"
                      />
                      {/* left leg */}
                      <line
                        x1={lx} y1={d.bracketStartY}
                        x2={lx} y2={d.botLineY}
                        stroke="#c8bedd" strokeWidth={1.8} strokeLinecap="round"
                      />
                      {/* right leg */}
                      <line
                        x1={rx} y1={d.bracketStartY}
                        x2={rx} y2={d.botLineY}
                        stroke="#c8bedd" strokeWidth={1.8} strokeLinecap="round"
                      />
                    </g>
                  );
                })}

                {/*
                  LEFT PURPLE L-BRACKET
                  Floats in bottom gap only: bracketStartY → botLineY
                  Then arm right at botLineY
                */}
                <polyline
                  points={`${SIDE},${d.bracketStartY} ${SIDE},${d.botLineY} ${SIDE + ARM},${d.botLineY}`}
                  fill="none"
                  stroke="url(#gPurple)"
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/*
                  RIGHT GOLD L-BRACKET
                  Floats in bottom gap only: bracketStartY → botLineY
                  Then arm left at botLineY
                */}
                <polyline
                  points={`${d.W-SIDE},${d.bracketStartY} ${d.W-SIDE},${d.botLineY} ${d.W-SIDE-ARM},${d.botLineY}`}
                  fill="none"
                  stroke="url(#gGold)"
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>
            )}

          </div>
        </div>
      </div>
    </>
  );
}