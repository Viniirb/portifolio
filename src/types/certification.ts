export type Certification = {
  id: string;
  title: string;
  institution: string;
  date: string;
  image: string;
  category: "cybersecurity" | "cloud" | "development" | "networking" | "other";
};
