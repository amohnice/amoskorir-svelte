import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import fs from 'fs';
import path from 'path';
import os from 'os';

const SYSTEM_PROMPT = `You are Amos Korir's professional digital assistant on his portfolio website. Your name is "Amos's AI Assistant." You are friendly, concise, and helpful. Speak in third person when referring to Amos (e.g., "Amos specializes in..." or "He has built...").

## About Amos Korir
- **Role**: Full-Stack Web Developer based in Nairobi, Kenya.
- **Tagline**: "I build responsive, interactive, scalable, modern, and beautiful web applications."
- **Status**: Currently available for freelance work and collaboration.
- **Contact**: WhatsApp: +254 719 388 139 | Email: amoskorir631@gmail.com | GitHub: amohnice | LinkedIn: amos-korir

## Certifications
- AI Career Essentials — ALX (July 2024)
- Web Development — eMobilis (Oct–Dec 2024)
- Software Development — PLP x Safaricom Hook (Dec 2024 – Mar 2025)
- Genkit, ADK & Vertex AI — Build with AI / Unstacked Labs (Sept – Dec 2025)

## Technical Skills
- **Frontend**: HTML, CSS, Bootstrap, TailwindCSS, JavaScript, TypeScript, React, Svelte, Next.js
- **Backend**: Node.js, Express, Django, Python
- **Databases**: MySQL, PostgreSQL, MongoDB, SQLite
- **DevOps**: Docker
- **AI/ML**: Vertex AI, Genkit, TensorFlow

## Projects
1. **SmartFarm Advisor** — AI-powered agricultural assistant for African smallholder farmers. Features disease detection from leaf scans, AI advisory, weather insights, and mobile-first design. Tech: Next.js, Node.js, Express, Python, TensorFlow, Tailwind, MongoDB. Live: https://smartfarm-advisor.vercel.app/
2. **WappStore** — Multi-tenant conversational commerce platform for WhatsApp with Genkit AI and M-Pesa integration. Features AI sales agent, interactive cart, M-Pesa STK Push, and merchant tools. Tech: Genkit AI, Node.js, TypeScript, PostgreSQL, Drizzle ORM, M-Pesa API, WhatsApp API, Redis. Live: https://wappstore.vercel.app/
3. **Acute Spa and Salon** — Modern responsive web app for a beauty and wellness business. Tech: React, TypeScript, Vite, Tailwind, shadcn/ui. Live: https://acute-spa-and-salon.vercel.app/
4. **AkiTech Solutions** — Software solutions startup brand website. Tech: Next.js, React, Tailwind. Live: https://akitech-solutions.vercel.app/
5. **AutoParts Hub** — Automobile parts inventory management system. Tech: React, Node.js, Express, MongoDB, Tailwind, Material UI. Live: https://autoparts-hub.vercel.app/

## Services Offered
- Web Design & Branding
- E-Commerce Solutions
- Business Websites
- Payment Integration (M-Pesa, Stripe, PayPal)
- POS & Inventory Systems
- AI Integration
- PWA Support
- Custom Software Solutions

## Response Guidelines
- Keep answers concise (2-4 sentences max unless the user asks for detail).
- If asked about pricing, say "Pricing depends on the project scope. Amos offers a free consultation — reach out on WhatsApp (+254 719 388 139) to discuss."
- If you cannot answer a question or it's unrelated to Amos's work, politely redirect: "That's outside my area, but Amos would love to chat! Reach out via WhatsApp or email."
- Use a warm, professional tone. Light emoji usage is okay (1-2 per message max).
- Never fabricate information about Amos. Only share what's provided above.
- You were built by Amos using Google's Gemini AI and Vertex AI — mention this if asked about how you work.`;

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	if (!messages || !Array.isArray(messages) || messages.length === 0) {
		return new Response(JSON.stringify({ error: 'Messages are required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Discovery logic for credentials
	const getEnv = (name: string) => env[name] || (typeof process !== 'undefined' ? process.env[name] : undefined);
	
	const apiKey = getEnv('GOOGLE_API_KEY') || getEnv('GEMINI_API_KEY') || getEnv('API_KEY');
	const project = getEnv('GOOGLE_CLOUD_PROJECT') || getEnv('GCP_PROJECT');
	const location = getEnv('GOOGLE_CLOUD_LOCATION') || 'us-central1';
	const serviceAccountJson = getEnv('GOOGLE_SERVICE_ACCOUNT_JSON');

	const diagnostics = {
		hasApiKey: !!apiKey,
		hasProject: !!project,
		hasServiceAccount: !!serviceAccountJson,
		nodeEnv: typeof process !== 'undefined' ? process.env.NODE_ENV : 'unknown',
		availableKeys: [
			...Object.keys(env),
			...(typeof process !== 'undefined' ? Object.keys(process.env) : [])
		].filter(key => key.includes('API') || key.includes('GOOGLE') || key.includes('GEMINI') || key.includes('PROJECT'))
	};

	try {
		let ai: GoogleGenAI;

		if (apiKey) {
			console.log(`[Google AI Chat] Initializing with API Key`);
			ai = new GoogleGenAI({ apiKey });
		} else if (project) {
			console.log(`[Vertex AI Chat] Initializing with Project: ${project}, Location: ${location}`);
			
			if (serviceAccountJson) {
				try {
					// Vercel workaround: Write the JSON to a temporary file and set GOOGLE_APPLICATION_CREDENTIALS
					const tempPath = path.join(os.tmpdir(), `google-creds-${Date.now()}.json`);
					fs.writeFileSync(tempPath, serviceAccountJson);
					process.env.GOOGLE_APPLICATION_CREDENTIALS = tempPath;
					console.log(`[Vertex AI Chat] Wrote credentials to ${tempPath}`);
				} catch (e: any) {
					console.error('Failed to handle Service Account JSON:', e.message);
					return new Response(JSON.stringify({ 
						error: 'Service Account setup failed', 
						details: e.message,
						diagnostics 
					}), {
						status: 500,
						headers: { 'Content-Type': 'application/json' }
					});
				}
			}

			ai = new GoogleGenAI({
				vertexai: true,
				project: project,
				location: location
			});
		} else {
			return new Response(
				JSON.stringify({ 
					error: 'Missing credentials. Set GOOGLE_API_KEY or GOOGLE_CLOUD_PROJECT.',
					diagnostics 
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Build conversation history as documented for @google/genai
		const allContents = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: msg.content }]
		}));

		const firstUserIndex = allContents.findIndex((m) => m.role === 'user');
		const history = firstUserIndex >= 0 ? allContents.slice(firstUserIndex) : [];
		const lastMessage = messages[messages.length - 1].content;

		const contents = [
			...history,
			{ role: 'user', parts: [{ text: lastMessage }] }
		];

		const response = await ai.models.generateContentStream({
			model: apiKey ? 'gemini-2.0-flash' : 'gemini-1.5-flash',
			contents,
			config: {
				systemInstruction: SYSTEM_PROMPT,
				maxOutputTokens: 512,
				temperature: 0.7,
				topP: 0.9
			}
		});

		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of response) {
						if (chunk.text) {
							controller.enqueue(new TextEncoder().encode(chunk.text));
						}
					}
					controller.close();
				} catch (err) {
					console.error('Streaming Chunk Error:', err);
					controller.error(err);
				}
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'no-cache',
				'X-Content-Type-Options': 'nosniff'
			}
		});
	} catch (err: any) {
		console.error('Final Google Gen AI Error:', err);
		const message = err.message || 'Unknown error';
		const status = err.status || 500;

		// Help identify if it's a model-existence issue
		if (message.includes('404')) {
			console.warn('Vertex AI Model Error (404): Try falling back to gemini-2.0-flash or gemini-1.5-flash.');
			return new Response(JSON.stringify({ 
				error: "Model not found. Please try a different Gemini model ID (e.g., gemini-2.0-flash).",
				details: message
			}), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (message.includes('403') || message.includes('permission')) {
			return new Response(JSON.stringify({ 
				error: "Permission denied. Ensure your Service Account has 'Vertex AI User' permissions in Google Cloud.",
				details: message
			}), {
				status: 403,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (message.includes('429') || message.includes('quota')) {
			return new Response(
				JSON.stringify({ error: "Quota exceeded. Please try again later.", details: message }),
				{ status: 429, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Generic fallback during debugging
		return new Response(JSON.stringify({ 
			error: `Internal Server Error: ${message}`,
			details: err.toString(),
			stack: err.stack ? 'present' : 'absent',
			diagnostics
		}), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
