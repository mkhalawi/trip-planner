# Trip Planner (OpenAI Agents + MCP)

## 1) Setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export OPENAI_API_KEY=sk-...
```

## 2) Run the web experience

The Starlette app exposes both the REST API and the single-page frontend found in
`frontend/`.

```bash
uvicorn app:app --reload
```

Then open <http://localhost:8000> and submit the trip form. The UI sends your
inputs to `/api/plan-trip`, waits for the AI agents to collaborate, and renders
the structured itinerary response.

## 3) Publish to GitHub

1. Create a new repository on GitHub (without any starter files) from the web
   UI and copy the HTTPS or SSH remote URL.
2. Inside this project folder, make sure your work is committed locally:

   ```bash
   git status
   git add .
   git commit -m "feat: add trip planner frontend"
   ```

3. Point the local repository at the new GitHub remote and push the branch:

   ```bash
   git branch -M main  # or keep your existing branch name
   git remote add origin <your-remote-url>
   git push -u origin main
   ```

4. If you are working on a feature branch, open a pull request from that
   branch in GitHub after pushing.
