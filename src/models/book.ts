export interface IBook {
    id : string,
    volumeInfo : IVolumeInfo
}

export interface IVolumeInfo {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: IndustryIdentifier[];
    readingModes?: ReadingModes;
    pageCount?: number;
    printType?: string;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    panelizationSummary?: PanelizationSummary;
    imageLinks?: ImageLinks;
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
  }
  
  interface IndustryIdentifier {
    type: string;
    identifier: string;
  }
  
  interface ReadingModes {
    text: boolean;
    image: boolean;
  }
  
  interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  }
  
  interface ImageLinks {
    extraLarge?: string,
    large? : string,
    medium? : string,
    small? : string,
    smallThumbnail: string;
    thumbnail: string;
  }

  