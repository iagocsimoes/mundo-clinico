"use client";

import { useEffect } from "react";
import { syncLegacyLeads } from "@/lib/leads";

/**
 * Recupera leads da versão antiga do site (salvos só no localStorage do
 * visitante) enviando-os ao servidor quando a pessoa volta à página.
 * Não renderiza nada.
 */
export default function LeadSync() {
  useEffect(() => {
    void syncLegacyLeads();
  }, []);

  return null;
}
