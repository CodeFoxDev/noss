import type { Ref } from 'vue';

export type Tabs =
  | 'explorer'
  | 'search'
  | 'version_control'
  | 'issue'
  | 'collapsed';
export type TabsRef = Ref<Tabs>;
