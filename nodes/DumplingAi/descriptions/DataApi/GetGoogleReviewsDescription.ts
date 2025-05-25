import { INodeProperties } from 'n8n-workflow';

export const getGoogleReviewsFields: INodeProperties[] = [
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
			},
		},
		default: 'keyword',
		description: 'Choose how to identify the business for reviews',
		options: [
			{ name: 'Keyword Search', value: 'keyword' },
			{ name: 'Google CID', value: 'cid' },
			{ name: 'Place ID', value: 'placeId' },
		],
	},
	{
		displayName: 'Keyword',
		name: 'keyword',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
				inputType: ['keyword'],
			},
		},
		default: '',
		placeholder: 'London Wines',
		description: 'Business name or search term to find reviews for',
	},
	{
		displayName: 'Google CID',
		name: 'cid',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
				inputType: ['cid'],
			},
		},
		default: '',
		placeholder: '1234567890123456789',
		description: 'Google Maps CID (Client ID) for a specific business',
	},
	{
		displayName: 'Place ID',
		name: 'placeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
				inputType: ['placeId'],
			},
		},
		default: '',
		placeholder: 'ChIJrTLr-GyuEmsRBfy61i59si0',
		description: 'Google Maps Place ID for a specific business',
	},
	{
		displayName: 'Number of Reviews',
		name: 'reviews',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
			},
		},
		default: 10,
		description: 'Number of reviews to fetch (max: 4490)',
		typeOptions: {
			minValue: 1,
			maxValue: 4490,
		},
	},
	{
		displayName: 'Sort By',
		name: 'sortBy',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
			},
		},
		default: 'relevant',
		description: 'Sort order for reviews',
		options: [
			{ name: 'Highest Rating', value: 'highest_rating' },
			{ name: 'Lowest Rating', value: 'lowest_rating' },
			{ name: 'Newest', value: 'newest' },
			{ name: 'Relevant', value: 'relevant' },
		],
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
			},
		},
		default: 'en',
		placeholder: 'en',
		description: 'Language code for the reviews (e.g., "en" for English). Advanced setting - use with caution.',
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['getGoogleReviews'],
			},
		},
		default: '',
		placeholder: 'London,England,United Kingdom',
		description: 'Location context for the search. Advanced setting - use with caution.',
	},
]; 