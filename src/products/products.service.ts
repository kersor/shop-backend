import { Injectable } from '@nestjs/common';

const products = [
  {
    id: 'cabbage-1',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'broccoli-1',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'cabbage-12',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'broccoli-12',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'cabbage-1',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'broccoli-1',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'cabbage-12',
    name: 'Капуста белокочанная',
    slug: 'kapusta-belokochannaya',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'broccoli-12',
    name: 'Капуста брокколи',
    slug: 'kapusta-brokkoli',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'carrot-1',
    name: 'Морковь',
    slug: 'morkov',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'potato-1',
    name: 'Картофель',
    slug: 'kartofel',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'tomato-1',
    name: 'Помидор',
    slug: 'pomidor',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'cucumber-1',
    name: 'Огурец',
    slug: 'ogurec',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'onion-1',
    name: 'Лук',
    slug: 'luk',
    latin: 'lyk',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
  },
  {
    id: 'pepper-1',
    name: 'Перец болгарский',
    slug: 'perec-bolgarskij',
    img: 'https://www.regard.ru/api/site/cacheimg/goods/6220912/160',
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
