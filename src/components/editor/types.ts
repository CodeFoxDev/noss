import type { Ref } from "vue";

export type Tabs = "explorer" | "search" | "version control" | "issue";
export type TabsRef = Ref<Tabs>;
