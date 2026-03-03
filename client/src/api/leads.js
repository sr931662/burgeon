const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwAtEKnYYkCYvAKu78sBo5NdHdSaTXwj4S5XrxLW342UVRYJs2srpXspjx04EEiYMf2w/exec";

export const submitLead = async (leadData) => {
  const formData = new FormData();

  Object.keys(leadData).forEach(key => {
    if (leadData[key] !== undefined) {
      formData.append(key, leadData[key]);
    }
  });

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return true;
};