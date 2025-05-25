// Main properties (Resource and Operation selectors)
export { 
	resourceProperty, 
	dataApiOperations, 
	webScrapingOperations 
} from './DumplingAiProperties';

// Data API operations
export { getYouTubeTranscriptFields } from './DataApi/GetYouTubeTranscriptDescription';
export { getTikTokTranscriptFields } from './DataApi/GetTikTokTranscriptDescription';
export { searchFields } from './DataApi/SearchDescription';
export { searchPlacesFields } from './DataApi/SearchPlacesDescription';
export { searchNewsFields } from './DataApi/SearchNewsDescription';
export { getGoogleReviewsFields } from './DataApi/GetGoogleReviewsDescription';

// Web Scraping operations
export { scrapeUrlFields } from './WebScraping/ScrapeUrlDescription';

// Common shared options
export { webScrapingFormatOptions } from './Common/OutputFormatOptions'; 