# Lowxxy AR Starter

This is a free, browser-based AR scanner built with MindAR and A-Frame. It recognizes one Lowxxy shirt design and overlays a looping MP4 animation on top of it.

## What you need

1. A flat JPG or PNG of the exact Lowxxy design that will be printed on the shirt.
2. A short MP4 animation named `wave.mp4`.
3. A free GitHub account.
4. An iPhone using Safari or an Android phone using Chrome for testing.

## Important animation rule

Make the MP4 canvas the exact same aspect ratio as the target artwork. The easiest method is to use the original static design as the background of the animation, animate only the character's arm/eyes/body, and let the last frame return to the original artwork. This avoids needing transparent video.

Recommended first animation:

- 4 to 6 seconds
- 720p or 1080p
- H.264 MP4
- Muted
- Short loop
- File kept as small as practical

## Step 1: Compile the shirt design

1. Open the MindAR Image Targets Compiler:
   https://hiukim.github.io/mind-ar-js-doc/tools/compile/
2. Upload the flat target JPG or PNG.
3. Click **Start**.
4. Review the feature-point preview. The design should contain many points spread across the image.
5. Click **Download**.
6. Rename the downloaded file to `targets.mind` if needed.
7. Put it in the `assets` folder.

## Step 2: Add the animation

1. Export the finished animation as an MP4.
2. Rename it exactly `wave.mp4`.
3. Put it in the `assets` folder.

The final structure should be:

```text
lowxxy-ar-starter/
  index.html
  manifest.webmanifest
  service-worker.js
  assets/
    targets.mind
    wave.mp4
  icons/
    icon-192.png
    icon-512.png
```

## Step 3: Publish free with GitHub Pages

1. Create a free GitHub account.
2. Create a new **public** repository named `lowxxy-ar`.
3. Upload every file and folder from this starter project.
4. Open the repository's **Settings**.
5. Select **Pages** in the left menu.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch **main** and folder **/(root)**, then save.
8. GitHub will publish a URL similar to:
   `https://YOUR-USERNAME.github.io/lowxxy-ar/`
9. Open that URL on a phone, tap **START AR**, allow camera access, and point at the design.

## Step 4: Test on the real shirt

Test all of these:

- Design printed on the actual fabric
- Shirt laid flat
- Shirt worn while the person stands still
- Bright indoor light
- Outdoor shade
- Close, medium, and farther camera distances
- iPhone Safari
- Android Chrome

If tracking fails on the worn shirt but works on paper, the problem is usually fabric wrinkles, stretching, glare, low contrast, or the target being too small in the camera view.

## Step 5: Turn the URL into a QR code

Create a QR code that points to the GitHub Pages URL. Put the QR code on a hangtag, package insert, vendor booth sign, or product page with instructions such as:

> Scan the QR code, allow camera access, then point your phone at the full Lowxxy design.

## Optional: Use a Lowxxy web address

If you already own a Lowxxy domain, GitHub Pages can use a subdomain such as:

`ar.lowxxy.com`

This is optional. The default GitHub Pages address is free.

## Adding more designs later

Compile multiple target images together. MindAR assigns them indexes in upload order:

- First design: `targetIndex: 0`
- Second design: `targetIndex: 1`
- Third design: `targetIndex: 2`

Each target can have its own video plane and MP4. Start with one design until recognition is reliable.

## Troubleshooting

### Camera never opens

- The page must be loaded over HTTPS.
- Use Safari on iPhone.
- Use Chrome on Android.
- Confirm camera permission is allowed for the site.

### The design is recognized but the video does not line up

- Make the MP4 and target image the same aspect ratio.
- Include the full static design inside the MP4 background.
- Do not crop one asset differently from the other.

### The video jitters

- Hold the phone steadier.
- Improve lighting.
- Keep more of the full design in view.
- Test with the shirt flat first.
- Adjust MindAR filter values only after the basic version works.

### The video does not play

- Keep it muted for the first version.
- Use H.264 MP4.
- Compress the file.
- Confirm the filename is exactly `wave.mp4`, including capitalization.
