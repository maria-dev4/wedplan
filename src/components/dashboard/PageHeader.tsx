export default function PageHeader({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl text-espresso md:text-5xl">{title}</h1>
        {text && <p className="mt-2 text-mocha">{text}</p>}
      </div>
      {action}
    </div>
  );
}
