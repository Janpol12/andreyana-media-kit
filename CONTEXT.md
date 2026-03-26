# Project Context: AndreYana Media Kit

This document summarizes the current state of the project to facilitate a seamless transition to a new chat session.

---

## 🚀 Project Overview
- **Name:** AndreYana Media Kit / Portfolio
- **Local Path:** `/Users/andrey/Downloads/Agents/andreyana-site`
- **GitHub Repository:** [https://github.com/Janpol12/andreyana-media-kit](https://github.com/Janpol12/andreyana-media-kit)
- **Deployment:** [https://janpol12.github.io/andreyana-media-kit/](https://janpol12.github.io/andreyana-media-kit/) (GitHub Pages)
- **Tech Stack:** HTML5, Vanilla CSS, JavaScript (No heavy frameworks).

---

## 🛠 Recent Accomplishments
1.  **Video Update:** Embedded `portfolio_2026.mp4` as the primary Showreel (hero section and gallery).
2.  **Gallery Cleanup:** Removed 3 specific autumn-themed photos from the Hyundai brand drawer in `script.js`.
3.  **Deployment Fix:** Resolved HTTP 400 errors by pushing the site in 7 sequential batches to accommodate large video files (total ~300MB).
4.  **GitHub Workflow:** Renamed local branch to `main`, set up upstream, and enabled GitHub Pages via API.
5.  **Documentation:** Added `STRUCTURE.md` to explain the repo architecture for collaborators.

---

## 📋 Outstanding Tasks / Next Steps
- [ ] Verify the live site once the GitHub Actions build is complete.
- [ ] Add/update content as requested by the user.
- [ ] Maintain the chunked push strategy for any new large video assets.

---

## 🔑 Technical Notes
- **Git Config:** `http.postBuffer` is set to `524288000` (500MB) to handle large pushes.
- **Large Files:** Video files are stored in `images/`. The largest is `portfolio_2026.mp4` (~48MB).
- **Authentication:** Using a Personal Access Token (PAT) for GitHub operations.
