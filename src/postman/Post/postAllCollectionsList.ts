import * as fs from 'fs';
import * as path from 'path';

export function postAllCollectionsList() {
  const folderP = 'src/postman/collection/';
  const folders = fs.readdirSync(folderP);
  var folderJsonContent : Array<any> = [];
  
  folders.forEach(folder => {
    if (fs.lstatSync(folderP + folder).isDirectory()) {
      const result = {[folder] :readFolderJSONContent(folderP + folder)}
      folderJsonContent.push(result)
    }
  });
  
  function readFolderJSONContent(folderPath: string){
    const files = fs.readdirSync(folderPath);
    const jsonContent: any[] = [];
  
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    jsonFiles.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      const collectionInfos = {
        id: jsonData.info._postman_id,
        name : jsonData.info.name,
        collection : folderPath
      }
      jsonContent.push(collectionInfos);
    });
    // console.log("list ", jsonContent)  
    return jsonContent;
  }

  return folderJsonContent
}

export function postAllEnvironnementList() {
  const folderP = 'src/postman/env/';
  const folders = fs.readdirSync(folderP);
  var folderJsonContent : Array<any> = [];
  
  folders.forEach(folder => {
    if (fs.lstatSync(folderP + folder).isDirectory()) {
      const result = {[folder] :readFolderJSONContent(folderP + folder)}
      folderJsonContent.push(result)
    }
  });
  
  function readFolderJSONContent(folderPath: string){
    const files = fs.readdirSync(folderPath);
    const jsonContent: any[] = [];
  
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    jsonFiles.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
      const collectionInfos = {
        id: jsonData.id,
        name : jsonData.name,
      }
      jsonContent.push(collectionInfos);
    });
    return jsonContent;
  }

  return folderJsonContent
}