# Ryan Dolan — Engineering Portfolio

Live site: https://rdolan5.github.io/ryan-dolan-portfolio/

Plain static site (no build step), served by GitHub Pages from `master`.

| Path | What it is |
| --- | --- |
| `index.html` | The site |
| `css/site.css`, `js/site.js` | Styles; nav, scroll reveal, figure lightbox, copy-email |
| `assets/img/` | Project images (WebP) |
| `assets/og.png` | Link-preview image for LinkedIn, iMessage, Slack |
| `Ryan_Dolan_Resume.pdf` | Résumé linked from the Résumé buttons |
| `Ryan_Dolan_Portfolio.pdf` | 6-page landscape PDF portfolio, for applications that take attachments |
| `print/portfolio-print.html` | Source of the PDF (self-contained bundle) |

## Updating

- **Résumé:** replace `Ryan_Dolan_Resume.pdf` and keep the filename.
- **Text:** edit `index.html`.
- **New image:** export it to `assets/img/` as WebP, about 1400 px wide at most, and add `width`/`height` to the `<img>`.
- **Regenerating the PDF portfolio** (with the site served locally on port 8766):

  ```
  chrome --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=Ryan_Dolan_Portfolio.pdf http://localhost:8766/print/portfolio-print.html
  ```
