export interface Filetree {
  files: FiletreeNode[];
}

export interface FiletreeNode {
  /**
   * The name of this file
   */
  file: string;
  /**
   * The icon that should be displayed next to the name
   */
  icon?: string;
  /**
   * Childrens of this file
   */
  children?: FiletreeNode[];
}
