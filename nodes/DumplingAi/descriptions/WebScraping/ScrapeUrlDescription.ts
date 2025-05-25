import { INodeProperties } from 'n8n-workflow';
import { webScrapingFormatOptions } from '../Common/OutputFormatOptions';

export const scrapeUrlFields: INodeProperties[] = [
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webScraping'],
				operation: ['scrapeUrl'],
			},
		},
		default: '',
		placeholder: 'https://example.com',
		description: 'The URL to scrape',
	},
	{
		displayName: 'Output Format',
		name: 'format',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['webScraping'],
				operation: ['scrapeUrl'],
			},
		},
		options: webScrapingFormatOptions,
		default: 'markdown',
		description: 'The format of the output',
	},
	{
		displayName: 'Clean Output',
		name: 'cleaned',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['webScraping'],
				operation: ['scrapeUrl'],
			},
		},
		default: true,
		description: 'Whether the output should be cleaned (removes nav bar, footer, etc.)',
	},
	{
		displayName: 'Render JavaScript',
		name: 'renderJs',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['webScraping'],
				operation: ['scrapeUrl'],
			},
		},
		default: false,
		description: 'Whether to render JavaScript before scraping (disable for faster results if not needed)',
	},
]; 