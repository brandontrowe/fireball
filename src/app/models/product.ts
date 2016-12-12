export interface IProduct {
  id: number;
  title: string;
  price: string;
  images: {
      thumb: string,
      main: string,
      zoom: string
  };
  description: string;
  categoryAssignments: number[];
}
