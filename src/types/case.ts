import type { Localized } from "@/i18n/types";

export type OpenSourceItem = {
  id: string;
  title: Localized<string>;
  period: Localized<string>;
};
