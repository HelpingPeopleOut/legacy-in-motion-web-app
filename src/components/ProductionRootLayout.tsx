import { ClerkProvider } from "@clerk/nextjs";
import SiteChrome from "@/components/SiteChrome";

export default function ProductionRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SiteChrome>{children}</SiteChrome>
    </ClerkProvider>
  );
}
