export default function PageHero({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-brand py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-slate-300">{description}</p>
        )}
      </div>
    </section>
  );
}
