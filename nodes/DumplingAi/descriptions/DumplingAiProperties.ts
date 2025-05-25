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