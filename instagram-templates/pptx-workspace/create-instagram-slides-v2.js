const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();

// Set custom square layout (10 x 10 inches for 1080x1080px)
pptx.defineLayout({ name: 'INSTAGRAM_SQUARE', width: 10, height: 10 });
pptx.layout = 'INSTAGRAM_SQUARE';

pptx.author = 'Sova';
pptx.title = 'Instagram Post Templates';

// Template files with repositioned bird watermark
const templates = [
  {
    background: '/home/janek/sova-mvp/instagram-templates/blank_template_dark.png',
    name: 'Dark - Full Logo & Lines',
    birdPath: null
  },
  {
    background: '/home/janek/sova-mvp/instagram-templates/blank_template_light.png',
    name: 'Light - Brown Logo & Lines',
    birdPath: null
  },
  {
    background: null,
    bgColor: '2d2828',
    name: 'Dark - Large Bird Watermark',
    birdPath: '/home/janek/sova-mvp/sova-logo-icon-transparent.png' // light green bird
  },
  {
    background: null,
    bgColor: 'f5f5dc',
    name: 'Light - Large Bird Watermark (Brown)',
    birdPath: '/home/janek/sova-mvp/sova-logo-icon-brown-transparent.png' // brown bird
  }
];

// Create slides
templates.forEach((template, index) => {
  const slide = pptx.addSlide();

  // Add background
  if (template.background) {
    slide.addImage({
      path: template.background,
      x: 0,
      y: 0,
      w: 10,
      h: 10
    });
  } else if (template.bgColor) {
    slide.background = { color: template.bgColor };
  }

  // Add bird watermark for templates 3 and 4 (larger, positioned left-center)
  if (template.birdPath) {
    slide.addImage({
      path: template.birdPath,
      x: 1.5,  // Left side with margin
      y: 2.5,  // Vertically centered
      w: 3.0,  // Much larger
      h: 3.9,  // Maintain aspect ratio (bird is taller than wide)
      transparency: 75  // 25% opacity
    });
  }

  // Add notes
  slide.addNotes(`Template ${index + 1}: ${template.name}\n\nTo add text:\n1. Insert > Text Box\n2. Type your content\n3. Format using Sova brand colors:\n   - Light green: #eaffc4 (for dark backgrounds)\n   - Brown: #2d2828 (for light backgrounds)\n   - Sage: #b8d78f (accent)\n   - Cream: #f5f5dc\n4. Recommended font: Montserrat\n\nTo export as 1080x1080px image:\n1. File > Export > Change File Type > PNG\n2. Choose "Just This One" for current slide\n3. Image will be 1080x1080px, ready for Instagram!`);

  console.log(`Added slide ${index + 1}: ${template.name}`);
});

// Save
const outputPath = '/home/janek/sova-mvp/instagram-templates/sova-instagram-templates.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`\n✓ PowerPoint created: ${outputPath}`);
    console.log(`✓ Total slides: ${templates.length}`);
    console.log(`✓ Slide size: 10" x 10" (perfect 1080x1080px when exported)`);
    console.log(`\nSlide order:`);
    templates.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.name}`);
    });
    console.log(`\nBrand colors and export instructions in slide notes!`);
  })
  .catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
  });
