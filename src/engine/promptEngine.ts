import { SEOProject, Brand, WebsiteProfile } from '../types';

export interface GeneratedPromptResult {
  fullPrompt: string;
  markdownPrompt: string;
  briefSummary: string;
  estimatedTokens: number;
  wordCount: number;
  activeSectionsCount: number;
  sections: { id: string; title: string; content: string }[];
}

export function buildSeoPrompt(
  project: SEOProject,
  brand?: Brand,
  website?: WebsiteProfile
): GeneratedPromptResult {
  const sections: { id: string; title: string; content: string }[] = [];

  const bName = brand?.name || 'برند اختصاصی';
  const bWeb = website?.url || brand?.website || 'https://example.com';
  const bDesc = brand?.businessDescription || '';
  const bVoice = brand?.brandVoice || 'Expert / Professional';
  const bPositioning = brand?.brandPositioning || '';
  const bUsp = brand?.usp || '';
  const bIndustry = brand?.industry || 'عمومی';

  // 1. ROLE
  sections.push({
    id: 'role',
    title: '1. ROLE & PERSONA',
    content: `You are an elite, world-class Senior SEO Strategist, Lead Content Architect, Subject Matter Authority, and Technical Copywriter.
Your mission is to produce a comprehensive, original, deeply authoritative, and search-optimized masterpiece that satisfies user intent 100%, outperforms all top-ranking competitors in SERPs, dominates Generative AI Search Engines (Google AI Overviews, Perplexity, ChatGPT Search), and strictly aligns with the brand's identity and conversion goals.`
  });

  // 2. CONTEXT & PROJECT OVERVIEW
  sections.push({
    id: 'context',
    title: '2. PROJECT CONTEXT & OVERVIEW',
    content: `• Content Title: "${project.articleTitle || project.topic || 'مقاله تخصصی'}"
• Main Topic: ${project.topic || project.articleTitle}
• Content Type: ${project.contentType}
• Content Goal: ${project.contentGoal}
• Primary Language: ${project.style.language === 'fa' ? 'Persian (فارسی روان و معیار با رعایت نیم‌فاصله‌ها)' : project.style.language}
• Target Market & Geography: ${project.targetLocationCustom || project.targetLocation}
• Expected Depth: ${project.length.wordCount === 'Dynamic' ? 'Dynamic (Must be dictated strictly by Search Intent and exhaustive Topic Coverage rather than an arbitrary word count)' : `${project.length.wordCount} words minimum`}`
  });

  // 3. BRAND INFORMATION & KNOWLEDGE BASE
  if (brand) {
    const prods = brand.productsServices.length > 0
      ? brand.productsServices.map(p => `  - ${p.name}: ${p.description} (${p.category || 'محصول'})`).join('\n')
      : '';
    const forbClaims = brand.forbiddenClaims.length > 0
      ? `  - Forbidden Claims (Strictly Prohibited): ${brand.forbiddenClaims.join(' | ')}`
      : '';
    const prefTerms = brand.preferredTerms.length > 0
      ? `  - Preferred Terminology: ${brand.preferredTerms.join(' | ')}`
      : '';
    const forbTerms = brand.forbiddenTerms.length > 0
      ? `  - Forbidden Words (DO NOT USE): ${brand.forbiddenTerms.join(' | ')}`
      : '';

    let brandSection = `• Brand Name: ${bName}
• Legal Entity: ${brand.legalName || bName}
• Official Domain: ${bWeb}
• Industry: ${bIndustry}
• Brand Positioning: ${bPositioning || 'پیشرو در ارائه خدمات و محصولات تخصصی'}
• Unique Selling Proposition (USP): ${bUsp || 'کیفیت برتر، اصالت و شفافیت در ارائه خدمات'}
• Brand Voice: ${bVoice}`;

    if (bDesc) brandSection += `\n• Business Profile: ${bDesc}`;
    if (prods) brandSection += `\n• Key Offerings / Catalog:\n${prods}`;
    if (forbClaims) brandSection += `\n${forbClaims}`;
    if (prefTerms) brandSection += `\n${prefTerms}`;
    if (forbTerms) brandSection += `\n${forbTerms}`;

    if (brand.knowledgeBase) {
      const kb = brand.knowledgeBase;
      if (kb.expertise) brandSection += `\n• Core Technical Expertise: ${kb.expertise}`;
      if (kb.certifications?.length) brandSection += `\n• Accreditations & Standards: ${kb.certifications.join(', ')}`;
      if (kb.editorialGuidelines) brandSection += `\n• Editorial Brand Guidelines: ${kb.editorialGuidelines}`;
    }

    sections.push({
      id: 'brand_info',
      title: '3. BRAND INFORMATION & EDITORIAL INTEGRITY',
      content: brandSection
    });
  }

  // 4. WEBSITE INFORMATION
  if (website) {
    sections.push({
      id: 'website_info',
      title: '4. WEBSITE PROFILE & ENVIRONMENT',
      content: `• Website Name: ${website.name}
• Domain: ${website.domain}
• CMS / Architecture Type: ${website.websiteType}
• Primary Language & Locale: ${website.language}
• Target Currency: ${website.currency}
• Main Category Hub: ${website.mainCategory}`
    });
  }

  // 5. CONTENT OBJECTIVE & AUDIENCE
  sections.push({
    id: 'objective_audience',
    title: '5. CONTENT OBJECTIVES & TARGET AUDIENCE',
    content: `• Primary Strategic Objective: ${project.contentGoal}
• Intended Audience Profile: ${project.targetAudience || 'مخاطبان عمومی و تخصصی علاقه‌مند به این حوزه'}
• Tone & Emotional Connection: Resonate deeply with the audience's pain points, provide actionable clarity, establish immediate trust, and avoid fluff or superficial padding.`
  });

  // 6. SEARCH INTENT & FUNNEL
  sections.push({
    id: 'search_intent',
    title: '6. SEARCH INTENT & FUNNEL MAPPING',
    content: `• Primary Search Intent: ${project.searchIntent.intent}
• Search Funnel Stage: ${project.searchIntent.funnelStage}
• Core User Problem / Query: "${project.searchIntent.userProblem || 'کاربر به دنبال پاسخ صریح، تحلیل جامع و تصمیم‌گیری آگاهانه است.'}"
• Intent Satisfaction Rule: The article must answer the core question in the first 150 words (Direct Answer / Inverted Pyramid method), followed by detailed technical breakdown and contextual analysis.`
  });

  // 7. KEYWORD UNIVERSE & STRATEGY
  const kw = project.keywords;
  let kwContent = `• Primary Focus Keyword (H1 & First 100 words): "${kw.primaryKeyword || project.primaryKeyword || project.topic}"`;

  if (kw.secondaryKeywords?.length > 0) {
    kwContent += `\n• Secondary Target Keywords:\n${kw.secondaryKeywords.map(k => `  - ${k}`).join('\n')}`;
  }
  if (kw.longTailKeywords?.length > 0) {
    kwContent += `\n• Long-Tail Search Queries:\n${kw.longTailKeywords.map(k => `  - ${k}`).join('\n')}`;
  }
  if (kw.questionKeywords?.length > 0) {
    kwContent += `\n• Question Keywords (Integrate into H2/H3 & FAQ):\n${kw.questionKeywords.map(k => `  - ${k}`).join('\n')}`;
  }
  if (kw.semanticKeywords?.length > 0) {
    kwContent += `\n• Semantic LSI Keywords:\n${kw.semanticKeywords.map(k => `  - ${k}`).join('\n')}`;
  }
  if (kw.nlpKeywords?.length > 0) {
    kwContent += `\n• Natural Language Processing (NLP) Salience Terms:\n${kw.nlpKeywords.map(k => `  - ${k}`).join('\n')}`;
  }
  if (kw.entityKeywords?.length > 0) {
    kwContent += `\n• Named Entities (Wikidata / Knowledge Graph Entities):\n${kw.entityKeywords.map(k => `  - ${k}`).join('\n')}`;
  }
  if (kw.commercialKeywords?.length > 0) {
    kwContent += `\n• Commercial / Buying Intent Modifiers:\n${kw.commercialKeywords.map(k => `  - ${k}`).join('\n')}`;
  }
  if (kw.localKeywords?.length > 0) {
    kwContent += `\n• Geotargeted & Local Keywords:\n${kw.localKeywords.map(k => `  - ${k}`).join('\n')}`;
  }

  sections.push({
    id: 'keyword_strategy',
    title: '7. KEYWORD UNIVERSE & NLP STRATEGY',
    content: kwContent
  });

  // 8. TOPICAL AUTHORITY & CLUSTER
  if (project.topicalAuthority.pillarTopic || project.topicalAuthority.cluster || project.topicalAuthority.supportingTopics.length > 0) {
    const ta = project.topicalAuthority;
    let taContent = `• Pillar Hub Topic: ${ta.pillarTopic || 'موضوع محوری وبسایت'}
• Topic Cluster Node: ${ta.cluster || 'خوشه محتوایی'}
• Supporting Sub-Topics to Connect:
${ta.supportingTopics.map(t => `  - ${t}`).join('\n')}`;

    if (ta.relatedExistingArticles?.length > 0) {
      taContent += `\n• Sibling Articles in Cluster:\n${ta.relatedExistingArticles.map(a => `  - ${a}`).join('\n')}`;
    }

    sections.push({
      id: 'topical_authority',
      title: '8. TOPICAL AUTHORITY & CLUSTER ARCHITECTURE',
      content: taContent
    });
  }

  // 9. SERP INTELLIGENCE & FEATURES
  if (project.serp.mode !== 'Disabled' || project.serp.serpFeatures.length > 0) {
    let serpContent = `• SERP Intelligence Mode: ${project.serp.mode}`;
    if (project.serp.serpFeatures.length > 0) {
      serpContent += `\n• Target SERP Layout Features to Capture:\n${project.serp.serpFeatures.map(f => `  [✓] ${f}`).join('\n')}`;
    }
    if (project.serp.serpDataRaw) {
      serpContent += `\n• Live Competitor Benchmark Data (SERP Snapshot):\n${project.serp.serpDataRaw}`;
    }
    if (project.serp.serpItems.length > 0) {
      serpContent += `\n• Ranked Competitor Pages:\n${project.serp.serpItems.map(item => `  - Pos #${item.id}: "${item.title}" (${item.url}) | Word count: ~${item.wordCount} | Types: ${item.contentType}`).join('\n')}`;
    }

    sections.push({
      id: 'serp_intelligence',
      title: '9. SERP INTELLIGENCE & SERP FEATURES CAPTURE',
      content: serpContent
    });
  }

  // 10. COMPETITOR ANALYSIS & BENCHMARKS
  if (project.competitors.length > 0) {
    const compContent = project.competitors.map(c => `• Competitor: ${c.title || c.url}
  - URL: ${c.url}
  - Key Strengths: ${c.strengths || 'رتبه‌بندی بالا در کلمات کلیدی اصلی'}
  - Fatal Weaknesses / Content Gaps: ${c.weaknesses || 'عدم ارائه جداول مقایسه‌ای و پاسخ‌های صریح'}
  - Tactical Strategy: Out-structure their headings, provide fresher data points, add visual comparison tables, and eliminate their fluff.`).join('\n\n');

    sections.push({
      id: 'competitor_analysis',
      title: '10. COMPETITOR BENCHMARKING & OUTRANKING STRATEGY',
      content: compContent
    });
  }

  // 11. CONTENT GAP & INFORMATION GAIN (Google Patents)
  const cg = project.contentGap;
  if (cg.topicsCovered || cg.topicsMissed || cg.informationGainOpportunities || cg.uniqueValue) {
    sections.push({
      id: 'content_gap',
      title: '11. CONTENT GAP & INFORMATION GAIN (PATENT-COMPLIANT)',
      content: `• Standard Topics Competitors Cover: ${cg.topicsCovered || 'مفاهیم پایه و تعاریف متداول'}
• Critical Topics Competitors Missed: ${cg.topicsMissed || 'بررسی چالش‌های عملی، خطاهای رایج خریداران و محاسبات مهندسی'}
• Information Gain Vectors (New Value Added): ${cg.informationGainOpportunities || 'ارائه فرمول‌های تجربی اختصاصی، بررسی استانداردهای روز و چک‌لیست اجرایی'}
• Unique Brand Perspective: ${cg.uniqueValue || bUsp || 'دیدگاه کارشناسی مبتنی بر داده‌های واقعی بازار'}`
    });
  }

  // 12. KEYWORD CANNIBALIZATION AVOIDANCE
  if (project.cannibalization.analysisMode !== 'Disabled' && project.cannibalization.items.length > 0) {
    const canItems = project.cannibalization.items.map(item =>
      `• URL: ${item.existingUrl} | Focus: "${item.keyword}" (Rank: ${item.position || 'N/A'})
  - Intent: ${item.intent} | Similarity: ${item.similarity}
  - Action Directive: [${item.recommendedAction}] -> Strictly avoid identical H1/H2 angles. Differentiate this new article by targeting distinct semantic angles and complementary user problems.`
    ).join('\n');

    sections.push({
      id: 'cannibalization',
      title: '12. CANNIBALIZATION SAFEGUARDS',
      content: canItems
    });
  }

  // 13. CONTENT FORMAT & STRUCTURAL BLUEPRINT
  const struct = project.structure;
  let structContent = `• Architectural Format: ${struct.contentFormat}
• Heading Generation Directive: ${struct.headingStrategy === 'AI Generate' ? 'Synthesize a logically hierarchical H2/H3 structure with clear question-based and benefit-driven subheadings containing primary and secondary keywords naturally.' : 'Follow the exact heading framework specified.'}
• Include FAQ Module: ${struct.useFaq ? `Yes (${struct.faqCount} High-Intent Questions structured for Rich Snippets)` : 'No'}
• Include Definitive Conclusion & Actionable Summary: ${struct.includeConclusion ? 'Yes' : 'No'}`;

  if (struct.customHeadings) {
    structContent += `\n• Mandatory Heading Blueprint:\n${struct.customHeadings}`;
  }

  sections.push({
    id: 'content_structure',
    title: '13. CONTENT FORMAT & HEADING ARCHITECTURE',
    content: structContent
  });

  // 14. STYLE, TONE & READABILITY
  const st = project.style;
  sections.push({
    id: 'style_tone',
    title: '14. EDITORIAL STYLE, TONE & READABILITY',
    content: `• Writing Tone: ${st.tone}
• Perspective / Point of View: ${st.writingPerspective}
• Reading Level: ${st.readingLevel} (Ensure clarity, zero run-on sentences, and scannable paragraphs max 3-4 lines)
• Keyword Bolding: ${st.boldKeywords ? 'Selectively bold high-salience terms, entities, and primary keywords for skimmers (do NOT overdo)' : 'Do not bold keywords'}
• Structural Tables: ${st.useTables ? 'Mandatory - include clean comparative and technical Markdown tables' : 'Do not use tables'}
• Formatting Lists: ${st.useLists === 'استفاده کن' ? 'Use structured bullet points and numbered step-by-step lists generously for readability' : st.useLists}`
  });

  // 15. VISUAL ASSETS & DESIGN DIRECTIVES
  const vis = project.visualDesign;
  sections.push({
    id: 'visual_design',
    title: '15. VISUAL ASSET PLAN & UX EMBEDDING',
    content: `• Layout Visual Density: ${vis.designType}
• Recommended Visual Asset Embeds:
${vis.visualElements.map(e => `  - [ ] ${e}: Provide exact descriptive placement notes, image alt text recommendations containing keywords, and data table layouts`).join('\n')}`
  });

  // 16. E-E-A-T (EXPERIENCE, EXPERTISE, AUTHORITATIVENESS, TRUST)
  const ee = project.eeat;
  if (ee.experienceAvailable || ee.author || ee.reviewer || ee.certifications?.length > 0 || ee.sources?.length > 0) {
    let eeatContent = `• Hands-On Experience Demonstration: ${ee.experienceAvailable ? ee.experienceDetails || 'تیم تخصصی با تجربه عملی مستقیم در خط تولید و بازار' : 'Include industry-tested insights and first-party observations'}`;
    if (ee.author) eeatContent += `\n• Author Identity & Credential: "${ee.author}" - ${ee.authorBio || 'کارشناس ارشد و متخصص این حوزه'}`;
    if (ee.reviewer) eeatContent += `\n• Technical Reviewer / Peer Validator: "${ee.reviewer}" - ${ee.reviewerBio || 'بازبین ارشد علمی و مهندسی'}`;
    if (ee.certifications?.length > 0) eeatContent += `\n• Verified Standards & Certifications: ${ee.certifications.join(', ')}`;
    if (ee.sources?.length > 0) eeatContent += `\n• Authoritative Primary Sources: ${ee.sources.join(', ')}`;

    sections.push({
      id: 'eeat',
      title: '16. GOOGLE E-E-A-T PROTOCOL & TRUST SIGNALS',
      content: eeatContent
    });
  }

  // 17. INTERNAL LINKING ARCHITECTURE
  const il = project.internalLinking;
  if (il.mode !== 'Disabled') {
    let ilContent = `• Internal Linking Engine Mode: ${il.mode}
• Target Anchor Text Strategy: ${il.anchorStrategy} (Diversify naturally across exact, partial, and contextual phrases - avoid robotic repetition)`;

    if (il.urls.length > 0) {
      ilContent += `\n• Planned Internal Target URLs:\n${il.urls.map(u => `  - Target URL: ${u.url} | Page Title: "${u.title}" | Topic: ${u.topic} | Target Anchor Keywords: [${u.keywords}]`).join('\n')}`;
    }

    sections.push({
      id: 'internal_linking',
      title: '17. INTERNAL LINKING & TOPIC GRAPH INTEGRATION',
      content: ilContent
    });
  }

  // 18. EXTERNAL CITATIONS & FACT CHECKING
  const el = project.externalLinks;
  if (el.mode !== 'Disabled') {
    let elContent = `• Citation Policy: ${el.mode}
• Preferred Source Quality Hierarchy: ${el.sourceQuality} (Official standards, government data, academic publications, reputable industry bodies)`;
    if (el.sourcesList.length > 0) {
      elContent += `\n• Whitelisted External Authorities:\n${el.sourcesList.map(s => `  - ${s}`).join('\n')}`;
    }

    sections.push({
      id: 'external_links',
      title: '18. EXTERNAL CITATIONS & CITATION INTEGRITY',
      content: elContent
    });
  }

  // 19. SCHEMA MARKUP SPECIFICATION
  const sc = project.schema;
  sections.push({
    id: 'schema_markup',
    title: '19. SCHEMA.ORG STRUCTURED DATA SPECIFICATIONS',
    content: `• Strategy: ${sc.strategy}
• Schemas to Implement (Generate JSON-LD valid blocks):
${sc.selectedSchemas.map(s => `  - @type: "${s}"`).join('\n')}
• Schema Rule: All FAQ items, Product specifications, and Author credentials in the text must have 100% exact entity matching inside the generated Schema JSON-LD.`
  });

  // 20. AI SEARCH & GENERATIVE ENGINE OPTIMIZATION (GEO)
  const ai = project.aiSearch;
  if (ai.mode !== 'Disabled') {
    sections.push({
      id: 'ai_search',
      title: '20. GENERATIVE ENGINE OPTIMIZATION (GEO & AI SEARCH)',
      content: `• Target AI Engines: ${ai.targets.join(', ')}
• Optimization Directives:
  - Direct Answer Optimization: ${ai.directAnswerOptimization ? 'Enabled (Every H2 section must open with a crisp 40-60 word definition/summary paragraph suitable for zero-shot LLM synthesis)' : 'Standard'}
  - Entity Salience Optimization: ${ai.entityOptimization ? 'Enabled (Maintain high named-entity co-occurrence with related domain concepts)' : 'Standard'}
  - Citation-Friendly Statements: ${ai.citationFriendlyStatements ? 'Enabled (Formulate distinct, quotable, data-backed claims that AI models will cite as the canonical reference source)' : 'Standard'}`
    });
  }

  // 21. GOOGLE DISCOVER VIRALITY
  if (project.discover.enabled) {
    sections.push({
      id: 'discover',
      title: '21. GOOGLE DISCOVER OPTIMIZATION',
      content: `• High-CTR Visual Hooks: Include instructions for a minimum 1200px wide, high-contrast hero image without text clutter.
• Emotional & Curiosity Hooks: Open with high-engagement problem-solving angles while strictly avoiding deceptive clickbait.
• Trend Alignment: ${project.discover.trendTopicAlignment || 'اتصال موضوع به نیازهای داغ و پرتکرار روز کاربران'}`
    });
  }

  // 22. CTR OPTIMIZATION & METADATA
  const ctr = project.ctr;
  sections.push({
    id: 'ctr_metadata',
    title: '22. CTR OPTIMIZATION & METADATA ARCHITECTURE',
    content: `• Alternative Title Variations: Generate ${ctr.generateAlternativeTitlesCount} compelling H1 / Meta Title options adhering to styles: [${ctr.titleStyles.join(', ')}].
• Meta Title Rule: ${ctr.metaTitleMode === 'Generate' ? 'Create a high-impact Meta Title (50-60 chars) with Primary Keyword in the first 3 words + Brand suffix.' : `Use manual: "${ctr.manualMetaTitle}"`}
• Meta Description Rule: ${ctr.metaDescriptionMode === 'Generate' ? 'Create a high-converting Meta Description (145-155 chars) with Primary Keyword, secondary benefit, and direct CTA.' : `Use manual: "${ctr.manualMetaDescription}"`}
• URL Slug: ${ctr.urlSlugMode === 'Generate' ? 'Generate an SEO-friendly, clean English URL slug.' : `Use manual: "${ctr.manualUrlSlug}"`}`
  });

  // 23. CALL-TO-ACTION (CTA) & CONVERSION PATH
  const cta = project.cta;
  if (cta.ctaType !== 'None') {
    sections.push({
      id: 'cta_conversion',
      title: '23. CONVERSION STRATEGY & CALL TO ACTION (CTA)',
      content: `• CTA Level: ${cta.ctaType}
• Destination Link: ${cta.ctaUrl || bWeb}
• CTA Message Directive: "${cta.ctaMessage || 'برای دریافت استعلام قیمت، مشاوره رایگان یا ثبت سفارش با کارشناسان ما در تماس باشید.'}"
• Placement Rule: Integrate naturally into the mid-article problem-solving juncture and provide a prominent, high-trust closing conversion box.`
    });
  }

  // 24. LOCAL SEO & GEOTARGETING
  if (project.localSeo.enabled) {
    const loc = project.localSeo;
    sections.push({
      id: 'local_seo',
      title: '24. LOCAL SEO & GEOGRAPHICAL ENTITY MAPPING',
      content: `• Target Location: ${loc.city}, ${loc.province}, ${loc.country}
• Neighborhood & Service Radius: ${loc.neighborhood} | ${loc.serviceArea}
• Official NAP (Name, Address, Phone):
  - Business: ${loc.businessName || bName}
  - Address: ${loc.address}
  - Phone: ${loc.phone}
• Geotargeting Mandate: Naturally weave geographic entities, regional regulations, local landmarks, and proximity signals into the body copy.`
    });
  }

  // 25. CONTENT FRESHNESS & LIFECYCLE
  sections.push({
    id: 'freshness',
    title: '25. CONTENT FRESHNESS & EVERGREEN INTEGRITY',
    content: `• Lifecycle Pattern: ${project.freshness.freshness}
• Scheduled Maintenance Cadence: ${project.freshness.updateFrequency}
• Timelessness Rule: Frame timeless fundamentals solidly while clearly dating dynamic industry statistics with current timestamps.`
  });

  // 26. ARTICLE GENERATION MANDATES & QA RULES
  let rulesContent = `1. NO AI CLICHÉS OR FILLER: Strictly ban empty buzzwords, repetitive transitions (e.g. "در دنیای امروز", "همانطور که می‌دانید", "شایان ذکر است"), and superficial summaries.
2. SUBSTANCE OVER FLUFF: Every paragraph must deliver concrete, actionable information, verifiable facts, or logical deductions.
3. FORMATTING PRECISION: Maintain strict Markdown hierarchy (# for title, ## for main sections, ### for subsections).
4. BRAND VOICE FIDELITY: Maintain the ${bVoice} tone consistently throughout every single section.
5. CONFLICT-FREE COMPLIANCE: Do not make any unauthorized medical, legal, or guaranteed financial claims.`;

  if (project.customPromptRules) {
    rulesContent += `\n6. CUSTOM CLIENT RULES:\n${project.customPromptRules}`;
  }

  sections.push({
    id: 'generation_rules',
    title: '26. MASTER EXECUTION RULES & MANDATES',
    content: rulesContent
  });

  // 27. PRE-PUBLICATION QA CHECKLIST
  if (project.output.includeQaChecklist) {
    sections.push({
      id: 'qa_checklist',
      title: '27. PRE-PUBLICATION QUALITY AUDIT CHECKLIST',
      content: `Verify before finalizing:
[ ] Primary Keyword appears naturally in H1, first 100 words, one H2, and URL slug
[ ] Search Intent is 100% satisfied without sending the user back to SERPs
[ ] Direct Answer format is implemented under key question headings for AI Search
[ ] All tables and bulleted lists are properly rendered with clean Markdown
[ ] E-E-A-T credentials and author bios are included
[ ] Schema.org JSON-LD code blocks are syntactically valid
[ ] Forbidden words/claims of the brand are completely absent
[ ] Internal links and CTAs are embedded naturally`
    });
  }

  // 28. FINAL OUTPUT FORMAT SPECIFICATION
  let finalOutputSpec = `Deliver the completed output in the following structured layout:

1. [SEO BRIEF & METADATA SUMMARY]
   • Title / H1
   • Alternative Titles (${project.ctr.generateAlternativeTitlesCount} variations)
   • Meta Title & Meta Description
   • Clean URL Slug
   • Target Word Count & Target Search Intent

2. [FULL ARTICLE BODY]
   • Complete, unabridged, publish-ready text in pure Markdown format with all H2, H3, Tables, Lists, and CTAs embedded.

3. [SCHEMA.ORG JSON-LD]
   • Ready-to-paste JSON-LD script blocks for all selected Schema types.`;

  if (project.output.includeKeywordMap) {
    finalOutputSpec += `\n\n4. [KEYWORD PLACEMENT MAP & DENSITY AUDIT]`;
  }
  if (project.output.includeInternalLinkingPlan) {
    finalOutputSpec += `\n\n5. [INTERNAL LINKING MATRIX & ANCHOR REPORT]`;
  }
  if (project.output.includeImagePlan) {
    finalOutputSpec += `\n\n6. [IMAGE & VISUAL ASSET PRODUCTION BRIEF]`;
  }

  sections.push({
    id: 'final_output',
    title: '28. FINAL OUTPUT FORMAT SPECIFICATION',
    content: finalOutputSpec
  });

  // Assemble full prompt
  const fullPromptText = sections.map(s => `### ${s.title}\n\n${s.content}`).join('\n\n---\n\n');

  // Estimate tokens and word counts
  const totalWords = fullPromptText.trim().split(/\s+/).length;
  const estimatedTokens = Math.round(totalWords * 1.35);

  const briefSummary = `Master SEO Prompt compiled for "${project.articleTitle || project.topic}" targeting [${project.keywords.primaryKeyword || project.topic}] with ${sections.length} active strategy modules.`;

  return {
    fullPrompt: fullPromptText,
    markdownPrompt: fullPromptText,
    briefSummary,
    estimatedTokens,
    wordCount: totalWords,
    activeSectionsCount: sections.length,
    sections
  };
}
