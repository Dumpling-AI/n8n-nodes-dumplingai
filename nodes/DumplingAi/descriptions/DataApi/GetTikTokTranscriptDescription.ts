import { INodeProperties } from 'n8n-workflow';

export const getTikTokTranscriptFields: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getTikTokTranscript'],
			},
		},
		default: '',
		placeholder: 'https://www.tiktok.com/@username/video/1234567890123456789',
		description: 'The full URL of the TikTok video you want to get the transcript for',
	},
	{
		displayName: 'Preferred Language',
		name: 'preferredLanguage',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getTikTokTranscript'],
			},
		},
		default: 'en',
		description: 'The 2-letter ISO 639-1 language code for the desired transcript language',
		options: [
			{ name: 'Arabic', value: 'ar' },
			{ name: 'Chinese (Simplified)', value: 'zh' },
			{ name: 'Chinese (Traditional)', value: 'zh-TW' },
			{ name: 'Dutch', value: 'nl' },
			{ name: 'English', value: 'en' },
			{ name: 'French', value: 'fr' },
			{ name: 'German', value: 'de' },
			{ name: 'Hindi', value: 'hi' },
			{ name: 'Italian', value: 'it' },
			{ name: 'Japanese', value: 'ja' },
			{ name: 'Korean', value: 'ko' },
			{ name: 'Portuguese', value: 'pt' },
			{ name: 'Russian', value: 'ru' },
			{ name: 'Spanish', value: 'es' },
			{ name: 'Turkish', value: 'tr' },
		],
	},
]; 