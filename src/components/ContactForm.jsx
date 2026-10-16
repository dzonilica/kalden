import { useEffect, useRef, useState } from "react";
import { contact } from "../data";

/*
 * Prijava i pitanja.
 *
 * Nothing is posted anywhere: the form assembles a prefilled message in the
 * visitor's own mail app, which is what the privacy page says it does. The old
 * site POSTed to mail-script.php on an Apache box with no HTTPS; until there is
 * an endpoint to replace it, this keeps the data off the wire entirely.
 *
 * Connect a form endpoint before launch if submissions should arrive directly,
 * and update that privacy section in the same change.
 *
 * Input types, inputMode and enterKeyHint are set per field so a phone keyboard
 * opens on the right layout and the return key says the right thing.
 */
export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const timerRef = useRef();

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = `${data.get("ime")} ${data.get("prezime")}`.trim();
    const subject = `Upit sa sajta — ${name || "novi kandidat"}`;
    const body = [
      `Ime i prezime: ${name || "Nije upisano"}`,
      `Telefon: ${data.get("telefon")}`,
      `E-pošta: ${data.get("email") || "Nije upisana"}`,
      `Tema: ${data.get("tema")}`,
      "",
      data.get("poruka"),
    ].join("\n");

    setStatus("preparing");
    timerRef.current = window.setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("ready");
    }, 240);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Ime</span>
          <input
            name="ime"
            autoComplete="given-name"
            autoCapitalize="words"
            enterKeyHint="next"
            required
          />
        </label>
        <label>
          <span>Prezime (opciono)</span>
          <input name="prezime" autoComplete="family-name" autoCapitalize="words" enterKeyHint="next" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          <span>Telefon</span>
          <input
            type="tel"
            name="telefon"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            required
          />
        </label>
        <label>
          <span>E-pošta (opciono)</span>
          <input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            enterKeyHint="next"
          />
        </label>
      </div>

      <label>
        <span>Tema</span>
        <select name="tema" defaultValue="Upis i obuka">
          <option>Upis i obuka</option>
          <option>Cena i plaćanje</option>
          <option>Termini vožnje</option>
          <option>Dodatni časovi</option>
          <option>Drugo</option>
        </select>
      </label>

      <label>
        <span>Poruka</span>
        <textarea name="poruka" rows="5" enterKeyHint="enter" required />
      </label>

      <div className="form-submit">
        <button className="btn btn--fill" type="submit" disabled={status === "preparing"}>
          <span className="btn__glyph" aria-hidden="true">
            &#8618;
          </span>
          {status === "preparing" ? "Priprema poruke" : "Otvorite poruku u e-pošti"}
        </button>
        <p className="form-note" aria-live="polite">
          {status === "ready" ? (
            <>
              Poruka nije poslata sa sajta. Ako se otvorila vaša aplikacija za e-poštu,
              proverite sadržaj i pošaljite je. Ako se aplikacija nije otvorila, pišite na{" "}
              <a href={contact.emailHref}>{contact.email}</a> ili pozovite{" "}
              <a href={contact.phoneHref}>{contact.phone}</a>.
            </>
          ) : (
            <>
              Popunite podatke i otvorite pripremljenu poruku u svojoj aplikaciji za e-poštu.
              Poruku šaljete iz te aplikacije. Pročitajte{" "}
              <a href="/politika-privatnosti">politiku privatnosti</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
