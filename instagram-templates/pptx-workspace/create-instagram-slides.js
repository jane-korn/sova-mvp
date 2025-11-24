const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();

// Set custom square layout (10 x 10 inches for 1080x1080px)
pptx.defineLayout({ name: 'INSTAGRAM_SQUARE', width: 10, height: 10 });
pptx.layout = 'INSTAGRAM_SQUARE';

pptx.author = 'Sova';
pptx.title = 'Instagram Post Templates';

// Template files
const templates = [
  {
    path: '/home/janek/sova-mvp/instagram-templates/blank_template_dark.png',
    name: 'Dark - Full Logo & Lines'
  },
  {
    path: '/home/janek/sova-mvp/instagram-templates/blank_template_light.png',
    name: 'Light - Brown Logo & Lines'
  },
  {
    path: '/home/janek/sova-mvp/instagram-templates/blank_template_dark_watermark.png',
    name: 'Dark - Bird Watermark'
  },
  {
    path: '/home/janek/sova-mvp/instagram-templates/blank_template_light_watermark.png',
    name: 'Light - Bird Watermark'
  }
];

// Create a slide for each template
templates.forEach((template, index) => {
  const slide = pptx.addSlide();

  // Add template image as full-slide background
  slide.addImage({
    path: template.path,
    x: 0,
    y: 0,
    w: 10,
    h: 10
  });

  // Add a note to identify the template
  slide.addNotes(`Template ${index + 1}: ${template.name}\n\nTo add text:\n1. Insert > Text Box\n2. Type your content\n3. Format using Sova brand colors:\n   - Light green: #eaffc4 (for dark backgrounds)\n   - Brown: #2d2828 (for light backgrounds)\n   - Sage: #b8d78f (accent)\n   - Cream: #f5f5dc\n4. Recommended fonts: Outfit, Arial, or Helvetica`);

  console.log(`Added slide ${index + 1}: ${template.name}`);
});

// Save the presentation
const outputPath = '/home/janek/sova-mvp/instagram-templates/sova-instagram-templates.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`\n✓ PowerPoint created: ${outputPath}`);
    console.log(`✓ Total slides: ${templates.length}`);
    console.log(`✓ Slide size: 10" x 10" (1080x1080 pixels when exported)`);
    console.log(`\nSlide order:`);
    templates.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.name}`);
    });
    console.log(`\nBrand colors saved in slide notes for easy reference!`);
  })
  .catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
  });
