import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeApiError,
} from 'n8n-workflow';

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
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
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
			},
			{
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
			},
			{
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
			},
			// YouTube Transcript fields
			{
				displayName: 'Video URL',
				name: 'videoUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['dataApi'],
						operation: ['getYouTubeTranscript'],
					},
				},
				default: '',
				placeholder: 'https://www.youtube.com/watch?v=example',
				description: 'The URL of the YouTube video',
			},
			{
				displayName: 'Include Timestamps',
				name: 'includeTimestamps',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['dataApi'],
						operation: ['getYouTubeTranscript'],
					},
				},
				default: true,
				description: 'Whether to include timestamps in the transcript',
			},
			{
				displayName: 'Timestamps to Combine',
				name: 'timestampsToCombine',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['dataApi'],
						operation: ['getYouTubeTranscript'],
						includeTimestamps: [true],
					},
				},
				default: 5,
				description: 'The number of timestamps to combine in the transcript',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Preferred Language',
				name: 'preferredLanguage',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['dataApi'],
						operation: ['getYouTubeTranscript'],
					},
				},
				default: 'en',
				description: 'Preferred language for the transcript',
				options: [
					{ name: 'Chinese (Simplified)', value: 'zh-Hans' },
					{ name: 'Chinese (Traditional)', value: 'zh-Hant' },
					{ name: 'English', value: 'en' },
					{ name: 'French', value: 'fr' },
					{ name: 'German', value: 'de' },
					{ name: 'Italian', value: 'it' },
					{ name: 'Japanese', value: 'ja' },
					{ name: 'Korean', value: 'ko' },
					{ name: 'Portuguese', value: 'pt' },
					{ name: 'Spanish', value: 'es' },
					// Add more languages as needed based on the full list from the API docs
				],
			},
			// Web Scraping fields
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
				options: [
					{
						name: 'HTML',
						value: 'html',
						description: 'Raw HTML content',
					},
					{
						name: 'Markdown',
						value: 'markdown',
						description: 'Clean markdown format',
					},
					{
						name: 'Screenshot',
						value: 'screenshot',
						description: 'Screenshot of the page',
					},
				],
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
				description: 'Whether the output should be cleaned',
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
				default: true,
				description: 'Whether to render JavaScript before scraping (disable for faster results if not needed)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData;

				if (resource === 'dataApi') {
					if (operation === 'getYouTubeTranscript') {
						// Get YouTube Transcript
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;
						const includeTimestamps = this.getNodeParameter('includeTimestamps', i, true) as boolean;
						const timestampsToCombine = this.getNodeParameter('timestampsToCombine', i, 5) as number;
						const preferredLanguage = this.getNodeParameter('preferredLanguage', i, 'en') as string;

						const body: any = {
							videoUrl,
						};

						// Only include optional parameters if they differ from defaults
						if (includeTimestamps !== true) {
							body.includeTimestamps = includeTimestamps;
						}
						if (timestampsToCombine !== 5) {
							body.timestampsToCombine = timestampsToCombine;
						}
						if (preferredLanguage !== 'en') {
							body.preferredLanguage = preferredLanguage;
						}

						const options = {
							method: 'POST' as const,
							url: 'https://app.dumplingai.com/api/v1/get-youtube-transcript',
							body,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(this, 'dumplingAiApi', options);
					}
				} else if (resource === 'webScraping') {
					if (operation === 'scrapeUrl') {
						// Scrape URL
						const url = this.getNodeParameter('url', i) as string;
						const format = this.getNodeParameter('format', i, 'markdown') as string;
						const cleaned = this.getNodeParameter('cleaned', i, true) as boolean;
						const renderJs = this.getNodeParameter('renderJs', i, true) as boolean;

						const body: any = {
							url,
						};

						// Only include optional parameters if they differ from defaults
						if (format !== 'markdown') {
							body.format = format;
						}
						if (cleaned !== true) {
							body.cleaned = cleaned;
						}
						if (renderJs !== true) {
							body.renderJs = renderJs;
						}

						const options = {
							method: 'POST' as const,
							url: 'https://app.dumplingai.com/api/v1/scrape',
							body,
							json: true,
						};

						responseData = await this.helpers.requestWithAuthentication.call(this, 'dumplingAiApi', options);
					}
				}

				if (responseData === undefined) {
					throw new NodeApiError(this.getNode(), {
						message: `The operation "${operation}" is not supported`,
					});
				}

				returnData.push({
					json: responseData,
					pairedItem: {
						item: i,
					},
				});
			} catch (error) {
				let errorMessage = 'Unknown API error';
				let httpCode = undefined;

				if (error.response) {
					httpCode = error.response.status;
					if (error.response.data) {
						if (typeof error.response.data === 'object' && error.response.data.error) {
							errorMessage = error.response.data.error;
						} else if (typeof error.response.data === 'string') {
							errorMessage = error.response.data;
						}
					}
				} else if (error.message) {
					errorMessage = error.message;
				}

				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}

				throw new NodeApiError(this.getNode(), error, {
					message: `Dumpling AI API Error: ${errorMessage}`,
					httpCode,
				});
			}
		}

		return [returnData];
	}
} 