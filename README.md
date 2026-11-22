# Bhanu Prakash Kakarla — Portfolio

A static personal portfolio for Bhanu Prakash Kakarla, a computer science graduate. The site presents his education, skills, projects, research, certifications, photographs, and resume. It is plain HTML, CSS, and JavaScript, with no build step and no backend, so it can be hosted on GitHub Pages.

Every qualification on the page comes from `assets/documents/resume.pdf`. The portrait and gallery use his own photographs. Nothing in the copy invents a job title, a score, or a social account that is not on the resume.

## Run it locally

The page uses relative paths, so you can open `index.html` directly in a browser.

A small local server is closer to how GitHub Pages will serve it:

```bash
cd my-portfolio
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

On Windows, if `python` is not recognized, try `py -m http.server 8080`.

## Repository layout

```
my-portfolio/
├── index.html
├── README.md
├── robots.txt
├── .nojekyll
├── .gitignore
├── assets/
│   ├── favicon.svg
│   ├── images/
│   │   ├── profile.jpeg
│   │   ├── photo1.jpeg
│   │   ├── photo2.jpeg
│   │   ├── photo3.jpeg
│   │   ├── photo4.jpeg
│   │   └── photo5.jpeg
│   └── documents/
│       └── resume.pdf
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── script.js
└── .github/
    └── workflows/
        └── deploy.yml
```

This folder is the repository root. `index.html` must stay at the root of the GitHub repository. The workflow uploads the repository root as the site.

## Create the GitHub repository

1. Create a new **public** repository on GitHub. The name can be anything, for example `my-portfolio`. Public is required for a free GitHub Pages site on a user or project site unless you use a paid plan.
2. Do not add a generated README, `.gitignore`, or license if you are about to push this folder. Those files are already here.
3. If GitHub offers to create the repo with a `main` branch, that is the branch this workflow listens to.

## Push the project

From inside `my-portfolio`:

```bash
git init
git add .
git commit -m "Add personal portfolio site."
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with the repository you created.

`git add .` includes the photographs, the resume PDF, and the workflow file. Confirm with `git status` that `assets/images/` and `assets/documents/resume.pdf` are included before you push.

## Enable GitHub Pages

1. After the push, open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. The workflow **Deploy portfolio to GitHub Pages** runs on every push to `main`. You can also run it with **Run workflow**.
5. When the run succeeds, the site URL is shown on the workflow run and under **Settings → Pages**. It will look like `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`.

The first deployment needs the Pages source set to GitHub Actions. If the workflow fails with a permissions error, confirm that **Settings → Actions → General → Workflow permissions** allows GitHub Actions to read and write, and that Pages is enabled.

## Update photographs

Photographs live in `assets/images/`. The page expects these names:

| File | Use |
| --- | --- |
| `profile.jpeg` | Hero and About portrait |
| `photo1.jpeg` … `photo5.jpeg` | Gallery, in that order |

To replace a picture, keep the same filename and the same `.jpeg` extension, then update the `alt` text and caption in `index.html` so they still describe the image. Do not set a fixed display height that would crop or stretch the photo. The gallery uses each image’s real width and height.

To add `photo6.jpeg`:

1. Save the file in `assets/images/`.
2. Copy a `<figure class="shot">` block in the gallery.
3. Point it at `photo6.jpeg`, and write a real caption and `alt` text.
4. The lightbox picks up every button inside `[data-gallery]`, so the new figure is included automatically.

Originals uploaded with WhatsApp filenames were left in the parent folder and copied here under these names. Replacing a file in `assets/images/` does not delete those originals.

## Update the resume

Replace `assets/documents/resume.pdf` with the new PDF, using the same filename. The Download and Open links already point at that path. If the new resume changes a fact (a date, a project, a link), update the matching text in `index.html` so the page and the PDF agree.

## Update personal information

Edit `index.html`.

- Name, tagline, and introduction are in the hero.
- Education, the short biography, and programs are in **About**.
- Skills are listed only as they appear on the resume. Java is marked Basic on purpose.
- Projects, papers, and certifications are in **Experience & projects**.
- Email, phone, and LinkedIn are in **Contact** and in the JSON-LD block in `<head>`.
- The resume does not include a GitHub profile URL, so the page does not link to one. To add it, put a real profile link in the contact list, for example `https://github.com/your-username`, and add the same URL to the `sameAs` array.

Keep the page specific. Do not add a job, a metric, or a certificate that is not on the resume.

Visible text, the `<title>`, the meta description, and the JSON-LD `Person` data should stay in sync when you change a public detail.

## Design notes

The layout is original. It borrows the spirit of a personal, editorial portfolio — large type, a clear story, room for photography — and uses a paper, pine, and coral palette taken from the portrait and the flower photograph. Typography is Fraunces and Outfit, loaded from Google Fonts. If those fonts cannot load, the page falls back to Palatino and Segoe UI.

## Browser support

Current versions of Chrome, Edge, Firefox, and Safari. The photograph viewer uses the native `<dialog>` element. Navigation, the mobile menu, the lightbox, and scroll effects are in `js/script.js`. If JavaScript is unavailable, the page content, links, and resume download still work; gallery images simply do not open in the viewer.
