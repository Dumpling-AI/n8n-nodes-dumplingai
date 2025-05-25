/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */

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
			name: 'Get Google Reviews',
			value: 'getGoogleReviews',
			description: 'Get Google Reviews for a place or business',
			action: 'Get Google Reviews',
			routing: {
				request: {
					method: 'POST',
					url: '/get-google-reviews',
					body: {
						keyword: '={{ $parameter.inputType === "keyword" ? $parameter.keyword : undefined }}',
						cid: '={{ $parameter.inputType === "cid" ? $parameter.cid : undefined }}',
						placeId: '={{ $parameter.inputType === "placeId" ? $parameter.placeId : undefined }}',
						reviews: '={{ $parameter.reviews }}',
						sortBy: '={{ $parameter.sortBy }}',
						language: '={{ $parameter.language }}',
						location: '={{ $parameter.location || undefined }}',
					},
				},
			},
		},
		{
			name: 'Get TikTok Transcript',
			value: 'getTikTokTranscript',
			description: 'Retrieve the transcript from a TikTok video',
			action: 'Get TikTok Transcript',
			routing: {
				request: {
					method: 'POST',
					url: '/get-tiktok-transcript',
					body: {
						videoUrl: '={{ $parameter.videoUrl }}',
						preferredLanguage: '={{ $parameter.preferredLanguage }}',
					},
				},
			},
		},
		{
			name: 'Get YouTube Transcript',
			value: 'getYouTubeTranscript',
			description: 'Extract the transcript from a specified YouTube video URL',
			action: 'Get YouTube Transcript',
			routing: {
				request: {
					method: 'POST',
					url: '/get-youtube-transcript',
					body: {
						videoUrl: '={{ $parameter.videoUrl }}',
						includeTimestamps: '={{ $parameter.includeTimestamps }}',
						timestampsToCombine: '={{ $parameter.timestampsToCombine }}',
						preferredLanguage: '={{ $parameter.preferredLanguage }}',
					},
				},
			},
		},
		{
			name: 'Search',
			value: 'search',
			description: 'Perform a Google web search with optional content scraping',
			action: 'Search Google',
			routing: {
				request: {
					method: 'POST',
					url: '/search',
					body: {
						query: '={{ $parameter.query }}',
						country: '={{ $parameter.country }}',
						location: '={{ $parameter.location }}',
						language: '={{ $parameter.language }}',
						dateRange: '={{ $parameter.dateRange }}',
						page: '={{ $parameter.page }}',
						scrapeResults: '={{ $parameter.scrapeResults }}',
						numResultsToScrape: '={{ $parameter.numResultsToScrape }}',
						scrapeOptions: {
							format: '={{ $parameter.scrapeFormat }}',
							cleaned: '={{ $parameter.scrapeCleaned }}',
						},
					},
				},
			},
		},
		{
			name: 'Search News',
			value: 'searchNews',
			description: 'Search Google News for articles',
			action: 'Search News',
			routing: {
				request: {
					method: 'POST',
					url: '/search-news',
					body: {
						query: '={{ $parameter.query }}',
						country: '={{ $parameter.country }}',
						location: '={{ $parameter.location }}',
						language: '={{ $parameter.language }}',
						dateRange: '={{ $parameter.dateRange }}',
						page: '={{ $parameter.page }}',
					},
				},
			},
		},
		{
			name: 'Search Places',
			value: 'searchPlaces',
			description: 'Search Google Places for businesses and locations',
			action: 'Search Places',
			routing: {
				request: {
					method: 'POST',
					url: '/search-places',
					body: {
						query: '={{ $parameter.query }}',
						country: '={{ $parameter.country }}',
						location: '={{ $parameter.location }}',
						language: '={{ $parameter.language }}',
						page: '={{ $parameter.page }}',
					},
				},
			},
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
			routing: {
				request: {
					method: 'POST',
					url: '/scrape',
					body: {
						url: '={{ $parameter.url }}',
						format: '={{ $parameter.format }}',
						cleaned: '={{ $parameter.cleaned }}',
						renderJs: '={{ $parameter.renderJs }}',
					},
				},
			},
		},
	],
	default: 'scrapeUrl',
}; 