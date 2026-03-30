# InSites-CAA — Claude.ai Setup

## Setup (mono prompt — ~5 minutes)

1. Go to [claude.ai](https://claude.ai) → **Projects** → **Create Project**
2. Name it: `InSites-CAA`
3. Open project settings → **Custom Instructions**
4. Copy the **entire contents** of [`InSites-CAA-mono v5.5.md`](InSites-CAA-mono%20v5.5.md) and paste
5. Save

> **Tip:** Use a paid account with the latest Claude model for best results.

## Start

1. Open a conversation in the project
2. Upload a heritage document (PDF, DOCX, or text)
3. Type **"start"**

The bot runs Stage 0 (Preliminary Review) and pauses for your review.

## Verify

| Test | Type this | Expected |
|------|-----------|----------|
| Assessment | "start" + document | Stage 0 with status line |
| Knowledge Graph | "kg" | Interactive graph artifact |
| Dashboard | "dashboard" | Multi-tab visual summary |
| Self-identify | "what is InSites?" | ~200-word introduction |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Bot uses external knowledge | Say: "use only the uploaded documents" |
| Very long responses | Normal for some stages; say "continue" if truncated |
| Bot skips stages | Ensure the prompt is in Project Instructions, not pasted into a conversation |
