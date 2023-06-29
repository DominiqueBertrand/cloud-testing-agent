import * as fs from 'fs';
import * as path from 'path';

export function getCollectionById(id: string) {
  const folderP = 'src/postman/collection/';
  const folders = fs.readdirSync(folderP);
  var folderJsonContent : Array<any> = [];
  
  folders.forEach(folder => {
    if (fs.lstatSync(folderP + folder).isDirectory()) {
      folderJsonContent =  readFolderJSONContent(folderP + folder)

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

      if (jsonData.info._postman_id === id) {
        jsonContent.push(jsonData);
      }
    });
    return jsonContent;
  }

  return folderJsonContent
}