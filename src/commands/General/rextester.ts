import { applyOptions } from "../../lib/Util/Util";
import { CommandOptions, Command } from "klasa";
import { KlasaMessage } from "klasa";
import fetch from "node-fetch";

const langs = {
  1: ["c#"],
  2: ["visualbasic", "vb"],
  3: ["f#"],
  4: ["java"],
  5: ["python2", " python2.7", " py2.7", " py2"],
  6: ["c(gcc)", " c"],
  7: ["c++(gcc)", " c++", " cpp"],
  8: ["php", " php7"],
  9: ["pascal"],
  10: ["objective-c", " oc"],
  11: ["haskell", " hs"],
  12: ["ruby", " rb"],
  13: ["perl"],
  14: ["lua"],
  15: ["assembly", " asm"],
  16: ["sqlserver"],
  17: ["javascript", " js"],
  18: ["commonlisp", " lisp"],
  19: ["prolog"],
  20: ["go"],
  21: ["scala"],
  22: ["scheme"],
  23: ["node.js", " node"],
  24: ["python", " python3", " py", " py3"],
  25: ["octave"],
  26: ["c(clang)"],
  27: ["c++(clang)"],
  28: ["c++(vc++)"],
  29: ["c(vc)"],
  30: ["d"],
  31: ["r"],
  32: ["tcl"],
  33: ["mysql"],
  34: ["postgresql", " psql", " postgres"],
  35: ["oracle"],
  37: ["swift"],
  38: ["bash"],
  39: ["ada"],
  40: ["erlang"],
  41: ["elixir", " ex"],
  42: ["ocaml"],
  43: ["kotlin", " kot"],
  44: ["brainfuck", " bf"],
  45: ["fortran", " fort"]
};

@applyOptions<CommandOptions>({
  aliases: ["rex", "rextest"],
  description: "Executes any code with rextester",
  usage: "<language:string> <code:...string>",
  usageDelim: " ",
  cooldown: 5
})
export default class RexCommand extends Command {
  async run(message: KlasaMessage, args: any[]) {
    let language = args
      .join(" ")
      .split("|")[0]
      .toLowerCase()
      .trim();
    let code = args
      .join(" ")
      .split("|")[1]
      .trim();

    if (code.includes("```")) {
      code = code.split("```")[1];
    }

    let langVals = Object.values(langs);
    let langKeys = Object.keys(langs);
    let lang;

    for (let i = 0; i < langVals.length; i++) {
      for (let x = 0; x < langVals[i].length; x++) {
        if (langVals[i][x].toLowerCase().trim() == language.toLowerCase())
          lang = langKeys[i];
        if (lang) continue;
      }
      if (lang) continue;
    }

    const body = await fetch("https://rextester.com/rundotnet/api", {
      method: "post",
      body: JSON.stringify({
        LanguageChoice: lang,
        Program: code,
        Input: "",
        CompilerArgs: ""
      }),
      headers: { "Content-Type": "application/json" }
    }).then(r => r.json());
    if(body.Result) {
      return message.send(`\`\`\`${body.Result}\`\`\``);
    }

    if(body.Warnings != null) {
      return message.send(`:warning: Warning:\n\`\`\`${body.Warnings}\`\`\`\n`);
    }
    if(body.Errors != null) {
      return message.send(`:x: Error:\n\`\`\`${body.Errors}\`\`\`\n`);
    }
  }
}
