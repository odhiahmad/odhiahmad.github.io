"use client";

import { useEffect, useState } from "react";
import { useLang } from "./lang";
import { Icon } from "./icons";
import { CV, PROJECTS, SKILLS, SITE, type Project } from "@/lib/content";
import { DICT, resolve } from "@/lib/dict";

const LOKA = "https://www.lokakasir.id/";

function Html({ value, className }: { value: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: value }} />;
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted">{children}</div>;
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-14 sm:py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:gap-10">
        <div>
          <Label>{label}</Label>
        </div>
        <div className="min-w-0">
          <h2 className="mb-8 text-[1.6rem] font-bold sm:text-[2rem]">{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex font-mono text-[0.78rem]">
      {(["id", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1 text-border">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`uppercase ${lang === l ? "text-text" : "text-muted hover:text-text"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

const NAV = [
  ["loka", "nav.loka"],
  ["projects", "nav.projects"],
  ["experience", "nav.cv"],
  ["contact", "nav.contact"],
];

function ProjectRow({ p, onZoom }: { p: Project; onZoom: (src: string, alt: string) => void }) {
  const { t, lang } = useLang();
  return (
    <article className="grid grid-cols-1 gap-4 border-b border-border py-8 first:pt-0 last:border-0 sm:grid-cols-[1fr_auto]">
      <div className="min-w-0 sm:order-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
          <h3 className="text-[1.15rem] font-bold">{p.title}</h3>
          <span className="font-mono text-[0.75rem] text-muted">{t(p.year)}</span>
        </div>
        <div className="mb-3 text-[0.9rem] font-medium">{t(p.tagKey)}</div>
        <p className="max-w-2xl text-[0.92rem] leading-relaxed text-muted">{t(p.descKey)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.75rem] text-muted">
          <span>{p.tags.join(" · ")}</span>
          {p.link && (
            <a href={p.link.href} target="_blank" rel="noopener" className="ul inline-flex items-center gap-1 text-accent">
              {lang === "id" ? p.link.labelId : p.link.labelEn}
              <Icon name="arrow-up-right" className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
      <div className="hide-scrollbar flex min-w-0 gap-2 overflow-x-auto sm:order-2 sm:max-w-[260px]">
        {p.images.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            onClick={() => onZoom(img.src, img.alt)}
            className="h-[120px] w-auto max-w-none cursor-zoom-in rounded border border-border object-cover transition-opacity hover:opacity-80"
          />
        ))}
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { t, lang } = useLang();
  const [lb, setLb] = useState<{ src: string; alt: string } | null>(null);

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

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="text-[0.95rem] font-bold">
            Odhi Ahmad
          </a>
          <div className="flex items-center gap-5">
            <div className="hidden gap-5 text-[0.88rem] text-muted sm:flex">
              {NAV.map(([id, key]) => (
                <a key={id} href={`#${id}`} className="hover:text-text">
                  {t(key)}
                </a>
              ))}
            </div>
            <LangToggle />
          </div>
        </div>
      </nav>

      <div id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* HERO */}
        <header className="py-16 sm:py-24">
          <Label>{t("hero.meta")}</Label>
          <h1 className="mt-6 max-w-3xl text-[2.1rem] font-bold leading-[1.15] sm:text-[3rem]">
            {t("hero.pre")}{" "}
            <a href={LOKA} target="_blank" rel="noopener" className="text-accent underline decoration-2 underline-offset-[6px]">
              Loka Kasir
            </a>
            {t("hero.post")}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">{t("hero.sub")}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={LOKA}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md bg-text px-5 py-3 text-[0.92rem] font-semibold text-bg transition-opacity hover:opacity-85"
            >
              lokakasir.id <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
            <a
              href="/cv-odhi-ahmad.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-[0.92rem] font-semibold transition-colors hover:border-text"
            >
              <Icon name="download" className="h-4 w-4" /> {t("hero.cv")}
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-[0.92rem] font-semibold transition-colors hover:border-text"
            >
              <Icon name="github" solid className="h-4 w-4" /> GitHub
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-y-6 border-t border-border pt-6 sm:grid-cols-4">
            {["f.1", "f.2", "f.3", "f.4"].map((k) => (
              <div key={k}>
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">{t(`${k}.k`)}</dt>
                <dd className="mt-1 text-[0.95rem] font-semibold">{t(`${k}.v`)}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* LOKA KASIR */}
        <Section id="loka" label={t("feat.label")} title="Loka Kasir">
          <p className="max-w-2xl text-[1.02rem] leading-relaxed">{t("feat.desc")}</p>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{t("feat.solo")}</p>

          <div className="mt-10 grid border-t border-l border-border sm:grid-cols-2">
            {[
              ["feat.be.t", "feat.be.d"],
              ["feat.mob.t", "feat.mob.d"],
              ["feat.web.t", "feat.web.d"],
              ["feat.land.t", "feat.land.d"],
            ].map(([ti, de]) => (
              <div key={ti} className="border-r border-b border-border p-5">
                <div className="mb-1.5 font-semibold">{t(ti)}</div>
                <p className="text-[0.9rem] leading-relaxed text-muted">{t(de)}</p>
              </div>
            ))}
          </div>

          <a href={LOKA} target="_blank" rel="noopener" className="ul mt-8 inline-flex items-center gap-1.5 font-semibold text-accent">
            {t("feat.visit")} <Icon name="arrow-up-right" className="h-4 w-4" />
          </a>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" label={t("proj.label")} title={t("proj.title")}>
          <p className="-mt-4 mb-8 max-w-2xl text-[0.95rem] text-muted">{t("proj.sub")}</p>
          {PROJECTS.map((p) => (
            <ProjectRow key={p.id} p={p} onZoom={(src, alt) => setLb({ src, alt })} />
          ))}
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" label={t("cv.label")} title={t("cv.title")}>
          <ol>
            {CV.map((item, i) => (
              <li key={i} className="grid grid-cols-1 gap-1 border-b border-border py-6 first:pt-0 last:border-0 sm:grid-cols-[150px_1fr] sm:gap-6">
                <div className="font-mono text-[0.75rem] uppercase tracking-wide text-muted sm:pt-1">
                  {resolve(DICT[lang], item.dateKey)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[1.05rem] font-bold">{item.titleKey ? t(item.titleKey) : item.title}</h3>
                  <div className="prose-inline text-[0.92rem] text-muted">
                    {item.placeKey ? <Html value={t(item.placeKey)} /> : item.place}
                  </div>
                  {item.descKey && <p className="mt-2.5 max-w-2xl text-[0.92rem] leading-relaxed">{t(item.descKey)}</p>}
                  {item.liKeys && (
                    <ul className="mt-2.5 max-w-2xl space-y-1 text-[0.92rem] leading-relaxed">
                      {item.liKeys.map((k) => (
                        <li key={k} className="relative pl-4 before:absolute before:left-0 before:text-muted before:content-['–']">
                          <Html value={t(k)} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <a href="/cv-odhi-ahmad.pdf" download className="ul mt-8 inline-flex items-center gap-1.5 font-semibold text-accent">
            <Icon name="download" className="h-4 w-4" /> {t("cv.dl")}
          </a>
        </Section>

        {/* SKILLS */}
        <Section id="skills" label={t("skill.label")} title={t("skill.title")}>
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {SKILLS.map((g) => (
              <div key={g.key}>
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">{t(g.key)}</dt>
                <dd className="mt-1.5 text-[0.95rem]">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* CONTACT */}
        <Section id="contact" label={t("contact.label")} title={t("contact.title")}>
          <p className="max-w-xl text-[1rem] text-muted">{t("contact.sub")}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="ul mt-8 block break-all text-[1.4rem] font-bold sm:text-[2rem]"
          >
            {SITE.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem]">
            <a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener" className="ul">
              WhatsApp · 0852-7299-3360
            </a>
            <a href={SITE.github} target="_blank" rel="noopener" className="ul">
              github.com/odhiahmad
            </a>
            <a href={LOKA} target="_blank" rel="noopener" className="ul">
              lokakasir.id
            </a>
          </div>
        </Section>

        <footer className="flex flex-wrap justify-between gap-2 border-t border-border py-8 font-mono text-[0.72rem] text-muted">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>{t("footer.txt")}</span>
        </footer>
      </div>

      {/* LIGHTBOX */}
      <div className={`lightbox ${lb ? "open" : ""}`} aria-hidden={!lb} onClick={() => setLb(null)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {lb && <img src={lb.src} alt={lb.alt} />}
        <span className="absolute bottom-5 left-1/2 w-full -translate-x-1/2 px-4 text-center font-mono text-[0.75rem] text-white/60">
          {t("lb.hint")}
        </span>
      </div>
    </>
  );
}
