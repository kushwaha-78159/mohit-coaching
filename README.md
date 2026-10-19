# Mohit Coaching Centre 🎓

A modern, responsive website for **Mohit Coaching Centre**, built using Next.js, TypeScript, React, and Tailwind CSS.

The website helps students and parents explore coaching classes, learn about the institute, view gallery photos, contact the centre, and submit registration enquiries. It also includes an admin panel for managing supported website content.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Website Pages](#-website-pages)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Admin Panel](#-admin-panel)
- [Gallery Image Upload](#-gallery-image-upload)
- [Available Commands](#-available-commands)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
- [Repository](#-repository)

---

## 📖 About the Project

**Mohit Coaching Centre** is a coaching institute website designed to provide students and parents with useful information about the institute.

The project focuses on a clean user interface, responsive design, easy navigation, and content management through an administrative interface.

The website is built with modern web technologies and follows the Next.js App Router architecture.

### Project Goals

- Present coaching centre information professionally.
- Display classes and fee-related information.
- Provide a gallery for institute photographs.
- Allow visitors to contact the institute.
- Support registration and enquiry workflows.
- Provide an admin interface for managing supported content.

---

## ✨ Features

### 🌐 Public Website

- Responsive layout for desktop, tablet, and mobile.
- Home page with coaching centre information.
- About section.
- Classes and fee information.
- Photo gallery.
- Contact information and enquiry functionality.
- Registration-related functionality.
- Modern blue and gold inspired visual design.

### 🔐 Admin Panel

- Dedicated admin interface.
- Administrative content management through supported API routes.
- Gallery photo upload functionality.
- Server-side handling of gallery uploads.
- Website content storage and retrieval.

> Available administrative actions depend on the current implementation and server configuration.

### 🖼️ Gallery Management

- Upload photos directly from your computer.
- Support for JPEG, PNG, and WebP images in the current upload implementation.
- Uploaded image files are stored under `public/uploads/gallery/`.
- Gallery entries use image paths that the website can display.
- Gallery content is managed through the project's site-data store.

### ⚡ Development Features

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- React components.
- API routes.
- Git and GitHub version control.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js | Web application framework |
| React | User interface |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Styling and responsive layouts |
| Node.js | JavaScript runtime |
| npm | Package management |
| Lucide React | Icons, where used |
| Git | Version control |
| GitHub | Source code hosting |

The exact dependency versions are available in `package.json`.

---

## 📄 Website Pages

The project is intended to provide the following pages or sections:

| Page | Purpose |
| --- | --- |
| Home | Introduction to the coaching centre |
| About | Information about the institute |
| Classes & Fees | Class-related and fee information |
| Gallery | Photos of the institute and activities |
| Contact | Contact details and enquiries |
| Registration | Registration-related information |
| Admin | Administrative content management |

Actual routes and available features depend on the current source code.

---

## 📁 Project Structure

Important project files and directories:

```text
mohit-coaching/
├── data/
│   └── site-data.json
├── public/
│   ├── images/
│   └── uploads/
│       └── gallery/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── data/
│   │   │   │   └── gallery-upload/
│   │   │   └── site/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── SitePage.tsx
│   └── lib/
│       └── store.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

This structure highlights important areas of the application. Additional files may exist in the repository.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install:

- Node.js compatible with the installed Next.js version.
- npm.
- Git.

### Step 1: Clone the Repository

```bash
git clone https://github.com/kushwaha-78159/mohit-coaching.git
```

Move into the project directory:

```bash
cd mohit-coaching
```

If `package.json` is located inside a nested application folder, navigate to that folder before continuing.

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the application root if your current setup requires environment variables.

See the [Environment Variables](#-environment-variables) section below.

Never commit real passwords, tokens, or private environment files to GitHub.

### Step 4: Start the Development Server

```bash
npm run dev
```

Open the website in your browser:

http://localhost:3000

### Step 5: Verify the Application

Run the TypeScript check:

```bash
npx tsc --noEmit
```

Build the production application:

```bash
npm run build
```

If the build completes successfully, the application is ready for the next deployment step.

---

## 🔑 Environment Variables

Depending on the current authentication and database implementation, the application may use environment variables such as:

| Variable | Purpose |
| --- | --- |
| `ADMIN_EMAIL` | Admin login email, if required by the implementation |
| `ADMIN_PASSWORD` | Admin login password, if required |
| `AUTH_SECRET` | Authentication secret, if required |
| `DATABASE_URL` | Database connection string, if the database is used |

These are potential configuration variables, not a guarantee that all are currently required. Check the actual source code before configuring your environment.

Example placeholder:

```env
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=replace-with-a-strong-password
AUTH_SECRET=replace-with-a-long-random-secret
```

Use real values only in your private environment configuration.

**Important:** Do not upload `.env` or `.env.local` files containing secrets to GitHub.

---

## 🔐 Admin Panel

The administrative interface is located in:

```text
src/app/admin/
```

Related administrative API routes are located in:

```text
src/app/api/admin/
```

Depending on the current implementation, administrators can manage supported site information and upload gallery photographs.

### Recommended Admin Practices

1. Use strong, unique admin credentials.
2. Keep credentials private.
3. Protect administrative API routes with server-side authentication.
4. Validate data on the server.
5. Use HTTPS in production.
6. Never expose authentication secrets in client-side code.

A hidden admin page alone is not sufficient security; administrative API requests must also be authorized.

---

## 🖼️ Gallery Image Upload

The gallery upload API is located at:

```text
src/app/api/admin/gallery-upload/route.ts
```

The upload feature is designed to let an administrator select an image from their computer instead of entering an external image URL.

### Upload Workflow

1. Open the admin panel.
2. Navigate to gallery management.
3. Select a photo from your computer.
4. Submit the upload form.
5. The server validates the upload.
6. The image is saved to the gallery upload directory.
7. The image path is stored with the gallery content.
8. Open the public Gallery page to verify the image.

### Upload Directory

```text
public/uploads/gallery/
```

A gallery image path may look like:

```text
/uploads/gallery/example-image.jpg
```

The current upload implementation is intended to accept JPEG, PNG, and WebP images up to 5 MB. If these limits change in the source code, update this documentation.

### Production Storage Considerations

Uploaded images stored inside the application's local filesystem may not persist across redeployments or may not be shared across multiple server instances.

For production use, consider:

- Persistent disk storage.
- Object storage for uploaded images.
- Regular backups of uploaded photos.
- Appropriate file permissions.
- Server-side file validation and upload size limits.

---

## 💾 Data and Storage

The project's website content is associated with:

```text
data/site-data.json
```

Store utilities are located in:

```text
src/lib/store.ts
```

The current JSON-based storage approach is suitable for a small, single-instance project but can have limitations with concurrent writes, multiple application instances, and scaling.

For a larger production application, consider moving frequently updated content into a database and storing uploaded files in persistent object storage.

Always back up important site content before making storage changes.

---

## 💻 Available Commands

| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npx tsc --noEmit` | Check TypeScript types |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run the configured lint command, if available |

Run the following command to see the scripts configured in your current project:

```bash
npm run
```

---

## 🌍 Deployment

The application can be deployed to a hosting provider that supports the installed Next.js version.

### Deployment Checklist

- [ ] Push the latest code to GitHub.
- [ ] Configure the required environment variables.
- [ ] Install dependencies.
- [ ] Run the TypeScript check.
- [ ] Run the production build.
- [ ] Configure the hosting provider.
- [ ] Verify all public pages.
- [ ] Test admin login and authorization.
- [ ] Test gallery image uploads.
- [ ] Confirm uploaded files persist after redeployment.
- [ ] Enable HTTPS.
- [ ] Set up backups.

**Note:** Pushing code to GitHub does not automatically deploy the application unless a deployment integration or workflow is configured.

---

## 🧰 Troubleshooting

### Gallery Image Is Not Visible

- Verify that the upload request succeeds.
- Check that the image path begins with `/uploads/gallery/`.
- Confirm that the file exists on the server.
- Ensure the Gallery component handles `/uploads/` paths correctly.
- Inspect the browser console and server logs.

### Gallery Upload Fails

- Confirm that you are logged into the admin panel.
- Check the image format and file size.
- Verify that the upload form uses the field name expected by the API.
- Check server-side authentication and file permissions.
- Inspect the API response and server logs for details.

### Build Fails

Run:

```bash
npx tsc --noEmit
npm run build
```

Resolve the first reported error before deploying again.

### Website Does Not Show Latest Changes

- Verify that the latest commit exists on GitHub.
- Check whether automatic deployment is configured.
- Deploy the latest commit if necessary.
- Clear the browser cache and reload the website.

---

## 🛡️ Security

Security recommendations for this project:

- Never commit passwords, API keys, or authentication secrets.
- Use strong admin credentials.
- Require server-side authorization for administrative APIs.
- Validate file types and sizes on the server.
- Avoid trusting filenames or MIME types supplied by the browser.
- Keep dependencies updated.
- Use HTTPS in production.
- Back up important data and uploaded images.
- Restrict write access to the upload directory.

---

## 🔮 Future Improvements

Possible improvements for future versions include:

- Database-backed content management.
- Persistent cloud storage for gallery images.
- Better admin dashboard analytics.
- Improved enquiry and registration management.
- Image optimization and thumbnails.
- Search engine optimization.
- Accessibility improvements.
- Automated deployment.
- Automated tests and continuous integration.

These are possible future enhancements and are not necessarily implemented yet.

---

## 👨‍💻 Author

**Abhishek Kushwaha**

Developer and student interested in web development and building practical software projects.

- GitHub: [@kushwaha-78159](https://github.com/kushwaha-78159)

---

## 🔗 Repository

**GitHub:** https://github.com/kushwaha-78159/mohit-coaching

If you find an issue or want to suggest an improvement, use the repository's Issues section or submit a pull request.

---

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS.
