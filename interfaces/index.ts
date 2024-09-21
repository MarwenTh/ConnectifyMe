export interface ILink {
  _id?: string;
  title: string;
  link: string;
  active: boolean;
  variant?: [
    {
      bgColor: string;
      bgImage: string;
      bgVideo: string;
      textColor: string;
      textFont: string;
      buttonStyle: string;
      styleStatus: string;
    }
  ];
}
