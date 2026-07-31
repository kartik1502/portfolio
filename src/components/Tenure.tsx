"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatTenureLong,
  formatTenureShort,
  formatTenureYears,
} from "@/lib/tenure";

const FORMATTERS = {
  long: formatTenureLong,
  short: formatTenureShort,
  years: formatTenureYears,
} as const;

export function Tenure({
  format = "long",
}: {
  format?: keyof typeof FORMATTERS;
}) {
  const fmt = FORMATTERS[format];
  const initial = useMemo(() => fmt(), [fmt]);
  const [label, setLabel] = useState(initial);

  useEffect(() => {
    setLabel(fmt());
  }, [fmt]);

  return <>{label}</>;
}
