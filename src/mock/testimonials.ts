export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'HR Manager',
    company: 'Madurai Textiles',
    content: 'Dharvista helped us find skilled loom operators within a week. Their understanding of local talent is unmatched.',
    rating: 5,
  },
  {
    id: '2',
    name: 'S. Lakshmi',
    role: 'Job Seeker',
    company: 'Placed at TechSolutions',
    content: 'I was looking for a job in Chennai while living in Virudhunagar. They guided me through the interview and I got the offer!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Anand P.',
    role: 'Director',
    company: 'Sivakasi Fireworks',
    content: 'Professional, ethical, and fast. They handled our bulk hiring requirements very efficiently during the festival season.',
    rating: 4,
  },
];