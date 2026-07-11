export default function SkillBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-dark-700 text-gray-300 border border-white/5">
      {name}
    </span>
  );
}
