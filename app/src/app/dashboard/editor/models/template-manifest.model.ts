export interface TemplateManifestItem {
  id: string;
  name: string;
  file: string;
}

export interface TemplateManifest {
  templates: TemplateManifestItem[];
}
