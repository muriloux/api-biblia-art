import GenRandomImgService from "../services/GenRandomImgService";

const genRandomImgService = new GenRandomImgService();

export default class ImageController {
  async getRandomImage() {
    genRandomImgService.execute();
  }

  async getImageFromText(text: string) {
    genRandomImgService.execute(text);
  }
}
