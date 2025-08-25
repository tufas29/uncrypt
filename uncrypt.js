const fs = require("fs");

const symboles = [
  { old: "?", new: "questionMark" },
  { old: '"', new: "doubleQuote" },
  { old: "'", new: "singleQuote" },
  { old: ":", new: "colon" },
  { old: "~", new: "tilde" },
  { old: "(", new: "openParenthesis" },
  { old: ")", new: "closeParenthesis" },
  { old: "{", new: "openCurlyBrace" },
  { old: "}", new: "closeCurlyBrace" },
  { old: "[", new: "openSquareBracket" },
  { old: "]", new: "closeSquareBracket" },
  { old: ",", new: "comma" },
  { old: ".", new: "dot" },
  { old: "!", new: "exclamationMark" },
  { old: "@", new: "atSign" },
  { old: "#", new: "hash" },
  { old: "$", new: "dollarSign" },
  { old: "%", new: "percentSign" },
  { old: "^", new: "caret" },
  { old: "&", new: "ampersand" },
  { old: "*", new: "asterisk" },
  { old: "+", new: "plusSign" },
  { old: "-", new: "hyphen" },
  { old: "=", new: "equalsSign" },
  { old: "<", new: "lessThan" },
  { old: ">", new: "greaterThan" },
  { old: "/", new: "forwardSlash" },
  { old: "\\", new: "backslash" },
  { old: "|", new: "verticalBar" },
  { old: "`", new: "backtick" },
  { old: ";", new: "semicolon" },
  { old: "_", new: "underscore" },
  { old: "0", new: "zero" },
  { old: "1", new: "onne" },
  { old: "2", new: "two" },
  { old: "3", new: "three" },
  { old: "4", new: "four" },
  { old: "5", new: "five" },
  { old: "6", new: "six" },
  { old: "7", new: "seven" },
  { old: "8", new: "eight" },
  { old: "9", new: "nine" },
  { old: " ", new: "space" },
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
