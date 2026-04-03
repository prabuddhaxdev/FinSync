import { Brain, BrainIcon, Clock, FileText, Table, Target } from "lucide-react";


export const stats = [
  {
    number: "99.9%",
    label: "Accuracy Rate",
    icon: Target,
  },
  {
    number: "<3s",
    label: "Processing Time",
    icon:  Clock,
  },
  {
    number: "50+",
    label: "Receipt Types",
    icon:   FileText,
  },
  {
    number: "24/7",
    label: "AI Availability",
    icon: Brain,
  },
];

export const images = {
  "item-1": {
    image: BrainIcon,
    alt: "AI receipt scanning interface",
  },
  "item-2": {
    image: Clock,
    alt: "Analytics dashboard with charts and budget tracking",
  },
  "item-3": {
    image: Table,
    alt: "Transaction history table with filters and sorting",
  },
};



