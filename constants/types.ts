export type connections =
  | {
      name: string;
      image: string;
      id: any;
      time: string;
    }[]
  | null;

export type Organization = {
  organization_name: string;
  id: number;
  website_url: string;
  location: string;
  category: string;
  work_days: string;
  description: string;
  imageUrl: string;
  email: string;
  active: boolean;
  leisure: boolean;
  createAt: string;
  ownerId: string;
  opening_time: string;
  closing_time: string;
};
