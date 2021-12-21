/**
 * No es el código más bonito del mundo, tenia pensado hacerlo con una expresión regular que eliminara los diacríticos
 * pero eso incluía la ñ, lo cual me reventaba el código:
 *
 * letter.toLowerCase().replaceAll(" ", "").normalize("NFKD").replace(/[^\w]/g, '')
 */
export default function pangram(letter) {
  const letters = [
    ...new Set(
      letter
        .toLowerCase()
        .replaceAll(" ", "")
        .split("")
        .map((char) => {
          if (!char.match(/[a-z]|ñ/)) return "";

          const diacritics = [
            /[\340-\346]/g, // A, a
            /[\350-\353]/g, // E, e
            /[\354-\357]/g, // I, i
            /[\362-\370]/g, // O, o
            /[\371-\374]/g, // U, u
            /[\347]/g, // C, c
          ];

          const changeChar = ["a", "e", "i", "o", "u", "c"];
          let changedChar = char;
          for (let i = 0; i < diacritics.length; i++)
            changedChar = changedChar.replace(diacritics[i], changeChar[i]);

          return changedChar;
        })
        .filter(Boolean)
    ),
  ];
  return letters.length === 27;
}
