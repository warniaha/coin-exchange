const settingsFilename = 'PaperSettings';

export const resetSettings = () => {
  localStorage.removeItem(settingsFilename);
}

export const saveSettings = (values) => {
  const settingsJson = JSON.stringify({ feeRate: values.feeRate });
  localStorage.setItem(settingsFilename, settingsJson);
  console.log(`settings: ${settingsJson}`);
}

// { feeRate: feeRate }
export const readSettings = (setters) => {
  const jsonValues = localStorage.getItem(settingsFilename);
  const parsedValues = JSON.parse(jsonValues);
  console.log(`readSettings: jsonValues: ${jsonValues}`)

  var feeRate = 0;

  if (parsedValues !== null) {
    feeRate = parsedValues.feeRate ?? 0;
  }

  // trim records that have NaN as the number of shares
  setters.feeRate(feeRate);
}

