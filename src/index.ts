import readline from "readline";
import { createColors, green } from "colorette";
import { Title } from "../utils/Head";

const { blue } = createColors({ useColor: true });



const main = async () => {
    const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


    const header = await Title();

    console.log(header.title);
    console.log(header.subtitle);
    console.log(header.instructions);
    

  prompt.question(`${green('> ')}`, (ans) => {
    console.log("Entered something: ", blue(ans));
    prompt.close();
  })


}

main()