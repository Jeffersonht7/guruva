"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useGuruvaInteractions } from "./useGuruvaInteractions";
import { farms, jobOpenings } from "./guruvaData";

interface SiteHeaderProps {
  initiallyScrolled?: boolean;
}

export function SiteHeader({ initiallyScrolled = true }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = (
    <>
      <a href="/" onClick={closeMenu}>
        Início
      </a>
      <a href="/quem-somos" onClick={closeMenu}>
        Quem Somos
      </a>
      <div className="nav-item-dropdown">
        <a href="/fazendas" onClick={closeMenu}>
          Fazendas
        </a>
        <div className="nav-dropdown-menu">
          {farms.map((farm) => (
            <a key={farm.slug} href={`/fazendas/${farm.slug}`} onClick={closeMenu}>
              {farm.shortName}
            </a>
          ))}
        </div>
      </div>
      <a href="/uvas" onClick={closeMenu}>
        Uvas
      </a>
      <a href="/parceiros-mercados" onClick={closeMenu}>
        Mercados
      </a>
      <a href="#trabalhe-conosco" data-careers-open onClick={closeMenu}>
        Trabalhe Conosco
      </a>
    </>
  );

  return (
    <>
      <header className={`site-header${initiallyScrolled ? " is-scrolled" : ""}`} data-header>
        <a className="brand" href="/" aria-label="Guruva">
          <img className="brand-logo" src="/assets/guruva-logo.webp" alt="Guruva Group" />
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          {navLinks}
        </nav>
        <div className="header-actions">
          <a className="header-cta" href="#contato" data-commercial-open>
            Contato
          </a>
          <button
            type="button"
            className={`nav-toggle${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {/*
        Rendered as siblings of <header>, not children: .site-header has a
        `transform` (for centering), which would otherwise create a new
        containing block for these fixed-position elements and break their
        full-viewport sizing.
      */}
      <div
        className={`mobile-nav-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <nav
        id="mobile-nav-panel"
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Navegação mobile"
        aria-hidden={!menuOpen}
      >
        {navLinks}
      </nav>
    </>
  );
}

export function CommercialModal() {
  return (
    <div className="commercial-modal" data-commercial-modal aria-hidden="true">
      <div className="commercial-modal-backdrop" data-commercial-close></div>
      <div className="commercial-dialog" role="dialog" aria-modal="true" aria-labelledby="commercial-modal-title">
        <button className="commercial-close" type="button" data-commercial-close aria-label="Fechar">
          ×
        </button>
        <div className="commercial-modal-copy">
          <span className="section-kicker">Contato comercial</span>
          <h2 id="commercial-modal-title">Vamos falar sobre a sua próxima safra?</h2>
          <p>Seja para comprar, abrir parceria comercial ou solicitar especificações, nosso time está pronto para atender.</p>
          <p>Comercial / Exportação: grupoguruva@guruva.com.br · +55 (87) 3032-8525</p>
        </div>
        <form className="commercial-modal-form">
          <label>
            Nome
            <input type="text" name="name" autoComplete="name" placeholder="Seu nome" />
          </label>
          <label>
            Empresa
            <input type="text" name="company" autoComplete="organization" placeholder="Empresa compradora" />
          </label>
          <label>
            E-mail comercial
            <input type="email" name="email" autoComplete="email" placeholder="name@company.com" />
          </label>
          <label>
            Interesse
            <select name="interest">
              <option>Exportação de uvas premium</option>
              <option>Calendário de disponibilidade</option>
              <option>Certificações e documentos</option>
              <option>Visita técnica / auditoria</option>
            </select>
          </label>
          <button type="submit">Solicitar contato</button>
        </form>
      </div>
    </div>
  );
}

export function CareersModal() {
  return (
    <div className="commercial-modal" data-careers-modal aria-hidden="true">
      <div className="commercial-modal-backdrop" data-careers-close></div>
      <div className="commercial-dialog" role="dialog" aria-modal="true" aria-labelledby="careers-modal-title">
        <button className="commercial-close" type="button" data-careers-close aria-label="Fechar">
          ×
        </button>
        <div className="commercial-modal-copy">
          <span className="section-kicker">Trabalhe conosco</span>
          <h2 id="careers-modal-title">Vem fazer parte do time Guruva.</h2>
          <p>Envie seus dados e currículo — nosso time de gente e gestão entra em contato quando surgir a vaga certa para você.</p>
        </div>
        <form className="commercial-modal-form careers-form">
          <label>
            Nome completo
            <input type="text" name="name" autoComplete="name" placeholder="Seu nome completo" required />
          </label>
          <label>
            Telefone
            <input type="tel" name="phone" autoComplete="tel" placeholder="(00) 00000-0000" required />
          </label>
          <label>
            E-mail
            <input type="email" name="email" autoComplete="email" placeholder="seu@email.com" required />
          </label>
          <label>
            Vaga de interesse
            <select name="position" defaultValue="" required>
              <option value="" disabled>
                Selecione uma vaga
              </option>
              {jobOpenings.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </label>
          <label>
            Currículo (PDF ou Word)
            <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
          </label>
          <button type="submit">Enviar candidatura</button>
        </form>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Guruva</span>
          <p>Exportando a doçura do sol e a riqueza da terra brasileira para o mundo, com excelência em cada cacho.</p>
          <div className="footer-social">
            <a href="/" aria-label="Site Guruva">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
              </svg>
            </a>
            <a href="mailto:grupoguruva@guruva.com.br" aria-label="E-mail Guruva">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h5 className="section-kicker">Institucional</h5>
            <ul>
              <li>
                <a href="/quem-somos">Quem Somos</a>
              </li>
              <li>
                <a href="/fazendas">Fazendas</a>
              </li>
              <li>
                <a href="/uvas">Uvas</a>
              </li>
              <li>
                <a href="/sustentabilidade-certificacoes">Certificações</a>
              </li>
              <li>
                <a href="/parceiros-mercados">Mercados</a>
              </li>
              <li>
                <a href="/contato">Contato</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="section-kicker">Escritório</h5>
            <p>
              Petrolina, Pernambuco
              <br />
              Vale do São Francisco, Brasil
              <br />
              grupoguruva@guruva.com.br
              <br />
              +55 (87) 3032-8525
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Guruva Group. Do Vale do São Francisco para o mundo.</p>
      </div>
    </footer>
  );
}

export function GuruvaPageShell({ children }: { children: ReactNode }) {
  useGuruvaInteractions();

  return (
    <>
      <SiteHeader />
      <main className="subpage-main">{children}</main>
      <CommercialModal />
      <CareersModal />
      <SiteFooter />
    </>
  );
}
