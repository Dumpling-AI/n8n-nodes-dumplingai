import { INodeProperties } from 'n8n-workflow';

export const searchPlacesFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['searchPlaces'],
			},
		},
		default: '',
		placeholder: 'pizza restaurants',
		description: 'The search query for Google Places',
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['searchPlaces'],
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
				operation: ['searchPlaces'],
			},
		},
		default: '',
		placeholder: 'Chicago, IL',
		description: 'Specific location to focus the search',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['searchPlaces'],
			},
		},
		default: 'en',
		placeholder: 'en',
		description: 'Language code for the search results (e.g., "en" for English)',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['searchPlaces'],
			},
		},
		default: 1,
		description: 'Page number for paginated results',
		typeOptions: {
			minValue: 1,
		},
	},
]; 