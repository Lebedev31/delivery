import fs from "fs"
import path from 'path';

export const deleteFile = (filePath: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    fs.access(fullPath, fs.constants.F_OK, (err) => {
      if (err) {
        // Файл не существует
        resolve(false);
        return;
      }

      fs.unlink(fullPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Ошибка при удалении файла:', unlinkErr);
          reject(unlinkErr);
          return;
        }
        
        resolve(true);
      });
    });
  });
};