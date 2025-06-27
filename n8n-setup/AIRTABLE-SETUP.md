# 📊 Airtable Integration Setup

## Step 1: Create Airtable Account
1. Go to: https://airtable.com
2. Sign up with: aligiquina@gmail.com
3. Create workspace: "AI Development Data"

## Step 2: Create Personal Access Token
1. Go to: https://airtable.com/create/tokens
2. Click "Create token"
3. Name: `AI Integration Token`
4. Scopes: 
   - data.records:read
   - data.records:write
   - schema.bases:read
5. Access: Add your workspace
6. Copy the token (starts with pat...)

## Step 3: Create Airtable Bases

### Base 1: "AI Performance Analytics"
**Table: API Response Times**
- AI Service (Single select): Claude, ChatGPT, Perplexity
- Response Time (Number): Milliseconds
- Query Type (Single select): Code Review, Research, General
- Success (Checkbox): True/False
- Date (Date): When executed
- Error Message (Long text): If failed

**Table: Usage Statistics**
- Date (Date): Daily tracking
- Total Queries (Number): Count per day
- Claude Queries (Number): Claude usage
- ChatGPT Queries (Number): OpenAI usage
- Perplexity Queries (Number): Perplexity usage
- Total Tokens (Number): Token consumption

### Base 2: "AI Research Database" 
**Table: Research Topics**
- Topic (Single line text): Research subject
- AI Consensus Score (Number): 0-100%
- Sources Count (Number): How many sources
- Date Researched (Date): When completed
- Best AI Response (Single select): Claude, ChatGPT, Perplexity
- Research Quality (Rating): 1-5 stars

**Table: Code Quality Metrics**
- File Name (Single line text): Code file
- Lines of Code (Number): File size
- Complexity Score (Number): 1-10
- Claude Rating (Rating): 1-5 stars
- ChatGPT Rating (Rating): 1-5 stars
- Issues Count (Number): Problems found
- Security Score (Number): 1-10

## Step 4: Get Base and Table IDs
1. Go to: https://airtable.com/api
2. Select your base
3. Copy Base ID (starts with app...)
4. Copy Table IDs from the API documentation

## Step 5: Add Airtable Config
Add to your `api-keys-template.env`:
```env
# Airtable Configuration
AIRTABLE_TOKEN=pat_your_airtable_token_here
AIRTABLE_BASE_ANALYTICS=app_your_analytics_base_id_here
AIRTABLE_BASE_RESEARCH=app_your_research_base_id_here
AIRTABLE_TABLE_RESPONSE_TIMES=tbl_your_table_id_here
AIRTABLE_TABLE_USAGE_STATS=tbl_your_table_id_here
AIRTABLE_TABLE_RESEARCH_TOPICS=tbl_your_table_id_here
AIRTABLE_TABLE_CODE_QUALITY=tbl_your_table_id_here
```

## MCP Integration Benefits:
- AI can directly query your databases
- Auto-populate analytics from AI usage
- Create dashboards of AI performance
- Track trends in AI response quality
- Generate reports on AI effectiveness

## n8n Workflow Enhancements:
- Every AI call logged to "API Response Times"
- Daily usage stats updated automatically
- Research results stored with quality metrics
- Code analysis data tracked over time

## Dashboard Views You Can Create:
- **AI Performance**: Response times by service
- **Usage Trends**: Daily/weekly AI usage patterns
- **Quality Metrics**: Which AI gives best responses
- **Cost Analysis**: Token usage and API costs
- **Research Archive**: Searchable knowledge base

Your Airtable becomes your AI analytics powerhouse! 📈
