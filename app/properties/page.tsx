import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PropertiesExplorer from "@/components/PropertiesExplorer";

export const metadata: Metadata = {
  title: "All Properties",
  description: "Browse and filter our full inventory of properties.",
};

function firstValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function PropertiesPage(props: PageProps<"/properties">) {
  const searchParams = await props.searchParams;

  return (
    <div>
      <PageHero
        title="All Properties"
        description="Search and filter our full inventory by location, budget, type, bedrooms, bathrooms and area."
      />
      <PropertiesExplorer
        initialLocation={firstValue(searchParams.location)}
        initialType={firstValue(searchParams.type)}
        initialPurpose={firstValue(searchParams.purpose)}
        initialMinPrice={firstValue(searchParams.minPrice)}
        initialMaxPrice={firstValue(searchParams.maxPrice)}
      />
    </div>
  );
}
