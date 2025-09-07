
export enum AppStep {
  UPLOAD,
  STYLE_SELECTION,
  GENERATING,
  STORY,
}

export enum ArtStyle {
  GraphicNovel = "Graphic Novel",
  Watercolor = "Watercolor",
  Anime = "Anime",
  ComicBook = "American Comic Book Art",
  FantasyArt = "Fantasy Art",
  Cyberpunk = "Cyberpunk",
}

export enum Genre {
  SciFi = "Sci-Fi Adventure",
  Fantasy = "Fantasy Quest",
  Detective = "Detective Noir",
  Cyberpunk = "Cyberpunk",
  Adventure = "Jungle Adventure",
  SpaceOpera = "Space Opera",
}

export interface ImageFile {
  base64: string;
  mimeType: string;
}
