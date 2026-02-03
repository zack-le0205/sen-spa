import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const SERVICES = [
    { id: 1, category: "Massage", name: "Swedish Massage", duration: "60 min", price: 95, icon: "🧖", description: "A classic relaxation massage that eases muscle tension and promotes calm." },
    { id: 2, category: "Massage", name: "Deep Tissue", duration: "75 min", price: 120, icon: "💆", description: "Targets deeper muscle layers to relieve chronic pain and tension." },
    { id: 3, category: "Massage", name: "Hot Stone", duration: "90 min", price: 140, icon: "🪨", description: "Smooth heated stones melt away stress for ultimate relaxation." },
    { id: 4, category: "Facial", name: "Anti-Aging Facial", duration: "60 min", price: 110, icon: "✨", description: "Advanced treatment to rejuvenate skin and reduce fine lines." },
    { id: 5, category: "Facial", name: "Hydrating Facial", duration: "45 min", price: 85, icon: "💎", description: "Deep moisture infusion for radiant, glowing skin." },
    { id: 6, category: "Facial", name: "Vitamin C Facial", duration: "50 min", price: 95, icon: "🍋", description: "Brightening treatment that evens skin tone and adds luminosity." },
    { id: 7, category: "Body", name: "Body Scrub", duration: "60 min", price: 90, icon: "🌸", description: "Exfoliating treatment that reveals soft, silky smooth skin." },
    { id: 8, category: "Body", name: "Aromatherapy Bath", duration: "45 min", price: 75, icon: "🛁", description: "A soothing bath experience infused with essential oils." },
    { id: 9, category: "Body", name: "Wrap Treatment", duration: "60 min", price: 105, icon: "🌿", description: "Detoxifying body wrap that firms and nourishes the skin." },
];

const THERAPISTS = [
    { name: "Amara Singh", role: "Senior Massage Therapist", avatar: "AS", experience: "12 years", specialties: ["Swedish", "Deep Tissue", "Hot Stone"] },
    { name: "Luna Park", role: "Facial Specialist", avatar: "LP", experience: "8 years", specialties: ["Anti-Aging", "Hydrating", "Vitamin C"] },
    { name: "Mia Chen", role: "Body Treatment Expert", avatar: "MC", experience: "10 years", specialties: ["Scrubs", "Wraps", "Aromatherapy"] },
    { name: "Sofia Reyes", role: "Holistic Therapist", avatar: "SR", experience: "15 years", specialties: ["All Services"] },
];

const TESTIMONIALS = [
    { name: "Rebecca M.", rating: 5, text: "Absolutely the most relaxing experience of my life. The hot stone massage was incredible — I left feeling like a completely new person.", avatar: "RM" },
    { name: "James K.", rating: 5, text: "The deep tissue massage truly fixed months of back pain. Amara is incredibly skilled and intuitive. Already booked my next session!", avatar: "JK" },
    { name: "Priya L.", rating: 5, text: "The anti-aging facial exceeded every expectation. My skin literally glows now. The whole atmosphere is so calming.", avatar: "PL" },
];

const TIME_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"];
const CATEGORIES = ["All", "Massage", "Facial", "Body"];

// ─── TINY HELPERS ────────────────────────────────────────────────────────────
const Stars = ({ count = 5 }) => Array.from({ length: count }, (_, i) => <span key={i} style={{ color: "#d4a853", fontSize: 18 }}>★</span>);

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            background: scrolled ? "rgba(15,10,10,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(212,168,83,0.15)" : "none",
            transition: "all 0.4s ease",
            padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#d4a853,#b8893a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>S</div>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#d4a853", letterSpacing: 1 }}>Sen</span>
            </div>
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                {["Home", "Services", "About", "Contact"].map(item => (
                    <button key={item} onClick={() => setActive(item.toLowerCase())} style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: active === item.toLowerCase() ? "#d4a853" : "rgba(255,255,255,0.75)",
                        fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase",
                        paddingBottom: 4, borderBottom: active === item.toLowerCase() ? "1px solid #d4a853" : "1px solid transparent",
                        transition: "all 0.3s",
                    }}>{item}</button>
                ))}
                <button onClick={() => setActive("book")} style={{
                    background: "linear-gradient(135deg,#d4a853,#b8893a)", border: "none", borderRadius: 24,
                    color: "#fff", padding: "9px 24px", fontFamily: "'Raleway', sans-serif", fontSize: 13,
                    fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", cursor: "pointer",
                    boxShadow: "0 4px 18px rgba(212,168,83,0.35)", transition: "transform 0.2s, box-shadow 0.2s",
                }}
                    onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 24px rgba(212,168,83,0.5)"; }}
                    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 18px rgba(212,168,83,0.35)"; }}
                >Book Now</button>
            </div>
        </nav>
    );
}

function Hero({ setActive }) {
    return (
        <section style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(170deg, #0f0a0a 0%, #1a1210 40%, #0f0a0a 100%)",
            position: "relative", overflow: "hidden", padding: "0 32px",
        }}>
            {/* Decorative orbs */}
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 70%)", top: "10%", left: "-10%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)", bottom: "5%", right: "-8%", pointerEvents: "none" }} />
            {/* Fine grid texture */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,168,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

            <div style={{ textAlign: "center", position: "relative", zIndex: 2, maxWidth: 740 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.25)", borderRadius: 30, padding: "7px 18px", marginBottom: 30 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4a853", boxShadow: "0 0 8px #d4a853" }} />
                    <span style={{ color: "#d4a853", fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Now Accepting Bookings</span>
                </div>
                <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, margin: "0 0 12px" }}>
                    Indulge in<br /><span style={{ color: "#d4a853", fontStyle: "italic" }}>Pure Relaxation</span>
                </h1>
                <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Raleway', sans-serif", fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px" }}>
                    Experience the art of rejuvenation at Sen. Curated treatments designed to restore your mind, body, and spirit.
                </p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={() => setActive("book")} style={{
                        background: "linear-gradient(135deg,#d4a853,#b8893a)", border: "none", borderRadius: 30,
                        color: "#fff", padding: "15px 38px", fontFamily: "'Raleway', sans-serif", fontSize: 14,
                        fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
                        boxShadow: "0 6px 28px rgba(212,168,83,0.4)", transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                        onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 36px rgba(212,168,83,0.55)"; }}
                        onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 28px rgba(212,168,83,0.4)"; }}
                    >Book a Session</button>
                    <button onClick={() => setActive("services")} style={{
                        background: "transparent", border: "1px solid rgba(212,168,83,0.4)", borderRadius: 30,
                        color: "#d4a853", padding: "15px 38px", fontFamily: "'Raleway', sans-serif", fontSize: 14,
                        fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s",
                    }}
                        onMouseEnter={e => { e.target.style.background = "rgba(212,168,83,0.1)"; e.target.style.borderColor = "#d4a853"; }}
                        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(212,168,83,0.4)"; }}
                    >Our Services</button>
                </div>
                {/* Stats row */}
                <div style={{ display: "flex", gap: 56, justifyContent: "center", marginTop: 72, flexWrap: "wrap" }}>
                    {[["2,400+", "Happy Clients"], ["15+", "Expert Therapists"], ["25", "Years Experience"]].map(([val, lbl]) => (
                        <div key={lbl} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#d4a853" }}>{val}</div>
                            <div style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{lbl}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SectionHeader({ title, subtitle, gold }) {
    return (
        <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ color: "#d4a853", fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{subtitle}</span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 700, color: "#fff", margin: "12px 0 0" }}>
                {title.split("||").map((part, i) => i === 1 ? <span key={i} style={{ color: "#d4a853", fontStyle: "italic" }}>{part}</span> : <span key={i}>{part}</span>)}
            </h2>
            <div style={{ width: 50, height: 2, background: "linear-gradient(90deg,#d4a853,#b8893a)", margin: "20px auto 0", borderRadius: 1 }} />
        </div>
    );
}

function Services({ setActive }) {
    const [cat, setCat] = useState("All");
    const filtered = cat === "All" ? SERVICES : SERVICES.filter(s => s.category === cat);
    return (
        <section style={{ background: "#0f0a0a", padding: "100px 32px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <SectionHeader title={"Our ||Services"} subtitle="What We Offer" />
                {/* Category pills */}
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
                    {CATEGORIES.map(c => (
                        <button key={c} onClick={() => setCat(c)} style={{
                            background: cat === c ? "linear-gradient(135deg,#d4a853,#b8893a)" : "rgba(255,255,255,0.05)",
                            border: cat === c ? "none" : "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 24, padding: "8px 22px", color: cat === c ? "#fff" : "rgba(255,255,255,0.6)",
                            fontFamily: "'Raleway', sans-serif", fontSize: 13, letterSpacing: 1, cursor: "pointer", transition: "all 0.3s",
                        }}>{c}</button>
                    ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 22 }}>
                    {filtered.map(s => (
                        <div key={s.id} style={{
                            background: "linear-gradient(145deg, rgba(30,22,18,1), rgba(22,16,14,1))",
                            border: "1px solid rgba(212,168,83,0.12)", borderRadius: 18, padding: 28,
                            transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", cursor: "pointer",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.35)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.12)"; }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(212,168,83,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.icon}</div>
                                <span style={{ background: "rgba(212,168,83,0.12)", color: "#d4a853", borderRadius: 20, padding: "4px 14px", fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: 1 }}>{s.category}</span>
                            </div>
                            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 20, margin: "0 0 6px", fontWeight: 600 }}>{s.name}</h3>
                            <p style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'Raleway', sans-serif", fontSize: 13, lineHeight: 1.6, margin: "0 0 18px" }}>{s.description}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", gap: 16 }}>
                                    <span style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Raleway', sans-serif", fontSize: 12 }}>⏱ {s.duration}</span>
                                </div>
                                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#d4a853", fontSize: 22, fontWeight: 700 }}>${s.price}</span>
                            </div>
                            <button onClick={() => setActive("book")} style={{
                                width: "100%", marginTop: 18, background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.25)",
                                borderRadius: 10, padding: "10px 0", color: "#d4a853", fontFamily: "'Raleway', sans-serif",
                                fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.25s",
                            }}
                                onMouseEnter={e => { e.target.style.background = "rgba(212,168,83,0.18)"; }}
                                onMouseLeave={e => { e.target.style.background = "rgba(212,168,83,0.08)"; }}
                            >Book Now →</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section style={{ background: "#110d0d", padding: "100px 32px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <SectionHeader title={"Meet Our ||Experts"} subtitle="Our Team" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
                    {THERAPISTS.map(t => (
                        <div key={t.name} style={{
                            background: "linear-gradient(145deg, rgba(30,22,18,1), rgba(22,16,14,1))",
                            border: "1px solid rgba(212,168,83,0.1)", borderRadius: 20, overflow: "hidden",
                            transition: "transform 0.3s, box-shadow 0.3s",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.45)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                            <div style={{ height: 140, background: "linear-gradient(135deg,#1e1612,#2a1f18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#d4a853,#b8893a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#fff", boxShadow: "0 4px 20px rgba(212,168,83,0.35)" }}>{t.avatar}</div>
                            </div>
                            <div style={{ padding: "22px 22px 24px" }}>
                                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 19, margin: "0 0 4px", fontWeight: 600 }}>{t.name}</h3>
                                <p style={{ color: "#d4a853", fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: 1, margin: "0 0 10px", textTransform: "uppercase" }}>{t.role}</p>
                                <p style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Raleway', sans-serif", fontSize: 12, margin: "0 0 14px" }}>✦ {t.experience} of experience</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {t.specialties.map(sp => (
                                        <span key={sp} style={{ background: "rgba(212,168,83,0.1)", color: "rgba(255,255,255,0.55)", borderRadius: 14, padding: "3px 10px", fontFamily: "'Raleway', sans-serif", fontSize: 11 }}>{sp}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div style={{ marginTop: 90 }}>
                    <SectionHeader title={"Client ||Testimonials"} subtitle="Kind Words" />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 22 }}>
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} style={{
                                background: "linear-gradient(145deg, rgba(30,22,18,1), rgba(22,16,14,1))",
                                border: "1px solid rgba(212,168,83,0.1)", borderRadius: 18, padding: 28, position: "relative",
                            }}>
                                <div style={{ position: "absolute", top: 18, right: 22, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, color: "rgba(212,168,83,0.06)", lineHeight: 1, fontWeight: 700 }}>"</div>
                                <div style={{ marginBottom: 14 }}><Stars count={t.rating} /></div>
                                <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Raleway', sans-serif", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{t.text}"</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#d4a853,#b8893a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                                    <span style={{ color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 600 }}>{t.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function BookingModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState({ service: null, therapist: null, date: "", time: "", name: "", email: "", phone: "" });
    const [submitted, setSubmitted] = useState(false);

    const catFiltered = (cat) => SERVICES.filter(s => s.category === cat);
    const serviceCats = [...new Set(SERVICES.map(s => s.category))];

    const updateField = (key, val) => setSelected(prev => ({ ...prev, [key]: val }));

    const canNext = () => {
        if (step === 1) return selected.service !== null;
        if (step === 2) return selected.therapist !== null && selected.date && selected.time;
        if (step === 3) return selected.name && selected.email && selected.phone;
        return false;
    };

    if (submitted) {
        return (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
                <div style={{ background: "linear-gradient(145deg,#1e1612,#1a1410)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: 24, padding: "56px 48px", maxWidth: 460, width: "90%", textAlign: "center" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(212,168,83,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32 }}>✓</div>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 28, margin: "0 0 12px" }}>Booking Confirmed!</h2>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Raleway', sans-serif", fontSize: 14, lineHeight: 1.7, margin: "0 0 8px" }}>
                        <strong style={{ color: "#d4a853" }}>{selected.service?.name}</strong> with {selected.therapist?.name}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Raleway', sans-serif", fontSize: 13, margin: "0 0 32px" }}>
                        {selected.date} at {selected.time} · {selected.service?.duration}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Raleway', sans-serif", fontSize: 13, margin: "0 0 28px" }}>
                        A confirmation email has been sent to <strong style={{ color: "#d4a853" }}>{selected.email}</strong>
                    </p>
                    <button onClick={onClose} style={{
                        background: "linear-gradient(135deg,#d4a853,#b8893a)", border: "none", borderRadius: 24,
                        color: "#fff", padding: "12px 36px", fontFamily: "'Raleway', sans-serif", fontSize: 13,
                        fontWeight: 600, letterSpacing: 1.2, cursor: "pointer",
                    }}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", padding: 16 }}>
            <div style={{ background: "linear-gradient(145deg,#1e1612,#1a1410)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: 24, maxWidth: 680, width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "36px 32px" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 24, margin: 0 }}>Book a Session</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 22, cursor: "pointer" }}>✕</button>
                </div>
                {/* Step indicator */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 28 }}>
                    {["Service", "Schedule", "Details"].map((label, i) => {
                        const idx = i + 1;
                        const active = step === idx;
                        const done = step > idx;
                        return (
                            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? "linear-gradient(135deg,#d4a853,#b8893a)" : active ? "rgba(212,168,83,0.2)" : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: done || active ? "#d4a853" : "rgba(255,255,255,0.3)", fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 700 }}>
                                    {done ? "✓" : idx}
                                </div>
                                <span style={{ color: active ? "#d4a853" : "rgba(255,255,255,0.35)", fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>
                                {i < 2 && <div style={{ width: 28, height: 1, background: done ? "rgba(212,168,83,0.4)" : "rgba(255,255,255,0.1)" }} />}
                            </div>
                        );
                    })}
                </div>

                {/* Step 1: Service */}
                {step === 1 && (
                    <div>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Raleway', sans-serif", fontSize: 13, marginBottom: 20 }}>Choose the service you'd like to enjoy.</p>
                        {serviceCats.map(cat => (
                            <div key={cat} style={{ marginBottom: 18 }}>
                                <p style={{ color: "#d4a853", fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px", fontWeight: 600 }}>{cat}</p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                    {catFiltered(cat).map(s => {
                                        const picked = selected.service?.id === s.id;
                                        return (
                                            <div key={s.id} onClick={() => updateField("service", s)} style={{
                                                background: picked ? "rgba(212,168,83,0.12)" : "rgba(255,255,255,0.04)",
                                                border: picked ? "1px solid rgba(212,168,83,0.5)" : "1px solid rgba(255,255,255,0.08)",
                                                borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.25s",
                                            }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <span style={{ color: "#fff", fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 600 }}>{s.icon} {s.name}</span>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                                                    <span style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Raleway', sans-serif", fontSize: 11 }}>{s.duration}</span>
                                                    <span style={{ color: "#d4a853", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700 }}>${s.price}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Step 2: Schedule */}
                {step === 2 && (
                    <div>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Raleway', sans-serif", fontSize: 13, marginBottom: 20 }}>Pick your therapist, date, and preferred time.</p>
                        <p style={{ color: "#d4a853", fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px", fontWeight: 600 }}>Therapist</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8, marginBottom: 22 }}>
                            {THERAPISTS.map(t => {
                                const picked = selected.therapist?.name === t.name;
                                return (
                                    <div key={t.name} onClick={() => updateField("therapist", t)} style={{
                                        background: picked ? "rgba(212,168,83,0.12)" : "rgba(255,255,255,0.04)",
                                        border: picked ? "1px solid rgba(212,168,83,0.5)" : "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: 12, padding: "12px 10px", textAlign: "center", cursor: "pointer", transition: "all 0.25s",
                                    }}>
                                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#d4a853,#b8893a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                                        <p style={{ color: "#fff", fontFamily: "'Raleway', sans-serif", fontSize: 12, margin: 0, fontWeight: 600 }}>{t.name.split(" ")[0]}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <p style={{ color: "#d4a853", fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px", fontWeight: 600 }}>Date</p>
                        <input type="date" value={selected.date} onChange={e => updateField("date", e.target.value)} style={{
                            width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 10, padding: "11px 14px", color: "#fff", fontFamily: "'Raleway', sans-serif", fontSize: 14, marginBottom: 18,
                            colorScheme: "dark", outline: "none",
                        }} />

                        <p style={{ color: "#d4a853", fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px", fontWeight: 600 }}>Time</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px,1fr))", gap: 7 }}>
                            {TIME_SLOTS.map(t => {
                                const picked = selected.time === t;
                                return (
                                    <div key={t} onClick={() => updateField("time", t)} style={{
                                        background: picked ? "linear-gradient(135deg,#d4a853,#b8893a)" : "rgba(255,255,255,0.05)",
                                        border: picked ? "none" : "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: 8, padding: "8px 4px", textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                                        color: picked ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 600,
                                    }}>{t}</div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                    <div>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Raleway', sans-serif", fontSize: 13, marginBottom: 20 }}>Almost done — just a few details to confirm your booking.</p>
                        {/* Summary card */}
                        <div style={{ background: "rgba(212,168,83,0.07)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: 14, padding: "16px 20px", marginBottom: 24 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 600 }}>{selected.service?.name}</span>
                                <span style={{ color: "#d4a853", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700 }}>${selected.service?.price}</span>
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Raleway', sans-serif", fontSize: 12, margin: "6px 0 0" }}>
                                {selected.therapist?.name} · {selected.date} at {selected.time} · {selected.service?.duration}
                            </p>
                        </div>
                        {[["name", "Full Name", "👤"], ["email", "Email Address", "✉"], ["phone", "Phone Number", "📞"]].map(([key, placeholder, icon]) => (
                            <div key={key} style={{ marginBottom: 14 }}>
                                <input type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} placeholder={placeholder} value={selected[key]} onChange={e => updateField(key, e.target.value)} style={{
                                    width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 10, padding: "13px 16px", color: "#fff", fontFamily: "'Raleway', sans-serif", fontSize: 14, outline: "none",
                                }} placeholder={`${icon} ${placeholder}`} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Nav buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                    <button onClick={() => setStep(s => s - 1)} style={{
                        background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10,
                        color: "rgba(255,255,255,0.6)", padding: "10px 24px", fontFamily: "'Raleway', sans-serif", fontSize: 13, cursor: step === 1 ? "not-allowed" : "pointer", opacity: step === 1 ? 0.3 : 1,
                    }} disabled={step === 1}>← Back</button>
                    <button
                        onClick={() => { if (step < 3) setStep(s => s + 1); else setSubmitted(true); }}
                        disabled={!canNext()}
                        style={{
                            background: canNext() ? "linear-gradient(135deg,#d4a853,#b8893a)" : "rgba(212,168,83,0.25)",
                            border: "none", borderRadius: 10, color: canNext() ? "#fff" : "rgba(255,255,255,0.4)",
                            padding: "10px 28px", fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 600,
                            letterSpacing: 1, cursor: canNext() ? "pointer" : "not-allowed", transition: "all 0.25s",
                        }}
                    >{step < 3 ? "Continue →" : "Confirm Booking"}</button>
                </div>
            </div>
        </div>
    );
}

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    return (
        <section style={{ background: "#0f0a0a", padding: "100px 32px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <SectionHeader title={"Get In ||Touch"} subtitle="Contact Us" />
                {sent ? (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
                        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 22, margin: "0 0 8px" }}>Message Sent!</h3>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Raleway', sans-serif", fontSize: 14 }}>We'll get back to you within 24 hours.</p>
                        <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} style={{ marginTop: 18, background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.3)", borderRadius: 20, color: "#d4a853", padding: "8px 22px", fontFamily: "'Raleway', sans-serif", fontSize: 13, cursor: "pointer" }}>Send Another</button>
                    </div>
                ) : (
                    <div style={{ display: "grid", gap: 16 }}>
                        {["name", "email"].map(key => (
                            <input key={key} type={key === "email" ? "email" : "text"} placeholder={key === "name" ? "Your Name" : "Your Email"} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{
                                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                                padding: "14px 18px", color: "#fff", fontFamily: "'Raleway', sans-serif", fontSize: 14, outline: "none",
                            }} />
                        ))}
                        <textarea placeholder="Your Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} style={{
                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                            padding: "14px 18px", color: "#fff", fontFamily: "'Raleway', sans-serif", fontSize: 14, resize: "vertical", outline: "none",
                        }} />
                        <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }} style={{
                            background: "linear-gradient(135deg,#d4a853,#b8893a)", border: "none", borderRadius: 12,
                            color: "#fff", padding: "14px", fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 600,
                            letterSpacing: 1.2, textTransform: "uppercase", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 24px rgba(212,168,83,0.4)"; }}
                            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
                        >Send Message</button>
                    </div>
                )}
                {/* Contact info row */}
                <div style={{ display: "flex", gap: 40, marginTop: 56, justifyContent: "center", flexWrap: "wrap" }}>
                    {[["📍", "Saugus, Massachusetts"], ["📞", "+1 (617) 797-4097"], ["✉", "zackle0205@gmail.com"]].map(([icon, text]) => (
                        <div key={text} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                            <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Raleway', sans-serif", fontSize: 13, margin: 0 }}>{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer style={{ background: "#0b0808", borderTop: "1px solid rgba(212,168,83,0.1)", padding: "48px 32px 28px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#d4a853,#b8893a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>S</div>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#d4a853" }}>Sen</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Raleway', sans-serif", fontSize: 12, margin: 0 }}>© 2026 Sen Spa & Beauty. Built by Zack Le.</p>
            </div>
        </footer>
    );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
    const [page, setPage] = useState("home");
    const [bookingOpen, setBookingOpen] = useState(false);

    const navigate = (target) => {
        if (target === "book") { setBookingOpen(true); return; }
        setPage(target);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Google Fonts injection
    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Raleway:wght@300;400;500;600;700&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);

    return (
        <div style={{ background: "#0f0a0a", minHeight: "100vh", fontFamily: "'Raleway', sans-serif" }}>
            <Nav active={page} setActive={navigate} />
            {page === "home" && <><Hero setActive={navigate} /><Services setActive={navigate} /><About /><Contact /></>}
            {page === "services" && <><div style={{ height: 68 }} /><Services setActive={navigate} /></>}
            {page === "about" && <><div style={{ height: 68 }} /><About /></>}
            {page === "contact" && <><div style={{ height: 68 }} /><Contact /></>}
            <Footer />
            {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
        </div>
    );
}
