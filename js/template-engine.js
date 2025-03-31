// Simple template engine for handling template inheritance
class TemplateEngine {
  constructor() {
    this.templates = new Map();
  }

  // Load a template from a file
  async loadTemplate(name, path) {
    try {
      const response = await fetch(path);
      const template = await response.text();
      this.templates.set(name, template);
      return template;
    } catch (error) {
      console.error(`Error loading template ${name}:`, error);
      return null;
    }
  }

  // Get a template by name
  getTemplate(name) {
    return this.templates.get(name);
  }

  // Parse template inheritance
  async parseTemplate(content) {
    // Check for extends tag
    const extendsMatch = content.match(/{%\s*extends\s+"([^"]+)"\s*%}/);
    if (!extendsMatch) {
      return content;
    }

    const parentPath = extendsMatch[1];
    const parentName = parentPath.split('/').pop();

    // Load parent template if not already loaded
    if (!this.templates.has(parentName)) {
      await this.loadTemplate(parentName, parentPath);
    }

    const parentTemplate = this.getTemplate(parentName);
    if (!parentTemplate) {
      console.error(`Parent template ${parentName} not found`);
      return content;
    }

    // Extract blocks from child template
    const blocks = {};
    const blockRegex = /{%\s*block\s+(\w+)\s*%}([\s\S]*?){%\s*endblock\s*%}/g;
    let match;
    while ((match = blockRegex.exec(content)) !== null) {
      blocks[match[1]] = match[2].trim();
    }

    // Replace blocks in parent template
    let result = parentTemplate;
    for (const [blockName, blockContent] of Object.entries(blocks)) {
      const blockRegex = new RegExp(
        `{%\\s*block\\s+${blockName}\\s*%}[\\s\\S]*?{%\\s*endblock\\s*%}`,
        'g'
      );
      result = result.replace(blockRegex, blockContent);
    }

    return result;
  }

  // Initialize template engine
  async init() {
    // Load base template
    await this.loadTemplate('base.html', '/templates/base.html');
    
    // Process all pages that use template inheritance
    document.addEventListener('DOMContentLoaded', async () => {
      const pageContent = document.documentElement.outerHTML;
      if (pageContent.includes('{% extends')) {
        const processedContent = await this.parseTemplate(pageContent);
        document.documentElement.innerHTML = processedContent;
      }
    });
  }
}

// Create and initialize template engine
const templateEngine = new TemplateEngine();
templateEngine.init(); 