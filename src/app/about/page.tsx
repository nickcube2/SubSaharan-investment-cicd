import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Import video and images


import dynamic from 'next/dynamic';
import { getTranslation } from '../lib/getTranslation';
import { Metadata } from 'next';

// SEO metadata for SSR
export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
	const locale = params?.locale || 'en';
	const baseUrl = 'https://sub-saharaninvestmentlinkgroup.co.za';
	
	return {
		title: getTranslation(locale, 'seo_about_title', 'About Us | SubSaharan Investment Link Group'),
		description: getTranslation(locale, 'seo_about_description', 'Learn about SubSaharan Investment Link Group, our mission, vision, and the services we offer to empower businesses and individuals across Sub-Saharan Africa.'),
		keywords: [
			"SubSaharan Investment Link Group about",
			"African business consulting company",
			"South Africa business services",
			"African investment advisory firm",
			"business solutions Sub-Saharan Africa",
			"corporate governance Africa",
			"African market entry specialists"
		],
		openGraph: {
			title: getTranslation(locale, 'seo_about_title', 'About Us | SubSaharan Investment Link Group'),
			description: getTranslation(locale, 'seo_about_description', 'Learn about SubSaharan Investment Link Group, our mission, vision, and the services we offer to empower businesses and individuals across Sub-Saharan Africa.'),
			url: `${baseUrl}/about`,
			siteName: "SubSaharan Investment Link Group",
			images: [
				{
					url: "/heroimage.jpg",
					width: 1200,
					height: 630,
					alt: "About SubSaharan Investment Link Group",
				},
			],
			locale: "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: getTranslation(locale, 'seo_about_title', 'About Us | SubSaharan Investment Link Group'),
			description: getTranslation(locale, 'seo_about_description', 'Learn about SubSaharan Investment Link Group, our mission, vision, and the services we offer to empower businesses and individuals across Sub-Saharan Africa.'),
			images: ["/heroimage.jpg"],
		},
		alternates: {
			canonical: `${baseUrl}/about`,
			languages: {
				"en-US": `${baseUrl}/en/about`,
				"fr-FR": `${baseUrl}/fr/about`,
				"es-ES": `${baseUrl}/es/about`,
				"zu-ZA": `${baseUrl}/zu/about`,
				"ha-NG": `${baseUrl}/ha/about`,
				"sw-TZ": `${baseUrl}/sw/about`,
			},
		},
	};
}

// Service data is now filled directly below with translation support

function getAboutSections(locale = 'en') {
	// Canonical service list from servicesData
	const canonicalServices = [
		{
			key: 'Business Consulting',
			descriptionKey: 'services_business_consulting_description',
			subservices: [
				'Market Entry Strategy',
				'Business Planning and Structuring',
			],
		},
		{
			key: 'Business Strategy & Planning',
			descriptionKey: 'services_business_strategy_description',
			subservices: [
				'Business Plan Development',
				'Feasibility Studies and Market Research',
				'Strategic Planning for Growth',
				'Tender Readiness Assessments',
			],
		},
		{
			key: 'Business Registration & Compliance',
			descriptionKey: 'services_business_registration_description',
			subservices: [
				'Company Registration with CIPC',
				'Annual Return Submissions',
				'SARS Tax Registration',
				'Business Bank Account Opening',
				'BBBEE Compliance Advisory',
				'B-BBEE Certification Assistance',
				'COIDA & UIF & Department of Labour Registration',
				'Licensing and Industry‑Specific Compliance',
			],
		},
		{
			key: 'Business Valuation & Investment Readiness',
			descriptionKey: 'services_business_valuation_description',
			subservices: [
				'Business Valuation Services',
				'Due Diligence Assessments',
				'Investment Readiness Coaching',
				'Exit Strategy Planning',
			],
		},
		{
			key: 'Market Access & Expansion',
			descriptionKey: 'services_market_access_description',
			subservices: [
				'Export Readiness and International Investor Introductions',
				'Cross-Border Expansion Support',
				'Joint Venture or Acquisition',
			],
		},
		{
			key: 'Corporate Governance',
			descriptionKey: 'services_corporate_governance_description',
			subservices: [
				'Board Advisory Services',
				'Compliance Audits and Documentation',
			],
		},
		{
			key: 'Police Clearance & Legalization',
			descriptionKey: 'services_police_clearance_description',
			subservices: [
				'South African Police Clearance Certificate Facilitation',
				'DIRCO Apostille/Legalisation of Documents',
			],
		},
		{
			key: 'Office Supplies & Procurement',
			descriptionKey: 'services_office_supplies_description',
			subservices: [
				'Affordable, Reliable Office Stationery & Equipment',
				'Bulk and Custom Orders Available',
			],
		},
		{
			key: 'Access to Funding & Markets',
			descriptionKey: 'services_funding_markets_description',
			subservices: [
				'Government Grants and Loans Guidance',
				'Proposal and Business Plan Preparation',
				'Networking and Partnerships',
				'Export Readiness Support',
			],
		},
		{
			key: 'Other Services',
			descriptionKey: 'services_other_services_description',
			subservices: [
				'Customized Administrative, Legal & Consulting Support',
			],
		},
	];

	return [
		{
			id: 'overview',
			title: getTranslation(locale, 'about_overview_title', 'Who We Are'),
			content: getTranslation(
				locale,
				'about_overview_content',
				'SubSaharan Investment Link Group is a South African-based consultancy and service provider focused on empowering businesses, individuals, and organizations across the Sub-Saharan region. We provide reliable support for business setup, governance, and professional supply needs.'
			),
		},
		{
			id: 'mission',
			title: getTranslation(locale, 'about_mission_title', 'Our Mission'),
			content: getTranslation(
				locale,
				'about_mission_content',
				'To empower and support entrepreneurs, corporations, and individuals by providing seamless business, and compliance solutions across Southern Africa.'
			),
		},
		{
			id: 'vision',
			title: getTranslation(locale, 'about_vision_title', 'Our Vision'),
			content: getTranslation(
				locale,
				'about_vision_content',
				'To be the most trusted facilitator of business and legal solutions in Sub-Saharan Africa, driving sustainable development and cross-border partnerships.'
			),
		},
		{
			id: 'services',
			title: getTranslation(locale, 'about_services_title', 'What We Offer'),
			intro: getTranslation(locale, 'about_services_intro', 'Explore our core service areas. Hover over each to see more details.'),
			services: canonicalServices.map(service => ({
				key: service.key,
				title: getTranslation(locale, service.key, service.key),
				description: getTranslation(locale, service.descriptionKey, ''),
				link: `/services/#${service.key.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
				subservices: service.subservices.map(sub => getTranslation(locale, sub, sub)),
			})),
		},
	];
}

const AboutClient = dynamic(() => import('./AboutClient'));

export default function AboutPage({ params }: { params?: { locale?: string } }) {
	const locale = params?.locale || 'en';
	const aboutSections = getAboutSections(locale);
	return (
		<>
			<AboutClient aboutSections={aboutSections} />
			
			{/* Structured Data for About Page */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "AboutPage",
						"name": "About SubSaharan Investment Link Group",
						"description": "Learn about SubSaharan Investment Link Group, our mission, vision, and the services we offer to empower businesses and individuals across Sub-Saharan Africa.",
						"url": "https://sub-saharaninvestmentlinkgroup.co.za/about",
						"mainEntity": {
							"@type": "Organization",
							"name": "SubSaharan Investment Link Group",
							"description": "A South African-based consultancy and service provider focused on empowering businesses, individuals, and organizations across the Sub-Saharan region.",
							"url": "https://sub-saharaninvestmentlinkgroup.co.za",
							"logo": "https://sub-saharaninvestmentlinkgroup.co.za/subsaharan_logo.png",
							"foundingDate": "2020",
							"address": {
								"@type": "PostalAddress",
								"addressCountry": "ZA",
								"addressRegion": "South Africa"
							},
							"contactPoint": {
								"@type": "ContactPoint",
								"contactType": "customer service",
								"availableLanguage": ["English", "French", "Spanish", "isiZulu", "Hausa", "Kiswahili"]
							},
							"sameAs": [
								"https://linkedin.com/company/subsaharan",
								"https://twitter.com/subsaharan"
							],
							"serviceArea": {
								"@type": "GeoCircle",
								"geoMidpoint": {
									"@type": "GeoCoordinates",
									"latitude": -30.5595,
									"longitude": 22.9375
								},
								"geoRadius": "5000000"
							},
							"knowsAbout": [
								"Business Consulting",
								"Corporate Governance",
								"Business Registration",
								"Investment Advisory",
								"Office Supplies"
							]
						}
					})
				}}
			/>
		</>
	);
}
