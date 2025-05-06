export interface Country {
  name: {
    common: string;
  };
  independent: boolean;
  unMember: boolean;
  region: string;
  area: number;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
}
