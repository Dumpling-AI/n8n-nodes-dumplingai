# Dumpling AI n8n Integration Node – Technical Specification (Revised)

## 1. Overview and Objectives

The goal is to develop a **Dumpling AI** integration node for n8n that exposes all Dumpling AI REST API endpoints as node operations. This single node will allow n8n workflows to authenticate with Dumpling AI using a Bearer API key, invoke any of Dumpling’s available endpoints, and handle inputs/outputs accordingly. Key objectives include:

*   **Bearer Token Authentication:** Use Dumpling API key via an `Authorization: Bearer` header on all requests. The node will provide a dedicated credential type for the API key.
*   **Categorized Operations:** Implement a **“Resource”** dropdown for API categories (Data APIs, Web Scraping, etc.) and an **“Operation”** dropdown listing actions per category.
*   **Structured Parameter Definitions:** Utilize a modular approach for defining operation-specific parameters, inspired by well-structured n8n nodes, for maintainability and clarity.
*   **Dynamic Inputs:** Where the API supports it, use dynamic dropdowns (via n8n `loadOptions`) to fetch options (e.g., lists of IDs or supported values) for certain fields.
*   **File Handling:** Support for both URL-based and binary file inputs for relevant operations, and appropriate handling of file outputs.
*   **Credential Testing:** Provide a credential testing function to validate the Bearer token connectivity.
*   **Compliance with n8n Standards:** Follow n8n’s node development guidelines and best practices.
*   **Test Coverage & CI:** Include comprehensive unit tests and set up CI for linting and testing.
*   **Metadata for Marketplace:** Define all necessary metadata for submission to n8n’s community marketplace.

## 2. Authentication with Bearer Token

**Dumpling API Credentials:** Dumpling AI uses API key authentication via Bearer tokens.
*   **Credential Type Name:** `dumplingAiApi`
*   **Credential Display Name:** `Dumpling AI API`
*   **Credential Icon:** `file:DumplingAi.icon.svg` (shared with the node)
*   **Properties:**
    *   `displayName: 'API Key'`, `name: 'apiKey'`, `type: 'string'`, `typeOptions: { password: true }`, `default: ''`
*   **Authentication Mechanism (`authenticate` property):**
    ```ts
    authenticate: {
      type: 'generic',
      properties: {
        headers: {
          Authorization: '=Bearer {{$credentials.apiKey}}'
        }
      }
    }
    ```

**Credential Testing (`test` property):**
A `test: ICredentialTestRequest` object will be implemented to verify the API key.
*   **Endpoint:** A lightweight, authenticated GET request. If Dumpling AI offers a dedicated `/auth-test` or `/ping` endpoint, that will be used. Otherwise, an innocuous call like retrieving account information or a list of available AI agents (e.g., `GET /api/v1/agents` or `GET /api/v1/account/info` if available and suitable) will be used. The endpoint must require authentication and not modify data.
    ```ts
    // Example assuming a /auth-test endpoint
    test: {
      request: {
        baseURL: 'https://app.dumplingai.com/api/v1', // This will be the default base URL
        url: '/auth-test' // Replace with actual testable endpoint
      }
    }
    ```
*   **Security:** The API key will be stored encrypted by n8n and injected at runtime. It will not be logged or exposed in error messages. All requests will use `this.helpers.requestWithAuthentication('dumplingAiApi', options)`.

## 3. Node Definition, Metadata, and Directory Structure

The Dumpling AI node will be implemented as `DumplingAi.node.ts`.

**Metadata (`description` property in `DumplingAi.node.ts`):**
*   **`displayName: 'Dumpling AI'`**
*   **`name: 'dumplingAi'`** (internal name, lowerCamelCase)
*   **`icon: 'file:DumplingAi.icon.svg'`** (SVG format preferred)
*   **`group: ['transform']`**
*   **`version: 1`** (with `defaultVersion: 1` if multiple versions are introduced later)
*   **`subtitle: '={{$parameter["operation"]}}'`**
*   **`description: 'Interact with Dumpling AI APIs (data, web scraping, document conversion, AI, etc.)'`**
*   **`defaults: { name: 'Dumpling AI' }`**
*   **`inputs: ['main']`, `outputs: ['main']`**
*   **`credentials: [{ name: 'dumplingAiApi', required: true }]`**
*   **`requestDefaults: { baseURL: 'https://app.dumplingai.com/api/v1/', headers: { 'Content-Type': 'application/json' } }`** (JSON content type default, can be overridden for specific binary uploads if necessary).
*   **`categories: ['AI', 'Development Tools']`** (for n8n.io marketplace)
*   **License:** MIT
*   **README:** Comprehensive README with setup, usage examples for key operations, and a link to Dumpling AI API documentation.

**Proposed Directory Structure:**
This structure promotes modularity and maintainability.
```
n8n-nodes-dumpling-ai/
├── credentials/
│   └── DumplingAiApi.credentials.ts
├── nodes/
│   └── DumplingAi/
│       ├── DumplingAi.node.ts                // Main node logic
│       ├── DumplingAi.node.json              // Basic metadata for n8n, if not all in .ts
│       ├── DumplingAi.icon.svg
│       └── descriptions/                     // Folder for UI parameter definitions
│           ├── index.ts                      // Exports all description files
│           ├── DumplingAiProperties.ts       // Resource & Operation selectors
│           ├── Common/                       // For shared static options (if any)
│           │   └── OutputFormatOptions.ts    // e.g. {name: 'Markdown', value: 'markdown'}
│           │   └── DateRangeOptions.ts
│           ├── DataApi/
│           │   ├── GetYouTubeTranscriptDescription.ts
│           │   ├── SearchGoogleWebDescription.ts
│           │   └── ...                       // One file per operation or logical group
│           ├── WebScraping/
│           │   └── ScrapeUrlDescription.ts
│           │   └── ...
│           ├── DocumentConversion/
│           │   └── ConvertDocToTextDescription.ts
│           │   └── ...
│           ├── Ai/
│           │   └── GenerateAgentCompletionDescription.ts
│           │   └── ...
│           ├── DeveloperTools/
│           │   └── RunPythonCodeDescription.ts
│           │   └── ...
├── package.json
├── README.md
└── tsconfig.json
```
Each `...Description.ts` file will export an array of `INodeProperties` specific to that operation, controlled by `displayOptions.show.operation: ['operationValue']`. The main `DumplingAi.node.ts` will import and spread these into its `properties` array.

## 4. Supported Operations and Parameters

The node will use a "Category as Resource" model.
*   **Resource Parameter (`resource`):** Dropdown with options: `Data APIs`, `Web Scraping`, `Document Conversion`, `AI Operations`, `Developer Tools`.
*   **Operation Parameter (`operation`):** Dynamically filtered dropdown based on the selected `resource`. Each option will have a descriptive `name` (for UI), `value` (internal ID for the operation), and `action` (for node subtitle).

*For each operation below, specific `INodeProperties` will be defined in their respective `...Description.ts` files. Node parameter `name` attributes should match the API's expected JSON body keys or query string names directly.*

### 4.1 Data APIs Operations
*(Base Path Segment: `/data` - assumed)*
*   **Get YouTube Transcript:**
    *   **Description:** Retrieve the transcript of a YouTube video.
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/youtube-transcript` (as per original spec)
    *   **Key Parameters:** `url` (string, YouTube video URL or ID).
    *   **Parameter File:** `DataApi/GetYouTubeTranscriptDescription.ts`
*   **Get TikTok Transcript:**
    *   **Description:** Retrieve transcript (captions) from a TikTok video.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/tiktok-transcript` (assumed)
    *   **Key Parameters:** `url` (string, TikTok video URL or ID).
    *   **Parameter File:** `DataApi/GetTikTokTranscriptDescription.ts`
*   **Get TikTok Profile:**
    *   **Description:** Fetch profile information for a TikTok user.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/tiktok-profile` (assumed)
    *   **Key Parameters:** `username` or `url` (string).
    *   **Parameter File:** `DataApi/GetTikTokProfileDescription.ts`
*   **Search (Google Web):**
    *   **Description:** Perform a Google web search.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/search/google-web` (assumed, or `/api/v1/search` with a type parameter)
    *   **Key Parameters:** `query`, `country`, `location`, `language`, `dateRange`, `scrapeResults` (boolean), `format` (if scrapeResults is true).
    *   **Parameter File:** `DataApi/SearchGoogleWebDescription.ts`
*   **Get Autocomplete (Google):**
    *   **Description:** Get Google search autocomplete suggestions.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/search/google-autocomplete` (assumed)
    *   **Key Parameters:** `queryPrefix`.
    *   **Parameter File:** `DataApi/GetGoogleAutocompleteDescription.ts`
*   **Search Maps (Google):**
    *   **Description:** Search Google Maps for places.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/search/google-maps` (assumed)
    *   **Key Parameters:** `query`, `locationContext`. Potentially `latitude`, `longitude`.
    *   **Parameter File:** `DataApi/SearchGoogleMapsDescription.ts`
*   **Search News (Google):**
    *   **Description:** Search Google News for articles.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/search/google-news` (assumed)
    *   **Key Parameters:** `query`, `country`, `language`, `dateRange`.
    *   **Parameter File:** `DataApi/SearchGoogleNewsDescription.ts`
*   **Get Google Reviews:**
    *   **Description:** Fetch Google Reviews for a place/business.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/data/google-reviews` (assumed)
    *   **Key Parameters:** `placeId` or `query`.
    *   **Parameter File:** `DataApi/GetGoogleReviewsDescription.ts`

*(Note: If `/api/v1/google-locations` endpoint exists, it will be used via `loadOptions` for location parameters in relevant search operations.)*

### 4.2 Web Scraping Operations
*(Base Path Segment: `/scraping` - assumed)*
*   **Scrape URL:**
    *   **Description:** Scrape content from a webpage URL.
    *   **HTTP Method:** `POST` (assumed)
    *   **API Path:** `/api/v1/scraping/scrape-url` (assumed)
    *   **Key Parameters:** `url`, `format` (dropdown: markdown/html/screenshot), `cleaned` (boolean), `renderJs` (boolean, default true).
    *   **Parameter File:** `WebScraping/ScrapeUrlDescription.ts`

### 4.3 Document Conversion Operations
*(Base Path Segment: `/conversion` or `/document` - assumed)*
*   **Doc to Text:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/conversion/doc-to-text`
    *   **Input:** File (URL or Binary), `fileName` (if binary).
    *   **Parameter File:** `DocumentConversion/ConvertDocToTextDescription.ts`
*   **Convert to PDF:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/conversion/to-pdf`
    *   **Input:** File (URL or Binary), `fileName` (if binary).
    *   **Parameter File:** `DocumentConversion/ConvertToPdfDescription.ts`
*   **Merge PDFs:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/conversion/merge-pdfs`
    *   **Input:** Multiple Files (URLs or Binaries). Will require a `fixedCollection` or similar for multiple file inputs.
    *   **Parameter File:** `DocumentConversion/MergePdfsDescription.ts`
*   **Trim Video:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/conversion/trim-video`
    *   **Input:** File (URL or Binary), `startTime`, `endTime`.
    *   **Parameter File:** `DocumentConversion/TrimVideoDescription.ts`
*   **Extract from Document (AI):**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/extract/document`
    *   **Input:** File (URL or Binary), `prompt` (string).
    *   **Parameter File:** `DocumentConversion/ExtractFromDocumentDescription.ts`
*   **Extract from Image (AI):**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/extract/image`
    *   **Input:** File (URL or Binary), `prompt` (string).
    *   **Parameter File:** `DocumentConversion/ExtractFromImageDescription.ts`
*   **Extract from Audio (AI):**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/extract/audio`
    *   **Input:** File (URL or Binary), `prompt` (string).
    *   **Parameter File:** `DocumentConversion/ExtractFromAudioDescription.ts`
*   **Extract from Video (AI):**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/extract/video`
    *   **Input:** File (URL or Binary), `prompt` (string).
    *   **Parameter File:** `DocumentConversion/ExtractFromVideoDescription.ts`
*   **Read PDF Metadata:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/document/pdf-metadata/read`
    *   **Input:** File (URL or Binary).
    *   **Parameter File:** `DocumentConversion/ReadPdfMetadataDescription.ts`
*   **Write PDF Metadata:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/document/pdf-metadata/write`
    *   **Input:** File (URL or Binary), `metadataFields` (object).
    *   **Parameter File:** `DocumentConversion/WritePdfMetadataDescription.ts`

**File Input Handling for Document Conversion Operations:**
For operations requiring file input:
*   A parameter `inputSource` (`type: 'options'`, options: `URL`, `Binary Data`, default `URL`).
*   If `inputSource` is `URL`: a string field `fileUrl`.
*   If `inputSource` is `Binary Data`:
    *   A string field `binaryPropertyName` (default: `data`), allowing users to specify which property on the incoming n8n item holds the binary data.
    *   The node will read the binary data, base64-encode it, and include it in the JSON payload as per Dumpling AI's API (e.g., `{ "fileContentBase64": "...", "fileName": "..." }`).

### 4.4 AI Operations
*(Base Path Segment: `/ai` - assumed)*
*   **Generate Agent Completion:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/agents/generate-completion` (or `/api/v1/agents/{agentId}/completion`)
    *   **Key Parameters:** `agentId` (string, dynamic `loadOptions` if `/agents` list endpoint exists), `messages` (array of objects or string), `parseJson` (boolean), `threadId` (optional string).
    *   **Parameter File:** `Ai/GenerateAgentCompletionDescription.ts`
*   **Search Knowledge Base:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/knowledge-bases/search` (or `/api/v1/knowledge-bases/{kbId}/search`)
    *   **Key Parameters:** `knowledgeBaseId` (string, dynamic `loadOptions` if `/knowledge-bases` list endpoint exists), `query` (string).
    *   **Parameter File:** `Ai/SearchKnowledgeBaseDescription.ts`
*   **Add to Knowledge Base:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/knowledge-bases/add-content` (or `/api/v1/knowledge-bases/{kbId}/content`)
    *   **Key Parameters:** `knowledgeBaseId` (string, dynamic `loadOptions`), `name` (string, title for content), `content` (string, text to embed).
    *   **Parameter File:** `Ai/AddToKnowledgeBaseDescription.ts`
*   **Generate AI Image:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/ai/image/generate`
    *   **Key Parameters:** `prompt` (string), optional style, number of images, etc.
    *   **Output:** Image URL or Base64 image data.
    *   **Parameter File:** `Ai/GenerateAiImageDescription.ts`

*(If "Generate Image (Alternate)" is distinct, it will be implemented similarly.)*

### 4.5 Developer Tools Operations
*(Base Path Segment: `/devtools` - assumed)*
*   **Run JavaScript Code:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/devtools/run-javascript`
    *   **Key Parameters:** `code` (string), `npmPackages` (optional array of strings).
    *   **Parameter File:** `DeveloperTools/RunJavaScriptCodeDescription.ts`
*   **Run Python Code:**
    *   **HTTP Method:** `POST`
    *   **API Path:** `/api/v1/devtools/run-python`
    *   **Key Parameters:** `code` (string, Python script), `pipInstall` (optional array of strings for pip commands), `parseJsonOutput` (boolean).
    *   **Parameter File:** `DeveloperTools/RunPythonCodeDescription.ts`

**Dynamic Dropdowns (`loadOptions`):**
Implemented in `DumplingAi.node.ts` under `methods.loadOptions`.
*   **Priority:** If Dumpling AI provides an API endpoint for fetching selectable options (e.g., `GET /api/v1/agents`, `GET /api/v1/knowledge-bases`, `GET /api/v1/google-locations`), using `loadOptions` is *strongly preferred*.
*   **Fallback:** Hardcoding static lists (e.g., for `dateRange` if not API-driven) is acceptable if no API endpoint exists.
*   All `loadOptions` calls will use `this.helpers.requestWithAuthentication('dumplingAiApi', ...)`.

## 5. Execution Logic

The node’s `execute()` method (or `executeSingle()` if more appropriate for item-by-item processing) will:
1.  Retrieve selected `resource` and `operation`.
2.  Use a switch/conditional logic to call a dedicated handler function for each operation.
3.  **Construct API Requests:**
    *   Each handler will gather parameters using `this.getNodeParameter()`.
    *   For file inputs, if `inputSource` is `binary`, it will retrieve binary data using `this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName)`, then base64 encode it.
    *   The request body or query string will be constructed. Optional parameters not provided by the user will be omitted from the request payload unless the API requires explicit null/default values.
4.  **Execute API Requests:**
    *   Use `this.helpers.requestWithAuthentication('dumplingAiApi', options)`. `options` will include `method`, relative `url`, `body` (for POST/PUT), or `qs` (for GET).
5.  **Handle Responses:**
    *   Successful JSON responses will be returned as `[{ json: responseData }]`.
    *   **Binary Data Output:** If an operation returns file data (e.g., a generated image as base64 in JSON, or a PDF from "Convert to PDF" as base64 or direct binary stream):
        *   If a URL to the file is returned, output the URL string.
        *   If raw binary data (or base64) is returned, decode if necessary, then use `this.helpers.prepareBinaryData(Buffer.from(data, 'base64_or_raw'), fileName, mimeType)` to create an n8n binary item. `fileName` and `mimeType` should be derived from API response headers (e.g., `Content-Disposition`, `Content-Type`) or set to sensible defaults if not provided.
6.  **Error Handling:**
    *   Wrap API calls in `try/catch`.
    *   If `requestWithAuthentication` throws (e.g., non-2xx status), catch the error.
    *   Attempt to parse the error response body from Dumpling AI (assuming it's JSON).
    *   Throw a `NodeApiError` including specific messages or error codes from the API:
        ```ts
        // Example inside a catch block
        let errorDetails = error;
        if (error.response && error.response.data) {
          // Attempt to use parsed error from API if available
          errorDetails = typeof error.response.data === 'object' ? error.response.data : { message: error.response.data };
        }
        throw new NodeApiError(this.getNode(), errorDetails, { 
          message: `Dumpling AI API Error: ${errorDetails?.error?.message || errorDetails?.message || error.message || 'Unknown API error'}`, 
          httpCode: error.response?.status 
        });
        ```
7.  **Item Looping:** Process each incoming n8n item independently using `this.getInputData()`. Pass the correct item index `i` to `this.getNodeParameter(paramName, i)` to support expressions.

## 6. Testing and Quality Assurance

*   **Unit Tests (Jest):**
    *   Verify node property definitions (resources, operations, fields) from `...Description.ts` files.
    *   Test credential `authenticate` property.
    *   Mock HTTP calls for each operation to verify correct request construction (method, URL, body/qs, headers) and response/error handling.
    *   Test `loadOptions` methods by mocking API responses.
    *   Test binary data encoding for file uploads and binary data decoding for file downloads.
    *   Achieve high code coverage.
*   **Linting:** Use `eslint-plugin-n8n-nodes-base`. Run `npx @n8n/scan-community-package n8n-nodes-dumpling-ai` before submission.
*   **Manual Testing:**
    *   Test in a local n8n instance (`npm run dev`).
    *   Verify credential testing.
    *   Execute each operation with sample inputs, including file uploads/downloads.
    *   Verify dynamic dropdowns populate correctly.
    *   Test error handling with invalid API keys or incorrect inputs.
*   **Continuous Integration (CI):** GitHub Actions (or similar) to run build, lint, and tests on each PR/commit.

## 7. References

*   Dumpling AI API Documentation https://docs.dumplingai.com/api-reference/introduction
*   n8n Node Development Guidelines & Starter Template https://github.com/n8n-io/n8n-nodes-starter
*   n8n Standard Node Parameters, Credentials, Programmatic Node Reference https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/
*   n8n Community Node Verification Guidelines https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines
