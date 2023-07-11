import * as fs from 'fs';
import * as path from 'path';

export function postAllCollectionsList(): string[] {
  const folderP = 'src/modules/postman/collection/';
  const folders = fs.readdirSync(folderP);
  const folderJsonContent: Array<any> = [];

  // Search all directories in 'src/postman/collection/'
  folders.forEach(folder => {
    if (fs.lstatSync(folderP + folder).isDirectory()) {
      const result = { [folder]: readFolderJSONContent(folderP + folder) };
      folderJsonContent.push(result);
    }
  });

  function readFolderJSONContent(folderPath: string) {
    const files = fs.readdirSync(folderPath);
    const jsonContent: any[] = [];

    // Find all JSON files in folder
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    jsonFiles.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      // Get datas from each JSON
      const collectionInfos = {
        id: jsonData.info._postman_id,
        name: jsonData.info.name,
        collection: folderPath,
      };
      jsonContent.push(collectionInfos);
    });
    return jsonContent;
  }

  return folderJsonContent;
}

export function postAllEnvironnementList(): string[] {
  const folderP = 'src/modules/postman/env/';
  const folders = fs.readdirSync(folderP);
  const folderJsonContent: Array<any> = [];

  // Search all directories in 'src/postman/env/'
  folders.forEach(folder => {
    if (fs.lstatSync(folderP + folder).isDirectory()) {
      const result = { [folder]: readFolderJSONContent(folderP + folder) };
      folderJsonContent.push(result);
    }
  });

  function readFolderJSONContent(folderPath: string) {
    const files = fs.readdirSync(folderPath);
    const jsonContent: any[] = [];

    // Find all JSON files in folder
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    jsonFiles.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      // Get datas from each JSON
      const collectionInfos = {
        id: jsonData.id,
        name: jsonData.name,
      };
      jsonContent.push(collectionInfos);
    });
    return jsonContent;
  }

  return folderJsonContent;
}
