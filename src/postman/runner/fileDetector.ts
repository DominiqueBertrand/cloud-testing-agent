// import glob from 'glob';

async function fileFinder() {
  const fs = require('fs').promises;
  const path = require('path');

  async function walk(dir) {
      let files = await fs.readdir(dir);
      files = await Promise.all(files.map(async file => {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);
          if (stats.isDirectory()) return walk(filePath);
          else if(stats.isFile()) return filePath;
      }));

      return files.reduce((all, folderContents) => all.concat(folderContents), []);
  }
  console.log(await walk('./src/postman/collection/nevidis'))
// console.log("toto")
  // const folderContent = new Array();
  // const path = require('path');
  // const fs = require('fs');
  // const directoryPath = path.join(__dirname, '../collection/nevidis/nevidis');

  // fs.readdir(directoryPath, function (err, files) {
  //   console.log(files)
  //     if (err) console.log(error)
  //     files.forEach(function (file: string) {
  //         // Do whatever you want to do with the file
  //         folderContent.push(file)
  //         console.log(file); 
  //     });
  //     console.log(folderContent)
  // });
  // glob('@collection/nevidis/nevidis/*.json', (err: Error | null, files: string[]) => {
  // if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log("files", files);
  //   return files
  // });
}

export {fileFinder}


// function postmanTest() {
//   const collectionFile = fs.readdirSync(collectionFolderPath);
//   console.log(collectionFile);
//   const envFile = fs.readdirSync(envFolderPath);
//   let dataCollection = "";
//   let dataEnv = "";
//   let collection: string | null = null;
//   let env: string | null = null;

//   process.argv.forEach(function (val: string, index: number, array: string[]) {
//     if (val.substring(0, 12) === "-collection:") {
//       console.log(val);
//       dataCollection = val.substring(12, val.length);
//     }
//     if (val.substring(0, 5) === "-env:") {
//       console.log(val);
//       dataEnv = val.substring(5, val.length);
//     }
//   });

//   envFile.forEach(function (val: string, index: number, array: string[]) {
//     if (dataEnv && dataEnv === val) {
//       env = envFolderPath + dataEnv;
//       // newmanRunner(collectionFolderPath + arg, postman_environment)
//     }
//   });

//   collectionFile.forEach(function (val: string, index: number, array: string[]) {
//     if (dataCollection && dataCollection === val) {
//       collection = collectionFolderPath + dataCollection;
//       // newmanRunner(collectionFolderPath + arg, postman_environment)
//     }
//   });

//   if (env && collection) {
//     newmanRunner(collection, env);
//   }
// }

// const collectionPath = '../collection/DEMO_DEV_Emprunteur.postman_collection.json';
// const envPath = '..env/coog.localhost.postman_environment.json';
// newmanRunner(collectionPath, envPath)

