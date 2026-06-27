type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

/** Renders JSON-LD structured data for crawlers (server-safe). */
export default function StructuredData({ data, id = "structured-data" }: StructuredDataProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
