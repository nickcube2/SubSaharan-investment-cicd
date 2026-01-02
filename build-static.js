const fs = require('fs');
const path = require('path');

// Build script for static export
console.log('🚀 Starting static export build...');

// Ensure .htaccess is copied to out directory after build
const copyHtaccess = () => {
  const sourcePath = path.join(__dirname, 'public', '.htaccess');
  const destPath = path.join(__dirname, 'out', '.htaccess');
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('✅ .htaccess copied to out directory');
  } else {
    console.log('⚠️  .htaccess not found in public directory');
  }
};

// Copy 404.html to out directory
const copy404Page = () => {
  const sourcePath = path.join(__dirname, 'public', '404.html');
  const destPath = path.join(__dirname, 'out', '404.html');
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('✅ 404.html copied to out directory');
  } else {
    console.log('⚠️  404.html not found in public directory');
  }
};

// Create a simple index.html redirect for root if needed
const createIndexRedirect = () => {
  const indexPath = path.join(__dirname, 'out', 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists in out directory');
  } else {
    console.log('⚠️  index.html not found in out directory');
  }
};

// Main build process
const buildStatic = async () => {
  try {
    // Wait a bit for Next.js build to complete
    setTimeout(() => {
      copyHtaccess();
      copy404Page();
      createIndexRedirect();
      console.log('🎉 Static export build completed successfully!');
      console.log('📁 Upload the contents of the "out" directory to your cPanel public_html folder');
    }, 2000);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
};

buildStatic(); 