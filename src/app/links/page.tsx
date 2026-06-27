import NellyQuickLinks from "@/components/links/NellyQuickLinks";
import { BUSINESS } from "@/lib/business";

export const dynamic = "force-static";

export const metadata = {
  title: "Nelly Lara | Quick Links — Forms & Social",
  description:
    "Quick access to Nelly Lara's financial education forms, life insurance quotes, children's accounts, social media, and free consultation. Legacy in Motion — Pasadena, CA.",
  openGraph: {
    title: "Nelly Lara | Quick Links",
    description: "Learn Money, interview, life insurance quote, children's accounts & more.",
    url: `${BUSINESS.url}/links`,
  },
};

export default function LinksPage() {
  return <NellyQuickLinks locale="en" />;
}
