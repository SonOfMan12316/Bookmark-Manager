import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get API URL from environment, command line arg, or use default
const API_URL = process.argv[2] || process.env.VITE_API_URL || 'http://localhost:9000/api';
const OPENAPI_JSON_URL = `${API_URL}/docs-json`;

async function generateTypes() {
  try {
    console.log(`📡 Fetching OpenAPI spec from ${OPENAPI_JSON_URL}...`);
    
    const response = await fetch(OPENAPI_JSON_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`);
    }
    
    const openApiSpec = await response.json();
    
    // Save the OpenAPI spec for reference
    const specPath = join(__dirname, '../src/types/api/openapi-spec.json');
    writeFileSync(specPath, JSON.stringify(openApiSpec, null, 2));
    console.log(`✅ OpenAPI spec saved to ${specPath}`);
    
    // Generate TypeScript types using openapi-typescript
    const { default: openapiTS } = await import('openapi-typescript');
    // Use the file path (more reliable than URL)
    const types = await openapiTS(specPath);
    
    // Save generated types
    const typesPath = join(__dirname, '../src/types/api/types.ts');
    writeFileSync(typesPath, types);
    console.log(`✅ TypeScript types generated at ${typesPath}`);
    
    console.log('\n🎉 API types generated successfully!');
    console.log('💡 Import types like:');
    console.log('   import type { LoggedInUserDto, UserDataDto } from "@/types/api"');
    console.log('   import type { paths, components } from "@/types/api/types"');
    
  } catch (error) {
    console.error('❌ Error generating types:', error.message);
    console.error('\n💡 Make sure your backend is running and accessible at:', OPENAPI_JSON_URL);
    process.exit(1);
  }
}

generateTypes();