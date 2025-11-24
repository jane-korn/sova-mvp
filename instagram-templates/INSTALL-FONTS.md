# Installing Montserrat Font for PowerPoint

Since you're using Windows with WSL, you need to install fonts on the Windows side.

## Option 1: Direct Download (Easiest)

1. **Download Montserrat from Google Fonts:**
   - Go to: https://fonts.google.com/specimen/Montserrat
   - Click the "Download family" button (top right)
   - This downloads a ZIP file with all font weights

2. **Install on Windows:**
   - Extract the ZIP file
   - Open the `static` folder
   - Select all `.ttf` files (or just the weights you want):
     - `Montserrat-Regular.ttf` (normal text)
     - `Montserrat-Bold.ttf` (bold text)
     - `Montserrat-SemiBold.ttf` (semi-bold)
     - `Montserrat-Light.ttf` (light weight)
   - Right-click → "Install" or "Install for all users"

3. **Restart PowerPoint:**
   - Close PowerPoint completely
   - Reopen it
   - Montserrat will now appear in your font list!

## Option 2: Install via PowerShell (if you prefer command line)

Open PowerShell on Windows and run:

```powershell
# Download Montserrat
Invoke-WebRequest -Uri "https://fonts.google.com/download?family=Montserrat" -OutFile "$env:TEMP\Montserrat.zip"

# Extract
Expand-Archive -Path "$env:TEMP\Montserrat.zip" -DestinationPath "$env:TEMP\Montserrat" -Force

# Install fonts (requires admin - will prompt)
$fonts = Get-ChildItem "$env:TEMP\Montserrat\static\*.ttf"
foreach ($font in $fonts) {
    Copy-Item $font.FullName -Destination "C:\Windows\Fonts\"
    New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts" -Name $font.BaseName -Value $font.Name -PropertyType String -Force
}
```

## Sova Brand Colors (for reference)

When using Montserrat in PowerPoint, use these colors:

- **Light green:** `#eaffc4` (RGB: 234, 255, 196) - For dark backgrounds
- **Brown:** `#2d2828` (RGB: 45, 40, 40) - For light backgrounds  
- **Sage green:** `#b8d78f` (RGB: 184, 215, 143) - Accent color
- **Cream:** `#f5f5dc` (RGB: 245, 245, 220) - For dark backgrounds

## Alternative: Use Outfit Font (Website Brand Match)

Your Sova website uses **Outfit** font. For perfect brand consistency:

1. Download Outfit: https://fonts.google.com/specimen/Outfit
2. Install the same way as above
3. This matches your website exactly!

---

After installing, open `sova-instagram-templates.pptx` and you'll be able to select Montserrat (or Outfit) from the font dropdown!
