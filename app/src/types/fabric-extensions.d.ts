import 'fabric';

declare module 'fabric' {
  namespace fabric {
    interface Object {
      profetecaRole?: string;
      profetecaLabel?: string;
      profetecaLetterSpacingEm?: number;
      profetecaBorderRadius?: number;
    }
    interface IObjectOptions {
      profetecaRole?: string;
      profetecaLabel?: string;
      profetecaLetterSpacingEm?: number;
      profetecaBorderRadius?: number;
    }
  }
}
