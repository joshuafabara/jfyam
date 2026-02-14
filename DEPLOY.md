# How to Deploy "Love Invaders" to Vercel

You have two easy ways to deploy this game for free.

## Option 1: The Easiest Way (Command Line)
This method uploads your local code directly to Vercel.

1.  Open your terminal in the project folder.
2.  Run the following command:
    ```bash
    npx vercel
    ```
3.  Follow the prompts:
    -   **Set up and deploy?** [y]
    -   **Which scope?** [Select your account]
    -   **Link to existing project?** [N]
    -   **Project Name?** [love-invaders] (or press Enter)
    -   **Directory?** [./] (Press Enter)
    -   **Want to modify settings?** [N]

Vercel will build your site and give you a live URL (e.g., `https://love-invaders.vercel.app`) in about 1 minute.

---

## Option 2: The "Proper" Way (Git + GitHub)
Recommended if you want automatic updates whenever you save changes.

1.  **Push your code to GitHub:**
    -   Create a new repository on GitHub.
    -   Run these commands:
        ```bash
        git add .
        git commit -m "Ready for deploy"
        git branch -M main
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        git push -u origin main
        ```

2.  **Connect to Vercel:**
    -   Go to [vercel.com/new](https://vercel.com/new).
    -   Select your generic "Import Git Repository".
    -   Choose your new repository.
    -   Click **Deploy**.

Vercel will detect it's a Vite app and handle everything automatically.

Deployed to Vercel at: https://jfyam14.vercel.app/ 
