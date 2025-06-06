
"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export function Footer() {
  const t = useTranslations("Footer");
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (currentYear === null) {
    // Prevents flash of unstyled content or hydration mismatch
    return <footer className="py-8 text-center text-sm text-muted-foreground"></footer>;
  }

  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/40">
      <p>
        &copy; {currentYear} TERAMOTO. {t("copyright")}
      </p>
    </footer>
  );
}
