"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useGuruvaInteractions } from "./useGuruvaInteractions";

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
      <a href="/quem-somos" onClick={closeMenu}>
        Quem Somos
      </a>
      <a href="/fazendas" onClick={closeMenu}>
        Fazendas
      </a>
      <a href="/uvas" onClick={closeMenu}>
        Uvas
      </a>
      <a href="/sustentabilidade-certificacoes" onClick={closeMenu}>
        Certificações
      </a>
      <a href="/parceiros-mercados" onClick={closeMenu}>
        Mercados
      </a>
      <a href="#contato" data-commercial-open onClick={closeMenu}>
        Contato
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
            Comercial
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

export function SiteFooter() {
  return (
    <footer className="footer">
      <span>Guruva Group</span>
      <p>From the São Francisco Valley to the World.</p>
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
      <SiteFooter />
    </>
  );
}
