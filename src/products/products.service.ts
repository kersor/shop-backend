import { Injectable } from '@nestjs/common';

const products = [
  {
    id: 'cabbage-1',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://catalog-images.x5static.net/product/1157059-main/320x320.jpeg?updated_at=2026-03-13T15:29:07.278Z',
  },
  {
    id: 'broccoli-1',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://catalog-images.x5static.net/product/1158313-main/320x320.jpeg?updated_at=2025-07-04T09:36:24.798Z',
  },
  {
    id: 'cabbage-12',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://catalog-images.x5static.net/product/1157059-main/320x320.jpeg?updated_at=2026-03-13T15:29:07.278Z',
  },
  {
    id: 'broccoli-12',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://catalog-images.x5static.net/product/1158313-main/320x320.jpeg?updated_at=2025-07-04T09:36:24.798Z',
  },
  {
    id: 'cabbage-1',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://catalog-images.x5static.net/product/1157059-main/320x320.jpeg?updated_at=2026-03-13T15:29:07.278Z',
  },
  {
    id: 'broccoli-1',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://catalog-images.x5static.net/product/1158313-main/320x320.jpeg?updated_at=2025-07-04T09:36:24.798Z',
  },
  {
    id: 'cabbage-12',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://catalog-images.x5static.net/product/1157059-main/320x320.jpeg?updated_at=2026-03-13T15:29:07.278Z',
  },
  {
    id: 'broccoli-12',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://catalog-images.x5static.net/product/1158313-main/320x320.jpeg?updated_at=2025-07-04T09:36:24.798Z',
  },
  {
    id: 'carrot-1',
    name: 'Морковь',
    slug: 'morkov',
    img: 'https://catalog-images.x5static.net/product/1161089-main/320x320.jpeg?updated_at=2025-05-30T06:41:39.228Z',
  },
  {
    id: 'potato-1',
    name: 'Картофель',
    slug: 'kartofel',
    img: 'https://catalog-images.x5static.net/product/1196371-main/320x320.jpeg?updated_at=2026-03-11T09:35:03.460Z',
  },
  {
    id: 'tomato-1',
    name: 'Помидор',
    slug: 'pomidor',
    img: 'https://catalog-images.x5static.net/product/1157060-main/320x320.jpeg?updated_at=2025-03-05T10:57:55.098Z',
  },
  {
    id: 'cucumber-1',
    name: 'Огурец',
    slug: 'ogurec',
    img: 'https://catalog-images.x5static.net/product/1573156-main/320x320.jpeg?updated_at=2026-05-14T09:30:46.602Z',
  },
  {
    id: 'onion-1',
    name: 'Лук',
    slug: 'luk',
    latin: 'lyk',
    img: 'https://catalog-images.x5static.net/product/1166128-main/320x320.jpeg?updated_at=2025-03-05T07:01:31.478Z',
  },
  {
    id: 'pepper-1',
    name: 'Перец болгарский',
    slug: 'perec-bolgarskij',
    img: 'https://catalog-images.x5static.net/product/1158149-main/320x320.jpeg?updated_at=2025-03-05T10:57:53.042Z',
  },
];

@Injectable()
export class ProductsService {
  findAll(name: string) {
    // console.log(name, )
    const result = products.filter((p) => p.slug.includes(name));
    return result;
  }
}
