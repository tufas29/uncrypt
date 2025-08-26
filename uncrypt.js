const fs = require("fs");

const symboles = [
  { old: "?", new: "AquestionMarkA" },
  { old: '"', new: "AdoubleQuoteA" },
  { old: "'", new: "AsingleQuoteA" },
  { old: ":", new: "AcolonA" },
  { old: "~", new: "AtildeA" },
  { old: "(", new: "AopenParenthesisA" },
  { old: ")", new: "AcloseParenthesisA" },
  { old: "{", new: "AopenCurlyBraceA" },
  { old: "}", new: "AcloseCurlyBraceA" },
  { old: "[", new: "AopenSquareBracketA" },
  { old: "]", new: "AcloseSquareBracketA" },
  { old: ",", new: "AcommaA" },
  { old: ".", new: "AdotA" },
  { old: "!", new: "AexclamationMarkA" },
  { old: "@", new: "AatSignA" },
  { old: "#", new: "AhashA" },
  { old: "$", new: "AdollarSignA" },
  { old: "%", new: "ApercentSignA" },
  { old: "^", new: "AcaretA" },
  { old: "&", new: "AampersandA" },
  { old: "*", new: "AasteriskA" },
  { old: "+", new: "AplusSignA" },
  { old: "-", new: "AhyphenA" },
  { old: "=", new: "AequalsSignA" },
  { old: "<", new: "AlessThanA" },
  { old: ">", new: "AgreaterThanA" },
  { old: "/", new: "AforwardSlashA" },
  { old: "\\", new: "AbackslashA" },
  { old: "|", new: "AverticalBarA" },
  { old: "`", new: "AbacktickA" },
  { old: ";", new: "AsemicolonA" },
  { old: "_", new: "AunderscoreA" },
  { old: "0", new: "AzeroA" },
  { old: "1", new: "AoneA" },
  { old: "2", new: "AtwoA" },
  { old: "3", new: "AthreeA" },
  { old: "4", new: "AfourA" },
  { old: "5", new: "AfiveA" },
  { old: "6", new: "AsixA" },
  { old: "7", new: "AsevenA" },
  { old: "8", new: "AeightA" },
  { old: "9", new: "AnineA" },
  { old: " ", new: "AspaceA" },
];

function restoreSymbols(content) {
  let result = "";
  let i = 0;

  while (i < content.length) {
    let found = false;

    // Check for each replacement pattern
    for (const symbole of symboles) {
      const pattern = symbole.new.trim();
      const patternLength = pattern.length;

      // Check if the current position matches the pattern
      if (content.substr(i, patternLength) === pattern) {
        result += symbole.old;
        i += patternLength;
        found = true;
        break;
      }

      // Also check with spaces (since the original replacement adds spaces)
      const patternWithSpaces = symbole.new;
      const patternWithSpacesLength = patternWithSpaces.length;

      if (content.substr(i, patternWithSpacesLength) === patternWithSpaces) {
        result += symbole.old;
        i += patternWithSpacesLength;
        found = true;
        break;
      }
    }

    if (!found) {
      // If no pattern matched, just add the current character
      result += content[i];
      i++;
    }
  }

  return result;
}

function restoreOriginalFile() {
  try {
    const replacedFile = fs.readFileSync("merged_js_files.txt", "utf8");
    const originalContent = restoreSymbols(replacedFile);

    fs.writeFileSync("merged_js_files_restored.txt", originalContent);

    console.log("✅ File restored successfully:");
    console.log("   SearchBar_restored.txt - All symbols restored to original");
  } catch (error) {
    console.error("❌ Error processing file:", error.message);
  }
}

restoreOriginalFile();
