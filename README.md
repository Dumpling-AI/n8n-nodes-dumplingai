![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-dumplingai

This is an n8n community node that provides integration with [Dumpling AI](https://dumplingai.com) APIs for data extraction, web scraping, document conversion, and AI-powered operations.

[Dumpling AI](https://dumplingai.com) is a comprehensive API platform that provides various data extraction and AI services including YouTube transcript extraction, TikTok data scraping, web scraping, document conversion, and more.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-dumplingai` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a public source**.
5. Select **Install**.

After installing the node, you can use it like any other node in n8n.

### Manual installation

To get started install the package in your n8n root directory:

```bash
npm install n8n-nodes-dumplingai
```

For Docker-based deployments add the following line before the font installation command in your [n8n Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile):

```dockerfile
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-dumplingai
```

## Credentials

You must have a Dumpling AI API key to use this node. You can register for a free account to get an API key here:

https://app.dumplingai.com/users/sign_up

Once registered, you can find your API key here:

https://app.dumplingai.com/manage-api-key

Then you'll need to create a credential in n8n for Dumpling AI.

## Usage

Add Dumpling AI to a workflow and configure your operation.

### Available Operations

This node currently supports:
- **Get YouTube Transcript** - Extract transcripts from YouTube videos
- **Scrape URL** - Extract content from web pages with formatting options

Additional operations will be added in future releases.

#### Get YouTube Transcript

Extract transcripts from YouTube videos with optional timestamps and language preferences.

```json
{
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "includeTimestamps": true,
  "timestampsToCombine": 5,
  "preferredLanguage": "en"
}
```

**Response:**
```json
{
  "transcript": "00:00 - Welcome to this video.\n00:05 - Today we'll be discussing...",
  "language": "en"
}
```

**Supported Languages:**
Chinese (Simplified), Chinese (Traditional), English, French, German, Italian, Japanese, Korean, Portuguese, Spanish, and many more.

#### Scrape URL

Extract content from web pages with customizable formatting and processing options.

```json
{
  "url": "https://example.com",
  "format": "markdown",
  "cleaned": true,
  "renderJs": true
}
```

**Response:**
```json
{
  "title": "Page Title",
  "metadata": {...},
  "url": "https://example.com",
  "format": "markdown",
  "cleaned": true,
  "content": "# Page Title\n\nPage content in markdown format..."
}
```

**Output Formats:**
- **HTML** - Raw HTML content
- **Markdown** - Clean markdown format  
- **Screenshot** - Screenshot of the page

## API Resources

This node currently supports the most popular Dumpling AI APIs. If there's an API missing that you would like to use, please let us know at contact@dumplingai.com

In the meantime, you can also use the [generic HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to construct your requests.

### Coming Soon

- Get TikTok Transcript
- Get TikTok Profile
- Search APIs (Google Web, News, Maps)
- Additional Web Scraping (Crawl, Screenshot, Extract)
- Document Conversion
- AI Operations
- Developer Tools

## Related Resources

Dumpling AI's complete API documentation is available here:

https://docs.dumplingai.com/api-reference/introduction

You can also find additional tutorials and resources here:

https://docs.dumplingai.com/guides

## License

[MIT](https://github.com/dumplingai/n8n-nodes-dumplingai/blob/master/LICENSE.md)
