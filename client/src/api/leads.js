const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwAtEKnYYkCYvAKu78sBo5NdHdSaTXwj4S5XrxLW342UVRYJs2srpXspjx04EEiYMf2w/exec";

export const submitLead = async (leadData) => {
  try {
    // Timeout controller (10 sec safety)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // Apps Script sometimes returns 200 even on failure
    if (!response.ok) {
      throw new Error("Server error. Please try again.");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Submission failed.");
    }

    return result;

  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }

    throw new Error(error.message || "Something went wrong.");
  }
};