#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🚀 Installing Dotcom Versions Chrome Extension...\n');

// Create extension directory in user's home
const extensionDir = path.join(os.homedir(), 'dotcom-versions-chrome-extension');

try {
  // Create directory if it doesn't exist
  if (!fs.existsSync(extensionDir)) {
    fs.mkdirSync(extensionDir, { recursive: true });
    console.log(`📁 Created directory: ${extensionDir}`);
  }

  // Copy extension files
  const sourceDir = path.dirname(__dirname);
  const filesToCopy = [
    'manifest.json',
    'popup.html',
    'popup.js',
    'popup.css',
    'popup-using-api.js',
    'klarheit-xbold.68e4c2abe7a37ca4.woff2'
  ];

  const directoriesToCopy = ['images', '_locales'];

  // Copy files
  filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(extensionDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied: ${file}`);
    }
  });

  // Copy directories
  directoriesToCopy.forEach(dir => {
    const sourcePath = path.join(sourceDir, dir);
    const destPath = path.join(extensionDir, dir);
    
    if (fs.existsSync(sourcePath)) {
      copyDirectory(sourcePath, destPath);
      console.log(`✅ Copied directory: ${dir}`);
    }
  });

  console.log(`\n🎉 Extension files successfully installed to: ${extensionDir}\n`);
  
  // Print installation instructions
  console.log('📋 Next steps to install in Chrome:');
  console.log('1. Open Chrome and navigate to: chrome://extensions');
  console.log('2. Enable "Developer mode" in the top right corner');
  console.log('3. Click "Load unpacked" button');
  console.log(`4. Select the folder: ${extensionDir}`);
  console.log('5. Click "Select" to install the extension');
  console.log('6. Pin the extension by clicking the Extensions icon and pin symbol\n');
  
  console.log('🔧 The extension will show Dotcom versions for different environments.');

} catch (error) {
  console.error('❌ Error installing extension:', error.message);
  process.exit(1);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}