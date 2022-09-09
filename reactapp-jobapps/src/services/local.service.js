export function getProvinces() {
  return ["MB", "ON", "AB", "SK", "BC"];
}

export function getCities(province) {
  if (province === "MB") return ["Winnipeg", "Brandon"];
  if (province === "ON") return ["Toronto", "Missisauga", "Brampton", "London"];
  if (province === "AB") return ["Calgary", "Edmonton"];
  if (province === "BC") return ["Vancouver", "Burnaby"];
  if (province === "SK") return ["Saskatoon", "Regina"];
}
