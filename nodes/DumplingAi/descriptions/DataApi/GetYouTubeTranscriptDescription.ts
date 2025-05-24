import { INodeProperties } from 'n8n-workflow';

export const getYouTubeTranscriptFields: INodeProperties[] = [
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
]; 