const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const srcDir = path.join(__dirname, 'src');

const sections = ['About.tsx', 'Achievements.tsx', 'Contact.tsx', 'Experience.tsx', 'Hero.tsx', 'Projects.tsx', 'TechStack.tsx', 'Footer.tsx', 'Navbar.tsx', 'CertsAndGoals.tsx', 'CurrentlyBuilding.tsx'];
const threeD = ['NeuralNetwork3D.tsx', 'FloatingPhone.tsx'];
// ui is everything else

const getFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

// Create dirs
['sections', '3d', 'ui'].forEach(dir => {
  const p = path.join(componentsDir, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p);
});

// Map component names to their new relative path
const compMap = {};

const compFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') && fs.statSync(path.join(componentsDir, f)).isFile());

compFiles.forEach(file => {
  let targetDir = 'ui';
  if (sections.includes(file)) targetDir = 'sections';
  else if (threeD.includes(file)) targetDir = '3d';
  
  const compName = file.replace('.tsx', '');
  compMap[compName] = `@/components/${targetDir}/${compName}`;
  
  // move file
  fs.renameSync(path.join(componentsDir, file), path.join(componentsDir, targetDir, file));
});

// Update imports in all src files
const allFiles = getFiles(srcDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  Object.keys(compMap).forEach(comp => {
    const oldImport1 = new RegExp(`@/components/${comp}(['"])`, 'g');
    if (content.match(oldImport1)) {
      content = content.replace(oldImport1, `${compMap[comp]}$1`);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log('Reorganization complete.');
