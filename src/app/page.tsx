import fs from "fs";
import path from "path";

export default function Home() {
  const htmlPath = path.join(process.cwd(), "src/app/letscod_root.html");
  let rootHtml = "";
  try {
    rootHtml = fs.readFileSync(htmlPath, "utf-8");
  } catch (e) {
    console.error("Error reading letscod_root.html", e);
  }

  return (
    <div
      id="root"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: rootHtml }}
    />
  );
}
