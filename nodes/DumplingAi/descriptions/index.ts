// Main properties (Resource and Operation selectors)
export { 
	resourceProperty, 
	dataApiOperations, 
	webScrapingOperations 
} from './DumplingAiProperties';

// Data API operations
export { getYouTubeTranscriptFields } from './DataApi/GetYouTubeTranscriptDescription';
export { getTikTokTranscriptFields } from './DataApi/GetTikTokTranscriptDescription';

// Web Scraping operations
export { scrapeUrlFields } from './WebScraping/ScrapeUrlDescription';

// Common shared options
export { webScrapingFormatOptions } from './Common/OutputFormatOptions'; 