export interface Brewery {
  id: string;
  name: string;
  city: string;
  state: string;
  brewery_type: string;
}

export interface BreweryDetail {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  website_url: string;
}
