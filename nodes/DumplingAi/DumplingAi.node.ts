import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeApiError,
} from 'n8n-workflow';

import {
	resourceProperty,
	dataApiOperations,
	webScrapingOperations,
	getYouTubeTranscriptFields,
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
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			resourceProperty,
			dataApiOperations,
			webScrapingOperations,
			...getYouTubeTranscriptFields,
			...scrapeUrlFields,
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