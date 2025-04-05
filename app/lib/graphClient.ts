import { Client } from "@microsoft/microsoft-graph-client";
import { ConfidentialClientApplication } from "@azure/msal-node";

const clientId = process.env.GRAPH_CLIENT_ID!;
const clientSecret = process.env.GRAPH_CLIENT_SECRET!;
const tenantId = process.env.GRAPH_TENANT_ID!;
const scope = "https://graph.microsoft.com/.default";

let graphClient: Client | null = null;

export async function getGraphClient(): Promise<Client> {
  if (graphClient) return graphClient;

  const msalConfig = {
    auth: {
      clientId,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientSecret,
    },
  };

  const cca = new ConfidentialClientApplication(msalConfig);

  const authResult = await cca.acquireTokenByClientCredential({
    scopes: [scope],
  });

  const accessToken = authResult?.accessToken;
  if (!accessToken) {
    throw new Error("Could not acquire access token for Microsoft Graph.");
  }

  graphClient = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return graphClient;
}
