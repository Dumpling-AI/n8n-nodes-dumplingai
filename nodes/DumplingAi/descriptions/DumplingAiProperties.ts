import { INodeProperties } from 'n8n-workflow';

export const resourceProperty: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Data API',
			value: 'dataApi',
		},
		{
			name: 'Web Scraping',
			value: 'webScraping',
		},
	],
	default: 'dataApi',
};

export const dataApiOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['dataApi'],
		},
	},
	options: [
		{
			name: 'Get YouTube Transcript',
			value: 'getYouTubeTranscript',
			description: 'Extract the transcript from a specified YouTube video URL',
			action: 'Get youtube transcript',
		},
	],
	default: 'getYouTubeTranscript',
};

export const webScrapingOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['webScraping'],
		},
	},
	options: [
		{
			name: 'Scrape URL',
			value: 'scrapeUrl',
			description: 'Scrape data from a specified URL with formatting options',
			action: 'Scrape URL',
		},
	],
	default: 'scrapeUrl',
}; 