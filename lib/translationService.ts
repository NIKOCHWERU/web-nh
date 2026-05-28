/**
 * Translation Service using free Google Translate API
 * Translates plain text and HTML content from Indonesian to English dynamically.
 */

// Cache to store translated strings to avoid duplicate API calls
const translationCache: Record<string, string> = {};

/**
 * Translates plain text using the public Google Translate API
 */
export async function translateText(
  text: string,
  targetLang: string = 'en',
  sourceLang: string = 'id'
): Promise<string> {
  if (!text || text.trim() === '') return '';
  
  const cacheKey = `${sourceLang}-${targetLang}-${text}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Translation request failed');
    
    const data = await response.json();
    if (data && data[0]) {
      const translatedText = data[0].map((item: any) => item[0] || '').join('');
      translationCache[cacheKey] = translatedText;
      return translatedText;
    }
    return text;
  } catch (error) {
    console.error('Translation error for text:', text, error);
    return text; // Fallback to original text on failure
  }
}

/**
 * Translates HTML content without breaking the HTML tags and attributes
 */
export async function translateHTML(
  html: string,
  targetLang: string = 'en',
  sourceLang: string = 'id'
): Promise<string> {
  if (!html || html.trim() === '') return '';
  if (typeof window === 'undefined') return html; // Return original on server-side

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find all text nodes recursively
    const textNodes: Node[] = [];
    const walk = (node: Node) => {
      // Node.TEXT_NODE is 3
      if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim() !== '') {
        textNodes.push(node);
      } else {
        const children = Array.from(node.childNodes);
        for (const child of children) {
          walk(child);
        }
      }
    };
    
    walk(doc.body);
    
    // Translate text nodes in parallel
    await Promise.all(
      textNodes.map(async (node) => {
        if (node.nodeValue) {
          const originalText = node.nodeValue;
          // Preserve leading/trailing whitespace
          const leadingWhitespace = originalText.match(/^\s*/)?.[0] || '';
          const trailingWhitespace = originalText.match(/\s*$/)?.[0] || '';
          const cleanText = originalText.trim();
          
          if (cleanText) {
            const translated = await translateText(cleanText, targetLang, sourceLang);
            node.nodeValue = `${leadingWhitespace}${translated}${trailingWhitespace}`;
          }
        }
      })
    );
    
    return doc.body.innerHTML;
  } catch (error) {
    console.error('Translation error for HTML content:', error);
    return html; // Fallback to original HTML
  }
}

/**
 * Translates an article object including title, category name, and content
 */
export async function translateArticle(
  article: any,
  targetLang: string = 'en',
  sourceLang: string = 'id'
): Promise<any> {
  if (!article) return article;

  try {
    const [translatedTitle, translatedCategory, translatedContent] = await Promise.all([
      translateText(article.title || '', targetLang, sourceLang),
      article.category?.name 
        ? translateText(article.category.name, targetLang, sourceLang)
        : Promise.resolve(''),
      translateHTML(article.content || '', targetLang, sourceLang)
    ]);

    const translatedSupportingImages = article.supporting_images
      ? await Promise.all(
          article.supporting_images.map(async (item: any) => {
            if (typeof item === 'string') return item;
            if (item && item.caption) {
              const translatedCaption = await translateText(item.caption, targetLang, sourceLang);
              return { ...item, caption: translatedCaption };
            }
            return item;
          })
        )
      : undefined;

    return {
      ...article,
      title: translatedTitle,
      category: article.category 
        ? { ...article.category, name: translatedCategory } 
        : article.category,
      content: translatedContent,
      supporting_images: translatedSupportingImages || article.supporting_images
    };
  } catch (error) {
    console.error('Error translating article:', article.id, error);
    return article;
  }
}
