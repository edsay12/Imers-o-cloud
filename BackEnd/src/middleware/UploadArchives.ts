import ControleS3 from "../controller/ControleS3"

class UploadArchives {
    async execute(file: any): Promise<void> {
      //executa o serviço de upload
      const controlerS3 =  ControleS3;

      await controlerS3.saveFile(file.filename);
    }
}

export default UploadArchives;