# Copilot Instructions for keyklot

## Project Overview

This is a React + Vite puzzle game called **KeyKlot**. The goal is to move the main block fto the exit at the bottom of the board. The app is structured for clarity and rapid iteration, with all logic and UI in TypeScript/React.

## Architecture & Key Files

- `App.tsx`: Main app logic, state, and keyboard handling. All game rules and win logic are here.
- `components/Board.tsx`, `components/Block.tsx`: Board/grid rendering and block visualization. Blocks are absolutely positioned in a grid.
- `components/Instructions.tsx`: UI for game controls and instructions.
- `components/WinModal.tsx`: Win screen modal.
- `constants.ts`: Board size, initial layout, win position, and sound constants.
- `types.ts`: Shared types, especially `BlockType`.
- `hooks/useSound.ts`: Custom React hook for playing move sounds (Base64-encoded by default).

## Game Logic Patterns

- **Block Movement**: Select a block by clicking or pressing its letter key. Move with W/A/S/D. Deselect with ESC/ENTER.
- **Collision & Bounds**: Movement is validated in `App.tsx` (`isValidMove`). No block can overlap or leave the board.
- **Win Condition**: Main block (`isMain: true`) must reach `WIN_POSITION`.
- **Sound**: Move sound is played unless muted. Sound is embedded as Base64 in `constants.ts`.

## Developer Workflows

- **Run Locally**:
  - `npm install`
  - Set `GEMINI_API_KEY` in `.env.local` (if using Gemini API features)
  - `npm run dev` (starts Vite dev server)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Conventions & Patterns

- **Styling**: Uses Tailwind CSS utility classes (no external CSS files).
- **Component Props**: All state is passed explicitly; no context API.
- **Sound**: Use the `useSound` hook for any new sound effects.
- **Board Layout**: All block positions and sizes are defined in `INITIAL_LAYOUT` (see `constants.ts`).
- **Type Safety**: All block data uses the `BlockType` interface.

## Integration Points

- No external APIs are called by default. If Gemini API is used, configure `.env.local`.
- No backend/server code; all logic is client-side.
- No test suite is present; manual testing via UI.

## Quick Reference

- Main game logic: `App.tsx`
- Board/grid: `components/Board.tsx`, `components/Block.tsx`
- Initial block layout: `constants.ts`
- Block type definition: `types.ts`
- Move sound: `hooks/useSound.ts`, `constants.ts`

---

For questions or unclear patterns, review `App.tsx` and `constants.ts` first—they define all game rules and conventions.
