// The Arabic text of the site. It says the same facts as en.ts.
// Product names, technology names, and domains stay in English.

import type { Dictionary } from './en';

/**
 * A count with its noun. Arabic has a form for one, a form for two, a plural for
 * 3 to 10, and the singular again from 11.
 */
function counted(count: number, forms: { one: string; two: string; few: string; many: string }): string {
	if (count === 1) return forms.one;
	if (count === 2) return forms.two;
	const rest = count % 100;
	return `${count} ${rest >= 3 && rest <= 10 ? forms.few : forms.many}`;
}

export const ar: Dictionary = {
	site: {
		name: 'أحمد الكاف',
		role: 'مهندس برمجيات Full-stack',
		location: 'جدة، السعودية',
		description:
			'أنا أحمد الكاف، مهندس برمجيات Full-stack بخبرة 4 سنوات. أبني منتجات ويب بـ TypeScript و React و Next.js و Node.js و PostgreSQL. هنا مشاريعي ودراسات الحالة وسيرتي الذاتية.'
	},
	nav: {
		main: 'القائمة الرئيسية',
		projects: 'المشاريع',
		skills: 'المهارات',
		resume: 'السيرة الذاتية',
		contact: 'تواصل معي'
	},
	common: {
		skip: 'انتقل إلى المحتوى',
		toDark: 'التبديل إلى الوضع الداكن',
		toLight: 'التبديل إلى الوضع الفاتح',
		newTab: ' (يفتح في تبويب جديد)',
		email: 'الإيميل',
		emailMe: 'راسلني',
		resume: 'السيرة الذاتية',
		photoAlt: 'صورة أحمد الكاف',
		home: 'الرئيسية',
		projects: 'المشاريع',
		allProjects: 'كل المشاريع'
	},
	home: {
		lead: ['أبني منتجات ويب Full-stack بـ ', 'TypeScript و React و Next.js و Node.js و PostgreSQL', '، وأطلقها على الإنتاج.'],
		sub: 'خبرة 4 سنوات. هذا الموقع يعرض الجزء العلني من شغلي: من منصة SaaS متعددة المستأجرين بنيتها ضمن فريق، إلى نظام نقاط بيع سحابي وأدوات ويب أشغّلها بنفسي. باقي شغلي المهني في مستودعات خاصة وغير معروض هنا.',
		glanceLabel: 'نظرة سريعة',
		glance: [
			{ label: 'الخبرة', value: '4 سنوات، Full-stack' },
			{ label: 'التقنيات الأساسية', value: 'TypeScript · React · Next.js · Node.js · PostgreSQL' },
			{ label: 'منتجات علنية', value: 'Etamyd · CornerTill · PDF Anvil · SetupForge · QR Anvil' },
			{ label: 'أعمال أخرى', value: 'أنظمة داخلية في مستودعات خاصة، غير معروضة هنا' },
			{ label: 'التعليم', value: 'بكالوريوس نظم معلومات حاسوبية (CIS)، المعدل 4.12 من 5' }
		],
		work: {
			eyebrow: 'أعمال مختارة',
			title: 'منتجات شغّالة على الإنتاج',
			text: 'كل منتج باختصار: المشكلة، وماذا بنيت، والنتيجة. والتفاصيل في دراسة الحالة.'
		},
		more: {
			eyebrow: 'مشاريع أخرى',
			title: 'أعمال سابقة',
			all: (count) => `كل المشاريع (${count}) حسب التقنية`
		},
		skills: { eyebrow: 'المهارات', title: 'التقنيات التي أشتغل بها' }
	},
	contact: {
		eyebrow: 'تواصل',
		title: 'تبحث عن مهندس لوظيفة React أو Next.js أو Full-stack؟',
		text: 'راسلني على الإيميل. سيرتي الذاتية و GitHub و LinkedIn على بُعد ضغطة واحدة.',
		copy: 'نسخ الإيميل',
		copied: 'تم نسخ عنوان الإيميل',
		copyFailed: 'تعذّر النسخ. العنوان هو '
	},
	footer: {
		rights: 'جميع الحقوق محفوظة.',
		brand: ['منتجاتي الشخصية منشورة تحت اسم ', '.']
	},
	projects: {
		title: 'المشاريع',
		description: 'كل مشاريع أحمد الكاف: منتجات شغّالة، وعمل ضمن فريق، ومشاريع أكاديمية. صفِّها حسب التقنية.',
		eyebrow: 'المشاريع',
		heading: 'كل ما بنيته',
		text: 'المنتجات العلنية الشغّالة أولًا، ثم الأعمال السابقة ومشاريع الدراسة. الشغل الموجود في مستودعات خاصة غير مدرج في هذه القائمة. اختر تقنية لترى المشاريع التي تستخدمها فقط.',
		filterLabel: 'تصفية المشاريع حسب التقنية',
		all: 'الكل',
		count: (total) => `${counted(total, { one: 'مشروع واحد', two: 'مشروعان', few: 'مشاريع', many: 'مشروعًا' })}.`,
		using: (shown, total, stack) => `المشاريع التي تستخدم ${stack}: ${shown} من ${total}.`
	},
	project: {
		status: {
			live: 'شغّال',
			'live demo': 'ديمو شغّال',
			'public repo': 'مستودع عام',
			'open source': 'مفتوح المصدر',
			'not deployed': 'غير منشور'
		},
		stack: 'التقنيات',
		live: 'زيارة الموقع',
		liveOf: (name) => `: ${name} (يفتح في تبويب جديد)`,
		source: 'الكود المصدري',
		sourceOf: (name) => `: ${name} على GitHub (يفتح في تبويب جديد)`,
		caseStudy: 'دراسة الحالة',
		caseStudyOf: (name) => `: ${name}`,
		inShort: 'باختصار',
		problem: 'المشكلة',
		built: 'ماذا بنيت',
		result: 'النتيجة'
	},
	post: {
		minRead: (minutes) =>
			`قراءة في ${counted(minutes, { one: 'دقيقة واحدة', two: 'دقيقتين', few: 'دقائق', many: 'دقيقة' })}`,
		more: 'مشاريع أخرى',
		newer: 'الأحدث',
		older: 'الأقدم',
		video: 'مشغّل فيديو YouTube'
	},
	lightbox: {
		enlarge: 'تكبير الصورة',
		viewer: 'عارض الصور',
		close: 'إغلاق عارض الصور',
		previous: 'الصورة السابقة',
		next: 'الصورة التالية'
	},
	tags: {
		title: 'المهارات',
		description: 'مهارات أحمد الكاف حسب المجال، والمشاريع التي تستخدم كل تقنية.',
		eyebrow: 'المهارات',
		heading: 'التقنيات التي أشتغل بها',
		text: 'أهم المهارات حسب المجال. اختر مهارة لترى المشاريع التي تستخدمها.',
		index: 'كل التقنيات المستخدمة في المشاريع'
	},
	tag: {
		title: (tag) => `مشاريع ${tag}`,
		description: (tag, projects) => `مشاريع أحمد الكاف التي تستخدم ${tag}: ${projects.join('، ')}.`,
		back: 'كل المهارات',
		eyebrow: 'مهارة',
		uses: (count) =>
			`${counted(count, {
				one: 'مشروع واحد يستخدم',
				two: 'مشروعان يستخدمان',
				few: 'مشاريع تستخدم',
				many: 'مشروعًا يستخدم'
			})} هذه التقنية.`
	},
	skills: {
		groups: {
			frontend: 'الواجهة الأمامية (Frontend)',
			backend: 'الخلفية والبيانات (Backend)',
			testing: 'الاختبار والجودة',
			devops: 'DevOps والسحابة',
			product: 'المنتج'
		},
		labels: {
			'REST API design': 'تصميم REST API',
			'Arabic RTL + English (i18n)': 'عربي RTL + إنجليزي (i18n)',
			'Multi-tenancy': 'تعدد المستأجرين',
			'Role-based access control': 'صلاحيات حسب الأدوار (RBAC)'
		}
	},
	resume: {
		title: 'السيرة الذاتية',
		print: 'اطبع أو احفظ PDF'
	},
	notFound: {
		title: 'الصفحة غير موجودة',
		heading: 'هذه الصفحة غير موجودة',
		text: 'ممكن الرابط قديم، أو الصفحة انتقلت. هذه الصفحات قد تفيدك:'
	},
	redirect: {
		eyebrow: 'هذه الصفحة انتقلت',
		goTo: ['انتقل إلى ', '.']
	},
	person: {
		city: 'جدة',
		university: 'جامعة الأحقاف'
	}
};
