export function convertSpecialCharactersToNormal(text: string): string {
  let hasSpecialCharacters = true;

  while (hasSpecialCharacters) {
    const originalText = text;
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");

    if (text === originalText) {
      hasSpecialCharacters = false;
    }
  }

  return text;
}
