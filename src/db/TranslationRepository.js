import Parse from "parse";

// Fetch a single translation
const fetchTranslation = async (textContentId, languageId) => {
  const Translation = Parse.Object.extend("Translation");
  const query = new Parse.Query(Translation);

  query.equalTo("TextContentId", textContentId);
  query.equalTo("LanguageId", languageId);

  try {
    const result = await query.first();
    return result ? result.get("Translation") : null;
  } catch (error) {
    console.error("Error while fetching translation: ", error);
  }
};

// Fetch a bunch of translations at once
const fetchBatchTranslations = async (textContentIds, languageCode) => {
  
  const query = new Parse.Query("Translations");
  query.containedIn("TextContentId", textContentIds);
  query.equalTo("LanguageId", languageCode);

  const results = await query.find();
  let translations = {};

  results.forEach((result) => {
    const textContentId = result.get("TextContentId");
    const translation = result.get("Translation");
    translations[textContentId] = translation; // Map TextContentId to its translation
  });
  return translations;
};

export { fetchBatchTranslations, fetchTranslation };
