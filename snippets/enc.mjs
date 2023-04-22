(() => {
  const CRYPT = {
    newString: "",

    isFunctionAvailable: () =>
      window && "btoa" in window && "encodeURIComponent" in window,

    /*
     * Function to convert from UTF8 to Base64 solving the Unicode Problem
     * Requires: window.btoa and window.encodeURIComponent functions
     * Reference: "https://mzl.la/2qWFipj"
     */
    b64EncodeUnicode: (str) => {
      const rx = new RegExp("%([0-9A-F]{2})", "g");
      return btoa(
        encodeURIComponent(str).replace(rx, (_, p) =>
          String.fromCodePoint(`0x${p}`)
        )
      );
    },

    b64DecodeUnicode: (str) => {
      return decodeURIComponent(
        Array.from(atob(str), (c) => `%${c.codePointAt(0).toString(16)}`).join(
          ""
        )
      );
    },

    cryptSymmetric: (str, key = 13) => {
      str = str
        .split("") //to array of characters.
        .map((c) => c.codePointAt(0)) //to array of numbers (each is character's ASCII value)
        .map((i) => i ^ Number(key)); //XOR ""ENCRYPTION""
      str = String.fromCodePoint(...str); //array-of-numbers to array-of-characters (ASCII value), join to single string. may result in buffer-overflow on long string!
      return str;
    },
  };

  let input = "☸️🇬🇦⊇";
  console.group("====ENCRYPT======");
  let op = CRYPT.cryptSymmetric(input, 12);
  console.log({ op });
  let fop = CRYPT.b64EncodeUnicode(op);
  console.log({ fop });
  console.groupEnd();

  console.group("======DECRYPT======");
  let dop = CRYPT.b64DecodeUnicode(fop);
  console.log({ dop });
  let oop = CRYPT.cryptSymmetric(dop, 12);
  console.log({ oop });

  console.groupEnd();
})();
