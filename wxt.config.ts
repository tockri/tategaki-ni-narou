import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    manifest_version: 3,
    name: "縦書きになろう",
    version: "2.1.9",
    description: "「小説家になろう」と「カクヨム」を縦書きで読みやすくします。",
    web_accessible_resources: [
      {
        resources: ["icon/48.png"],
        matches: ["<all_urls>"]
      }
    ]
  }
})
