/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

import { INodeProperties } from 'n8n-workflow';

export const searchFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
			},
		},
		default: '',
		placeholder: 'Enter your search query',
		description: 'The search query to perform on Google',
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
			},
		},
		default: '',
		placeholder: 'US',
		description: 'Country code for location bias (e.g., "US" for United States)',
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
			},
		},
		default: '',
		placeholder: 'New York, NY',
		description: 'Specific location to focus the search',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
			},
		},
		default: 'en',
		placeholder: 'en',
		description: 'Language code for the search results (e.g., "en" for English)',
	},
	{
		displayName: 'Date Range',
		name: 'dateRange',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
			},
		},
		default: 'anyTime',
		description: 'Filter results by date range',
		options: [
			{ name: 'Any Time', value: 'anyTime' },
			{ name: 'Past Hour', value: 'pastHour' },
			{ name: 'Past Day', value: 'pastDay' },
			{ name: 'Past Week', value: 'pastWeek' },
			{ name: 'Past Month', value: 'pastMonth' },
			{ name: 'Past Year', value: 'pastYear' },
		],
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
			},
		},
		default: 1,
		description: 'Page number for paginated results',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Scrape Results',
		name: 'scrapeResults',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
			},
		},
		default: false,
		description: 'Whether to scrape the content of top search results',
	},
	{
		displayName: 'Number of Results to Scrape',
		name: 'numResultsToScrape',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
				scrapeResults: [true],
			},
		},
		default: 3,
		description: 'Number of top results to scrape (max: 10)',
		typeOptions: {
			minValue: 1,
			maxValue: 10,
		},
	},
	{
		displayName: 'Scrape Format',
		name: 'scrapeFormat',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
				scrapeResults: [true],
			},
		},
		default: 'markdown',
		description: 'Format for scraped content',
		options: [
			{ name: 'Markdown', value: 'markdown' },
			{ name: 'HTML', value: 'html' },
			{ name: 'Screenshot', value: 'screenshot' },
		],
	},
	{
		displayName: 'Clean Scraped Content',
		name: 'scrapeCleaned',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['search'],
				scrapeResults: [true],
			},
		},
		default: true,
		description: 'Whether the scraped output should be cleaned',
	},
]; 