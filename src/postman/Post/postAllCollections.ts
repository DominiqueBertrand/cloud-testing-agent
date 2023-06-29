import * as fs from 'fs';
import * as path from 'path';

export function postAllCollections() {
    const folderAlias = 'src/postman/collection/nevidis/nevidis'; // Alias defined in tsconfig.json
    const folderPath = path.resolve(".",folderAlias); 

    function readFolderJSONContent(folderPath: string): any[] {
        const files = fs.readdirSync(folderPath);
        console.log(files)
      
        const jsonFiles = files.filter(file => path.extname(file) === '.json');
      
        const jsonContent: any[] = [];
      
        jsonFiles.forEach(file => {
          const filePath = path.join(folderPath, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const jsonData = JSON.parse(fileContent);
          jsonContent.push(jsonData);
        });
      
        return jsonContent;
      }

    const folderJsonContent = readFolderJSONContent(folderPath);
    console.log(folderJsonContent);
    return folderJsonContent
}