import { LanguageCode } from '../types';

export const TRANSLATIONS: Record<LanguageCode, {
  appName: string;
  appSubtitle: string;
  tabs: {
    wizard: string;
    dashboard: string;
    presets: string;
    brands: string;
    websites: string;
    compiledPrompt: string;
  };
  actions: {
    nextStep: string;
    previousStep: string;
    compilePrompt: string;
    copyPrompt: string;
    downloadMarkdown: string;
    downloadJson: string;
    saveProject: string;
    createNewProject: string;
    cloneProject: string;
    deleteProject: string;
    applyPreset: string;
    resetForm: string;
  };
  labels: {
    brandManagement: string;
    websiteProfiles: string;
    presets: string;
    seoScore: string;
    warnings: string;
    strengths: string;
    recommendations: string;
    step: string;
    of: string;
  };
}> = {
  fa: {
    appName: 'طراح پرامپت مستر سئو و تولید محتوا',
    appSubtitle: 'استودیوی مهندسی پرامپت محتوای سئومحور برای ChatGPT، Claude و Gemini',
    tabs: {
      wizard: 'ویزارد ۱۲ مرحله‌ای سئو',
      dashboard: 'پروژه‌ها و مقالات',
      presets: 'قالب‌های استراتژیک آماده',
      brands: 'مدیریت هویت برندها',
      websites: 'پروفایل وبسایت‌ها',
      compiledPrompt: 'پرامپت نهایی مستر'
    },
    actions: {
      nextStep: 'گام بعدی',
      previousStep: 'گام قبلی',
      compilePrompt: 'کامپایل و دریافت پرامپت مستر',
      copyPrompt: 'کپی پرامپت در کلیپ‌بورد',
      downloadMarkdown: 'دانلود فایل Markdown',
      downloadJson: 'دانلود فایل JSON',
      saveProject: 'ذخیره پروژه',
      createNewProject: 'ایجاد پروژه جدید',
      cloneProject: 'تکثیر پروژه',
      deleteProject: 'حذف پروژه',
      applyPreset: 'اعمال قالب استراتژی',
      resetForm: 'ریست مقادیر'
    },
    labels: {
      brandManagement: 'مدیریت برند و لحن سازمانی',
      websiteProfiles: 'پروفایل و ساختار وبسایت',
      presets: 'الگوهای استراتژیک سئو',
      seoScore: 'امتیاز کیفیت پرامپت سئو',
      warnings: 'هشدارها و کمبودها',
      strengths: 'نقاط قوت و بهینگی',
      recommendations: 'پیشنهادات هوشمند موتور الگوریتمی',
      step: 'گام',
      of: 'از'
    }
  },
  en: {
    appName: 'Master SEO Prompt Builder',
    appSubtitle: '12-Step SEO Content Intelligence & Prompt Engineering Studio for LLMs',
    tabs: {
      wizard: '12-Step SEO Wizard',
      dashboard: 'Projects & Articles',
      presets: 'Strategy Blueprints',
      brands: 'Brand Identities',
      websites: 'Website Profiles',
      compiledPrompt: 'Master Prompt'
    },
    actions: {
      nextStep: 'Next Step',
      previousStep: 'Previous Step',
      compilePrompt: 'Compile Master Prompt',
      copyPrompt: 'Copy Master Prompt',
      downloadMarkdown: 'Download Markdown',
      downloadJson: 'Download JSON',
      saveProject: 'Save Project',
      createNewProject: 'New SEO Project',
      cloneProject: 'Duplicate Project',
      deleteProject: 'Delete Project',
      applyPreset: 'Apply Blueprint',
      resetForm: 'Reset Fields'
    },
    labels: {
      brandManagement: 'Brand & Voice Management',
      websiteProfiles: 'Website Architecture Profiles',
      presets: 'Strategic Blueprints',
      seoScore: 'SEO Prompt Quality Index',
      warnings: 'Quality Alerts',
      strengths: 'Optimization Strengths',
      recommendations: 'Algorithmic Recommendations',
      step: 'Step',
      of: 'of'
    }
  },
  ar: {
    appName: 'منشئ برومبت سيو الاحترافي',
    appSubtitle: 'استوديو هندسة أوامر المحتوى المتوافق مع محركات البحث للذكاء الاصطناعي',
    tabs: {
      wizard: 'معالج السيو (12 خطوة)',
      dashboard: 'المشاريع والمقالات',
      presets: 'القوالب الاستراتيجية',
      brands: 'إدارة الهوية التجارية',
      websites: 'ملفات المواقع',
      compiledPrompt: 'البرومبت الرئيسي'
    },
    actions: {
      nextStep: 'الخطوة التالية',
      previousStep: 'الخطوة السابقة',
      compilePrompt: 'توليد البرومبت الشامل',
      copyPrompt: 'نسخ البرومبت',
      downloadMarkdown: 'تحميل Markdown',
      downloadJson: 'تحميل JSON',
      saveProject: 'حفظ المشروع',
      createNewProject: 'مشروع سيو جديد',
      cloneProject: 'تكرار المشروع',
      deleteProject: 'حذف المشروع',
      applyPreset: 'تطبيق القالب',
      resetForm: 'إعادة ضبط'
    },
    labels: {
      brandManagement: 'إدارة العلامات التجارية',
      websiteProfiles: 'هياكل المواقع',
      presets: 'النماذج الاستراتيجية',
      seoScore: 'مؤشر جودة البرومبت',
      warnings: 'التنبيهات',
      strengths: 'نقاط القوة',
      recommendations: 'التوصيات الذكية',
      step: 'خطوة',
      of: 'من'
    }
  },
  es: {
    appName: 'Generador de Prompts SEO Maestro',
    appSubtitle: 'Estudio de Ingeniería de Prompts de Contenido SEO de 12 Pasos',
    tabs: {
      wizard: 'Asistente SEO 12 Pasos',
      dashboard: 'Proyectos y Artículos',
      presets: 'Plantillas Estratégicas',
      brands: 'Gestión de Marcas',
      websites: 'Perfiles de Sitios Web',
      compiledPrompt: 'Prompt Maestro'
    },
    actions: {
      nextStep: 'Paso Siguiente',
      previousStep: 'Paso Anterior',
      compilePrompt: 'Compilar Prompt Maestro',
      copyPrompt: 'Copiar Prompt',
      downloadMarkdown: 'Descargar Markdown',
      downloadJson: 'Descargar JSON',
      saveProject: 'Guardar Proyecto',
      createNewProject: 'Nuevo Proyecto SEO',
      cloneProject: 'Duplicar Proyecto',
      deleteProject: 'Eliminar Proyecto',
      applyPreset: 'Aplicar Plantilla',
      resetForm: 'Restablecer'
    },
    labels: {
      brandManagement: 'Identidad de Marca',
      websiteProfiles: 'Arquitectura Web',
      presets: 'Plantillas SEO',
      seoScore: 'Índice de Calidad SEO',
      warnings: 'Alertas de Calidad',
      strengths: 'Fortalezas',
      recommendations: 'Recomendaciones Algorítmicas',
      step: 'Paso',
      of: 'de'
    }
  },
  ru: {
    appName: 'Конструктор Мастер-Промптов для SEO',
    appSubtitle: '12-шаговая студия промпт-инжиниринга SEO-контента для нейросетей',
    tabs: {
      wizard: '12-шаговый визард',
      dashboard: 'Проекты и статьи',
      presets: 'Стратегические шаблоны',
      brands: 'Бренды и тон',
      websites: 'Профили сайтов',
      compiledPrompt: 'Мастер-промпт'
    },
    actions: {
      nextStep: 'Следующий шаг',
      previousStep: 'Предыдущий шаг',
      compilePrompt: 'Сгенерировать Мастер-Промпт',
      copyPrompt: 'Копировать промпт',
      downloadMarkdown: 'Скачать Markdown',
      downloadJson: 'Скачать JSON',
      saveProject: 'Сохранить проект',
      createNewProject: 'Новый проект SEO',
      cloneProject: 'Дублировать',
      deleteProject: 'Удалить проект',
      applyPreset: 'Применить шаблон',
      resetForm: 'Сбросить'
    },
    labels: {
      brandManagement: 'Управление брендом',
      websiteProfiles: 'Профиль сайта',
      presets: 'Готовые стратегии',
      seoScore: 'Индекс качества SEO-промпта',
      warnings: 'Предупреждения',
      strengths: 'Преимущества',
      recommendations: 'Умные рекомендации',
      step: 'Шаг',
      of: 'из'
    }
  }
};
