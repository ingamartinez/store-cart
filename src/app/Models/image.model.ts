export class Image{
  format: string;
  imageType: string;
  url: string;

  constructor(format: string, imageType: string, url: string) {
    this.format = format;
    this.imageType = imageType;
    this.url = url;
  }

}
