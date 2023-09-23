import { Client } from './app/models/client.model'
import { Product } from './app/models/product.model'

export const menu = [
  {
    id: 1,
    title: 'main',
    listItems: [
      {
        id: 1,
        title: 'Inicio',
        url: '/',
        icon: 'home'
      },
      {
        id: 2,
        title: 'Perfil',
        url: '/users/1',
        icon: 'user'
      }
    ]
  },
  {
    id: 2,
    title: 'lists',
    listItems: [
      {
        id: 1,
        title: 'Usuarios',
        url: '/users',
        icon: 'user'
      },
      {
        id: 2,
        title: 'Productos',
        url: '/products',
        icon: 'product'
      },
      {
        id: 3,
        title: 'Ordenes',
        url: '/orders',
        icon: 'order'
      },
      {
        id: 4,
        title: 'Posts',
        url: '/posts',
        icon: 'post2'
      }
    ]
  },
  {
    id: 3,
    title: 'general',
    listItems: [
      {
        id: 1,
        title: 'Elements',
        url: '/',
        icon: 'element'
      },
      {
        id: 2,
        title: 'Notes',
        url: '/',
        icon: 'note'
      },
      {
        id: 3,
        title: 'Forms',
        url: '/',
        icon: 'form'
      },
      {
        id: 4,
        title: 'Calendar',
        url: '/',
        icon: 'calendar'
      }
    ]
  },
  {
    id: 4,
    title: 'Maintenance',
    listItems: [
      {
        id: 1,
        title: 'Settings',
        url: '/',
        icon: 'setting'
      },
      {
        id: 2,
        title: 'Backups',
        url: '/',
        icon: 'backup'
      }
    ]
  },
  {
    id: 5,
    title: 'analytics',
    listItems: [
      {
        id: 1,
        title: 'Charts',
        url: '/',
        icon: 'chart'
      },
      {
        id: 2,
        title: 'Logs',
        url: '/',
        icon: 'log'
      }
    ]
  }
]

export const optionsClients: Client[] = [
  {
    id: 1,
    name: 'Animal Home Vet'
  },
  {
    id: 2,
    name: 'Animalife'
  },
  {
    id: 3,
    name: 'Natalia Correa'
  },
  {
    id: 4,
    name: 'Parque Conservacion'
  }
]
export const optionsProducts: Product[] = [
  {
    id: 1,
    description: 'Test 1',
    price: 100000
  },
  {
    id: 2,
    description: 'Test 2',
    price: 200000
  },
  {
    id: 3,
    description: 'Test 3',
    price: 300000
  },
  {
    id: 4,
    description: 'Test 4',
    price: 400000
  }
]

export const userRows = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    lastName: 'Hubbard',
    firstName: 'Eula',
    email: 'kewez@@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 2,
    img: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Manning',
    firstName: 'Stella',
    email: 'comhuhmit@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 3,
    img: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Greer',
    firstName: 'Mary',
    email: 'ujudokon@hottmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Williamson',
    firstName: 'Mildred',
    email: 'tinhavabe@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 5,
    img: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Gross',
    firstName: 'Jose',
    email: 'gobtagbes@yahoo.com',
    phone: '123 456 789',
    createdAt: '01.02.2023'
  },
  {
    id: 6,
    img: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Sharp',
    firstName: 'Jeremy',
    email: 'vulca.eder@mail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 7,
    img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Lowe',
    firstName: 'Christina',
    email: 'reso.bilic@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023'
  },
  {
    id: 8,
    img: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Dean',
    firstName: 'Garrett',
    email: 'codaic@mail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 9,
    img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Parsons',
    firstName: 'Leah',
    email: 'uzozor@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023'
  },
  {
    id: 10,
    img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Reid',
    firstName: 'Elnora',
    email: 'tuhkabapu@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 11,
    img: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Dunn',
    firstName: 'Gertrude',
    email: 'gibo@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023',
    verified: true
  },
  {
    id: 12,
    img: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Williams',
    firstName: 'Mark',
    email: 'tic.harvey@hotmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023'
  },
  {
    id: 13,
    img: 'https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Cruz',
    firstName: 'Charlotte',
    email: 'ceuc@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023'
  },
  {
    id: 14,
    img: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lastName: 'Harper',
    firstName: 'Sara',
    email: 'bafuv@hotmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023'
  },
  {
    id: 15,
    img: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    lastName: 'Griffin',
    firstName: 'Eric',
    email: 'ubi@gmail.com',
    phone: '123 456 789',
    createdAt: '01.02.2023'
  }
]

export const orderRows = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    client: 'Hubbard Eula',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 2,
    img: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Manning Stella',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 3,
    img: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Greer Mary',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Williamson Mildred',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 5,
    img: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Gross Jose',
    total: 123456789,
    createdAt: '01.02.2023'
  },
  {
    id: 6,
    img: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Sharp Jeremy',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 7,
    img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Lowe Christina',
    total: 123456789,
    createdAt: '01.02.2023'
  },
  {
    id: 8,
    img: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Dean Garrett',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 9,
    img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Parsons Leah',
    total: 123456789,
    createdAt: '01.02.2023'
  },
  {
    id: 10,
    img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Reid Elnora',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 11,
    img: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Dunn Gertrude',
    total: 123456789,
    createdAt: '01.02.2023',
    paid: true
  },
  {
    id: 12,
    img: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Williams Mark',
    total: 123456789,
    createdAt: '01.02.2023'
  },
  {
    id: 13,
    img: 'https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Cruz Charlotte',
    total: 123456789,
    createdAt: '01.02.2023'
  },
  {
    id: 14,
    img: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600',
    client: 'Harper Sara',
    total: 123456789,
    createdAt: '01.02.2023'
  },
  {
    id: 15,
    img: 'https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
    client: 'Griffin Eric',
    total: 123456789,
    createdAt: '01.02.2023'
  }
]

export const singleUser = {
  id: 1,
  title: 'John Doe',
  img: 'https://images.pexels.com/photos/17397364/pexels-photo-17397364.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  info: {
    username: 'Johndoe99',
    fullname: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '123 456 789',
    status: 'verified'
  },
  chart: {
    dataKeys: [
      { name: 'visits', color: '#82ca9d' },
      { name: 'clicks', color: '#8884d8' }
    ],
    data: [
      {
        name: 'Sun',
        visits: 4000,
        clicks: 2400
      },
      {
        name: 'Mon',
        visits: 3000,
        clicks: 1398
      },
      {
        name: 'Tue',
        visits: 2000,
        clicks: 3800
      },
      {
        name: 'Wed',
        visits: 2780,
        clicks: 3908
      },
      {
        name: 'Thu',
        visits: 1890,
        clicks: 4800
      },
      {
        name: 'Fri',
        visits: 2390,
        clicks: 3800
      },
      {
        name: 'Sat',
        visits: 3490,
        clicks: 4300
      }
    ]
  },
  activities: [
    {
      text: 'John Doe purchased Playstation 5 Digital Edition',
      time: '3 day ago'
    },
    {
      text: 'John Doe added 3 items into their wishlist',
      time: '1 week ago'
    },
    {
      text: 'John Doe purchased Sony Bravia KD-32w800',
      time: '2 weeks ago'
    },
    {
      text: 'John Doe reviewed a product',
      time: '1 month ago'
    },
    {
      text: 'John Doe added 1 items into their wishlist',
      time: '1 month ago'
    },
    {
      text: 'John Doe reviewed a product 1',
      time: '2 months ago'
    }
  ]
}
