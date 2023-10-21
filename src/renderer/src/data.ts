import { Client } from "./app/models/client.model";
import { Product } from "./app/models/product.model";

export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Inicio",
        url: "/",
        icon: "home",
      },
      {
        id: 2,
        title: "Perfil",
        url: "/users/1",
        icon: "user",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Clientes",
        url: "/clients",
        icon: "user",
      },
      {
        id: 2,
        title: "Productos",
        url: "/products",
        icon: "product",
      },
      {
        id: 3,
        title: "Ordenes",
        url: "/orders",
        icon: "order",
      },
      {
        id: 4,
        title: "Posts",
        url: "/posts",
        icon: "post2",
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: "element",
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: "note",
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: "form",
      },
      {
        id: 4,
        title: "Calendar",
        url: "/",
        icon: "calendar",
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "setting",
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: "backup",
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "chart",
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "log",
      },
    ],
  },
];

export const singleUser = {
  id: 1,
  title: "John Doe",
  img: "https://images.pexels.com/photos/17397364/pexels-photo-17397364.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  info: {
    username: "Johndoe99",
    fullname: "John Doe",
    email: "johndoe@gmail.com",
    phone: "123 456 789",
    status: "verified",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "clicks", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        clicks: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        clicks: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        clicks: 3800,
      },
      {
        name: "Wed",
        visits: 2780,
        clicks: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        clicks: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        clicks: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        clicks: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe purchased Playstation 5 Digital Edition",
      time: "3 day ago",
    },
    {
      text: "John Doe added 3 items into their wishlist",
      time: "1 week ago",
    },
    {
      text: "John Doe purchased Sony Bravia KD-32w800",
      time: "2 weeks ago",
    },
    {
      text: "John Doe reviewed a product",
      time: "1 month ago",
    },
    {
      text: "John Doe added 1 items into their wishlist",
      time: "1 month ago",
    },
    {
      text: "John Doe reviewed a product 1",
      time: "2 months ago",
    },
  ],
};
