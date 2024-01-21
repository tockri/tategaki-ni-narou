import { crx, defineManifest } from "@crxjs/vite-plugin"
import { defineConfig } from "vite"

const manifest = defineManifest({
  manifest_version: 3,
  name: "縦書きになろう",
  version: "2.0.2",
  description: "「小説家になろう」と「カクヨム」を縦書きで読みやすくします。",
  icons: {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  content_scripts: [
    {
      matches: [
        "https://ncode.syosetu.com/*",
        "https://novel18.syosetu.com/*",
        "http://ncode.syosetu.com/*",
        "http://novel18.syosetu.com/*"
      ],
      css: ["css/narou.css"],
      js: ["src/narou.ts"],
      run_at: "document_start"
    },
    {
      matches: ["https://kakuyomu.jp/works/*/episodes/*"],
      css: ["css/kakuyomu.css"],
      js: ["src/kakuyomu.ts"],
      run_at: "document_start"
    }
  ],
  web_accessible_resources: [
    {
      resources: ["icons/icon-48.png"],
      matches: ["<all_urls>"]
    }
  ]
})

export default defineConfig({
  plugins: [crx({ manifest })]
})
