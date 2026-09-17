# Changelog

## [1.1.0] - 2026-09-18
### Added
- **Deep-linking & Highlighting**: Hub Bot now generates deep-links (`#deep-link-day-X-slide-Y-highlight-Z`) that route students to exact slides/labs and apply CSS highlighting to specific lines.
- **Transcript Indexing**: Pipeline `auto_index.py` now extracts exact quotes and line numbers for both slides and transcripts (`slide_refs`, `transcript_refs`) to support granular routing.
- **Lab Content Viewer**: Added `LessonContent` and Lab views matching UI mockups in `src/app/lesson/[day]/page.tsx`.

### Changed
- **Pipeline Prompt**: Updated Gemini extraction prompt to remove text length truncation, allowing large context parsing for transcript files.
- **Hub Bot Prompt**: Instructed LLM to use the new deep-link format and handle "Out of Scope" (Not Found) concepts gracefully without returning empty strings.
- **Search Tool Logic**: Modified `search_knowledge_index` inside `api/chat-hub/route.ts` to return explicit error messages instead of random concepts when queries yield 0 matches.

### Fixed
- Fixed Next.js build error caused by unescaped smart quotes in string literals.
- Silenced noisy `pdfminer` warnings (`Could not get FontBBox`) during pipeline execution.
- Fixed 500 error on Chat Hub by ensuring proper string mapping in Turn 2 response parsing.
