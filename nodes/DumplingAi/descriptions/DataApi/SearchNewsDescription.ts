/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */

import { INodeProperties } from 'n8n-workflow';

export const searchNewsFields: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['searchNews'],
			},
		},
		default: '',
		placeholder: 'climate change',
		description: 'The search query for Google News',
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataApi'],
				operation: ['searchNews'],
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
				operation: ['searchNews'],
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
				operation: ['searchNews'],
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
				operation: ['searchNews'],
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
				operation: ['searchNews'],
			},
		},
		default: 1,
		description: 'Page number for paginated results',
		typeOptions: {
			minValue: 1,
		},
	},
]; 