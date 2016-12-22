export interface IProduct {
  id: number;
  $key?: string;
  title: string;
  price: string;
  image: [{
      main: string,
      zoom: string
  }];
  description: string;
  categoryAssignments: number[];
}
