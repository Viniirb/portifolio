export type Certification = {
  id: string;
  title: string;
  institution: string;
  date: string;
  image: string;
  featured?: boolean;
  modules?: { title: string; date: string }[];
  category: "cybersecurity" | "cloud" | "development" | "networking" | "other" | "neuralnetworks" | "community";
};
