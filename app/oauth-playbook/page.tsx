import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, Lock, Key, CheckCircle2, AlertTriangle, Code2 } from "lucide-react"

export default function OAuthPlaybookPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">OAuth 2.1 Playbook</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete guide to securing MCP servers with OAuth 2.1 authentication
        </p>
      </div>

      {/* Overview */}
      <Alert className="mb-8">
        <Shield className="h-5 w-5" />
        <AlertTitle>OAuth 2.1 MCP Authentication</AlertTitle>
        <AlertDescription>
          This playbook documents the OAuth 2.1 implementation for Model Context Protocol (MCP) servers,
          including setup steps, security considerations, and integration guides for Claude Desktop and VS Code.
        </AlertDescription>
      </Alert>

      {/* Architecture Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Authentication Flow Architecture
          </CardTitle>
          <CardDescription>How OAuth 2.1 protects MCP endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">1. Discovery Phase</h3>
              <p className="text-sm text-muted-foreground">
                Client requests <code className="text-xs bg-muted px-1 py-0.5 rounded">/.well-known/oauth-protected-resource</code> to
                discover authentication requirements and authorization server endpoint.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">2. Authorization Request (PKCE)</h3>
              <p className="text-sm text-muted-foreground">
                Client generates <code className="text-xs bg-muted px-1 py-0.5 rounded">code_verifier</code> and creates
                <code className="text-xs bg-muted px-1 py-0.5 rounded ml-1">code_challenge</code> = SHA256(code_verifier).
                Initiates OAuth flow with code_challenge.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">3. User Authentication</h3>
              <p className="text-sm text-muted-foreground">
                User is redirected to Google OAuth consent screen, authenticates, and authorizes the application
                with requested scopes (openid, email, profile).
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">4. Token Exchange</h3>
              <p className="text-sm text-muted-foreground">
                Authorization server returns <code className="text-xs bg-muted px-1 py-0.5 rounded">authorization_code</code>.
                Client exchanges code + code_verifier for ID token. Server verifies SHA256(code_verifier) === code_challenge.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">5. Authenticated MCP Requests</h3>
              <p className="text-sm text-muted-foreground">
                All subsequent MCP requests include <code className="text-xs bg-muted px-1 py-0.5 rounded">Authorization: Bearer &lt;token&gt;</code> header.
                Server verifies token and injects user context into tools.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5" />
              Security Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">PKCE (RFC 7636)</p>
                <p className="text-xs text-muted-foreground">Prevents authorization code interception attacks</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Token Audience Validation</p>
                <p className="text-xs text-muted-foreground">Ensures tokens are intended for this resource</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Resource Parameter (RFC 8707)</p>
                <p className="text-xs text-muted-foreground">Validates tokens match server canonical URI</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">WWW-Authenticate Headers (RFC 9728)</p>
                <p className="text-xs text-muted-foreground">Provides discovery endpoints on 401 responses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Key className="h-5 w-5" />
              Token Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Google ID Token Verification</p>
                <p className="text-xs text-muted-foreground">Validates signature using Google's public keys</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Access Token Support</p>
                <p className="text-xs text-muted-foreground">UserInfo API fallback for access tokens</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Secure Storage</p>
                <p className="text-xs text-muted-foreground">Tokens never exposed in URLs or logs</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Expiration Handling</p>
                <p className="text-xs text-muted-foreground">Token expiry validation with exp claim</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Setup Guides */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Client Setup</h2>

        {/* Claude Desktop */}
        <Card>
          <CardHeader>
            <CardTitle>Claude Desktop Integration</CardTitle>
            <CardDescription>Configure OAuth-protected MCP server in Claude Desktop</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Update Configuration</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Edit <code className="text-xs bg-muted px-1 py-0.5 rounded">%APPDATA%\Claude\claude_desktop_config.json</code>:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`{
  "mcpServers": {
    "hello-oauth": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://your-app.vercel.app/api/mcp"
      ]
    }
  }
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. First Request Flow</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Claude Desktop sends MCP request without token</li>
                <li>Server responds with 401 and discovery endpoint</li>
                <li>Browser opens to Google OAuth consent</li>
                <li>User authorizes application</li>
                <li>Token stored securely in Claude Desktop</li>
                <li>Subsequent requests include Bearer token</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Testing</h3>
              <p className="text-sm text-muted-foreground">
                Try: <code className="text-xs bg-muted px-1 py-0.5 rounded">"Use the say_hello tool to greet me"</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* VS Code */}
        <Card>
          <CardHeader>
            <CardTitle>VS Code Integration</CardTitle>
            <CardDescription>Setup OAuth MCP server in VS Code with .vscode/mcp.json</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Create MCP Configuration</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Add <code className="text-xs bg-muted px-1 py-0.5 rounded">.vscode/mcp.json</code>:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`{
  "servers": {
    "hello-oauth": {
      "type": "http",
      "url": "http://localhost:3001/api/mcp"
    }
  }
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Start MCP Server</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Open VS Code Command Palette (Ctrl+Shift+P)</li>
                <li>Search for MCP commands</li>
                <li>Click "Start" button for hello-oauth server</li>
                <li>OAuth flow opens in default browser</li>
                <li>Authorize and return to VS Code</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Checklist */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Security Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Environment Variables</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Never commit .env.local to git
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Use Vercel env vars in production
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Rotate secrets regularly
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">OAuth Configuration</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Restrict redirect URIs to known domains
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Use HTTPS in production (Vercel handles this)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Enable PKCE (already required by OAuth 2.1)
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Token Handling</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Validate token audience
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Check token expiration
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Never log full tokens
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Scopes</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Request minimum required scopes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Validate scope in tool handlers
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Document scope requirements
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>OAuth 2.1 MCP Server - Week 7: Agent Security Advanced</p>
        <p className="mt-2">
          <a href="https://github.com/Pauleee-D/mcp-auth-demo" className="text-primary hover:underline">
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  )
}
