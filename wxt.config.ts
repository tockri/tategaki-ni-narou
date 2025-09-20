import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  webExt: { startUrls: ["https://ncode.syosetu.com/n6970df/1/"] },
  manifest: {
    name: "縦書きになろう",
    version: "2.1.12",
    description: "「小説家になろう」と「カクヨム」を縦書きで読みやすくします。",
    web_accessible_resources: [{ resources: ["icon/48.png"], matches: ["<all_urls>"] }]
  }
})
