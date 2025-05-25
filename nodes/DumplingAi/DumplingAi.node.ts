import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import {
	resourceProperty,
	dataApiOperations,
	webScrapingOperations,
	getYouTubeTranscriptFields,
	getTikTokTranscriptFields,
	searchFields,
	searchPlacesFields,
	searchNewsFields,
	getGoogleReviewsFields,
	scrapeUrlFields,
} from './descriptions';

export class DumplingAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dumpling AI',
		name: 'dumplingAi',
		icon: 'file:DumplingAi.icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Dumpling AI APIs (data, web scraping, document conversion, AI, etc.)',
		defaults: {
			name: 'Dumpling AI',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'dumplingAiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.dumplingai.com/api/v1',
			headers: {
				'Content-Type': 'application/json',
				'Request-Source': 'N8N',
			},
		},
		properties: [
			resourceProperty,
			dataApiOperations,
			webScrapingOperations,
			...getYouTubeTranscriptFields,
			...getTikTokTranscriptFields,
			...searchFields,
			...searchPlacesFields,
			...searchNewsFields,
			...getGoogleReviewsFields,
			...scrapeUrlFields,
		],
	};


} 