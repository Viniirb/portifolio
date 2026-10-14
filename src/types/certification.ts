export type Certification = {
  id: string;
  title: string;
  institution: string;
  date: string;
  image: string;
  featured?: boolean;
  category: "cybersecurity" | "cloud" | "development" | "networking" | "other" | "neuralnetworks";
};
