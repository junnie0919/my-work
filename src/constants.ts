export interface PortfolioItem {
  id: string;
  title: string;
  videoUrl: string;
}

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Vimeo Project',
    videoUrl: 'https://vimeo.com/1178175271'
  },
  {
    id: '2',
    title: 'Video 2',
    videoUrl: 'input_file_1.mp4'
  },
  {
    id: '3',
    title: 'Video 3',
    videoUrl: 'input_file_2.mp4'
  }
];
