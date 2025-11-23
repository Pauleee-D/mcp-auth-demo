# MCP Auth Demo - Setup Guide

## Step 1: Google Cloud Console OAuth 2.1 Setup

### A. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name: `mcp-auth-demo` (or your preferred name)
4. Click "Create"

### B. Enable OAuth Consent Screen

1. Navigate to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type
3. Click **Create**

**Fill in required fields:**
- **App name**: `MCP Auth Demo`
- **User support email**: Your email
- **Developer contact email**: Your email

**Authorized domains (add these):**
- `vercel.app` (for Vercel deployment)
- `localhost` (for local development)

4. Click **Save and Continue**
5. Skip scopes for now → **Save and Continue**
6. Add test users (your email) → **Save and Continue**
7. Review and click **Back to Dashboard**

### C. Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `MCP Auth Demo Web Client`

**Authorized JavaScript origins:**
```
http://localhost:3000
https://your-app-name.vercel.app
```

**Authorized redirect URIs:**
```
http://localhost:3000/oauth/callback
https://your-app-name.vercel.app/oauth/callback
```

5. Click **Create**
6. **Copy your Client ID and Client Secret** - you'll need these!

### D. Configure Environment Variables

Create `.env.local` in your project root:

```env
# Google OAuth 2.1 Credentials
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here

# Optional: Development mode settings
NODE_ENV=development
# SKIP_AUTH=true  # Uncomment to bypass auth during development
```

**⚠️ IMPORTANT:** Never commit `.env.local` to git!

## Step 2: Local Testing

### A. Start Development Server

```bash
cd /c/Users/Paulz/mcp-auth-demo
pnpm dev
```

Server runs at: http://localhost:3000

### B. Test Discovery Endpoints

```bash
# Test authorization server metadata
curl http://localhost:3000/.well-known/oauth-authorization-server | jq

# Test protected resource metadata
curl http://localhost:3000/.well-known/oauth-protected-resource | jq
```

### C. Test with mcp-remote

```bash
# This will trigger OAuth flow in your browser
npx mcp-remote http://localhost:3000/api/mcp
```

Expected flow:
1. Browser opens to Google OAuth consent screen
2. You authorize the app
3. Returns to app with authorization code
4. Token is stored and used for MCP requests
5. Terminal shows: "✅ Google ID token verified successfully"

## Step 3: Vercel Deployment

### A. Connect to Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### B. Configure Environment Variables in Vercel

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret

### C. Update Google OAuth Redirect URIs

1. Go back to Google Cloud Console
2. **APIs & Services** → **Credentials** → Your OAuth Client
3. Add your Vercel deployment URL to:
   - **Authorized JavaScript origins**: `https://your-app.vercel.app`
   - **Authorized redirect URIs**: `https://your-app.vercel.app/oauth/callback`
4. Save

### D. Redeploy

```bash
vercel --prod
```

## Step 4: Claude Desktop Integration

### A. Update Claude Desktop Config

Location: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hello-oauth": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://your-app.vercel.app/api/mcp"]
    }
  }
}
```

### B. Test in Claude Desktop

1. Restart Claude Desktop completely
2. First request will trigger OAuth in browser
3. Authorize the app
4. Try: "Use the say_hello tool to greet me"

Expected: Claude uses the tool and shows your authenticated user info

## Step 5: VS Code Integration

### A. Create `.vscode/mcp.json`

```json
{
  "servers": {
    "hello-oauth": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

### B. Enable MCP in VS Code

1. Install any MCP-compatible VS Code extension
2. Open Command Palette: `Ctrl+Shift+P`
3. Search for MCP commands
4. Start the server
5. OAuth flow opens in browser

## Troubleshooting

### "Token verification failed"
- Check that `GOOGLE_CLIENT_ID` matches your actual client ID
- Verify token is being sent in `Authorization: Bearer` header
- Check server logs for detailed error messages

### "redirect_uri_mismatch"
- Ensure redirect URI in Google Console exactly matches your app URL
- Include `/oauth/callback` path
- No trailing slashes

### "Invalid client"
- Check `GOOGLE_CLIENT_SECRET` is correct
- Verify credentials haven't been deleted in Google Console

### Development Mode Bypass

For quick testing without OAuth:

```env
SKIP_AUTH=true
```

This allows testing tool functionality without going through OAuth flow.

## Security Checklist

- ✅ Never commit `.env.local` or credentials
- ✅ Use environment variables for secrets
- ✅ Restrict OAuth redirect URIs to your domains only
- ✅ Enable PKCE (already implemented)
- ✅ Validate token audience (already implemented)
- ✅ Use HTTPS in production (Vercel handles this)
- ✅ Set proper CORS headers (already configured)

## Next Steps

After setup is working:
1. Customize the "Say Hello" tool
2. Add your own MCP tools
3. Document your OAuth playbook
4. Create screenshots for deliverable

---

**Need Help?**
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [OAuth 2.1 Draft](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1)
