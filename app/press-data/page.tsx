import { getGraphClient } from "../lib/graphClient";

async function fetchCSVFiles() {
  const client = await getGraphClient();

  // ID of the 'Press' folder in your OneDrive
  const pressFolderId = "01MIVVUBEJY7JS3YA5JBDKHSOZFFQAUZRY";

  // Your drive ID from previous logs
  const driveId = "b!yIpmDVy-CkeLjpWtBuFI0BR82f4nnh5Ml1thNIsfmYFIlcaHphcxTouxNrsI3_h9";

  // Fetch files from the Press folder
  const driveResponse = await client
    .api(`/drives/${driveId}/items/${pressFolderId}/children`)
    .get();

  console.log("📄 Files in Press folder:", driveResponse.value.map((f: any) => f.name));

  const csvFiles = driveResponse.value.filter((item: any) =>
    item.name.toLowerCase().endsWith(".csv")
  );

  return csvFiles;
}

export default async function PressDataPage() {
  let files = [];
  try {
    files = await fetchCSVFiles();
  } catch (err) {
    console.error("Error fetching CSVs:", err);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📁 Press CSV Files</h1>
      {files.length === 0 ? (
        <p>No CSV files found.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {files.map((file: any) => (
            <li key={file.id}>
              <a href={file.webUrl} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
