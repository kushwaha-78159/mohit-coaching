import { notFound } from "next/navigation";
import SitePage from "@/components/SitePage";

const pages = ["about", "classes", "contact", "register", "gallery"];

export function generateStaticParams() {
  return pages.map((slug) => ({ slug: [slug] }));
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = slug[0];

  if (slug.length !== 1 || !pages.includes(page)) {
    notFound();
  }

  return <SitePage page={page} />;
}
