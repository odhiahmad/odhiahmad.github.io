"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./lang";
import { Icon } from "./icons";
import { CV, PROJECTS, SKILLS, SITE, STATS, type Project } from "@/lib/content";
import { DICT, ROLES, resolve } from "@/lib/dict";

/* ---------------- small building blocks ---------------- */

function Html({ value, className }: { value: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: value }} />;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[length:var(--t-xs)] font-semibold leading-none text-accent">
      {children}
    </span>
  );
}

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="head reveal text-[length:var(--t-2xl)] font-extrabold">{title}</h2>
      {sub && <p className="reveal mt-2 max-w-2xl text-[length:var(--t-base)] text-muted">{sub}</p>}
    </div>
  );
}

/* ---------------- typing effect ---------------- */
function Typed() {
  const { lang } = useLang();
  const [text, setText] = useState("");
  const ref = useRef({ roles: ROLES.id, i: 0, c: 0, del: false, timer: 0 as number | ReturnType<typeof setTimeout> });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = ref.current;
    st.roles = ROLES[lang];
    st.i = 0;
    st.c = 0;
    st.del = false;
    if (reduce) {
      setText(st.roles[0]);
      return;
    }
    const tick = () => {
      const word = st.roles[st.i];
      st.c += st.del ? -1 : 1;
      if (st.c < 0) st.c = 0;
      setText(word.slice(0, st.c));
      let delay = st.del ? 40 : 85;
      if (!st.del && st.c >= word.length) {
        delay = 1800;
        st.del = true;
      } else if (st.del && st.c === 0) {
        st.del = false;
        st.i = (st.i + 1) % st.roles.length;
        delay = 350;
      }
      st.timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(st.timer as ReturnType<typeof setTimeout>);
  }, [lang]);

  return (
    // two lines are reserved below sm: the longer roles wrap on phones, and a
    // 1-line reservation made the whole hero jump on every word change
    <span className="block min-h-[2.5em] sm:min-h-[1.3em]">
      <span className="grad-text">{text}</span>
      <span className="caret" />
    </span>
  );
}

/* ---------------- animated counter ---------------- */
function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          obs.unobserve(node);
          if (reduce) {
            setVal(target);
            return;
          }
          let start: number | null = null;
          const step = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / 1400, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div ref={el} className="text-[length:var(--t-2xl)] font-extrabold leading-none text-accent tabular-nums">
      {val}+
    </div>
  );
}

/* ---------------- project card ---------------- */
function ProjectCard({ p, onZoom }: { p: Project; onZoom: (src: string, alt: string) => void }) {
  const { t, lang } = useLang();
  const card = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={card}
      className="glow-card reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
      onMouseMove={(e) => {
        const r = card.current!.getBoundingClientRect();
        card.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className="hide-scrollbar snap-x-start flex gap-2.5 overflow-x-auto border-b border-border bg-bg-soft p-3.5 sm:p-4">
        {p.images.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            onClick={() => onZoom(img.src, img.alt)}
            className="h-[150px] w-auto max-w-none cursor-zoom-in rounded-lg border border-border transition-transform duration-300 hover:scale-105 hover:border-accent sm:h-[168px]"
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-[length:var(--t-lg)] font-bold transition-colors group-hover:text-accent">{p.title}</h3>
          <span className="mt-0.5 shrink-0 whitespace-nowrap text-[length:var(--t-xs)] font-medium text-muted">
            {t(p.year)}
          </span>
        </div>
        <div className="mb-2.5 text-[length:var(--t-sm)] font-semibold text-accent-2">{t(p.tagKey)}</div>
        <p className="flex-1 text-[length:var(--t-sm)] leading-relaxed text-muted">{t(p.descKey)}</p>
        {p.link && (
          <div className="mt-4">
            <a
              href={p.link.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-[length:var(--t-sm)] font-semibold text-accent hover:underline"
            >
              <span>{lang === "id" ? p.link.labelId : p.link.labelEn}</span>
              <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- sidebar (Sidefolio-style) ---------------- */
const NAV = [
  ["featured", "nav.featured"],
  ["projects", "nav.projects"],
  ["cv", "nav.cv"],
  ["skills", "nav.skills"],
  ["contact", "nav.contact"],
];

/* Segmented ID|EN control — used in the desktop sidebar where width is free. */
function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex shrink-0 overflow-hidden rounded-full border border-border bg-card">
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1.5 text-[0.75rem] font-bold uppercase tracking-wide transition-colors ${
            lang === l ? "bg-accent text-white" : "text-muted hover:text-text"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* Mobile: a single 44px button showing the language you'd switch TO. The
   segmented version cost ~86px of a ~280px bar and truncated the name. */
function LangToggleCompact() {
  const { lang, setLang } = useLang();
  const next = lang === "id" ? "en" : "id";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card text-[0.8rem] font-bold uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {next}
    </button>
  );
}

function Sidebar({ active }: { active: string }) {
  const { t, lang } = useLang();
  const navRef = useRef<HTMLDivElement>(null);

  // keep the active mobile pill scrolled into view as sections pass by
  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <aside className="sticky top-0 z-40 border-b border-border bg-bg-soft/90 backdrop-blur-md lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[300px] lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-bg-soft/60 lg:p-8">
      {/* mobile top bar / desktop profile */}
      <div className="container-x flex items-center justify-between gap-3 py-3 lg:block lg:p-0">
        <div className="flex min-w-0 items-center gap-3 lg:block">
          {/* avatar is the first thing to go on very narrow phones — the name matters more */}
          <div className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-3 text-[0.95rem] font-extrabold text-white shadow-sm min-[380px]:grid lg:mb-4 lg:grid lg:h-16 lg:w-16 lg:rounded-2xl lg:text-2xl">
            OA
          </div>
          <div className="min-w-0">
            <div className="truncate text-[0.92rem] font-bold leading-tight lg:text-[1.2rem]">
              Odhi Ahmad Hidayat
            </div>
            <div className="truncate text-[0.78rem] font-semibold text-accent-2 lg:text-[0.9rem]">
              Full Stack Developer
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href="/cv-odhi-ahmad.pdf"
            download
            aria-label={t("hero.cv")}
            className="grid h-11 w-11 place-items-center rounded-full bg-accent text-white"
          >
            <Icon name="download" className="h-[1.05em] w-[1.05em]" />
          </a>
          <LangToggleCompact />
        </div>
      </div>

      {/* mobile nav pills — below lg there was previously no navigation at all */}
      <div ref={navRef} className="hide-scrollbar flex gap-1.5 overflow-x-auto px-5 pb-2.5 sm:px-6 lg:hidden">
        {NAV.map(([id, key]) => (
          <a
            key={id}
            href={`#${id}`}
            data-id={id}
            className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.82rem] font-semibold transition-colors ${
              active === id
                ? "border-accent/30 bg-[var(--accent-soft)] text-accent"
                : "border-border bg-card text-muted"
            }`}
          >
            {t(key)}
          </a>
        ))}
      </div>

      <p className="hidden text-[0.92rem] leading-relaxed text-muted lg:mt-4 lg:block">
        {lang === "id"
          ? "Padang, Indonesia · membangun produk digital dari backend Go hingga app Flutter & React."
          : "Padang, Indonesia · building digital products from Go backends to Flutter & React apps."}
      </p>

      {/* desktop nav with scroll-spy */}
      <nav className="hidden lg:mt-8 lg:flex lg:flex-col lg:gap-1">
        {NAV.map(([id, key]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-[0.95rem] font-medium transition-colors ${
              active === id
                ? "bg-[var(--accent-soft)] font-semibold text-accent"
                : "text-muted hover:bg-slate-100 hover:text-text"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                active === id ? "bg-accent" : "bg-border group-hover:bg-muted"
              }`}
            />
            {t(key)}
          </a>
        ))}
      </nav>

      {/* bottom: socials + lang + cv */}
      <div className="hidden lg:mt-auto lg:block lg:pt-8">
        <div className="flex items-center gap-2">
          <a href={SITE.github} target="_blank" rel="noopener" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent">
            <Icon name="github" solid className="h-[1.05em] w-[1.05em]" />
          </a>
          <a href={`mailto:${SITE.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent">
            <Icon name="mail" className="h-[1.05em] w-[1.05em]" />
          </a>
          <a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent">
            <Icon name="message" className="h-[1.05em] w-[1.05em]" />
          </a>
          <div className="ml-auto">
            <LangToggle />
          </div>
        </div>
        <a
          href="/cv-odhi-ahmad.pdf"
          download
          className="btn-glow mt-4 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[0.9rem] font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <Icon name="download" className="h-[1.05em] w-[1.05em]" /> {t("hero.cv")}
        </a>
      </div>
    </aside>
  );
}

/* ---------------- main ---------------- */
export default function Portfolio() {
  const { t, lang } = useLang();
  const [lb, setLb] = useState<{ src: string; alt: string } | null>(null);
  const [active, setActive] = useState("featured");
  const tlLine = useRef<HTMLSpanElement>(null);

  // scroll reveal + timeline grow
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    const line = tlLine.current;
    let lineObs: IntersectionObserver | null = null;
    if (line) {
      lineObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && line.classList.add("grow")),
        { threshold: 0.1 }
      );
      lineObs.observe(line);
    }
    return () => {
      obs.disconnect();
      lineObs?.disconnect();
    };
  }, []);

  // scroll-spy for nav
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // esc closes lightbox; lock body scroll while it is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLb(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = lb ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lb]);

  const year = new Date().getFullYear();

  return (
    <div className="lg:pl-[300px]">
      <Sidebar active={active} />

      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        {/* HERO */}
        <header className="relative overflow-hidden pb-12 pt-12 sm:pb-14 sm:pt-20">
          <div className="blob left-auto right-[-60px] top-[-100px] h-[360px] w-[360px]" style={{ background: "#1f4fd8" }} />
          <div className="blob bottom-[-120px] left-[-80px] h-[300px] w-[300px]" style={{ background: "#0f8a5f", animationDelay: "-5s" }} />
          <span className="mb-5 inline-block rounded-full bg-[var(--accent-2-soft)] px-3.5 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-accent-2">
            Android · iOS · Web
          </span>
          <h1 className="text-[length:var(--t-hero)] font-extrabold leading-[1.12]">
            {t("hero.hi")} <span className="grad-text">Odhi Ahmad Hidayat</span>
            <Typed />
          </h1>
          <p className="mt-5 max-w-2xl text-[length:var(--t-lg)] leading-relaxed text-muted">{t("hero.sub")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#featured" className="btn-glow inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-transform hover:-translate-y-0.5">
              {t("hero.cta")}
            </a>
            <a href="/cv-odhi-ahmad.pdf" download className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-[0.95rem] font-semibold transition-colors hover:bg-bg-soft">
              <Icon name="download" className="h-[1.1em] w-[1.1em]" /> {t("hero.cv")}
            </a>
            <a href={SITE.github} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-[0.95rem] font-semibold transition-colors hover:bg-bg-soft">
              <Icon name="github" solid className="h-[1.1em] w-[1.1em]" /> GitHub
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {STATS.map((s) => (
              <div key={s.key} className="reveal rounded-2xl border border-border bg-card p-4 text-center sm:p-5">
                <Icon name={s.icon} className="mx-auto mb-2 h-5 w-5 text-accent" />
                <Counter target={s.count} />
                <div className="mt-1.5 text-[0.8rem] font-medium leading-snug text-muted">{t(s.key)}</div>
              </div>
            ))}
          </div>
        </header>

        {/* FEATURED */}
        <section id="featured" className="scroll-mt-24 py-12 lg:scroll-mt-8">
          <SectionHead title={t("feat.title")} sub={t("feat.sub")} />

          <div className="pulse-glow reveal zoom relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-bg-soft p-5 sm:p-8 lg:p-9">
            <span className="mb-4 inline-block rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.09em] text-accent">
              {t("feat.badge")}
            </span>
            <h3 className="head text-[length:var(--t-3xl)] font-extrabold">Loka Kasir</h3>
            <div className="mb-4 mt-1.5 text-[length:var(--t-base)] font-semibold text-accent-2">{t("feat.role")}</div>
            <p className="mb-5 max-w-3xl text-[length:var(--t-base)] leading-relaxed text-muted">{t("feat.desc")}</p>
            <div className="my-6 grid gap-3 sm:grid-cols-2 sm:gap-3.5">
              {[
                ["feat.be.t", "feat.be.d"],
                ["feat.mob.t", "feat.mob.d"],
                ["feat.web.t", "feat.web.d"],
                ["feat.land.t", "feat.land.d"],
              ].map(([ti, de]) => (
                <div key={ti} className="group rounded-xl border border-border bg-bg-soft p-4 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-sm">
                  <strong className="mb-1 block text-[length:var(--t-base)] text-accent">{t(ti)}</strong>
                  <span className="text-[length:var(--t-sm)] leading-relaxed text-muted">{t(de)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Go", "Gin", "PostgreSQL", "Redis", "Flutter", "Riverpod", "React", "TypeScript", "Next.js", "QRIS", "Offline-first"].map((tg) => (
                <Tag key={tg}>{tg}</Tag>
              ))}
            </div>
            <div className="mt-6">
              <a href="https://www.lokakasir.id/" target="_blank" rel="noopener" className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto">
                {t("feat.visit")} <Icon name="arrow-up-right" className="h-[1.1em] w-[1.1em]" />
              </a>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-24 py-12 lg:scroll-mt-8">
          <SectionHead title={t("proj.title")} sub={t("proj.sub")} />
          <div className="grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} p={p} onZoom={(src, alt) => setLb({ src, alt })} />
            ))}
          </div>
        </section>

        {/* CV */}
        <section id="cv" className="scroll-mt-24 py-12 lg:scroll-mt-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="head reveal text-[length:var(--t-2xl)] font-extrabold">Curriculum Vitae</h2>
              <p className="reveal mt-2 text-[length:var(--t-base)] text-muted">{t("cv.sub")}</p>
            </div>
            <a href="/cv-odhi-ahmad.pdf" download className="btn-glow reveal inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-transform hover:-translate-y-0.5">
              <Icon name="download" className="h-[1.05em] w-[1.05em]" /> {t("cv.dl")}
            </a>
          </div>

          <div className="relative pl-7 sm:pl-9">
            <span ref={tlLine} className="tl-line absolute left-2 top-1.5 bottom-1.5 w-[3px] rounded bg-gradient-to-b from-accent via-accent-3 to-accent-2 sm:left-2.5" />
            {CV.map((item, i) => (
              <div key={i} className="reveal from-left relative pb-9 pl-5 last:pb-0 sm:pl-6" style={{ ["--d" as string]: `${0.1 + i * 0.05}s` }}>
                <span
                  className={`tl-ping absolute -left-[27px] top-2 h-[14px] w-[14px] rounded-full border-[3px] border-bg sm:-left-[31px] sm:h-[15px] sm:w-[15px] ${
                    i % 2 ? "bg-accent-2 text-accent-2" : "bg-accent text-accent"
                  }`}
                  style={{ boxShadow: `0 0 0 3px ${i % 2 ? "var(--accent-2-soft)" : "var(--accent-soft)"}` }}
                />
                <span className="mb-2 inline-block rounded-full bg-[var(--accent-soft)] px-3 py-0.5 text-[0.76rem] font-bold tracking-wide text-accent">
                  {resolve(DICT[lang], item.dateKey)}
                </span>
                <h3 className="flex items-start gap-2 text-[length:var(--t-lg)] font-bold">
                  {item.edu && <Icon name="cap" className="mt-1 h-[1em] w-[1em] shrink-0" />}
                  <span>{item.titleKey ? t(item.titleKey) : item.title}</span>
                </h3>
                <div className="mb-2 mt-1 text-[length:var(--t-sm)] font-semibold text-accent-2">
                  {item.placeKey ? <Html value={t(item.placeKey)} /> : item.place}
                </div>
                {item.descKey && (
                  <p className="max-w-3xl text-[length:var(--t-sm)] leading-relaxed text-muted">{t(item.descKey)}</p>
                )}
                {item.liKeys && (
                  <ul className="mt-2.5 ml-4 list-disc space-y-1.5 text-[length:var(--t-sm)] leading-relaxed text-muted marker:text-accent">
                    {item.liKeys.map((k) => (
                      <li key={k} className="pl-1">
                        <Html value={t(k)} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="reveal zoom mt-10 rounded-2xl border border-dashed border-border bg-bg-soft p-6 text-center sm:p-8">
            <h3 className="mb-2 flex items-center justify-center gap-2 text-[length:var(--t-xl)] font-bold">
              <Icon name="file" className="h-[1.05em] w-[1.05em] shrink-0" /> {t("cv.doc.t")}
            </h3>
            <p className="mx-auto mb-5 max-w-xl text-[length:var(--t-sm)] leading-relaxed text-muted">{t("cv.doc.d")}</p>
            <a href="/cv-odhi-ahmad.pdf" download className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto">
              <Icon name="download" className="h-[1.1em] w-[1.1em]" /> {t("cv.doc.btn")}
            </a>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-24 py-12 lg:scroll-mt-8">
          <SectionHead title={t("skill.title")} sub={t("skill.sub")} />
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {SKILLS.map((s, i) => (
              <span
                key={s}
                className="reveal rounded-full border border-border bg-card px-4 py-2 text-[length:var(--t-sm)] font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-[var(--accent-soft)] sm:px-[18px] sm:py-[9px]"
                style={{ ["--d" as string]: `${Math.min(i, 12) * 0.04}s` }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 py-12 lg:scroll-mt-8">
          <div className="rot-border reveal zoom relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-bg-soft p-6 text-center sm:p-10 lg:p-12">
            <h2 className="head mx-auto mb-2.5 text-[length:var(--t-2xl)] font-extrabold">{t("contact.title")}</h2>
            <p className="mx-auto mb-7 max-w-xl text-[length:var(--t-base)] text-muted">{t("contact.sub")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3.5">
              <a href={`mailto:${SITE.email}`} className="btn-glow inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-[0.92rem] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:px-6">
                <Icon name="mail" className="h-[1.1em] w-[1.1em] shrink-0" />
                <span className="truncate">{SITE.email}</span>
              </a>
              <a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener" className="btn-glow inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-[0.92rem] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:px-6">
                <Icon name="message" className="h-[1.1em] w-[1.1em] shrink-0" />
                <span className="truncate">WhatsApp 0852-7299-3360</span>
              </a>
              <a href={SITE.github} target="_blank" rel="noopener" className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-[0.92rem] font-semibold transition-colors hover:bg-bg-soft sm:px-6">
                <Icon name="github" solid className="h-[1.1em] w-[1.1em] shrink-0" />
                <span className="truncate">github.com/odhiahmad</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-7 text-center text-[length:var(--t-xs)] leading-relaxed text-muted">
          © {year} {SITE.name} · {t("footer.txt")}
        </footer>
      </div>

      {/* LIGHTBOX */}
      <div className={`lightbox ${lb ? "open" : ""}`} aria-hidden={!lb} onClick={() => setLb(null)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {lb && <img src={lb.src} alt={lb.alt} />}
        <span className="absolute bottom-5 left-1/2 w-full -translate-x-1/2 px-4 text-center text-[0.82rem] text-white/70">
          {t("lb.hint")}
        </span>
      </div>
    </div>
  );
}
