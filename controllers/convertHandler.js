function ConvertHandler() {
  this.getNum = function (input) {
    const numRegex = /^[^a-zA-Z]*/;
    const match = input.match(numRegex);
    const numStr = match ? match[0] : "";

    if (numStr === "") return 1;

    const parts = numStr.split("/");
    if (parts.length > 2) return null;

    const result =
      parts.length === 2
        ? parseFloat(parts[0]) / parseFloat(parts[1])
        : parseFloat(numStr);

    return isNaN(result) ? null : result;
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const unitStr = input.match(unitRegex);

    if (!unitStr) return null;

    const result = unitStr[0].toLowerCase();

    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (validUnits.includes(result)) {
      return result === "l" ? "L" : result;
    }
    return null;
  };

  this.getReturnUnit = function (initUnit) {
    const map = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    return map[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const map = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    return map[unit];
  };

  this.convert = function (initNum, initUnit) {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  let result;

  switch (initUnit) {
    case "gal": result = initNum * galToL; break;
    case "L":   result = initNum / galToL; break;
    case "mi":  result = initNum * miToKm; break;
    case "km":  result = initNum / miToKm; break;
    case "lbs": result = initNum * lbsToKg; break;
    case "kg":  result = initNum / lbsToKg; break;
    default:    result = null;
  }
  return result === null ? null : Number(result.toFixed(5));
};

this.getString = function (initNum, initUnit, returnNum, returnUnit) {
  return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
};
}

module.exports = ConvertHandler;
