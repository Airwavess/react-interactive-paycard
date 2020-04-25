export function toRefKey(focusSection: string) {
  let key = focusSection.split("-")[0];
  for (let i = 1; i < focusSection.split("-").length; i++) {
    const a = focusSection.split("-")[1].substring(0, 1).toUpperCase();
    const b = focusSection.split("-")[1].substring(1);
    key = `${key}${a}${b}`;
  }
  key = `${key}Ref`;
  return key;
}
