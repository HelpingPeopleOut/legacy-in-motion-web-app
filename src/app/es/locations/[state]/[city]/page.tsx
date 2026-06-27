import { buildLocationFaqs } from "@/lib/ai-enterprise";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import LocationLandingPage from "@/components/location/LocationLandingPage";
import { getLocation, LOCATIONS } from "@/lib/locations";
import { buildLocationPageSchema } from "@/lib/schema";
import { buildLocationMetadata } from "@/lib/seo-metadata";

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCATIONS.map(({ state, city }) => ({ state, city }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const location = getLocation(state, city);
  if (!location) return { title: "Ubicación No Encontrada" };
  return buildLocationMetadata(location, "es");
}

export default async function SpanishLocationPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const location = getLocation(state, city);
  if (!location) notFound();

  const locationFaqs = buildLocationFaqs(location, "es");

  return (
    <>
      <StructuredData
        id={`schema-location-es-${city}`}
        data={buildLocationPageSchema(location, locationFaqs, "es")}
      />
      <LocationLandingPage location={location} faqs={locationFaqs} locale="es" />
    </>
  );
}
