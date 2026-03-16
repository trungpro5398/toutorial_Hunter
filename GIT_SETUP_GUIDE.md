# Git Setup and Workflow Guide

This guide walks you through everything from installing Git to creating pull requests. Follow each section in order.

---

## Part 1: Install Git on Windows

### Step 1: Download Git

Go to the official Git website:

```
https://git-scm.com/downloads/win
```

Click **"Click here to download"** to get the latest version.

### Step 2: Run the installer

Open the downloaded `.exe` file and follow the installer.

Use the default settings for everything. Just keep clicking **Next** until it finishes.

The only setting worth checking:

- **Default editor**: change it to **VS Code** if you use VS Code (instead of Vim).

### Step 3: Verify Git is installed

Open **Command Prompt** or **PowerShell** and run:

```bash
git --version
```

You should see something like:

```
git version 2.47.1.windows.1
```

If you see a version number, Git is installed.

### Step 4: Set your name and email

Git needs to know who you are. Run these two commands (replace with your real name and email):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Use the same email you will use for GitHub.

To verify your config is saved:

```bash
git config --global user.name
git config --global user.email
```

Both should print the values you just set.

---

## Part 2: Create a GitHub Account

### Step 1: Sign up

Go to:

```
https://github.com
```

Click **Sign up** and create an account.

### Step 2: Send your GitHub username

After creating your account, send your **GitHub username** to the project owner so they can add you as a collaborator.

Example message:

> My GitHub username is `hunter123`. Please add me to the project.

### Step 3: Accept the invitation

After the project owner adds you, you will receive an email invitation from GitHub.

Click the link in the email to accept. You can also check:

```
https://github.com/notifications
```

You must accept the invitation before you can push code.

---

## Part 3: Clone the Project

Cloning means downloading the project from GitHub to your computer.

### Step 1: Open Terminal

On Windows, open **Command Prompt**, **PowerShell**, or **Git Bash**.

### Step 2: Navigate to where you want the project

```bash
cd %USERPROFILE%\Desktop
```

This works in Command Prompt. In PowerShell, use:

```bash
cd ~\Desktop
```

Or any folder you prefer.

### Step 3: Clone the repository

```bash
git clone https://github.com/trungpro5398/toutorial_Hunter.git
```

### Step 4: Go into the project folder

```bash
cd toutorial_Hunter
```

### Step 5: Verify it worked

```bash
git status
```

You should see:

```
On branch main
nothing to commit, working tree clean
```

You now have the full project on your computer.

---

## Part 4: Git Basics — Add, Commit, Push

This section teaches the core Git workflow. Practice this before moving to branches.

### How Git works (simple version)

```
Your files  →  Staging area  →  Local commit  →  GitHub (remote)
              (git add)        (git commit)      (git push)
```

Think of it like sending a package:

1. **`git add`** = put items in the box
2. **`git commit`** = seal the box and write a label
3. **`git push`** = ship the box to GitHub

### Practice: Create a test file and push it

> **Note:** This practice section pushes directly to `main` on purpose — just to learn the basic commands. After this, you will learn branches in Part 5 and should always use branches for real homework.

#### Step 1: Create a file

Create a new file called `hello.txt` in the project folder. Write anything inside it:

```
Hello, this is my first Git file!
```

#### Step 2: Check what changed

```bash
git status
```

You will see `hello.txt` listed in red under "Untracked files." This means Git sees the file but is not tracking it yet.

#### Step 3: Stage the file

```bash
git add hello.txt
```

Run `git status` again. Now `hello.txt` is listed in green under "Changes to be committed."

#### Step 4: Commit the file

```bash
git commit -m "Add hello.txt for Git practice"
```

The `-m` flag lets you write a short message describing what you did.

#### Step 5: Push to GitHub

```bash
git push
```

#### Step 6: Verify on GitHub

Go to the repository page on GitHub. You should see `hello.txt` there.

### Other useful commands

#### See what files changed

```bash
git status
```

#### See your commit history

```bash
git log --oneline
```

#### Stage all changed files at once

```bash
git add .
```

The `.` means "everything in the current folder."

#### Pull the latest changes from GitHub

```bash
git pull
```

Run this before starting new work to make sure you have the latest version.

### Clean up: Delete the test file

After practicing, remove the test file:

```bash
git rm hello.txt
git commit -m "Remove hello.txt practice file"
git push
```

---

## Part 5: Working with Branches

Now that you know the basics, it is time to learn branches. This is how real teams work.

### Why use branches?

- `main` is the stable version of the project
- Each branch is a separate workspace where you can make changes without affecting `main`
- When your work is done, you create a **pull request** to merge your branch into `main`
- This keeps `main` clean and lets others review your work before it is merged

### The rule

> **Never work directly on `main`.** Always create a branch first.

### Branch workflow overview

```
main (stable)
  │
  ├── session2-hunter     ← your Session 2 work
  ├── session3-hunter     ← your Session 3 work
  ├── session4-hunter     ← your Session 4 work
  └── session6-hunter     ← your Session 6 work
```

Each session gets its own branch. Replace `hunter` with your name.

### Step-by-step: Create a branch and push your work

#### Step 1: Make sure you are on `main`

```bash
git checkout main
```

#### Step 2: Pull the latest version

**This step is critical.** Always pull before creating a new branch. This ensures your branch starts from the latest code.

```bash
git pull
```

#### Step 3: Create a new branch

```bash
git checkout -b session6-hunter
```

This creates a new branch called `session6-hunter` and switches to it.

Naming convention: `session<number>-<yourname>`

Pick **one** based on which session you are working on:

```bash
git checkout -b session2-hunter    # if working on Session 2
git checkout -b session3-hunter    # if working on Session 3
git checkout -b session4-hunter    # if working on Session 4
git checkout -b session6-hunter    # if working on Session 6
```

Only run **one** of these. Do not create all branches at once.

#### Step 4: Verify you are on the new branch

```bash
git branch
```

You will see a list of branches. The one with `*` is your current branch:

```
  main
* session6-hunter
```

#### Step 5: Do your homework

Now you can edit files, create new files, and work on your homework. All changes happen on this branch only. `main` stays untouched.

#### Step 6: Stage and commit your work

```bash
git add .
git commit -m "Session 6: complete todo app homework"
```

You can commit multiple times while working. Each commit saves a checkpoint:

```bash
# First commit: basic structure
git add .
git commit -m "Session 6: set up React project with Vite"

# Second commit: add feature
git add .
git commit -m "Session 6: add todo with controlled input"

# Third commit: finish
git add .
git commit -m "Session 6: add delete, validation, and README"
```

#### Step 7: Push the branch to GitHub

The first time you push a new branch:

```bash
git push -u origin session6-hunter
```

After the first push, you can just use:

```bash
git push
```

---

## Part 6: Create a Pull Request

A pull request (PR) is how you ask to merge your branch into `main`. It also lets others review your code.

### Step 1: Go to GitHub

Open the repository page:

```
https://github.com/trungpro5398/toutorial_Hunter
```

### Step 2: You will see a notification

After pushing your branch, GitHub shows a yellow banner:

> **"session6-hunter had recent pushes — Compare & pull request"**

Click **"Compare & pull request"**.

### Step 3: Fill in the pull request

- **Title**: Write a short title, e.g., `Session 6: Todo app homework`
- **Description**: Write what you did, e.g.:
  - Built a Todo app with React useState
  - Added add, delete, and validation
  - Included README with 3 test cases and screenshot

### Step 4: Click "Create pull request"

Your PR is now visible to the project owner. They can review your code and leave comments.

### Step 5: Wait for review

The project owner will either:

- **Approve and merge** your PR
- **Request changes** with comments

If changes are requested, fix them on the same branch and push again:

```bash
# Fix your code, then:
git add .
git commit -m "Session 6: fix validation based on review feedback"
git push
```

The PR updates automatically. No need to create a new one.

---

## Part 7: Start the Next Session

When you are ready to work on a new session, repeat the branch workflow:

```bash
# 1. Go back to main
git checkout main

# 2. Pull the latest version (ALWAYS do this!)
git pull

# 3. Create a new branch for the next session
git checkout -b session3-hunter

# 4. Do your work, commit, and push
git add .
git commit -m "Session 3: convert functions to TypeScript"
git push -u origin session3-hunter

# 5. Create a pull request on GitHub
```

### Important reminder

```
┌─────────────────────────────────────────────────┐
│  ALWAYS do these 2 steps before a new branch:   │
│                                                 │
│    git checkout main                            │
│    git pull                                     │
│                                                 │
│  This ensures you start from the latest code.   │
│  Skipping this can cause merge conflicts.       │
└─────────────────────────────────────────────────┘
```

---

## Quick Reference

### Daily workflow cheat sheet

```bash
# Starting new work
git checkout main
git pull
git checkout -b session6-hunter

# While working
git add .
git commit -m "describe what you did"

# When done
git push -u origin session6-hunter
# Then create a pull request on GitHub
```

### Common commands

| Command | What it does |
|---------|-------------|
| `git status` | Show what changed |
| `git add .` | Stage all changes |
| `git add <file>` | Stage one file |
| `git commit -m "msg"` | Save changes with a message |
| `git push` | Upload to GitHub |
| `git pull` | Download latest from GitHub |
| `git checkout main` | Switch to main branch |
| `git checkout -b <name>` | Create and switch to a new branch |
| `git branch` | List all branches |
| `git log --oneline` | See commit history |

### If something goes wrong

| Problem | Solution |
|---------|----------|
| "I forgot to pull before creating a branch" | `git checkout main` → `git pull` → `git checkout -b <branch>` again |
| "I committed to main by accident" | Ask the project owner for help |
| "I have merge conflicts" | Ask the project owner for help — do not force push |
| "git push says rejected" | Run `git pull` first, then `git push` again |
| "I want to see my changes before committing" | Run `git diff` |
