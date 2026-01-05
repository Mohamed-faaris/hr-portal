// src/mock/clients.ts

// 🟢 1. IMPORTS (Matching your filenames)
// Ensure these files are in src/assets/clients/
import img1 from "~/assets/clients/company1.jpg";
import img2 from "~/assets/clients/company2.jpg";
import img3 from "~/assets/clients/company3.jpg";
import img4 from "~/assets/clients/company4.jpg";
import img5 from "~/assets/clients/company5.jpg";
import img6 from "~/assets/clients/company6.jpg";
import img7 from "~/assets/clients/company7.jpg";
import img8 from "~/assets/clients/company8.jpg";

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
    logo: img1 
  },
  { 
    id: '2', 
    name: 'Bunty Toys', 
    industry: 'Retail', 
    logo: img2 
  },
  { 
    id: '3', 
    name: 'Velacherry Venkateshwara', 
    industry: 'Retail', 
    logo: img3 
  },
  { 
    id: '4', 
    name: 'Mutha Opticals', 
    industry: 'Healthcare', 
    logo: img4 
  },
  { 
    id: '5', 
    name: 'Barbikan', 
    industry: 'Wholesale', 
    logo: img5 
  },
  { 
    id: '6', 
    name: 'MP Enterprises', 
    industry: 'General', 
    logo: img6 
  },
  { 
    id: '7', 
    name: 'Glitz Info Solution', 
    industry: 'IT Services', 
    logo: img7 
  },
  { 
    id: '8', 
    name: 'AGC', 
    industry: 'Corporate', 
    logo: img8 
  },
];