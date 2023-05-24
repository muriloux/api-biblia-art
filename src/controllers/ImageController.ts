import GenImgService from "../services/GenImgService";

const genImgService = new GenImgService();

export default class ImageController {
  async getRandomImage() {
    genImgService.execute();
  }

  async getImageFromText(text: string) {
    genImgService.execute(text);
  }
}
