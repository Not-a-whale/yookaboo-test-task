import {inject, Injectable} from '@angular/core';
import {StoreParams} from "../../shared/models/storeParams";
import {Product} from "../../shared/models/product";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {Pagination} from "../../shared/models/pagination";
import {nanoid} from "nanoid";


const products = [
  {
    id: '1',
    name: 'Майстер і Маргарита',
    description: 'Це один з найвідоміших творів Михайла Булгакова, що поєднує реальність і фантастику.',
    year: 1967,
    price: 150,
    pictureUrls: ['https://booksit.com.ua/files/2024/08_03/18_56/files_store_1_73443.jpg'],
    genre: 'Роман',
    author: 'Михайло Булгаков',
    quantityInStock: 20,
    tags: [
      { name: 'Нове', hexColor: '#FF5733' },
      { name: 'Хіт', hexColor: '#FF5733' }
    ]
  },
  {
    id: '2',
    name: 'Записки українського самашедшого',
    description: 'Книга, що є поєднанням гумору і глибоких роздумів про суспільство, написана Лесею Українкою.',
    year: 1910,
    price: 200,
    pictureUrls: ['https://booksit.com.ua/files/2024/08_03/21_20/files_store_1_127148.jpg'],
    genre: 'Роман',
    author: 'Ліна Костенко',
    quantityInStock: 15,
    tags: [
      { name: 'Акція', hexColor: '#33FF57' },
      { name: 'Хіт', hexColor: '#FF5733' }
    ]
  },
  {
    id: '3',
    name: 'Солодка Даруся',
    description: 'Трагедія в прозі Марії Матіос, яка охоплює історію однієї родини на фоні важких суспільних змін.',
    year: 2004,
    price: 120,
    pictureUrls: ['https://static.yakaboo.ua/media/catalog/product/i/m/img_38788.jpg'],
    genre: 'Роман',
    author: 'Марія Матіос',
    quantityInStock: 30,
    tags: [
      { name: 'Нове', hexColor: '#FF5733' },
      { name: 'Акція', hexColor: '#33FF57' }
    ]
  },
  {
    id: '4',
    name: 'Кобзар',
    description: 'Відомий збірник поезій Тараса Шевченка, який став основою української літератури.',
    year: 1840,
    price: 50,
    pictureUrls: ['https://content2.rozetka.com.ua/goods/images/big/27297145.png'],
    genre: 'Поезія',
    author: 'Тарас Шевченко',
    quantityInStock: 10,
    tags: [
      { name: 'Хіт', hexColor: '#FF5733' },
      { name: 'Акція', hexColor: '#33FF57' }
    ]
  },
  {
    id: '5',
    name: 'Тіні забутих предків',
    description: 'Роман Михайла Коцюбинського, в якому розкривається конфлікт між старим і новим світом на прикладі двох закоханих.',
    year: 1911,
    price: 80,
    pictureUrls: ['https://content2.rozetka.com.ua/goods/images/big/318236001.jpg'],
    genre: 'Роман',
    author: 'Михайло Коцюбинський',
    quantityInStock: 25,
    tags: [
      { name: 'Хіт', hexColor: '#FF5733' },
      { name: 'Акція', hexColor: '#33FF57' }
    ]
  },
  {
    id: '6',
    name: 'Книга Чарлі і шоколадна фабрика',
    description: 'Усім прихильникам творчості суперпопулярної Джоан Ролінґ, без сумніву, буде цікаво познайомитися з цією книжкою, автора якої, Роальда Дала, прийнято вважати "літературним батьком" відомої письменниці. Хоча, можливо, цей сюжет вам уже знайомий, адже "Чарлі і шоколадна фабрика" - найпопулярніша книга Дала. Бідного хлопчика, який на кожен день народження отримував у подарунок лише маленький шоколадний батончик, чекає дивовижна пригода, адже його доброта є прикладом для інших, а добро завжди отримує свою нагороду.',
    year: 2009,
    price: 340,
    pictureUrls: ['https://static.yakaboo.ua/media/catalog/product/5/3/53225_28767120.jpg'],
    genre: 'Роман',
    author: 'Рональд Даль',
    quantityInStock: 18,
    tags: [
      { name: 'Нове', hexColor: '#FF5733' },
      { name: 'Хіт', hexColor: '#FF5733' }
    ]
  },
  {
    id: '7',
    name: 'Модри Камінь',
    description: 'Роман, що розповідає про шлях юної дівчини в пошуках себе, на фоні гуцульських традицій.',
    year: 2005,
    price: 95,
    pictureUrls: ['https://static.yakaboo.ua/media/catalog/product/7/5/75171.jpg'],
    genre: 'Роман',
    author: 'Олесь Гончар',
    quantityInStock: 28,
    tags: [
      { name: 'Хіт', hexColor: '#FF5733' },
      { name: 'Акція', hexColor: '#33FF57' }
    ]
  },
  {
    id: '8',
    name: 'Книга Sapiens: Людина розумна. Коротка історія людства',
    description: 'Ця коротка історія людства — не традиційний хронологічний перелік подій і правителів, який бачимо в багатьох підручниках і науково-популярних виданнях. Ювал Ной Харарі поступово розкриває перед читачем, яким чином Homo sapiens із невидатного виду мавп став Людиною і досяг сучасних вершин економічного, технологічного та інтелектуального розвитку. Почавши з Когнітивної революції сімдесят тисяч років тому, автор показує, як наш біологічний вид розселявся по планеті, як здійснив Аграрну революцію приблизно дванадцять тисяч років тому, як нарешті Промислова і Наукова революції Нового часу дали Людині в руки могутні інструменти, за допомогою яких вона може не лише технічно розвиватися, а й змінити власну біологію. Ба більше, людство тепер здатне навіть знищити себе. І це може статися як унаслідок застосування ядерної чи іншої зброї масового ураження, так і в результаті створення на основі сапієнс інтелектуально розвинених істот зі здібностями, які нині неможливо передбачити.',
    year: 2024,
    price: 390,
    pictureUrls: ['https://static.yakaboo.ua/media/catalog/product/5/b/5bcb3d31aaf10b5c0ea2a3ea3bcec9ca.jpg'],
    genre: 'Документалістика',
    author: 'Юваль Ноа Харарі',
    quantityInStock: 12,
    tags: [
      { name: 'Нове', hexColor: '#FF5733' },
      { name: 'Акція', hexColor: '#33FF57' }
    ]
  },
  {
    id: '9',
    name: 'Лісова пісня',
    description: 'Класична драма Лесі Українки, що оспівує українську природу та віру в кохання.',
    year: 1912,
    price: 110,
    pictureUrls: ['https://content2.rozetka.com.ua/goods/images/big/372375268.png'],
    genre: 'Поезія',
    author: 'Леся Українка',
    quantityInStock: 17,
    tags: [
      { name: 'Хіт', hexColor: '#FF5733' },
      { name: 'Нове', hexColor: '#FF5733' }
    ]
  },
  {
    id: '10',
    name: 'Кайдашева сiм\'я',
    description: '\n' +
      'За словами Івана Франка, повість «Кайдашева сім’я» належить до «найкращих оздоб українського письменства». Ми зустрічаємося з героями: Кайдашем, його дружиною Марусею та двома їх синами Карпом і Лавріном у переламний момент існування сім\'ї, коли дорослішають діти, обирають собі пари і починається інше життя.',
    year: 2022,
    price: 75,
    pictureUrls: ['https://content2.rozetka.com.ua/goods/images/big/282915978.jpg'],
    genre: 'Повість',
    author: 'Нечуй-Левицький I.',
    quantityInStock: 22,
    tags: [
      { name: 'Акція', hexColor: '#33FF57' },
      { name: 'Хіт', hexColor: '#FF5733' }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private products$ = new BehaviorSubject<Product[]>(products);

  getProducts(shopParams: StoreParams): Observable<Pagination<Product>> {
    return this.products$.pipe(
      map(products => {
        return products.filter(product => {
          if (shopParams.authors.length > 0 && !shopParams.authors.includes(product.author)) {
            return false;
          }
          if (shopParams.genres.length > 0 && !shopParams.genres.includes(product.genre)) {
            return false;
          }
          console.log(product.name.toLowerCase());
          console.log(shopParams.search);
          return !(shopParams.search && !product.name.toLowerCase().includes(shopParams.search.toLowerCase()));
        });
      }),
      map(products => {
        return products.sort((a, b) => {
          switch (shopParams.sort) {
            case 'priceAsc':
              return a.price - b.price;
            case 'priceDesc':
              return b.price - a.price;
            default:
              return a.name.localeCompare(b.name);
          }
        });
      }),
      map(products => {
        const startIndex = (shopParams.pageNumber - 1) * shopParams.pageSize;
        return {
          data: products.slice(startIndex, startIndex + shopParams.pageSize),
          totalCount: products.length,
          pageIndex: shopParams.pageNumber,
          pageSize: shopParams.pageSize,
          count: products.length
        };
      })
    );
  }

  getProduct(id: string): Observable<any> {
    return this.products$.pipe(
      map(products => products.find(product => product.id === String(id)))
    );
  }

  getAuthors() {
    return this.products$.pipe(
      map(products => products.map(product => product.author)),
      map(authors => authors.filter((value, index, self) => self.indexOf(value) === index))
    );
  }

  getGenres() {
    return this.products$.pipe(
      map(products => products.map(product => product.genre)),
      map(genres => genres.filter((value, index, self) => self.indexOf(value) === index))
    );
  }

  getTags() {
    return this.products$.pipe(
      map(products => products.map(product => product.tags).flat()),
      map(tags => tags.filter((value, index, self) => self.findIndex(tag => tag.name === value.name) === index)
    ));
  }

  addProduct(product: Omit<Product, 'id'>) {
    this.products$.next([...this.products$.value, {
      id: nanoid(),
      ...product
    }]);
  }

  updateProduct(product: Product) {
    console.log(product);
    this.products$.next(this.products$.value.map(p => p.id === product.id ? product : p));
    console.log(this.products$.value);
  }

  deleteProduct(id: string) {
    this.products$.next(this.products$.value.filter(product => product.id !== id));
  }
}
