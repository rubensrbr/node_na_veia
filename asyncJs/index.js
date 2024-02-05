const fs = require("fs");

const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      return err ? reject("I could not find that file!!!") : resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      return err ? reject("Could not write file!!!") : resolve("Sucess");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const nameBreed = data.toString().split("\n")[0];

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${nameBreed}/images/random`,
    );
    console.log(res.body.message);
    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved!!!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("Error");
  }
})();

// console.log("1: Will get dog pics!");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: Done getting dog pics!!");
//   })
//   .catch((err) => {
//     console.log("ERROR!!!");
//   });
//
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     const nameBreed = data.toString().split("\n")[0];
//
//     return superagent.get( `https://dog.ceo/api/breed/${nameBreed}/images/random`,);
//   })
//   // then method ONLY HANDLES FUFILLED promises
//   .then((res) => {
//     console.log(res.body.message);
//
//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved!!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
