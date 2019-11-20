import { Image } from './image.model';
import { Price } from './price.model';

export class Product{
  availableForPickup: boolean;
  code: number;
  description: string;
  images: Image[];
  manufacturer: string;
  name: string;
  price: Price;

  constructor(availableForPickup: boolean,
              code: number,
              description: string,
              images: Image[],
              manufacturer: string,
              name: string,
              price: Price) {
    this.code = code;
    this.description = description;
    this.images = images;
    this.manufacturer = manufacturer;
    this.name = name;
    this.price = price;
  }

}
