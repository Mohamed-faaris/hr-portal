// src/mock/clients.ts


export interface Client {
  id: string;
  name: string;
  industry: string;
  logo: string;
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Vwin Notebooks',
    industry: 'Manufacturing',
    logo: 'assets/clients/company1.jpg'
  },
  {
    id: '2',
    name: 'Bunty Toys',
    industry: 'Retail',
    logo: 'assets/clients/company2.jpg'
  },
  {
    id: '3',
    name: 'Velacherry Venkateshwara',
    industry: 'Retail',
    logo: 'assets/clients/company3.jpg'
  },
  {
    id: '4',
    name: 'Mutha Opticals',
    industry: 'Healthcare',
    logo: 'assets/clients/company4.jpg'
  },
  {
    id: '5',
    name: 'Barbikan',
    industry: 'Wholesale',
    logo: 'assets/clients/company5.jpg'
  },
  {
    id: '6',
    name: 'MP Enterprises',
    industry: 'General',
    logo: 'assets/clients/company6.jpg'
  },
  {
    id: '7',
    name: 'Glitz Info Solution',
    industry: 'IT Services',
    logo: 'assets/clients/company7.jpg'
  },
  {
    id: '8',
    name: 'AGC',
    industry: 'Corporate',
    logo: 'assets/clients/company8.jpg'
  },
];