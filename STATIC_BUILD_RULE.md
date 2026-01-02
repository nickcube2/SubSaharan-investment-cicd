# Comprehensive Rule for Building Static Export (Next.js)

This rule ensures your Next.js project is correctly built and exported as a static site, ready for deployment on static hosts like cPanel.

---

## 1. Configuration

- **Set Static Export in `next.config.ts`:**
  ```ts
  output: 'export',
  ```
- **Enable Trailing Slashes:**
  ```ts
  trailingSlash: true,
  ```
- **Disable Image Optimization:**
  ```ts
  images: {
    unoptimized: true,
    // ...other image settings
  }
  ```
- **Do not use dynamic or API routes.**

---

## 2. Navigation

- **All navigation links must use trailing slashes** (e.g., `/about/`, `/services/`, `/contact/`).
- **Avoid dynamic routing and API routes.**

---

## 3. .htaccess for cPanel/Apache

- Place a `.htaccess` file in your `public/` directory with:
  ```apache
  RewriteEngine On

  # Serve existing files/directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Fallback to index.html for client-side routing
  RewriteRule ^ index.html [L]
  ```
- After export, copy `.htaccess` to the `out/` directory before uploading to your server.

---

## 4. 404 Handling

- Create a `404.html` in `public/` that either shows a custom 404 message or redirects to `index.html` for client-side routing.
- Copy this file to the `out/` directory after export.

---

## 5. Build Script

- Add a script to your `package.json`:
  ```json
  "scripts": {
    "build:static": "next build && next export && node build-static.js"
  }
  ```
- The `build-static.js` script should copy `.htaccess` and `404.html` to the `out/` directory.

---

## 6. Build and Deploy

- Run:
  ```bash
  npm run build:static
  ```
- Upload **all contents** of the `out/` directory (including hidden files like `.htaccess`) to your `public_html` or equivalent directory on your static host.

---

## 7. Verify

- Ensure all routes (with trailing slashes) work as expected.
- Check that navigation does not redirect to the home page.
- Confirm that 404s are handled gracefully.

---

## 8. Troubleshooting

- **Navigation fails:** Check for missing `.htaccess` or incorrect trailing slashes.
- **Images do not load:** Ensure `unoptimized: true` is set and images are in the `public/` directory.
- **404s:** Verify the folder structure in `out/` matches your URLs.

---

## Summary

- Use `output: 'export'`, trailing slashes, unoptimized images, and proper `.htaccess` for static export.
- Use the provided build script and upload the `out/` directory contents to your static host.

---

**Following this rule ensures your static Next.js site works perfectly on cPanel and similar static hosting environments.** 