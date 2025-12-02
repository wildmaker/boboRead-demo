# 🎞️ Markdown → HTML 幻灯片（自动脚本流程）

## 🎯 目标
调用 Node 脚本，将对话中的 Markdown 报告（如 `@pr-DaGengJianZhen-StoryPal-32.md`）转换成样式统一、兼容 Mermaid 10.x 的 Reveal.js 幻灯片 HTML。

## ⚙️ 可用脚本
- 位置：`scripts/tools/generate-reveal-slides.js`
- NPM 命令：`npm run --prefix scripts slides:generate -- <markdown> [输出HTML] [--title 标题]`
- 直接调用：`node scripts/tools/generate-reveal-slides.js <markdown> [输出HTML] [--title 标题]`

脚本特点：
- 自动读取 `docs/templates/reveal-markdown-template.html`。
- 识别 Markdown 首个一级/二级标题作为 HTML `<title>`（可用 `--title` 覆盖）。
- 将 Markdown 注入模板的 `<script id="markdown-source">`，保留原始结构。
- 自动转义 `</script>`、统一换行，并打印生成路径。

## 🪜 推荐流程
1. **准备 Markdown**  
   - 直接引用对话中的 Markdown（例如 `@pr-DaGengJianZhen-StoryPal-32.md`）。

2. **执行脚本**  
   ```bash
   # 生成到默认同名 -slides.html
   node scripts/tools/generate-reveal-slides.js docs/reviews/pr-DaGengJianZhen-StoryPal-32.md

   # 或指定输出路径与标题
   node scripts/tools/generate-reveal-slides.js \
     docs/reviews/pr-DaGengJianZhen-StoryPal-32.md \
     docs/reviews/pr-DaGengJianZhen-StoryPal-32-slides.html \
     --title "PR #32 批量图片 OCR 汇报"
   ```

3. **检视结果**  
   - 用浏览器打开生成的 HTML 文件，确认分页、图表和链接。
   - 需要微调样式时，可编辑模板文件后重新运行脚本。

## 🧩 Markdown 编写准则
- 使用 `---` 独占一行分页；支持多段落、多列表，脚本会保留原始缩进。
- 代码块使用三反引号，并尽量附带语言标记以启用语法高亮。
- Mermaid 图建议使用标准语法；脚本会自动补齐缺失的 `graph TD`。
- 首个一级/二级标题会写入 `<title>`，也可通过 `--title` 手动指定。

## ✅ 交付要求
- 生成单个 HTML 文件（示例：`docs/reviews/pr-xxx-slides.html`），包含模板样式与注入的 Markdown。
- 回复时说明：
  - 使用的 Markdown 来源；
  - 生成的 HTML 路径；
  - 是否自定义标题或修改模板。
