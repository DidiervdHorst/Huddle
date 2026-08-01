export function formatHost(name: string, withNames: string[]): string {
  if (withNames.length === 0) return name;
  if (withNames.length === 1) return `${name} and ${withNames[0]}`;
  const [last, ...rest] = [...withNames].reverse();
  return `${name}, ${rest.reverse().join(", ")} and ${last}`;
}
