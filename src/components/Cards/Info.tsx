export default function Info({
  icon,
  type,
  value,
}: {
  icon: JSX.Element;
  type: string;
  value: string;
}) {
  return (
    <div className={`flex justify-between`}>
      <div className="flex flex-row gap-x-2">
        {icon} <p>{type}</p>
      </div>
      <p className="text-right">{value}</p>
    </div>
  );
}
