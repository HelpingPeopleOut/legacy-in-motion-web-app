import NellyQuickLinks from "@/components/links/NellyQuickLinks";
import { BUSINESS } from "@/lib/business";

export const dynamic = "force-static";

export const metadata = {
  title: "Nelly Lara | Enlaces Rápidos — Formularios y Redes",
  description:
    "Acceso rápido a formularios de educación financiera, cotizaciones de seguro de vida, cuentas para niños y redes sociales de Nelly Lara. Legacy in Motion.",
  openGraph: {
    title: "Nelly Lara | Enlaces Rápidos",
    description: "Aprende sobre el dinero, entrevista, cotización de vida, cuentas infantiles y más.",
    url: `${BUSINESS.url}/es/links`,
    locale: "es_US",
  },
};

export default function SpanishLinksPage() {
  return <NellyQuickLinks locale="es" />;
}
