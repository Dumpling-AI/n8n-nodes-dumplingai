import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DumplingAiApi implements ICredentialType {
	name = 'dumplingAiApi';
	displayName = 'Dumpling AI API';
	documentationUrl = 'https://docs.dumplingai.com/api-reference/introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.dumplingai.com/api/v1',
			url: '/get-youtube-transcript',
			method: 'POST',
			body: {
				videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			},
		},
	};
} 